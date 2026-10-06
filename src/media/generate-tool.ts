/**
 * `generate_image` 的共享部分：参数 schema、写 prompt 的硬约束、两种回执的组装。
 *
 * 两个角色**同一份 schema、同一份实现**，只有等待策略与 description 不同（AIVN `imageTool.ts`
 * 的同一约定）：
 * - 搭台助手：只出草稿（一次几张候选，用户挑一张），入库另走 `commit_asset`；
 * - 剧作家：同步等图、出图即入库（一次调用给最终 id）——插件没有「回合之外」的注入通道，
 *   所以不学 AIVN 的后台排产（那要靠到货广播）。
 *
 * 抠底参数不在这里：填它得先看过成图，而出图那一刻没人看过图。改抠底是看到脏边之后的事，
 * 走单独的 `recut_sprite`。
 */
import { COMMON_SPRITE_VARIANTS } from '@aivn/core';
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import type { AssetTarget, DraftedAsset, GeneratedAsset } from './assets';

/** 参数名与语义逐条对齐 AIVN 的 `generateImageParams`（去掉已下线的 `referenceCharacters` 别名）。 */
export const IMAGE_PARAMETERS = {
	kind: {
		type: 'string',
		enum: ['background', 'cg', 'sprite'],
		required: true,
		description: '要出什么：背景 background / 事件插图 cg / 立绘 sprite。',
	},
	name: {
		type: 'string',
		description:
			'背景与插图的素材 id（剧本里 `<scene bg="…">` / `<cg id="…">` 引用的就是它）。kind=background/cg 时必填。',
	},
	spriteId: {
		type: 'string',
		description:
			'立绘的主体 id：`assets/sprites/<spriteId>/` 的目录名，也是 `<actor id>` / `<say id>` 引用的名字。' +
			'**没有角色卡也能出**（机甲、道具、猫、只出现一轮的路人都这样）。kind=sprite 时必填。',
	},
	variant: {
		type: 'string',
		description:
			`立绘差分名（${COMMON_SPRITE_VARIANTS.join(' / ')}，也可以自己按状态取名）。不给按 neutral。**要几个差分就分几次调用**，` +
			'每张写自己的 prompt（一批共用一个 prompt 只会出成同一张图）。非人主体同样用这个槽位，名字按状态取。',
	},
	references: {
		type: 'array',
		items: { type: 'string', description: '主体 id 或剧目内相对路径' },
		description:
			'垫图：主体 id（自动用它的中性立绘）或剧目内相对路径（如 assets/backgrounds/ref.png），最多 6 张，' +
			'顺序就是提示词里「第一张、第二张」的顺序。**非 neutral 的立绘不用给**——身份基准恒为该主体的 neutral。',
	},
	framing: {
		type: 'string',
		enum: ['full', 'half', 'square'],
		description:
			'立绘取景（只对 kind=sprite 生效）：full 全身（人物常规）/ half 半身到腰 / square 方形（猫、道具这类非人主体）。' +
			'它决定画幅与舞台站位，同一主体保持同一档；不给沿用素材表里的声明，再不给是全身。',
	},
	stature: {
		type: 'string',
		enum: ['small', 'normal', 'large', 'huge'],
		description:
			'立绘体量（只对 kind=sprite 生效）：small 猫与小道具 / normal 与人同高 / large 高一档 / huge 机甲巨物。' +
			'它只管台上多大，与取景是两件事；不给按 normal。',
	},
	title: {
		type: 'string',
		description: '立绘标题（只对 kind=sprite 生效）：没有角色卡时，舞台名牌显示它。',
	},
	style: {
		type: 'string',
		description: '画风锚点（可选），如「厚涂写实电影感」「赛璐璐动画」。不给就不预设风格，按画面描述走。',
	},
	prompt: {
		type: 'string',
		required: true,
		description: '英文出图提示词，只描述画面本身（不写负面词、不写画幅与抠底要求）。',
	},
} as const;

/**
 * 写 prompt 的硬约束，两个角色共享。
 *
 * 放在这份共享模块里而不是各自的 persona：它是**工具契约**（画面怎么写才出得来那个主体），
 * 流程与验收（什么时候发起、出完怎么核对、失败怎么转述）才归各自的提示词。
 */
