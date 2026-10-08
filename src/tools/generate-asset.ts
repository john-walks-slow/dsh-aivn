/**
 * `generate_asset` —— **一键**：生成 +（立绘）抠底 + 登记，一次完成。
 *
 * 适合「就想要一张能用的图」。要精细控制（先看候选、用外部图、单独重抠）就用原子三件套
 * `generate_image` / `cut` / `import_asset`。剧目感知的提示词后缀（立绘色键底、身份锁、垫 neutral）
 * 在**这条编排路径**里由引擎自动加（因为它知道出的是立绘），原子路径则靠技能里的配方。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { MediaBackends } from '../media/backends';
import { playAssetsOf } from '../media/assets';
import {
	existingNote,
	generatedResult,
	IMAGE_PARAMETERS,
	PROMPT_RULES,
	REFERENCE_RULE,
	textOutput,
	toTarget,
	type ImageArgs,
} from '../media/generate-tool';
import type { PlayContext } from './context';

const DESCRIPTION = [
	'**一键**：生成 +（立绘）抠底 + 登记，一次完成——适合「就想要一张能用的图」。',
	'背景 / 插图 kind=background/cg 给 name；立绘 kind=sprite 给 spriteId + variant（不给按 neutral）。',
	'立绘自动抠底成透明 PNG；画幅跟着 framing 走。写入 `assets/` 与素材表，回执给最终路径——这一轮就能在剧本里引用它：',
	'`<scene bg="id">` / `<cg id="id">` / `<actor id="spriteId" variant="…">`。',
	'**同名素材已经有了就直接返回、不重出**（出图会覆盖同名文件）。',
	'要精细控制（先出候选让用户挑、用外部图 / 下载图、单独重抠）就用原子三件套 `generate_image` / `cut` / `import_asset`。',
	PROMPT_RULES,
	REFERENCE_RULE,
].join('\n');

export function createGenerateAssetTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'generate_asset',
		description: DESCRIPTION,
		parameters: {
			...IMAGE_PARAMETERS,
			description: { type: 'string', description: '一句话画面描述，写进素材表（可省）。' },
		},
		output: textOutput,
		async execute(args) {
			const assets = playAssetsOf(ctx.playDir(), media);
			const { target, prompt } = toTarget(args as ImageArgs);
			if (await assets.exists(target)) return existingNote(target);
			return generatedResult(
				await assets.generate(target, prompt, {
					...(typeof args.description === 'string' && args.description.trim() ? { description: args.description.trim() } : {}),
				}),
			);
		},
	});
}
