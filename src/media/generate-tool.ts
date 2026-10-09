/**
 * 图片工具的**回执组装**：`generate_asset`（一键）与 `generate_image`（纯生成候选）共用的几种回执。
 *
 * 参数 schema、写 prompt 的硬约束、落位归一化都在 `@aivn/agent` 的 `image.generate` 里
 *（两个宿主同一份）；这里只剩各自回执怎么写——那是宿主自己的话术。
 *
 * 一步入库（`generate_asset`）：`generate()` 出图 +（立绘）抠底 + 登记，一次调用声明最终 id，
 * 图一出来这一轮就引用得到；纯生成（`generate_image`）：只产候选，落位另走 `cut` / `import_asset`。
 *
 * 一次调用一张图（一次等待）——插件没有「回合之外」的注入通道，不学 AIVN 的后台排产
 *（那要靠到货广播），出图一律同步等待。
 *
 * 抠底参数不在这里：`generate_asset` 用默认参数自动抠；要调参就先 `generate_image` 出候选、
 * 看过图之后再 `cut` 对着同一张重抠。
 */
import type { ContentBlock } from '@deepseek-ai/dsh-llm';
import type { AssetTarget, DraftedAsset, GeneratedAsset } from './assets';

export const textOutput = {
	schema: { type: 'string' } as const,
	render: (_args: unknown, text: string): ContentBlock[] => [{ type: 'text', text }],
};

/** 立绘的抠底体检：脏边时不至于让模型以为是画得不好（覆盖率过低 = 底色判错）。 */
function cutoutNote(asset: { cutout?: { coverage: number; figureHeight: number } }): string {
	if (!asset.cutout) return '';
	const { coverage, figureHeight } = asset.cutout;
	const lines = [`抠底：前景占比 ${(coverage * 100).toFixed(1)}%，人物高 ${figureHeight}px。`];
	if (coverage < 0.03) lines.push('前景占比过低，可能整张被判成了底色——换一个不与主体撞色的底色重出。');
	return `\n${lines.join('')}`;
}

/** `generate_image`（纯生成）的回执：给候选文件路径与预览，并说明下一步怎么登记。 */
export function genericResult(image: DraftedAsset): string {
	return [
		`图片已生成（候选）：\`${image.path}\`（${image.aspect}）`,
		`![生成的图](${image.absPath})`,
		'这是**候选图**，还没进剧目素材。落成素材：背景 / 插图直接 `import_asset(source=…, kind=…)`；',
		'立绘先 `cut(source=…)` 抠底、再 `import_asset` 那张透明 PNG（kind=sprite, spriteId=…）。',
	].join('\n');
}

/** 一步入库（默认）：回执里给最终 id 与图片。 */
export function generatedResult(asset: GeneratedAsset): string {
	const label = asset.kind === 'sprite' ? '立绘' : asset.kind === 'background' ? '背景' : asset.kind === 'cg' ? '插图' : '素材';
	const lines = [
		`${label}已生成并入库：\`${asset.path}\`${asset.replaced ? '（覆盖了同名旧素材）' : ''}`,
		`![${asset.kind}](${asset.absPath})`,
		'这一轮就能引用它。',
	];
	if (asset.autoNeutral) {
		// 这一张是真金白银出的：不说，用户会以为只出了一张、也会奇怪台上有张没见过的脸。
		lines.push(
			'',
			`另外顺手补了一张 \`${asset.autoNeutral.path}\`（这个主体此前没有定妆照，差分都以它为身份基准）。`,
			`![neutral](${asset.autoNeutral.absPath})`,
		);
	}
	if (asset.sourcePath) {
		lines.push('', `抠底前原片已留底：\`${asset.sourcePath}\`——日后抠脏了用它重抠（\`cut(source="…", output="${asset.path}")\`）。`);
	}
	return lines.join('\n').concat(cutoutNote(asset));
}

/** 「已经有了，别重出」的回执：把引用它的写法一并给出，省得模型再去查。 */
export function existingNote(target: AssetTarget): string {
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
