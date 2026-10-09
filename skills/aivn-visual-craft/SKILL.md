---
name: aivn-visual-craft
description: 视觉小说剧目的视觉规格与图单做法：画风锚点怎么定与写在哪、角色外形怎么锁死（头身比/五官/服装）、立绘差分布局与命名、背景与事件 CG 的画面约定、一套可直接粘贴给生图工具的提示词写法（有色细线、通透上色、破对称姿态、负面词黑名单），以及演出中缺图时当场补图与入库的做法（一键出图 / 候选挑图 / 外部图登记）。当用户要定剧目画风、要一份立绘图单、演出中缺图要当场补，或抱怨出图发油描边粗动作僵硬时使用。
---

# aivn-visual-craft（立绘与 CG 的画面规格）

这份速查解决剧目里**图该长什么样、怎么描述**。图可以来自用户手绘/购买，也可以来自生图工具——
两者要的都是同一件事：把画风、角色外形、这一张的画面说准。

## 一、先定画风锚点，写进 `memory/always/craft.md`

一部剧目一个画风基调，**没有默认值**：用户没说就问，定下来写进 `memory/always/craft.md`
（剧目的创作口径，剧作家与后续每一张图都照它）。四行足够：

```markdown
## 视觉基调
- 画风：日系商业 galgame 官方原画，Shiratamaco 软水彩质感
- 线条：极细有色描边（肌肤浅棕、发丝淡紫），无粗黑线
- 上色：通透平涂 + 微渐变，无塑料高光
- 光影：冬日冷调环境光，柔和景深
```

## 二、四条铁律（描述画面时最容易踩的坑）

### 1. 线条：要「有色极细线」，不要「描边」

- ❌ `bold lineart`、`ink outlines`、`black lines` → 出粗硬的美漫/赛璐珞黑边；
- ✅ `ultra-fine whisper-light colored outlines`（肌肤浅棕、发丝淡紫）、`feather-weight line weight`、`zero harsh black outlines`。

机理：指定有色细线，模型会把边缘与周围色块柔和融合，而不是画一圈黑边。

### 2. 皮相：「通透」靠次表面散射与微渐变，不靠高光

- ❌ `glossy skin`、`shiny`、`airbrushed gradients`、`plastic 3D` → 塑料人偶或涂了油；
- ✅ `clean translucent galgame coloring`、`soft subsurface scattering`、`intricate micro-gradients`。

### 3. 姿态：破对称、破正面直立

- ❌ `front view`、`standing straight`、`hands behind back` → 必然呆板；
- ✅ `relaxed contrapposto stance, body angled slightly three-quarters`、`head tilted a few degrees`、
  `weight on one leg`、`asymmetric arm placement`。

### 4. 负面词黑名单

`Masterpiece`、`ultra-detailed`、`8k`、`hyper-realistic` 这类泛用质量大词会诱发**写实渲染倾向**：
人体被拉长、肌肉成熟化，纯二次元平涂与半透光感全丢。**不要写它们。**

## 三、角色外形锚定（写在角色卡正文里）

不声明时模型会默认脑补 7~8 头身的成人比例。要维持年龄段气质就得**量化**，写进
`characters/<id>.md` 的正文——加一节「外形」，把这几项钉死：

```markdown
## 外形
- 头身比：strictly 5 to 5.5 heads tall, child-like anime proportions, narrow delicate shoulders
- 发：silky pale silver-white hair with faint lilac tint, twin tails, black "X" hairpin on bangs
- 眼：drooping half-closed sleepy magenta-pink eyes with soft dreamy reflections
- 常服：dark chocolate hooded capelet with white ruffle trim, red chest bow, layered frilly dress
```

四条规矩：

- **头身比必须写**（萌系 5~5.5、标准高中生 6~6.5），否则会成人化；
- 发色/瞳色/发饰/服装逐件写清——**这些是角色身份**，换差分时不能变；
- 卡上只写「外形」，不写「画风」：画风是剧目的，写在 `craft.md` 里；
- 同一主体的每一张立绘共用这份外形（图单里逐张带上它）。

## 四、画风 Cookbook（两个实测可用的锚点）

### Case 1 · まどそふと（Madosoft）／宇都宮つみれ

```text
2010s-2020s commercial galgame official art, Madosoft bishoujo style.
Clean translucent galgame coloring, delicate airbrushed skin shading with subtle soft sheen,
fresh transparent color palette, fine sharp hairline lineart, bright luminous pastel tones.
Natural relaxed pose in slight three-quarter view, head tilted slightly, weight on one leg.
No thick black outlines, no oily shine, no 3D shading.
```

