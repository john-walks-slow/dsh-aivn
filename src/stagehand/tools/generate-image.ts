/**
 * `generate_image`（搭台助手形态）—— 出一张**草稿**。
 *
 * 与剧作家那份是同一个 schema 与同一份实现，只有等待策略与说明不同：这里只产草稿，
 * 「一次出三张候选让用户挑」这条流程要求没被挑中的候选不留痕迹，所以入库是显式的下一步
 * （`commit_asset`）。剧作家那边一次调用就声明了最终 id，走 `generate()` 一次做完。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { MediaBackends } from '../../media/backends';
import { playAssetsOf } from '../../media/assets';
import {
	draftResult,
	IMAGE_PARAMETERS,
	PROMPT_RULES,
	REFERENCE_RULE,
	textOutput,
	toTarget,
	type ImageArgs,
} from '../../media/generate-tool';
import type { PlayContext } from '../../tools/context';

const DESCRIPTION = [
	'出一张剧目素材的**草稿**：背景 kind=background / 事件插图 kind=cg / 立绘 kind=sprite。',
	'背景与插图给 name（素材 id，剧本里引用的就是它）；立绘给 spriteId + variant（不给按 neutral）。',
	'背景与插图一律 16:9 横构图；立绘的画幅跟着 framing 走，不用为了构图去改画幅。',
	'立绘会自动抠底成透明 PNG（舞台把它叠在场景上，不抠底就是一块不透明矩形）。',
	'**草稿不是素材**：图落在临时草稿区，回执给 draftId 与预览；要让它正式进剧目（写进 assets/ 与素材表），再调 `commit_asset`。',
	'**要出多张候选**：同一目标多调几次本工具（每张 prompt 各不相同；定妆照候选就给同一个 variant=neutral），',
	'把预览一起贴给用户，他挑中哪张就只 commit 那一张——没被挑中的候选不会在素材表里留下任何痕迹。',
	'**定妆照（neutral）建议一次出 3 张候选让用户挑**，挑定并采用之后再据它派生其余差分。',
	'非 neutral 的立绘会自动拿该主体**已入库的** neutral 定妆照做垫图，所以同一主体的差分是同一个人；',
	'**该主体还没有入库的 neutral 时出不了别的差分**（草稿当不了身份基准）——先把 neutral 出了、采用一张。',
	'一次调用只出一张图；要出多个候选或差分就在同一批里多次调用本工具，它们是并行的。',
	'抠底不用你管（引擎自动抠）；用户说抠得不干净时用 `recut_sprite` 原地重抠，别重新出图。',
	PROMPT_RULES,
	REFERENCE_RULE,
].join('\n');

export function createDraftImageTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'generate_image',
		description: DESCRIPTION,
		parameters: IMAGE_PARAMETERS,
		output: textOutput,
		async execute(args) {
			const { target, prompt } = toTarget(args as ImageArgs);
			const assets = playAssetsOf(ctx.playDir(), media);
			return draftResult(await assets.draft(target, prompt));
		},
	});
}
