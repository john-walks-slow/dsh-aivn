/**
 * `generate_bgm`（只给搭台助手）—— 生成一首背景音乐并落库。
 *
 * AIVN 那边走后台排产（发起即返回、到货广播），插件没有「回合之外」的注入通道，
 * 所以改成**同步等待**：一首 ~175s 的曲子实测 ~84s，等就是等，至少回执说的是真话。
 *
 * 提示词怎么写（什么情绪配什么乐器、循环意图怎么表达）归技能库 `galgame-audio`，
 * 这里只留契约：一首、落 `assets/bgm/`、id 就是剧本里 `<scene bgm="…">` 引用的名字。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import { playAssetsOf } from '../../media/assets';
import type { MediaBackends } from '../../media/backends';
import { textOutput } from '../../media/generate-tool';
import type { PlayContext } from '../../tools/context';

const DESCRIPTION = [
	'生成一首背景音乐并落库（`assets/bgm/<name>.m4a`）。`name` 就是剧本里 `<scene bgm="…">` 引用的 id。',
	'**这一步会等**（一首约 175 秒的曲子实测要 84 秒左右），所以想清楚再调：一首曲子只该配一类场景。',
	'`prompt` 写英文，说清情绪、乐器、节奏与用途（如「quiet piano, rainy afternoon, slow, loopable」）。',
	'上游**固定给约 176 秒、没有时长参数**：要它适合循环就在 prompt 里写 seamless loop、no fade out。',
	'别为同一类场景反复出：先 `list_assets` 看 `bgm` 类目里已有什么，mood 对得上就用已有的。',
	'落库时会补一条素材表记录（`source: AI 生成`）；描述（`description`）留给用户或你自己按剧情补。',
].join('\n');

export function createGenerateBgmTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'generate_bgm',
		description: DESCRIPTION,
		parameters: {
			name: {
				type: 'string',
				required: true,
				description: '音乐 id（英文小写、有语义，如 rain_theme）。剧本里 `<scene bgm="rain_theme">` 引用的就是它。',
			},
			prompt: { type: 'string', required: true, description: '英文音乐描述：情绪、乐器、节奏、用途。' },
			model: { type: 'string', description: '换个音乐模型（不给用配置里那个）。' },
		},
		output: textOutput,
		async execute(args) {
			const assets = playAssetsOf(ctx.playDir(), media);
			const asset = await assets.generateBgm(args.name, args.prompt, {
				...(args.model?.trim() ? { model: args.model.trim() } : {}),
			});
			return [
				`BGM 已生成并入库：\`${asset.path}\`${asset.replaced ? '（覆盖了同名旧曲）' : ''}`,
				`剧本里用 \`<scene bgm="${args.name.trim()}">\` 引用它。`,
				'记得补一句它适合什么场景——剧作家挑曲子看的是素材表里的描述。',
			].join('\n');
		},
	});
}
