# dsh-aivn —— 项目级指引

把 AIVN 的舞台引擎做成一个 DSH 插件。仓库根就是插件包根。

## 结构

| 路径 | 是什么 |
| --- | --- |
| `src/` | 宿主半边（Cordis 插件）：中枢、DSL 管线、路由、剧目脚手架 |
| `src/play-context.ts` | A 区注入：把前提 / 角色表 / 素材清单 / 写作参数 / 记忆索引 / 状态区挂进系统提示词 |
| `src/playwriter/` | 剧作家预设与提示词；它专属的工具只剩配了生图才有的同步 `generate_image`（停止点是剧本里的 `<stop …/>`，不是工具） |
| `src/tools/` | 两个预设共用的工具与工具上下文（`validate_play` / `PlayContext`） |
| `src/play-files.ts` | 《剧目文件》那一章：目录布局与 `play.json` / 角色卡的字段，**两个预设共用同一段文本**（写文件就是建剧目，没有「起剧目」工具） |
| `src/client/` | 浏览器半边（React），挂在 `conversation.view` 槽 |
| `lib/` | **跟踪的构建产物**（`lib/index.js` / `lib/client.js`）——DSH 直接加载它 |
| `e2e/` | dsh-e2e 套件 |
| `screenshots/` | README 与市场详情页用的图（`screenshots.json` 指过来，1–8 张） |

## 动手前必须知道的四件事

1. **`lib/` 是构建产物，改完 `src/` 必须 `npm run build` 再提交。** DSH 加载的是 `lib/`：
   提交了过期的 `lib/` 等于这次改动没发出去；漏掉 `lib/client.js` 会让 web 端
   `Failed to load plugins`。
2. **`inject` 必须写全直接访问的 ctx 服务**（见 `src/index.ts`）。漏一个，运行时抛
   `cannot get property X without inject`，`apply` 根本不跑、插件静默死掉。
3. **「当前是什么预设」只认活的组合**：`ctx.agentPresets.composedPreset(agent.ctx)` 是权威，
   `session.header.agentPreset` 只在创建那一刻为真。新会话界面是「先建会话、再选预设」，
   那条路只记事件、不改头——只读头会把整条舞台管线丢空。见 `src/session.ts` 的 `sessionPreset`。
4. **停止点是剧本正文最后一行的一个标签**（`<stop options="甲 | 乙"/>` / `<stop placeholder="…"/>` /
   `<stop/>`），不是工具调用——2026-10-06 从 `beat_done` 挪回来的，为的是让轮尾重新是助手消息
   （DSH 的「在新对话中分支」与舞台重建只认这种轮尾）。标签由 `@aivn/core` 的解析器产出 IR，
   所以**改语法要动 stage-ai 的 `packages/core` 并重建它的 `dist`**（dsh-aivn 吃的是 dist）。
   引擎自己补的消息（开局指令、导演指令、舞台的「继续」）都会落进 `agent/inbox/inserted`，
   得在 `src/injected.ts` 里按 `message.id` 登记摘除，否则它们会变成玩家台词条上的一行
   （**别退回按正文比对**，改一个字就静默失效）。
   引擎自己补的消息想挤进**当前**那一轮只能用 `agent.inject`（落 `next-step`，整批认领）：
   `followup` 落 `next-turn`，而一轮只认领一条，第二条要等下一轮。开局指令就是这么补的
   （`stage-tap.ts` 的 `openPlay`，跟着玩家的第一条消息走）。
5. **提示词分两段**：`PLAYWRITER_PROMPT` 是 persona 的 `prefix`（静态前半），
   `PLAYWRITER_TAIL` 由 `src/play-context.ts` 注册成 order 200 的段。中间夹着 A 区的动态段——
   `persona` 那一格只装得下一段静态文本，所以「A 区之后」的几章必须由插件自己挂。
   改提示词时看清楚一段属于哪半边，别把动态内容写回静态 prefix。

## 开发

```bash
npm run build       # 重建 lib/（宿主半边 + 浏览器半边）
npm run typecheck
```

本项目**没有单元测试**：宿主半边几乎全是接线，真正会坏的地方在 DSH 运行时里（事件时序、
预设解析、turn 边界），单元测试够不着；可信的验证是 e2e。

### e2e

```bash
dsh-e2e start --wait-ready     # 起最小实例（dsh-base + dsh-web-app + 本插件）
npm run e2e:stage              # 跑舞台套件「stage」
dsh-e2e stop
```

- **必须先 `dsh-e2e start`**：`dsh-e2e run` 自己不起实例，实例不在时套件会以
  `missing DSH_E2E_PORT` 直接失败。
- **改过 `lib/` 之后要 `dsh-e2e stop` 再 `start`**，否则跑的还是旧模块。
- 套件分组都在 `e2e/run.mjs` 的 `MODULES` 里（`dsh-e2e run e2e/run.mjs --list` 看全），例如
  `stage`（演出闭环，`verify-stage.mjs` + `verify-opening.mjs`）、
  `injection`（A 区注入，`verify-injection.mjs`，从**会话日志**取系统提示词断言——日志是多帧 zstd，
  用 `zstd -dc` 解）、`voice`（台词语音，`verify-voice.mjs`，真打 Fish Audio，跑之前要 export
  `DSH_AIVN_TTS_KEYS`；它在页面里给 `AudioContext` / `decodeAudioData` / `AudioBufferSourceNode.start`
  挂钩子，断言的是「浏览器真的解出 PCM 并起播」，不是「帧到了」）。
