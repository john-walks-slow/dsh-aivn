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

本插件目前**没有可配的项**（`config: {}`）：两个预设、六个工具、一条 `/new-play` 命令、
`/aivn` 路由都是固定的。

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
  "backgrounds/veranda.png": { "description": "黄昏时分的走廊，木地板反着暖光" },
  "sprites/lin/normal.png": { "description": "林，常服，平静的神色" }
}
```

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

两个预设的行集同构：指令文件发现（`AGENTS.md`）+ persona（就是那份提示词）+
shell + 文件工具 + 文件检索。**预设里不会再列一行 `dsh-aivn`**——宿主已经装了本插件，
再来一行会把路由与事件订阅重复装一遍。

只有剧作家预设的会话会进舞台管线。搭台助手说什么都不上台。

## Agent 工具

工具跟着预设装、跟着预设卸。剧作家的会话里装着这六个；搭台助手只装 `create_play`
（后面那五个是上台写字用的，搭台助手不上台）：

| 工具 | 谁有 | 作用 |
| --- | --- | --- |
| `create_play` | 两个预设 | 把工作区立成一座新剧目：写 `play.json`（`id`/`title`/`opening`/`characters`）、`memory/always/premise.md` 与 `characters/<id>.md`。已经有 `play.json` 就报错 |
| `beat_done` | 剧作家 | 交出这一轮的停止点：给 `options` = 选项面板；给 `placeholder` = 自由输入框；都不给 = 这一轮不设停止点。调用即是「本轮到此为止」 |
| `update_state` | 剧作家 | 改剧目的运行状态：`affinity`（角色好感度增量，整数、`\|Δ\|≤5`）、`flags`、`scene`、`threads`。写进 `memory/always/state/` |
| `get_readiness` | 剧作家 | 开演条件自查：`play.json`、故事前提、角色卡张数、立绘、背景、素材条数。**没有硬门槛**，缺什么都能开演 |
| `list_library` | 剧作家 | 列本机素材资源库（`~/…/library/`）里的条目，可按类目与关键词过滤 |
| `set_craft` | 剧作家 | 改写 `play.json` 的 `craft` 段，见上 |

## 斜杠命令

| 命令 | 作用 |
| --- | --- |
| `/new-play [剧目名]` | 把当前工作目录立成一座剧目。与 `create_play` 工具同一份实现，不花 LLM 往返 |

## 宿主 HTTP 面

浏览器半边只跟这几个口说话，全部按会话分频：

| 路由 | 说明 |
| --- | --- |
| `GET /aivn/health` | `{ ok: true, plugin: "dsh-aivn" }` |
| `GET /aivn/play?session=` | 这个会话的剧目：`{ dir, config }`；不是剧目就是 `{ dir: null }` |
| `GET /aivn/assets?session=` | `{ index, manifest }`；不是剧目 404 |
| `GET /aivn/asset?session=&path=` | 剧目内的一件素材。`path` 是**相对剧目根**的路径（如 `assets/backgrounds/x.png`），越界 400 |
| `GET /aivn/stream?session=` | SSE，`event: ir`，data 是一帧 `StageFrame` JSON。连上先补推已经播过的帧，15 秒一次 keepalive |
| `POST /aivn/input { session, text }` | 玩家的一次输入，投给剧作家 |

`StageFrame` 有两种：

```ts
{ seq, kind: 'ir',   event: StageEvent }   // DSL 解析出的 IR
{ seq, kind: 'beat', state: 'start' | 'end' }  // 剧作家起笔 / 停笔
```

**玩家输入不在这条流里由路由写入**：`/aivn/input` 只负责投递，落点只有一处——宿主监听
`agent/inbox/inserted`，于是 DSH 原生输入框与舞台的选肢卡走同一条路，既不会各写一条，也不会漏写。

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
