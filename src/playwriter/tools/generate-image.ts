/**
 * `generate_image`（剧作家形态）—— 同步等图、出图即入库。
 *
 * 与搭台助手那份**同一份 schema 与同一份实现**，只有等待策略与说明不同：这里一次调用就声明了
 * 最终 id（没有「让用户在候选里挑」这回事），所以 `draft` + `commit` 一次做完，回执给最终路径。
 *
 * AIVN 在剧作家这边走后台排产（发起即返回 + 到货广播 + 舞台骨架占位）。插件没有回合之外的
 * 注入通道，于是按 D3 改成**同步等待**：一次 70–140 秒，占住这一轮，但回执说的是真话——
 * 模型拿到它就能在紧接着的剧本里引用一个**确实存在**的素材 id。
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import { playAssetsOf, type AssetTarget } from '../../media/assets';
import type { MediaBackends } from '../../media/backends';
import {
	generatedResult,
	IMAGE_PARAMETERS,
	PROMPT_RULES,
	REFERENCE_RULE,
	textOutput,
	toTarget,
	type ImageArgs,
} from '../../media/generate-tool';
import type { PlayContext } from '../../tools/context';

const DESCRIPTION = [
	'出一张剧目素材并**当场等图**（约 70–140 秒，这一步会占住本轮）：',
	'背景 kind=background / 事件插图 kind=cg 给 name；立绘 kind=sprite 给 spriteId + variant（不给按 neutral）。',
	'立绘会自动抠底成透明 PNG；画幅跟着 framing 走（人物常用 full 或 half，猫与道具用 square）。',
	'**出图即入库**：写进 `assets/` 与素材表，回执给最终路径——**这一轮就能在剧本里引用它**：',
	'`<scene bg="id">` / `<cg id="id">` / `<actor id="spriteId" variant="…">`。',
	'**同名素材已经有了就直接返回、不重出**（出图会覆盖同名文件）：回执里会说「已经有了」，照常引用即可。',
	'别为「以后可能用得上」出图：一轮的预算是 240 秒，一次出图就占掉一半以上。缺什么、这一轮真的要引用才出。',
	'同一主体多个差分要分几次调用（每张写自己的 prompt）；它们串行等待，一轮里出不了几张，先出这一轮真要用的。',
	PROMPT_RULES,
	REFERENCE_RULE,
].join('\n');

export function createSyncImageTool(ctx: PlayContext, media: MediaBackends) {
	return defineTool({
		name: 'generate_image',
		description: DESCRIPTION,
		parameters: IMAGE_PARAMETERS,
		output: textOutput,
		async execute(args) {
			const { target, prompt } = toTarget(args as ImageArgs);
			const assets = playAssetsOf(ctx.playDir(), media);
			// 已有同名素材就跳过：出图会覆盖同名文件，模型忘了一次核对就把用户刚验收过的图顶掉，
			// 还白烧一份配额。这里替它挡一道（提示词里那条「先看一眼」不是每次都被照做）。
			if (await assets.exists(target)) return existingNote(target);
			return generatedResult(await assets.generate(target, prompt));
		},
	});
}

/** 「已经有了，别重出」的回执：把引用它的写法一并给出，省得模型再去查。 */
function existingNote(target: AssetTarget): string {
	if (target.kind === 'sprite') {
		const variant = target.variant ? ` variant="${target.variant}"` : '';
		return (
			`${target.spriteId} 的 ${target.variant ?? 'neutral'} 立绘剧目里已经有了，不用重出。` +
			`直接 \`<actor id="${target.spriteId}"${variant}>\` 引用它；要另一张表情就换个 variant 再调。`
		);
	}
	const label = target.kind === 'background' ? '背景' : '插图';
	const tag = target.kind === 'background' ? `<scene bg="${target.name}">` : `<cg id="${target.name}">`;
	return `剧目里已经有同名${label}，跳过生成，直接 ${tag} 引用 ${target.name}。`;
}