### Case 2 · しらたまこ（Shiratamaco）／しらたま

```text
Pristine high-end Japanese visual novel official art, Shiratamaco soft watercolor aesthetic.
Soft-edge digital painting with barely visible micro-fine colored contours, feather-light line weight,
ultra-thin soft reddish-brown and pale lilac outlines, zero black ink lines.
Translucent milky porcelain skin with delicate rose undertones, intricate micro-gradients on layered sheer ruffles,
large drooping half-closed sleepy eyes with luminous violet-magenta gradient irises,
airy transparent digital watercolor shading, ethereal gentle lighting.
```

## 五、图单：一张图一条，四条都要写全

剧目的图分三类，落在三个目录，**文件名就是素材 id**：

| 类目 | 目录 | 用途 |
|---|---|---|
| 背景 | `assets/backgrounds/` | 剧本 `<scene bg="…">` 引用 |
| 事件 CG | `assets/cg/` | `<cg id="…">` 引用 |
| 立绘 | `assets/sprites/<主体id>/` | `<actor variant="…">` 引用；每个主体一个目录 |

一张图单写这四条：

1. **id**（英文小写、有语义：`school_gate_dusk`、`rooftop_night`，别用 `bg1`）；
2. **画面**：谁、在哪、什么时间天气、什么动作；
3. **用途**：被剧本哪一类指令引用、什么场合播；
4. **提示词**（可选但有就用）：按下面的公式拼好，用户可以直接粘贴给任何生图工具。

### 提示词拼装公式

```text
[剧目画风锚点] + [该主体的外形锚定] + [这一张的动作/表情/差分] + [环境与光影] + [去油去粗线后缀]
```

例（立绘 `shiro/neutral`）：

```text
Pristine high-end Japanese visual novel official art, Shiratamaco soft watercolor aesthetic.
5.5 heads tall child-like anime proportions, silky pale silver-white hair, twin tails with white ribbon bow.
Standing relaxed in a slight three-quarter view, calm gentle expression, hands loosely clasped in front.
Soft indoor daylight from a window on the left, quiet atmosphere, clean uncluttered background.
Ultra-fine whisper-light colored outlines, clean translucent coloring, no thick black outlines, no oily shine.
```

## 六、差分布局（同一主体怎么排）

- 先有 `neutral`（站立、平静、正面偏 3/4）——它是这个主体的基准，没有它别的差分容易漂；
- 表情差分按**剧情真的会用到**加：`smile` / `sad` / `angry` / `surprise` / `blush`；
- 状态差分按剧目需要加：`damaged`（机甲受损）、`puffed`（猫炸毛）——**人以外的主体同样走差分**，
  引擎里没有「人的表情」与「非人的状态」之分；
- 名字用小写英文，别用中文或空格（剧本里要手写这个 id）；
- 差分之间**只有要求变化的部分不同**：外形锚定必须逐张一致，否则同一角色看起来像两个人；
- 立绘是**透明底**、全身、脚在画面底边；取景与在台上占多大由素材表的声明定，不用在剧本里调。

## 七、出图与入库（`generate_asset` / `generate_image` / `cut` / `import_asset`）

`cut` 与 `import_asset` **不依赖生图后端、始终可用**；`generate_asset` 与 `generate_image` **只在剧目配了生图后端时才存在**——
没配就别调它们，改走「外部来源」（用户给的图 / 免费源 / 别的工具出的图）。先按当前有没有生图后端选路：

- **配了生图后端**：两条路，按「要不要让用户挑」选：
  - **一键（`generate_asset`）**：出图 +（立绘）自动抠底 + 登记，一次到位。给 `kind`（background / cg / sprite）；
    立绘再给 `spriteId` + `variant`，画幅跟着 `framing`（full / half / square）走。回执给最终路径，这一轮就能引用。
    剧目后缀（色键底、身份锁、差分自动垫 neutral）只在**这条路**里由引擎自动拼——prompt 里别再写抠底与画幅。
  - **原子三件套（要挑候选 / 图来自别处 / 要重抠）**：
    - `generate_image`：**纯生成**，只把 prompt 变成一张候选图（回执给图片路径与预览）。它不绑剧目目标、
      不做色键底、不抠底——**通用出图，画幅用 `aspectRatio`（默认 16:9）**。要立绘就在这里自己把纯色底、
      平涂、景别写进 prompt。
    - `cut`：把纯色底候选抠成透明 PNG（`source` + 可选调参）；抠脏了对**同一张**重调再跑，别重新出图。
    - `import_asset`：把一张图登记成素材（`source` 给剧目内路径 / 网址，`kind` 必填；立绘登记**已抠好的透明 PNG**，
      再给 `spriteId` / `variant` / `framing` / `stature` / `description`；`original` 留抠底前原片以便重抠）。
