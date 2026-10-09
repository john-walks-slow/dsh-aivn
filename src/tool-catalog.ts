/**
 * AIVN 工具目录 —— 工具面的**单一真相源**。
 *
 * 装配（`preset-tools.ts`）、README 的工具表、提示词里的工具名、e2e 的工具面断言都从这里派生，
 * 免得「提示词说一套、实际装另一套」。每条只描述「哪一类 Agent、配了什么才算装得上」，
 * 具体的工具实现由 `preset-tools.ts` 的 builder 表对应（id 即工具 name）。
 *
 * 两个预设默认装**同一套**；按预设禁用走插件配置（`playwriterDisabledTools` /
 * `stagehandDisabledTools`），不靠「两个分支碰巧相同」。
 *
 * **并发**也在表里（`concurrent`）：只有声明了 `isConcurrencySafe` 的工具才会被 DSH 放进并行池，
 * 缺省即独占。`withConcurrency` 就是「声明 → 真定义」的那一步，装配时调（`preset-tools.ts`）。
 */
import type { ToolDefinition } from '@deepseek-ai/dsh-tools';

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
	/**
	 * 是否能与同一批的兄弟姐妹**并行**跑。
	 *
	 * DSH 只把声明了 `isConcurrencySafe` 的工具放进并行池，不声明即独占——独占调用在所属的一步里
	 * 形成栅栏、逐个串行（见 `dsh-agent-loop` 的 `tool-calls` 调度器与 `dsh-tools` 的 `executionMode`）。
	 * 所以「同一批里并发跑」只在**工具定义**上说了算，提示词里写多少遍都不算数：`preset-tools`
	 * 按这一格给真的工具挂上 `isConcurrencySafe`。
	 *
	 * 声明并发要满足 dsh-tools 的契约：**不改父级（宿主）状态**；共享状态的并发派发要么可交换、
	 * 要么 fail closed。本插件的媒体层正是按这条建的——素材表与台账的读-改-写按文件路径串行
	 * （`media/storage.ts` 的 `withFileLock`）、同一最终目标的出图按 inflight 去重
	 * （`media/generate.ts`）、候选图落各自独立的草稿目录（随机 UUID）。
	 */
	readonly concurrent: boolean;
	readonly gate: ToolGate;
}

export const TOOL_CATALOG: readonly ToolSpec[] = [
	{
		id: 'validate_play',
		job: '报告剧目健康：play.json 读不读得出来、craft 取值对不对、文件↔素材表↔台账是否对得上',
		sideEffects: '只读',
		concurrent: true,
		gate: 'none',
	},
	{
		id: 'set_stage_style',
		job: '改舞台皮肤：写 theme.json 并推给同剧目已打开的舞台',
		sideEffects: '写 theme.json、向舞台广播',
		// 读-改-写 theme.json 且没有加锁：并发会丢更新，故独占。
		concurrent: false,
		gate: 'none',
	},
	{
		id: 'generate_image',
		job: '生成一张图（候选）：prompt → 图片文件，不绑定剧目目标',
		sideEffects: '调生图后端、写候选区',
		concurrent: true,
		gate: 'image',
	},
	{
		id: 'cut',
		job: '抠底：纯色底图 → 透明 PNG（只写输出，不改源图）',
		sideEffects: '图像处理（sharp）、写输出文件',
		concurrent: true,
		gate: 'none',
	},
	{
		id: 'import_asset',
		job: '登记：把一张图落成剧目素材（写 assets/、补素材表、记台账；不抠底）',
		sideEffects: '写 assets/ + 素材表 + 台账',
		concurrent: true,
		gate: 'none',
	},
	{
		id: 'generate_asset',
		job: '一键：生成 +（立绘）抠底 + 登记，一条龙',
		sideEffects: '调生图后端、写 assets/ + 素材表 + 台账',
		concurrent: true,
		gate: 'image',
	},
	{
		id: 'generate_bgm',
		job: '生成一首 BGM 并落库',
		sideEffects: '调音乐后端、写 assets/bgm/ + 素材表 + 台账',
		concurrent: true,
		gate: 'music',
	},
	{
		id: 'list_voices',
		job: '查 Fish 音色库挑音色',
		sideEffects: '外部 API',
		concurrent: true,
		gate: 'tts',
	},
	{
		id: 'web_search',
		job: '联网检索（结果与正文一次拿回）',
		sideEffects: '外部 API',
		concurrent: true,
		gate: 'search',
	},
];

export const TOOL_IDS: readonly string[] = TOOL_CATALOG.map((tool) => tool.id);

/**
 * 把 `concurrent` 落成工具定义上的 `isConcurrencySafe`（装配时调，见 `preset-tools.ts`）。
 *
 * DSH 只把声明了它的调用放进并行池；`dsh-tools` 的 `executionMode` 对没有这个字段的定义一律返回
 * `exclusive`——所以独占的工具原样交回即可，不必写一个恒 false 的分类器。
 *
 * 放在这里而不是 `preset-tools.ts`：它是「声明 → 真定义」这一步，与 `concurrent` 同处一个文件；
 * 顺带让离线 e2e（`e2e/verify-media.ts` 的 M49）验得到它——`preset-tools` 那边 import 了
 * `@deepseek-ai/dsh-tools`，在离线夹具里打不开。
 */
export function withConcurrency(tool: ToolDefinition, concurrent: boolean): ToolDefinition {
	return concurrent ? { ...tool, isConcurrencySafe: () => true } : tool;
}

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
