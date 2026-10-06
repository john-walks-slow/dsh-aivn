# dsh-aivn —— 项目级指引

把 AIVN 的舞台引擎做成一个 DSH 插件。仓库根就是插件包根。

## 结构

| 路径 | 是什么 |
| --- | --- |
| `src/` | 宿主半边（Cordis 插件）：中枢、DSL 管线、路由、剧目脚手架、追收束 |
| `src/play-context.ts` | A 区注入：把前提 / 角色表 / 素材清单 / 写作参数 / 记忆索引 / 状态区挂进系统提示词 |
| `src/playwriter/` | 剧作家预设、提示词与它专属的五个工具 |
| `src/tools/` | 两个预设共用的工具（`create_play`） |
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
4. **剧作家漏调 `beat_done` 是常态，不是异常。** 快模型时不时把它写成正文里的一行
   `<beat_done …/>`。`src/beat-guard.ts` 在 `agent/turn-stopping` 上追一句把停止点要回来——
   删掉它，舞台会在半句台词之后停住、玩家没有可点的东西。追收束那一句与舞台的「继续」
   都会落进 `agent/inbox/inserted`，得在 `src/injected.ts` 里按 `message.id` 登记摘除，
   否则它们会变成玩家台词条上的一行（**别退回按正文比对**，改一个字就静默失效）。
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
- 套件有三个，都在 `e2e/run.mjs` 的 `MODULES` 里：`stage`（演出闭环，`verify-stage.mjs`）、
  `injection`（A 区注入，`verify-injection.mjs`，从**会话日志**取系统提示词断言——日志是多帧 zstd，
  用 `zstd -dc` 解）、`voice`（台词语音，`verify-voice.mjs`，真打 Fish Audio，跑之前要 export
  `DSH_AIVN_TTS_KEYS`；它在页面里给 `AudioContext` / `decodeAudioData` / `AudioBufferSourceNode.start`
  挂钩子，断言的是「浏览器真的解出 PCM 并起播」，不是「帧到了」）。
- 两个本地前提在 `.dsh-e2e-home/` 里（不在仓库里）：profile 的 `cordis.patch.yml` 要有可用的
  provider 行（`settings.yaml` 首次启动被 import 后改名，冷启就没 provider 了），
  默认模型挑一个这台机器出得去的（列表里可能有地区受限的条目，会报
  `User location is not supported`）。细节见 README 的「开发」一节。

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
