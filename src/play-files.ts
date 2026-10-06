/**
 * 剧目文件 —— 这座剧目由哪些文件构成、每份写什么、字段什么形状。
 *
 * 「工作区 = 剧目」意味着建一座剧目就是**写文件**：没有注册表、没有生成器，也没有专门的
 * 「建剧目」工具。这一章是**两个预设共用的一段文本**（搭台助手拿它备料，剧作家落在空目录里时
 * 也靠它把剧目立起来）——同一件事只写一遍：以前两个提示词各抄了一份目录骨架，改一处漏一处。
 *
 * 字段表照 `@aivn/core` 的 `parsePlayConfig` 写：`id` / `title` 必填、其余可缺省，白名单外的
 * 枚举值会被静默按缺省处理——所以这里只教「手写必须写对的那几个」，其余指给专门的入口。
 */
export const PLAY_FILES = `# 剧目文件

你的工作目录就是这座剧目的根目录（{{cwd}}）：文件工具（read / write / edit / glob / grep）直接对着它用，
下面写的路径都是相对它的。**没有注册表，也没有生成器**——写文件就是建剧目。

- \`play.json\` —— 身份证：剧目名、开局指令、语言、封面；
- \`memory/always/premise.md\` —— 世界观前提（唯一真相源，剧作家每轮都读）；
- \`memory/always/craft.md\` —— 创作口径：文风、禁忌、称呼习惯；
- \`memory/index/<层>/<名字>.md\` —— 设定记忆卡（地点、组织、规则这类），层是自定的分组名；
- \`characters/<id>.md\` —— 角色卡；
- \`assets/backgrounds/ | cg/ | sprites/<主体id>/ | bgm/ | sfx/\` —— 素材本身；
- \`assets/manifest.json\` —— 素材描述表（键是素材 id，值是描述）。

## play.json

\`{"id": "…", "title": "…"}\` 这两个必填，其余缺省即可：

| 字段 | 写什么 |
|---|---|
| \`id\` | 剧目 id：字母或数字开头，不含空白与路径分隔符——素材寻址用它。写工作目录名就行 |
| \`title\` | 剧目名，显示在剧目列表与舞台标题上 |
| \`opening\` | 开局那条 user 消息的正文：玩家在这条会话里说第一句话时，它与那句话一起发给剧作家。缺省「（游戏开始，请演出第一轮）」 |
| \`characters\` | \`[{"id": "lin", "name": "林"}]\`：主要角色表，只给台词条挂名字，不影响演出 |
| \`scriptLanguage\` | 剧本语言（ISO 639-1，如 \`ja\`）：写了就一律用它写正文与选项；缺省跟着玩家输入走 |
| \`initialScene\` | 舞台标题上的场景名 |

写作参数（\`craft\`）、生图档位（\`image\`）、两个 agent 的设置（\`agents\`）各有专门入口，别手写。

**动笔前先 read 一眼**：\`play.json\` 已经在了 = 这里已经是一座剧目，那份身份是别人写的。改它一律用
edit 定点改，别整篇 write 一份——手滑丢掉一个键，剧目就打不开了。

## 角色卡 characters/<id>.md

frontmatter 三个键 + 正文人设（年龄、身份、关系、说话方式、在意什么）：

\`\`\`markdown
---
name: 林
sprite: lin
voice: <音色 id>
---

林，二十七岁，旧校舍的看门人。说话短，先做事后解释。
\`\`\`

\`sprite\` 是立绘目录名（缺省与 id 同名），\`voice\` 是音色 id（没有音色就整行不写）。
名字里有冒号、井号或以连字符开头时加引号（\`name: "小樱: 二代目"\`）——直接写会被 YAML 当成别的意思。
**玩家扮演的主角固定用 id \`protagonist\`**（\`characters/protagonist.md\`）：人设要留出让玩家代入的余地，
别把他的性格写死。

## 素材与描述表 assets/

素材按类目放，**路径的每一段都是剧本里引用的名字**：

- \`assets/backgrounds/<id>.<ext>\` / \`assets/cg/<id>.<ext>\` —— \`<scene bg="id">\` / \`<cg id="id">\`；
- \`assets/sprites/<主体id>/<差分名>.png\` —— \`<actor id="主体id" variant="差分名">\`；主体 id 就是角色卡
  那个 id（卡上写了 \`sprite:\` 时以卡上的为准），\`neutral\` 是这套差分的身份基准；
- \`assets/bgm/<id>.<ext>\` / \`assets/sfx/<id>.<ext>\` —— \`<scene bgm="id">\` / \`<sfx src="id">\`。

\`assets/manifest.json\` 是**描述表**，键是素材 id、值是它的说明（\`title\` / \`description\` / \`tags\` /
\`mood\` / \`scene\` / \`framing\` / \`stature\`）。**要挑素材就 \`read\` 它**——文件名看不出画面，
描述才看得出（这也是全剧目唯一一处「有什么素材、各自画的是什么」的清单）。立绘多一层：
整个主体共用的字段（\`framing\` / \`stature\` / \`title\`）挂在**主体 id** 上，
某一条差分的取景与主体不同时才另写一条 \`<主体id>/<差分名>\`。

\`description\` / \`tags\` / \`mood\` / \`scene\` 可以手写（新素材补一句适用场景就是写它）；
\`framing\` / \`stature\` 决定画幅与台上站位，交给出图工具写，别手改。`;
