/**
 * AIVN 工具目录 —— 工具面的**单一真相源**。
 *
 * 装配（`preset-tools.ts`）、README 的工具表、提示词里的工具名、e2e 的工具面断言都从这里派生，
 * 免得「提示词说一套、实际装另一套」。每条只描述「哪一类 Agent、配了什么才算装得上」，
 * 具体的工具实现由 `preset-tools.ts` 的 builder 表对应（id 即工具 name）。
 *
 * 两个预设默认装**同一套**；按预设禁用走插件配置（`playwriterDisabledTools` /
 * `stagehandDisabledTools`），不靠「两个分支碰巧相同」。
 */

/** 一项工具「配了才算」的依赖。 */
export type ToolGate =
	/** 无需配置，永远装。 */
	| 'none'
	/** 生图后端（image.baseUrl + image.model）。 */
	| 'image'
	/** 音乐后端（music.baseUrl + music.model）。 */
	| 'music'
	/** Fish key（TTS 与音色库共用）。 */
	| 'tts'
	/** Exa key。 */
	| 'search';

export interface ToolSpec {
	/** 工具名，也是 builder 表的键。 */
	readonly id: string;
	/** 一句话职责（README 与提示词引用同一份）。 */
	readonly job: string;
	/** 副作用（审计用：哪些工具会写盘 / 发外部请求 / 改舞台）。 */
	readonly sideEffects: string;
	readonly gate: ToolGate;
}

export const TOOL_CATALOG: readonly ToolSpec[] = [
	{
		id: 'validate_play',
		job: '报告剧目健康：play.json 读不读得出来、craft 取值对不对、文件↔素材表↔台账是否对得上',
		sideEffects: '只读',
		gate: 'none',
	},
	{
		id: 'set_stage_style',
		job: '改舞台皮肤：写 theme.json 并推给同剧目已打开的舞台',
		sideEffects: '写 theme.json、向舞台广播',
		gate: 'none',
	},
	{
		id: 'generate_image',
		job: '生成一张图（候选）：prompt → 图片文件，不绑定剧目目标',
		sideEffects: '调生图后端、写候选区',
		gate: 'image',
	},
	{
		id: 'cut',
		job: '抠底：纯色底图 → 透明 PNG（只写输出，不改源图）',
		sideEffects: '图像处理（sharp）、写输出文件',
		gate: 'none',
	},
	{
		id: 'import_asset',
		job: '登记：把一张图落成剧目素材（写 assets/、补素材表、记台账；不抠底）',
		sideEffects: '写 assets/ + 素材表 + 台账',
		gate: 'none',
	},
	{
		id: 'generate_asset',
		job: '一键：生成 +（立绘）抠底 + 登记，一条龙',
		sideEffects: '调生图后端、写 assets/ + 素材表 + 台账',
		gate: 'image',
	},
	{
		id: 'generate_bgm',
		job: '生成一首 BGM 并落库',
		sideEffects: '调音乐后端、写 assets/bgm/ + 素材表 + 台账',
		gate: 'music',
	},
	{
		id: 'list_voices',
		job: '查 Fish 音色库挑音色',
		sideEffects: '外部 API',
		gate: 'tts',
	},
	{
		id: 'web_search',
		job: '联网检索（结果与正文一次拿回）',
		sideEffects: '外部 API',
		gate: 'search',
	},
];

export const TOOL_IDS: readonly string[] = TOOL_CATALOG.map((tool) => tool.id);

/** 这一项在当前能力下面是否装得上（不看按预设禁用）。 */
export function gateSatisfied(
	spec: ToolSpec,
	caps: { image: boolean; music: boolean; tts: boolean; search: boolean },
): boolean {
	switch (spec.gate) {
		case 'none':
			return true;
		case 'image':
			return caps.image;
		case 'music':
			return caps.music;
		case 'tts':
			return caps.tts;
		case 'search':
			return caps.search;
	}
}
