---
name: galgame-visual-craft
description: 视觉小说剧目的视觉规格与图单做法：画风锚点怎么定与写在哪、角色外形怎么锁死（头身比/五官/服装）、立绘差分布局与命名、背景与事件 CG 的画面约定，以及一套可直接粘贴给生图工具的提示词写法（有色细线、通透上色、破对称姿态、负面词黑名单）。当用户要定剧目画风、要一份立绘图单、或抱怨出图发油描边粗动作僵硬时使用。
---

# galgame-visual-craft（立绘与 CG 的画面规格）

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

## 七、用 `generate_image` 出图（配了生图后端时）

- **两步走**：`generate_image` 只出**草稿**（回执给 draftId 与候选图路径），把预览贴给用户挑，
  他点头的那张才 `commit_asset` 入库。**没被挑中的候选不会在素材表里留下痕迹**。
- **定妆照先定、一次出 3 张候选**：neutral 是这个主体所有差分的身份基准（差分自动垫它）。
  还没有入库的 neutral 就出不了别的差分。
- **一张一张来**：一次调用只出一张图。要 3 张候选就在同一批里调 3 次（并行）。
- **立绘取景与体量走参数**：`framing`（full / half / square）决定画幅与台上站位，同一主体保持同一档；
  `stature`（small / normal / large / huge）只管台上多大。人物 full 或 half，猫与道具 square，机甲 huge。
- **prompt 里别写抠底与画幅**：引擎自动拼色键底、平涂与留白后缀，重复写会打架。
- **出完贴给用户看**（回执里那行 markdown 图片）；抠底是自动的，用户说脏边就用 `recut_sprite`
  原地重抠（画面一个像素不变），别重新出图。

## 八、交付前自查

- 画风锚点已写进 `craft.md`，且这一批图都用同一份？
- 每个主体的外形锚定逐张一致（发色、瞳色、发饰、服装没变）？
- 文件名是合法素材 id（英文小写），立绘都在 `assets/sprites/<主体id>/` 下？
- 每张图都写了描述进 `assets/manifest.json`（画面内容、情绪、适用场景）——剧作家挑图全靠它，
  文件名看不出画面？
