/**
 * `commit_asset` —— 把一张草稿正式入库（只给搭台助手）。
 *
 * `generate_image` 在搭台助手这边只产草稿（media-cache/drafts/ 下的半成品，不写 assets/、
 * 不碰素材表），因为「一次出三张候选让用户挑」这条流程要求没被挑中的候选不留痕迹。
 * 挑中了再来这一步：写 `assets/`、补素材表呈现声明、记生图台账、把留底原片搬进
 * `media-cache/sprite-sources/`（重抠要用）。
 *
 * 落位用草稿出图时的意图，所以这里只要一个 draftId——候选之间的差别在画面不在身份。
 * 剧作家那边没有这个工具也不需要有：它一次调用就把 draft + commit 做完了。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { MediaBackends } from '../../media/backends';
import { playAssetsOf } from '../../media/assets';
import { generatedResult, textOutput } from '../../media/generate-tool';
import type { PlayContext } from '../../tools/context';

const DESCRIPTION = [
	'把一张**草稿**正式入库成剧目素材：写进 `assets/`、补素材表声明、记生图台账。',
	'`draftId` 来自 `generate_image` 的回执；落位（哪个主体的哪个差分 / 哪个背景 id）就用草稿出图时的意图。',
	'**入库前先把候选的预览摆给用户看过、用户点头了才调**——它一进来就是剧目素材了，会覆盖同名的旧图。',
	'同一张草稿重复采用只是把同一个文件再写一遍，不会出问题；没被采用的草稿会在一周后自动清掉。',
].join('\n');

export function createCommitAssetTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'commit_asset',
		description: DESCRIPTION,
		parameters: {
			draftId: {
				type: 'string',
				required: true,
				description: '`generate_image` 回执里的草稿 id。',
			},
		},
		output: textOutput,
		async execute(args) {
			const assets = playAssetsOf(ctx.playDir(), media);
			return generatedResult(await assets.commit(args.draftId.trim()));
		},
	});
}
