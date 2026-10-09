# dsh-aivn —— 项目级指引

把 AIVN 的舞台引擎做成一个 DSH 插件。仓库根就是插件包根。

## 结构

| 路径 | 是什么 |
| --- | --- |
| `src/`（根） | 宿主接线（Cordis 插件）：`index`（装配）、`routes`、`session`、`hub`、`preset-tools`、`tool-catalog`、`commands`、`injected`，以及宿主级服务 `capabilities` / `exa` |
| `src/play/` | 剧目领域：`play`（数据层）、`play-context`（A 区注入）、`play-files`（《剧目文件》）、`play-state`、`craft`、`readiness`、`scaffold`、`ledger`、`assets` |
| `src/stage/` | 演出投影：`stage-tap`（DSL→IR）、`stage-log`（会话面重投影）、`director`（导演工具栏） |
| `src/style/` | 舞台皮肤：`style-tokens`（令牌白名单与校验）、`theme`（`theme.json` 读取） |
| `src/voice/` | 语音：`tts`（Fish 客户端）、`voice`（分句/预取管线）、`voice-host`（按会话接线）、`voice-catalog`（音色库） |
| `src/media/` | 生图 / 音乐 / 抠底的后端实现与素材落库（无角色分叉） |
| `src/playwriter/` | 剧作家预设与提示词（停止点是剧本里的 `<stop …/>`，不是工具） |
| `src/stagehand/` | 搭台助手专属：`prompt`（persona/guide）、`context`（《当前状态》注入） |
| `src/tool-catalog.ts` | AIVN 工具面的单一真相源（工具名、职责、开启门控）；装配与提示词工具表都从它派生 |
| `src/tools/` | 两个预设共用的**全部** AIVN 工具（9 个）+ 工具上下文（`PlayContext`） |
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
   （`stage/stage-tap.ts` 的 `openPlay`，跟着玩家的第一条消息走）。
   **结局（`<ending …/>`）是同一族的标签**：也在剧本末行、取代那一轮的 `<stop>`，终局态从重放的 IR 推出
   （`stage-tap` 按实时/重建两条回调维护 per-session `ended`，`EndingsLedger` 把结局落账到工作区根
   `endings.json`）。**重建只重推终局标记、绝不重复落账**；结局之后引擎用 `followup` 单开一轮要收束散文
   （`<epilogue>`，回填账本 `summary`）。`play.json` 的 `newGamePlus` 只走 A 区注入（`play/play-context.ts` 的
   `aivn:play-endings` 段），引擎不做任何 gate。详见 README「结局与多周目」。
5. **提示词分两段**：`PLAYWRITER_PROMPT` 是 persona 的 `prefix`（静态前半），
   `PLAYWRITER_TAIL` 由 `src/play/play-context.ts` 注册成 order 200 的段。中间夹着 A 区的动态段——
   `persona` 那一格只装得下一段静态文本，所以「A 区之后」的几章必须由插件自己挂。
   改提示词时看清楚一段属于哪半边，别把动态内容写回静态 prefix。

## 提示词地图

agent 提示词分三层，**每一类知识只有一个家**。改任何提示词前先在这里定位它属于哪层：

| 层 | 载体 | 改完 | 生效 |
| --- | --- | --- | --- |
| **Skill** | `skills/aivn-play-setup/`、`aivn-visual-craft/`、`aivn-audio/` | 直接改 markdown | 宿主把 name+description 恒列进技能清单（一条 `available_skills` 上下文消息），模型按需 `skill` 加载全文；**改完即生效** |
| **persona + 注入段** | 硬编码 TS（下表） | `npm run build` 并提交 `lib/` | `persona.prefix` 装载时烘焙；`systemPrompt.section` 每轮现读 |
| **运行期剧目文件** | `<剧目>/premise.md`、`craft.md`、`play.json`、`characters/*`、`memory/*`、`assets/manifest.json`、`theme.json` | 直接改 | 条件化渲染进 A 区注入；属「内容」，不是提示词本体 |

**分层规约（单一真相源）**：

- **机制**（怎么调、参数形状、会不会覆盖、同步等多久）→ 工具 `DESCRIPTION`。
- **食谱**（做法步骤、选源/授权、画风与外形配方）→ 按需加载的 skill。
- **身份 / 职责边界 / 每轮契约 / 能力位门控指针** → persona。
- **数据渲染模板**（读盘→文本）→ `src/play/play-context.ts` / `src/stagehand/context.ts` / `src/play/craft.ts`。
- persona 里出现工具名时只描述「何时用」，参数细节归 DESCRIPTION。

**代码里的提示词位置**：

