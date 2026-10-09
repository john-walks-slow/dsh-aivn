/**
 * `generate_bgm`（两个预设共用）—— 生成一首背景音乐并落库。
 *
 * 能力（参数真相源、描述正文、查重与请求归一化）在 `@aivn/agent` 的 `music.generate`；
 * 这里只声明**插件的 face**：露哪几格、以及投递方式——**同步等待**。
 *
 * 独立版走后台排产（发起即返回、到货广播），插件没有「回合之外」的注入通道，
 * 所以这里等：一首 ~175s 的曲子实测 ~84s，等就是等，至少回执说的是真话。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import { musicGenerate, musicGenerateFields, pick, type InferArgs } from '@aivn/agent';
import { playAssetsOf } from '../media/assets';
import { listAssets } from '../play/assets';
import type { MediaBackends } from '../media/backends';
import { textOutput } from '../media/generate-tool';
import { toDsh } from './schema';
import type { PlayContext } from './context';

/** 工具面：出歌要 name/prompt，另露 model（换模型）与 overwrite（同名时重做），其余元数据本插件还没接线口。 */
const FACE = pick(musicGenerateFields, ['name', 'prompt', 'model', 'overwrite']);

type BgmArgs = InferArgs<typeof FACE>;

export function createGenerateBgmTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'generate_bgm',
		description: musicGenerate.doc,
		parameters: toDsh(FACE),
		output: textOutput,
		async execute(args) {
			const dir = ctx.playDir();
			const assets = playAssetsOf(dir, media);
			return musicGenerate.execute(args as BgmArgs, {
				// 同名曲子认的是文件名 stem（扩展名按上游 mime 定，不能猜）
				async existing(name) {
					const hit = (listAssets(dir).bgm ?? []).find((file) => file.replace(/\.\w+$/, '') === name);
					return hit ? `assets/bgm/${hit}` : null;
				},
				async start(request) {
					const asset = await assets.generateBgm(request.name, request.prompt, {
						...(request.model ? { model: request.model } : {}),
					});
					return [
						`BGM 已生成并入库：\`${asset.path}\`${asset.replaced ? '（覆盖了同名旧曲）' : ''}`,
						`剧本里用 \`<scene bgm="${request.name}">\` 引用它。`,
						'记得补一句它适合什么场景——剧作家挑曲子看的是素材表里的描述。',
					].join('\n');
				},
			});
		},
	});
}
