/**
 * `enter_nsfw` —— 剧作家请求进入限制级（NSFW）剧情通道。
 *
 * 描述与参数逐字照服务端那条同款通道（`apps/server/src/agentkit/nsfwTool.ts`）：这是同一个语义，
 * 模型读到的说法必须一致。唯一的差别在宿主侧而不是文案：`reason` 的 500 字上限在服务端写在
 * schema 上，DSH 的 schema 子集没有 `maxLength` 这类关键字，所以那条约束写在参数说明里。
 *
 * 它只翻一个状态、不动请求面：限制级态与角标住在舞台层，换模型与限制级提示词由宿主在轮边界做。
 *
 * 状态的真相源在舞台层（`stage-tap` 的 per-session 态），工具只按会话问它、推它。「已在态内」由这里
 * 挡掉——判断与服务端同一个：**进入那一拍就已经算限制级**（`active || pendingEnter`）。
 */
import { defineTool, type ParameterSchemaSpec } from '@deepseek-ai/dsh-tools';
import { textOutput } from '../media/generate-tool';
import type { PlayContext } from './context';

const DESCRIPTION = [
	'在剧情推进到即将发生亲密、成人或限制级（NSFW）接触时调用。',
	'调用后将开启限制级剧情通道，由专用模型接管后续成人细节描写。',
	'不要在普通日常模式下直接描写露骨细节。调用本工具后写完本轮正文与末行的停止点标签（`<stop …/>`）即可停笔，下一轮起将由专用模型展开描写。',
].join('\n');

const PARAMETERS = {
	reason: {
		type: 'string',
		description: '进入限制级（NSFW）剧情的简要原因或铺垫（如：两人拥吻并准备进一步亲密互动）。500 字以内。',
	},
} satisfies ParameterSchemaSpec;

export function createEnterNsfwTool(ctx: PlayContext) {
	return defineTool({
		name: 'enter_nsfw',
		description: DESCRIPTION,
		parameters: PARAMETERS,
		output: textOutput,
		async execute(args) {
			if (ctx.nsfw.active()) return '当前已经处于限制级剧情通道中，无需重复调用 enter_nsfw。';
			ctx.nsfw.enter(args.reason);
			return '已请求进入限制级（NSFW）剧情通道。请写完本轮正文并在末行写下停止点标签，下一轮起将由限制级专用模型与专属提示词接管展开细腻描写。';
		},
	});
}