| 提示词 | 文件 | 注入点 | 门控 |
| --- | --- | --- | --- |
| 剧作家身份 / 剧目在哪 / 怎么工作 | `src/playwriter/prompt.ts` | persona.prefix | — |
| 《剧目文件》 | `src/play/play-files.ts` | prefix + tail（两预设共用） | — |
| 剧本格式（Stage DSL）/ 结局 / 记忆卡 / 演出契约 | `src/playwriter/prompt.ts` | `section` `aivn:playwriter-tail`（order 200） | — |
| 演出中引入新主体（指针）/ 缺图怎么办（指针） | `src/playwriter/prompt.ts` | 同上（`aivn:playwriter-tail` 内的字段） | 缺图指针 `can.image` |
| 搭台助手身份 / 职责 / 对话风格 | `src/stagehand/prompt.ts` | persona.prefix | — |
| 出图要点（短规则 + 指针） | `src/stagehand/prompt.ts` | `section` `aivn:stagehand-guide`（order 40） | 恒在，按 `can.image` 分措辞 |
| 配乐（指针）/ 命令行 / 联网检索 / 技能库 | `src/stagehand/prompt.ts` | 同上 | 配乐 `can.music`、命令行 `can.shell`、检索 `can.search` |
| A 区段（语言 / 设定 / 角色表 / 素材 / 写作参数 / 记忆索引 / 结局 / 状态） | `src/play/play-context.ts` | `section` + `context` | 按数据 / 能力位 |
| 写作参数措辞 | `src/play/craft.ts` | 由 A 区渲染 | 配置驱动 |
| 搭台《当前状态》 | `src/stagehand/context.ts` | `systemPrompt.section` | — |
| 9 个工具描述 | `src/tools/*` | 工具 schema | 工具注册门控 |
| 导演消息壳 / 收束指令 | `src/stage/director.ts`、`src/stage/stage-tap.ts` | 运行期 user 消息 | — |

**门控规则**（skill 恒列，persona 门控章随能力位消失）：

- **门控章不能整章下沉**：skill 没有能力位门控，整章下沉会让没配后端的实例从恒列 skill 读到教它调不存在
  工具的正文。做法是**正文下沉到 skill，persona 只留一句保留同名标题的门控指针**（指针随能力位出现/消失）。
- skill 的 `name` + `description`（恒可见）**必须能力中立**：不点名门控工具（`generate_asset` /
  `generate_image` / `generate_bgm` / `list_voices` / `web_search`）。正文可以点名，但必须**条件化**
  （先讲清「本剧目配了 / 没配 X 后端」，两支各走哪条路）。
- e2e 靠门控指针的标题与条件句判定能力位。

**e2e 锚点**：改 persona 章标题或条件句时，同步改 `e2e/verify-injection.mjs`（A 区段、缺图章）与
`e2e/verify-stagehand.mjs`（《出图要点》《配乐》《剧目文件》、技能清单、门控措辞）。

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

#### 只跑必要的那几条（本机内存紧张，真 LLM 的拍尤其贵）

**每次只跑与本次改动相关的判据，禁止整组无差别跑。** 这条套件的开销几乎全在真 LLM 那几拍上
（一次全量 = 三拍 + 一次原生分叉），而其中常常只有一拍与本次改动有关。挑选机制：

```bash
E2E_PHASES=first,branch dsh-e2e run e2e/verify-director.mjs   # 只跑这两段（一拍 LLM）
E2E_ONLY=D16           dsh-e2e run e2e/verify-director.mjs   # 按判据 id 挑报告（不省前面的拍）
```

- `E2E_PHASES` 按**阶段**筛，段外的判据**连跑都不跑**——省的是真 LLM 的钱，这是首选。
  可选段见 `verify-director.mjs` 的 `PHASES`（`boot` / `first` / `guide` / `rewrite` / `branch` / `tail`）。
  `boot` 零成本；`first,branch` 只要一拍（分叉分的是当前这一轮，不必等引导与重写）。
- `E2E_ONLY` 只筛**报告**，省不掉被挑中那条前面的拍——它和 `E2E_PHASES` 配合用。
- **单点跑不给验收结论**：结尾会列出没跑的判据并明说「本次结果不能当作整条套件通过」。
  验收一律去掉这两个环境变量跑全量。
- 挑错了阶段名会以 exit 2 当场报错，不会静默变成「什么都没跑 = 通过」。
- **判据要分层，别让一条 flaky 判据逼人重跑全量**：能看「舞台上的实际内容」就不要数帧数、
  不要数网络事件（`verify-director` 的 D16 从前数页面自挂 SSE 探针的帧数，同一份代码收到过
  0 / 62 / 67 / 71 帧——0 帧那次舞台其实好着，人却为此重跑了一遍全量）。
- 套件分组都在 `e2e/run.mjs` 的 `MODULES` 里（`dsh-e2e run e2e/run.mjs --list` 看全），例如
  `stage`（演出闭环，`verify-stage.mjs` + `verify-opening.mjs`）、
  `injection`（A 区注入，`verify-injection.mjs`，从**会话日志**取系统提示词断言——日志是多帧 zstd，
  用 `zstd -dc` 解）、`voice`（台词语音，`verify-voice.mjs`，真打 Fish Audio，跑之前要 export
  `DSH_AIVN_TTS_KEYS`；它在页面里给 `AudioContext` / `decodeAudioData` / `AudioBufferSourceNode.start`
  挂钩子，断言的是「浏览器真的解出 PCM 并起播」，不是「帧到了」）。
