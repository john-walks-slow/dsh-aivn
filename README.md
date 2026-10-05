# dsh-aivn

把 AIVN 的舞台引擎装进 DSH。

一个**工作区就是一部剧目**：在里面开会话、选「剧作家」预设，对话页就多一个「舞台」tab，
剧作家写的 Stage DSL 被实时演出来——背景、立绘、台词条、停止点选项都在这里；玩家点一条选项，
这句话回到剧作家手上，它接着往下写。

## 装

包是 DSH 的 bundle（`package.json` 里声明了 `dsh.bundle.patch`）：

- **用插件管理器**：装 `dsh-aivn`，或在 profile 的 `cordis.patch.yml` 里加一行：

```yaml
- insert:
    - id: dsh-aivn
      name: dsh-aivn
      config: {}
```

- **客户端半边**（「舞台」tab）挂在 `conversation.view` 槽上，需要 `dsh-web-app`。它在
  `package.json` 的 `dsh.client{platform:"web"}` 里声明，不走 Loader。

可配的只有**语音**一项（不配就是没有语音，其余照常）：

```yaml
- id: aivn
  name: dsh-aivn
  config:
    tts:
      keys: ["<your-fish-audio-key>"]   # 多把可轮询，摊免费额度
      baseUrl: https://api.fish.audio    # 默认值，一般不用写
      model: s2.1-pro-free               # 默认值
      concurrency: 2                     # 同时合成的上限
```

不想把 key 写进配置文件就留空，改走环境变量 `DSH_AIVN_TTS_KEYS`（逗号分隔）。
两处都没有 = 舞台连语音开关都不显示。两个预设、六个工具、一条 `/new-play` 命令、
`/aivn` 路由都是固定的，不可配。

> 开发期 `@aivn/core` 与 `@aivn/stage` 走 `file:` 依赖（指向 stage-ai 仓库）。发布版换成版本号。

## 用

1. 新建会话，在座位 chip 上选 **剧作家**（备料的那位是 **搭台助手**）。
   预设是**在会话开始时**定下的，中途换不了——想换就新建一个会话。
2. 会话的工作目录根要有 `play.json`。没有的话舞台会明说「这个会话的工作目录里没有 play.json，
   还不是一座剧目」——那就先把它立起来，见下。
3. 说一句话，或者切到「舞台」tab 点「开演」。之后的一切都在舞台上发生。

「舞台」tab 是会话头部的第四个 tab（Chat / Trajectory / 舞台）。

### 起一座新剧目

工作区里没有 `play.json` 就是「这还不是一座剧目」。两条入口，写出来的东西一模一样：

- **人**：输入框敲 `/new-play 雨中的旧校舍`。不给剧目名就取工作目录名。
- **Agent**：`create_play` 工具，两个预设都装着它。

两者都**只写不存在的文件**：`play.json` 已经在那儿就直接报错（这里已经是一座剧目，
要起新的就换一个空目录开会话），`memory/always/premise.md` 与角色卡已经写好就跳过、
在回执里列成「保留」。落下的骨架就是上面那张目录表里的前几行——之后缺什么补什么。

## 一部剧目长什么样

工作目录根就是剧目根：

```
play.json                          剧目配置（唯一的必填文件）
memory/always/premise.md           世界观前提
memory/always/craft.md             文风与禁忌（散文，只能拿话说）
memory/always/state/scene.md       当下场景（剧作家自己写）
memory/always/state/threads.md     未了线索（剧作家自己写）
characters/<id>.md                 角色卡
assets/backgrounds/…               背景
assets/cg/…                        插图
assets/sprites/<id>/…              立绘：每个主体一个目录
assets/sfx/…  assets/bgm/…         音效与音乐
assets/manifest.json               素材描述表：素材 id → 一句话画面
```

### play.json

必需字段只有两个：

```json
{ "id": "my-play", "title": "我的剧目" }
```

其余字段（全部可选）：