- **`rebuild` 是唯一不需要实例的套件**（`node e2e/run.mjs rebuild` 直接跑，不占 run 锁）：
  `verify-rebuild.mjs` 用 esbuild 把 `verify-rebuild.ts` 打进内存/临时文件再跑，夹具里手写一份
  转写，直接调**真实的** `rebuildStage()`，断言三种停止点形态在重投影之后都留得住。
  舞台的真相源是会话面，凡是「回退 / 重写 / 分支 / 冷会话首开」会走重建的地方，新增的舞台语义
  都该在这里补一条——真模型跑不出「这一拍用 `<stop/>` 收尾」，但转写可以手写。
- 两个本地前提在 `.dsh-e2e-home/` 里（不在仓库里）：profile 的 `cordis.patch.yml` 要有可用的
  provider 行（`settings.yaml` 首次启动被 import 后改名，冷启就没 provider 了），
  默认模型挑一个这台机器出得去的（列表里可能有地区受限的条目，会报
  `User location is not supported`）。细节见 README 的「开发」一节。

## 改名要连带改的地方

改一个用户可见的名字（页签、路由、工具名、依赖路径、目录）时，**同一笔提交里**要连带改掉这些
引用点。少改一处不会报错，只会让某个套件「注定跑不起来」，然后被误判成别的原因：

- **页签标签**：真相源是 `src/client/index.tsx` 注册会话视图时的 `label`（现在叫 `AIVN`）。
  e2e 用 `openViewTabWhenReady(page, '<label>')` 等它，标签对不上就是一直等到超时。2026-10-06
  查出 `e2e/verify-voice.mjs` 与 `e2e/css-diag.mjs` 还在等改名前的「舞台」——语音套件因此注定
  失败，几周里一直被当成「没配 TTS key」。
- **路由**：`src/routes.ts` 里 `PREFIX`（`/aivn`）下的路径，客户端与 e2e 两处都要跟着改。
- **工具名**：`src/**/tools/*.ts` 里的 `name`，与 `e2e/verify-injection.mjs` 的工具面断言成对
  （2026-10-06 拆掉 `beat_done` 改的就是这里）。
- **依赖路径**：`package.json` 的 `file:` 依赖与 `package-lock.json` 要一起动。2026-10-06 有一笔
  只改了前者，锁文件里留下一个已经消失的 `.worktrees/dsh-vn-stage/packages/stage` 条目。
- **目录搬家**：搬的不只是 `.ts`/`.tsx`，样式与静态资源一起搬。`@aivn/stage` 抽包时就漏搬了一整套
  `.choice*` 规则（选项卡片退化成浏览器默认按钮），补齐脚本在 stage-ai 的 `scripts/port-stage-css.py`。

## 发布

- **双语 README**：`README.md`（中文，主体）+ `README.en.md`（英文）+ 顶部居中的语言切换。
  改中文那份时**同一次提交里改英文那份**，别让两边漂。
- `screenshots/screenshot-1.png` 是市场详情页的第一张图，`screenshots.json` 指向它。
  **别把图放进 `assets/`**：那是**剧目的**素材目录（`<剧目>/assets/…`），既会和 e2e 夹具撞名，
  也会被 `files` 一起打进包里。
- `@aivn/core` 与 `@aivn/stage` 是**构建期依赖**（`file:` 指向兄弟仓库 `stage-ai`）：esbuild 把
  它们打进 `lib/`，运行时不依赖——所以**消费者不需要它们**，只有从源码重建才需要（前置见 README
  的「开发」一节）。发布前若想让新克隆也能直接构建，得先把这两个包发到 npm 再换成版本号。
- 发布前跑一次隔离验证（**别碰线上 profile**）：

  ```bash
  npm pack                                              # 真实 tarball
  dsh plugin --profile scratch-aivn add ./dsh-aivn-<v>.tgz
  dsh --profile scratch-aivn --dump-config              # 应出现 dsh-aivn 这一层
  cd ~/.dsh/profiles/scratch-aivn && node --input-type=module \
    -e "import('dsh-aivn').then(m=>console.log(typeof m.apply, m.name))"
  rm -rf ~/.dsh/profiles/scratch-aivn
  ```

  `prepublishOnly`（重建 + 类型检查）保证发出去的和源码一致。npm 发布走 `npm-publish` 技能
  （指纹认证），流程见 `dev-dsh-plugin` 技能的 `references/publish-and-marketplace.md`。

## 文档

- `README.md` / `README.en.md` —— **用户手册**（中文主体 + 英文，改动要同步）。凡是用户碰得到的
  配置面都必须在这里：`play.json` 字段、`craft` 取值、剧目目录约定、预设、工具、斜杠命令、
  HTTP 路由、权限与兼容声明。发布前逐项核对。
- **本仓库不放开发侧记录**：需求、计划、检视、验证一律记在主仓库
  `stage-ai/docs/features/261005-dsh-vn-plugin/` 下。这个仓库是公开的，施工单里那些绝对路径与
  私有仓库引用不该出现在这里（曾有一份 `preset-and-prompt.spec.md`，发布前迁走了）。
