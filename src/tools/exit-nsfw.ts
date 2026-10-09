/**
 * `exit_nsfw` —— 剧作家请求退出限制级（NSFW）剧情通道。
 *
 * 与 `enter-nsfw.ts` 同一份来路：描述与参数逐字照服务端（`apps/server/src/agentkit/nsfwTool.ts`），
 * 500 字上限落在参数说明上（DSH 的 schema 子集没有 `maxLength`）。
 *
 * 退出的语义与进入不对称，照服务端的口径来：**这一拍仍算限制级**——收尾那一段正文是限制级原文，
 * 该带标的是内容产生的时刻，不是合闸的时刻；闸在轮尾（剧作家停笔）才合上，那时才广播角标熄灭。
 * 摘要与切回主模型由宿主在轮尾做，这里只把「这一拍要退出」记下来。
 */
import { defineTool, type ParameterSchemaSpec } from '@deepseek-ai/dsh-tools';
import { textOutput } from '../media/generate-tool';
import type { PlayContext } from './context';

const DESCRIPTION = [
	'在限制级（NSFW）亲密剧情告一段落、即将回归正常日常或主线情节时调用。',
	'**随时可以调用**（写完收尾台词后调用它，再在末行写下停止点标签收束本轮即可）。',
	'本轮收束时，系统将自动对该段限制级剧情提炼全年龄（SFW）含蓄摘要并切回主模型。主模型后续只保留剧情进展摘要，不包含露骨细节。',
].join('\n');

const PARAMETERS = {
	summary: {
		type: 'string',
		description: '限制级剧情的简要概述（可选，供系统生成全年龄 SFW 摘要时参考）。500 字以内。',
	},
} satisfies ParameterSchemaSpec;

export function createExitNsfwTool(ctx: PlayContext) {
	return defineTool({
		name: 'exit_nsfw',
		description: DESCRIPTION,
		parameters: PARAMETERS,
		output: textOutput,
		async execute(args) {
			if (!ctx.nsfw.active()) return '当前未处于限制级剧情通道中，无需调用 exit_nsfw。';
			ctx.nsfw.exit(args.summary);
			return '已请求退出限制级（NSFW）剧情通道。请写完本轮正文并在末行写下停止点标签，本轮结束后系统将生成全年龄 SFW 摘要并切回主模型继续后续演出。';
		},
	});
}