| 字段 | 作用 |
| --- | --- |
| `opening` | 开局那条 user 消息的正文。舞台上的「开演」和「继续」发给剧作家的就是它。缺省 `（游戏开始，请演出第一轮）` |
| `characters` | `[{ id, name }]`。**只用来给台词条配名字**：立绘绑定在角色卡的 frontmatter 上 |
| `craft` | 写作参数，见下 |
| `initialState` / `initialScene` | 剧目的起始状态与起始场景 |
| `scriptLanguage` | 剧本语言（ISO 639-1）。缺省跟随玩家说什么话 |
| `voiceLanguage` / `defaultVoiceId` / `cover` | 语音与封面：属于 AIVN app，本插件当前不读 |
| `image` / `agents` | 生图与 agent 运行设置：属于 AIVN app，本插件当前不读 |

### characters/&lt;id&gt;.md

一张角色卡就是一份 Markdown，可选 frontmatter：

```markdown
---
name: 林
sprite: lin
voice: 短句，少用形容词
---

十七岁，话少，习惯先看窗外再看人。
```

- `name` —— 台词条上的名字。
- `sprite` —— 绑到哪个立绘目录（`assets/sprites/<sprite>/`）。不写就是角色自己的 id。
  立绘是**立绘自己的事**：`characters/` 可以没有立绘，`sprites/` 也可以没有卡。
- `body` —— 人设正文。

### assets/manifest.json

剧作家认 id 认不出画面，靠这份描述：

```json
{
  "veranda": { "description": "黄昏时分的走廊，木地板反着暖光" },
  "lin/normal": { "description": "林，常服，平静的神色" }
}
```

**键是素材 id，不是路径**——不带目录前缀，也不带扩展名。写成 `backgrounds/veranda.png`
不会报错，只是永远匹配不上，剧作家会以为这件素材没有描述。三种键形：

| 素材 | 键 |
| --- | --- |
| 背景 / 插图 / 音效 / 音乐 | 文件名去掉扩展名（`veranda`） |
| 立绘（整主体） | 立绘目录名（`lin`） |
| 立绘（单个差分） | `<立绘目录名>/<差分名>`（`lin/normal`） |

值里除了 `description` 还能写 `tags`、`title`、`framing`、`stature`、`anchor`
（立绘摆位），音乐还能写 `mood`、`scene`、`durationSec`、`loop`、`volume`。

背景、插图、音效、音乐按扩展名白名单收（png/jpg/jpeg/webp/mp3/ogg/wav/m4a）；立绘按
`sprites/<主体id>/` 分目录，每个目录里的第一个文件是找不到指定差分时的兜底。

### craft：写作参数

`play.json` 的 `craft` 段，三个字段都可不写（不写 = 引擎默认）：

| 字段 | 取值 | 默认 |
| --- | --- | --- |
| `beatLength` | `short` / `medium` / `long` | `medium` |
| `stopOptions` | `two` / `three` / `four` / `free` | `three` |
| `assets.background` | `library-first` / `library` / `generate` | `library-first` |
| `assets.cg` | `library` / `generate` / `off` | `generate` |
| `assets.sprite` | `generate` / `off` | `generate` |
| `assets.audio` | `library` / `off` | `library` |

`free` = 固定停在自由输入框，不给选项面板。

**素材来源四类目前只是意向**：这一阶段没有生图、也没有跨剧目素材库，四类素材一律只能用
手工放进 `assets/` 的那些。文风、禁忌、称呼习惯这类只能拿话说的口径写在
`memory/always/craft.md`，不在 `play.json` 里。

剧作家用 `set_craft` 工具改写这一段（只动 `craft` 一个键，文件里其余部分一个字节都不碰）。

## 两个预设

| id | 名字 | 干什么 |
| --- | --- | --- |
| `aivn-playwriter` | 剧作家 | 实时写 Stage DSL 的那位；它的输出被接进舞台 |
| `aivn-stagehand` | 搭台助手 | 备料：写设定、角色卡、创作口径（生图工具在下一阶段） |

两个预设的行集同构：指令文件发现（`AGENTS.md`）+ persona（就是那份提示词）+ 文件工具 +
文件检索。**两边都不装 shell**：剧作家写戏、读文件，没有要用 shell 做的事；搭台助手留着一行
但标 `disabled`（默认关，要放给自己在预设里开）。**预设里不会再列一行 `dsh-aivn`**——
宿主已经装了本插件，再来一行会把路由与事件订阅重复装一遍。