- **没配生图后端**：把图单交给用户（或从免费源找来），用 `import_asset` 登记——它写 `assets/`、补素材表描述、
  记台账；**立绘要透明底**，先 `cut(source=…)` 抠成透明 PNG，再登记那张。

**候选流程**（定妆照）：`generate_image` 同一目标多调几次（prompt 各不同；定妆照都用 variant=neutral），
预览一行一行贴给用户；他点头的那张再落位——背景 / 插图 `import_asset(kind=…, name=…)`，
立绘 `cut` 后再 `import_asset(kind="sprite", spriteId=…, variant=…)`。**没被挑中的候选不会在素材表里留下痕迹。**

- **外部来源**：别的工具出的图、下载的图（剧目内相对路径或 http(s) 网址）直接 `import_asset`；
  立绘要透明底就先 `cut`。
- **定妆照先定**：neutral 是这个主体所有差分的身份基准（差分自动垫它）。还没有入库的 neutral 就出不了别的差分
  （`generate_asset` 会自动先补一张）。
- **一张一张来，一批发出去**：一次调用只出一张图（`generate_asset` 的 `variant` 也一样，要几个差分就分几次调用）。
  要 3 张候选就在**同一批**里调 3 次——同一批会并发跑，分几轮串着调等于把 70–140 秒的等待乘上份数。
- **立绘取景与体量走参数**：`framing`（full / half / square）决定画幅与台上站位，同一主体保持同一档；
  `stature`（small / normal / large / huge）只管台上多大。人物 full 或 half，猫与道具 square，机甲 huge。
- **出完贴给用户看**（回执里那行 markdown 图片）；抠脏了用 `cut` 调参重抠（画面不变、不烧配额），别重新出图。

## 八、演出中缺图（剧作家在演出中）

剧作家写剧本时遇到「这一轮真要引用的背景 / 插图 / 立绘还没有」，当场补。**只有在剧目配了生图后端时**才走生图；
没配就换一段能演的戏、用旁白交代，或让玩家手工放图进 `assets/`。

- **出图同步**（70–140 秒，这一轮就停在那里）；一轮预算是 240 秒，**一次出图占掉一半以上**——
  只为这一轮真要引用的东西出，别为「以后可能用得上」出，也别一轮里连出好几张。
- **默认走 `generate_asset`（一键）**：出图 +（立绘）自动抠底 + 登记，回执给最终路径——**回执回来之后**
  那一行剧本才引用得到它。
  - 背景 / 插图：`generate_asset(kind="background", name="cafe", prompt="…")`；
    立绘：`generate_asset(kind="sprite", spriteId="xiaoyu", variant="smile", framing="full", prompt="…")`。
  - 立绘非 neutral 的差分自动垫该主体的 neutral 定妆照；那个主体**一张立绘都没有**时会先自动补一张 neutral
    再出这张差分（回执里两张都给你，记得两张都跟用户交代）；但它**已有别的差分、只缺 neutral** 时会被拒绝
    （先单独要一张 neutral 让用户过目）。人物用 framing=full 或 half，猫与道具用 square。
- **先看 A 区的《素材清单》与《角色表》**：已有同名或现成的同类素材就别重出——同名时引擎会跳过并告诉你（不覆盖旧图）。
- **要精细控制时**用原子三件套（`generate_image` / `cut` / `import_asset`）：要让用户挑候选就 `generate_image`
  出候选、贴预览、点头再落位；图来自别处（用户给的、下载的、别的模型出的）直接用 `import_asset`，立绘要透明底先 `cut`。

## 九、交付前自查

- 画风锚点已写进 `craft.md`，且这一批图都用同一份？
- 每个主体的外形锚定逐张一致（发色、瞳色、发饰、服装没变）？
- 文件名是合法素材 id（英文小写），立绘都在 `assets/sprites/<主体id>/` 下？
- 每张图都写了描述进 `assets/manifest.json`（画面内容、情绪、适用场景）——剧作家挑图全靠它，
  文件名看不出画面？