export const PROMPT_RULES = [
	'**写 prompt**：',
	'- 画面里出现一个主体时，**逐条带上它的外貌**（角色卡上写的、或用户给的设定）——发色、发型与长度、发饰、瞳色、',
	'  脸上记号、上衣、领巾、裙、袜、鞋、手里拿着的东西，一条一条写进去；设定没写的不要自己发明。',
	'- 只写「a girl with pink hair」这种泛化描述，等于把衣服和配件交给模型默认，出来的人不是设定的那个人。',
	'- 非 neutral 的立绘会自动垫上该主体的 neutral 定妆照，**垫图就是身份基准**：prompt 里只写这次要改的东西',
	'  （表情、姿势、角度），别重新描述长相——重写一遍会和垫图打架。',
	'- **姿势、机位、景别都要显式写**：只说「她站在天台上」出来是对称站立的正面像；要写清机位（平视/俯视/仰视/侧身回眸）、',
	'  动作（坐/走/倚靠/回头）与景别（full body / medium shot / close-up）。不写景别，袜子鞋子这类细节直接出框。',
	'- 立绘的抠底构图与画风后缀（单一纯色底、平涂、哪里要留白）由引擎自动拼在 prompt 末尾，别重复也别改写；',
	'  主体配色与默认的纯绿底撞色时，才在 prompt 里点名换一个纯色底。背景与插图没有这层后缀，构图要自己写。',
].join('\n');

/** 垫图规则（两个角色都拿得到 `references`，所以它属于共享契约）。 */
export const REFERENCE_RULE = [
	'**垫图**：',
	'- 定妆照（neutral）可以垫外部参考图——用户拿一张既有角色图来定妆走的就是这条；',
	'- CG 与背景可以垫主体 id 或剧目内路径，把要出场的角色或想要的画面垫进去；',
	'- 非 neutral 的立绘**不要给 references**：身份基准恒为该主体已入库的 neutral（换基准会与既有差分不是同一个人）。',
].join('\n');

export const textOutput = {
	schema: { type: 'string' } as const,
	render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
};

export interface ImageArgs {
	kind: 'background' | 'cg' | 'sprite';
	name?: string;
	spriteId?: string;
	variant?: string;
	references?: string[];
	framing?: 'full' | 'half' | 'square';
	stature?: 'small' | 'normal' | 'large' | 'huge';
	title?: string;
	style?: string;
	prompt: string;
}

/** 参数 → 出图目标。`style` 按 AIVN 的口径拼在 prompt 前面（它是画风锚点，不是画面内容）。 */
export function toTarget(args: ImageArgs): { target: AssetTarget; prompt: string } {
	const prompt = args.style?.trim() ? `${args.style.trim()}, ${args.prompt.trim()}` : args.prompt.trim();
	return {
		target: {
			kind: args.kind,
			...(args.name?.trim() ? { name: args.name.trim() } : {}),
			...(args.spriteId?.trim() ? { spriteId: args.spriteId.trim() } : {}),
			...(args.variant?.trim() ? { variant: args.variant.trim() } : {}),
			...(args.framing ? { framing: args.framing } : {}),
			...(args.stature ? { stature: args.stature } : {}),
			...(args.title?.trim() ? { title: args.title.trim() } : {}),
			...(args.references?.length ? { references: args.references } : {}),
		},
		prompt,
	};
}

/** 立绘的抠底体检：脏边时不至于让模型以为是画得不好（覆盖率过低 = 底色判错）。 */
function cutoutNote(asset: { cutout?: { coverage: number; figureHeight: number } }): string {
	if (!asset.cutout) return '';
	const { coverage, figureHeight } = asset.cutout;
	const lines = [`抠底：前景占比 ${(coverage * 100).toFixed(1)}%，人物高 ${figureHeight}px。`];
	if (coverage < 0.03) lines.push('前景占比过低，可能整张被判成了底色——换一个不与主体撞色的底色重出。');
	return `\n${lines.join('')}`;
}

/** 搭台助手：只出草稿，回执里给 draftId 与预览（贴给用户挑）。 */
export function draftResult(draft: DraftedAsset): string {
	const label = draft.kind === 'sprite' ? '立绘草稿' : draft.kind === 'background' ? '背景草稿' : '插图草稿';
	return [
		`${label}已出：\`${draft.draftId}\`（${draft.aspect}）`,
		`![候选图](${draft.absPath})`,
		'**草稿还不是素材**：它在 media-cache/drafts/ 下，素材表里没有它。',
		`采用它调 \`commit_asset(draftId="${draft.draftId}")\`；要换一张就再出一次候选。`,
		'把上面那行 markdown 图片**贴进你的回复**给用户看（独占一段），他挑中哪张你再 commit 哪张。',
	]
		.join('\n')
		.concat(cutoutNote(draft));
}

/** 剧作家：同步出图即入库，回执里给最终 id 与图片。 */
export function generatedResult(asset: GeneratedAsset): string {
	const label = asset.kind === 'sprite' ? '立绘' : asset.kind === 'background' ? '背景' : asset.kind === 'cg' ? '插图' : '素材';
	return [
		`${label}已生成并入库：\`${asset.path}\`${asset.replaced ? '（覆盖了同名旧素材）' : ''}`,
		`![${asset.kind}](${asset.absPath})`,
		'这一轮就能引用它。',
	]
		.join('\n')
		.concat(cutoutNote(asset));
}