只有剧作家预设的会话会进舞台管线。搭台助手说什么都不上台。

## 上下文注入

剧作家的系统提示词由两部分拼成，中间夹着**每轮注入的剧目上下文**——剧作家不需要自己去
`ls` + `read` 一圈就知道这部戏的设定、有谁、有什么素材、现在演到哪儿：

| 段 | 内容 | 来源 |
| --- | --- | --- |
| 静态前半 | 身份、怎么工作、剧目在哪 | `persona` 的 `prefix` |
| 《剧本语言》 | 正文用哪种语言写 | `play.json` 的 `scriptLanguage` |
| 《剧目设定》 | 世界观前提 | `memory/always/premise.md` |
| 《角色表》 | 每张卡的正文 + 音色 + 立绘差分；只有立绘没有卡的主体单列一节 | `characters/*.md` |
| 《素材清单》 | 背景 / 音乐 / 音效 / 插图的 id + 描述；有音乐音效时附编排规则 | `assets/` + `assets/manifest.json` |
| 《写作参数》 | 每轮多长、给几条选项、素材来源，外加创作口径散文 | `play.json` 的 `craft` + `memory/always/craft.md` |
| 《记忆索引》 | 每张设定卡一行（分类 / 标题 / 路径 / 摘要） | `memory/index/**` |
| 静态后半 | 剧本格式、记忆卡怎么写、引入新角色、演出契约 | 插件注册的尾段 |
| 【状态】 | 场景、好感度、旗标、活跃剧情线（每轮变化的 user 角色快照） | `memory/always/state/*` |

这些段**只挂给剧作家的会话**（注册在 Agent scope 上），搭台助手看不到舞台契约。
快照按秒级 TTL 缓存：一个 turn 里的多个 step 读到同一份，跨轮自然重读。
改完文件不用做别的，下一轮就生效。

## Agent 工具

工具跟着预设装、跟着预设卸。剧作家的会话里装着这六个；搭台助手只装 `create_play`
（后面那五个是上台写字用的，搭台助手不上台）：

| 工具 | 谁有 | 作用 |
| --- | --- | --- |
| `create_play` | 两个预设 | 把工作区立成一座新剧目：写 `play.json`（`id`/`title`/`opening`/`characters`）、`memory/always/premise.md` 与 `characters/<id>.md`。已经有 `play.json` 就报错 |
| `beat_done` | 剧作家 | 交出这一轮的停止点：给 `options` = 选项面板；给 `placeholder` = 自由输入框；都不给 = 这一轮不设停止点。调用即是「本轮到此为止」 |
| `update_state` | 剧作家 | 改剧目的运行状态：`affinity`（角色好感度增量，整数、`\|Δ\|≤5`）、`flags`、`scene`、`threads`。写进 `memory/always/state/` |
| `get_readiness` | 剧作家 | 开演条件自查：`play.json`、故事前提、角色卡张数、立绘、背景、素材条数。**没有硬门槛**，缺什么都能开演 |
| `list_library` | 剧作家 | 列**这座剧目**的素材（`assets/` + `manifest.json`，外加 `characters/` 里的角色卡），可按类目与关键词过滤。本阶段没有跨剧目资源库，也没有生图 |
| `set_craft` | 剧作家 | 改写 `play.json` 的 `craft` 段，见上 |

## 斜杠命令

| 命令 | 作用 |
| --- | --- |
| `/new-play [剧目名]` | 把当前工作目录立成一座剧目。与 `create_play` 工具同一份实现，不花 LLM 往返 |

命令对所有会话可见（DSH 的命令不分预设），在哪个会话里敲就在那个会话的工作目录里落地。
它**只新建、从不覆盖**：已经有 `play.json` 就报错，其余骨架文件已存在就跳过并列进回执。

## 宿主 HTTP 面

浏览器半边只跟这几个口说话，全部按会话分频：