- 诊断 / 截图脚本在 `e2e/diag/`（`css-diag.mjs` / `shot-tabs.mjs` / `shot-voice.mjs` / `b1-probe.sh`），
  不进 `MODULES`、手动 `dsh-e2e run`；`style-tokens.check.ts` **不是**诊断脚本——它是 `verify-style.mjs`
  的夹具，留在 `e2e/` 根。
- **`rebuild` 是唯一不需要实例的套件**（`node e2e/run.mjs rebuild` 直接跑，不占 run 锁）：
  `verify-rebuild.mjs` 用 esbuild 把 `verify-rebuild.ts` 打进内存/临时文件再跑，夹具里手写一份
  转写，直接调**真实的** `rebuildStage()`，断言三种停止点形态在重投影之后都留得住。
  舞台的真相源是会话面，凡是「回退 / 重写 / 分支 / 冷会话首开」会走重建的地方，新增的舞台语义
  都该在这里补一条——真模型跑不出「这一拍用 `<stop/>` 收尾」，但转写可以手写。
- 两个本地前提在 `.dsh-e2e-home/` 里（不在仓库里）：profile 的 `cordis.patch.yml` 要有可用的
  provider 行（`settings.yaml` 首次启动被 import 后改名，冷启就没 provider 了），
  默认模型挑一个这台机器出得去的（列表里可能有地区受限的条目，会报
  `User location is not supported`）。细节见 README 的「开发」一节。
- **环境前提**：`verify-settings.mjs` 要一个**没有** `DSH_AIVN_TTS_KEYS` 的实例（跑 `voice` 套件时
  恰恰必须带上它）。带着变量跑设置套件时 S8/S12 必然假红——套件会在动任何东西之前读
  `instance.json` 的 `env` 快照（`dsh-e2e start` 写下的、本次生效的 `DSH_*` / `STAGE_*` 变量名）
  把这条打印出来并以退出码 2 结束，见到那段话就 `dsh-e2e stop && start` 再来。
  已知残差：快照是**声明**不是**观测**——实例被别人重启、或有人事后往运行环境里注 key，守卫会放过；
  那种情形下的红也确实不是产品的错，认了，不为它写防御代码。

## 产物与源码

`lib/` 是受跟踪的构建产物，改了 `src/` 必须重建并一起提交。忘了重建的失败是静默的（本地正常、
别人装上才炸），所以它挂成一道**真的会拦人的**关卡，而不是一份说明书：

```bash
git config core.hooksPath .githooks   # 每个 clone 各做一次（core.hooksPath 不随仓库走）
node build.mjs --check                # 钩子跑的就是这条；手动排查时也可以直接跑
```

它会连带打印这次比对是在什么现场做的：仓库路径、HEAD、工作树是否干净、与上游差几笔、
以及 `@aivn/core` / `@aivn/stage` 两个兄弟检出是否干净。判定强度分两档：宿主半边
（`lib/index.js`）与兄弟仓无关，永远硬判；客户端半边（`lib/client.js`）把 `@aivn/stage`
打进了包，只在兄弟检出干净时硬判，否则只警告（那时的不一致多半是别人正在改那只包）。
钩子可以在确认无关时用 `git commit --no-verify` 绕过。注意 `core.hooksPath` 指向不存在的目录时
git **静默跳过**（实测退出码 0，不报错）——所以`.githooks/` 是受跟踪的、别把它删掉或改路径，
那等于把这道关卡无声地关掉。

## 改名要连带改的地方

改一个用户可见的名字（页签、路由、工具名、依赖路径、目录）时，**同一笔提交里**要连带改掉这些
引用点。少改一处不会报错，只会让某个套件「注定跑不起来」，然后被误判成别的原因：

- **页签标签**：真相源是 `src/client/index.tsx` 注册会话视图时的 `label`（现在叫 `AIVN`）。
  e2e 用 `openViewTabWhenReady(page, '<label>')` 等它，标签对不上就是一直等到超时。2026-10-06
  查出 `e2e/verify-voice.mjs` 与 `e2e/diag/css-diag.mjs` 还在等改名前的「舞台」——语音套件因此注定
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
  它们打进 `lib/`，运行时不依赖——所以**消费者不需要它们**（`npm i` 只装 `dependencies`，这两个在
  `devDependencies` 里），只有从源码重建才需要兄弟仓在位（前置见 README 的「开发」一节）。
  **不必为此把这两个包发到 npm**：2026-10-06 查过，没有任何外部接收方需要它（诊断见 stage-ai 的
  `docs/freeform/261006-dsh-aivn-distribution.md`）。真出现「要在没有兄弟仓的情况下从源码构建」的
  接收方时，先走 `pnpm pack` + `vendor/` tarball 那条自包含的路，公网 npm 是最后手段。
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