| 路由 | 说明 |
| --- | --- |
| `GET /aivn/health` | `{ ok: true, plugin: "dsh-aivn" }` |
| `GET /aivn/play?session=` | 这个会话的剧目：`{ dir, config }`；不是剧目就是 `{ dir: null }` |
| `GET /aivn/assets?session=` | `{ index, manifest }`；不是剧目 404 |
| `GET /aivn/asset?session=&path=` | 剧目内的一件素材。`path` 是**相对剧目根**的路径（如 `assets/backgrounds/x.png`），越界 400 |
| `GET /aivn/audio?session=&file=` | 一句台词的合成音频。文件名是 `sha1(音色id + 文本)`，内容寻址，所以可以长缓存 |
| `GET /aivn/stream?session=` | SSE，`event: frame`，data 是一帧 `StageFrame` JSON。连上先补推已经播过的帧，15 秒一次 keepalive |
| `POST /aivn/input { session, text, silent? }` | 玩家的一次输入，投给剧作家。`silent: true` = 不算玩家说的话（舞台的「继续」走这条），仍然会作为一条 user 消息投出去 |
| `POST /aivn/voice { session, enabled?, paused? }` | 语音总开关与客户端背压（播放层积压时暂停预取，省额度） |

`StageFrame` 有三种：

```ts
{ seq, kind: 'ir',   event: StageEvent }   // DSL 解析出的 IR
{ seq, kind: 'beat', state: 'start' | 'end' }  // 剧作家起笔 / 停笔
{ seq, kind: 'voice', lineSeq, phrase, state: 'started' | 'ready', url? }  // 语音
```

`voice` 帧的 `lineSeq` 是**那一行 `say_start` 帧的 seq**（不是本帧的 seq）——音频按它挂回台词行。
`started` 用来让喇叭亮起来（还在合成），`ready` 带上可播的 URL。台词与音频是并行出的：
文字先上屏，声音好了接上，接不上就静音演完（合成失败只打一行告警，不阻塞演出）。

**玩家输入不在这条流里由路由写入**：`/aivn/input` 只负责投递，落点只有一处——宿主监听
`agent/inbox/inserted`，于是 DSH 原生输入框与舞台的选肢卡走同一条路，既不会各写一条，也不会漏写。
引擎自己投的那些（追收束的内部指令、`silent` 的空推进）也走这条路，按 `message.id` 认出来摘掉，
不会变成一行玩家台词。

`/aivn/*` 是插件自己注册的前缀路由，**在 DSH 的浏览器信任栅栏之外**（那道栅栏只管 `/api`）：
`POST /aivn/input` 只收同源请求（`Origin` 与 `Host` 对不上就 403）且要求
`content-type: application/json`，免得跨站页面替玩家投一句输入。

## 开发

```bash
npm run build       # lib/index.js（宿主半边）+ lib/client.js（浏览器半边）
npm run typecheck
```

`lib/` 是**跟踪的构建产物**：DSH 直接加载它，所以改完 `src/` 必须重建再提交。

### e2e

```bash
dsh-e2e start --wait-ready     # 起一个最小实例（dsh-base + dsh-web-app + 本 worktree）
npm run e2e:stage              # 跑舞台套件「stage」
dsh-e2e stop
```

实例 home 在 `<worktree>/.dsh-e2e-home`，不进 git。两个本地前提（都在那个 home 里，不在仓库里）：

- **要有可用的 LLM provider**：home 的 `settings.yaml` 首次启动会被 import 后改名，
  此后冷启没有 provider。把 profile 的 `llm-*` 行补进
  `.dsh-e2e-home/profiles/web/cordis.patch.yml`。
- **默认模型挑一个这台机器出得去的**：地区受限的条目会直接
  `User location is not supported`。用 `medium` 之类。

套件做的事：在工作区根落一份临时剧目夹具 → 新建会话并选「剧作家」预设 → 发一句 →
断言「舞台」tab 挂载、导演工作栏不渲染、台词逐字上屏、停止点出来、点选项后原文被投给剧作家
并在时间线上落成一行回执、剧作家接着写完第二轮。截图落在 `e2e-artifacts/`。
