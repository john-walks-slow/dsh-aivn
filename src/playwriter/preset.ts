/**
 * 两个 Agent 预设：剧作家（写戏的那位）与搭台助手（备料的那位）。
 *
 * 预设用 `ctx.agentPresets.register(definition)` 声明式注册——行集与 `~/.dsh/.agent-presets/dev/agent.cordis.yml`
 * 同一套写法，只是写在代码里。**绝对不要在本预设里再列一行 `dsh-aivn`**：宿主已经装了本插件，
 * 预设里再来一行会重复装一遍路由与事件订阅（它不在行的清单里，靠的是 profile 的 bundle patch）。
 *
 * 本阶段两个预设的行集同构：指令文件发现 + persona + shell + 文件工具。
 * 搭台助手的工具留给下一阶段，所以它的 persona 里不出现任何工具名。
 */
import { homedir } from 'node:os';
import { join } from 'node:path';
import type { Context } from '@deepseek-ai/cordis';
import type { PresetDefinition } from '@deepseek-ai/dsh-agent-preset-registry';
import { PLAYWRITER_PRESET, STAGEHAND_PRESET } from '../session';
import { PLAYWRITER_PROMPT, STAGEHAND_PROMPT } from './prompt';

/** 与 dev 预设同一个预算：一次注入的指令文本上限。 */
const INSTRUCTION_BYTES = 65_536;

/** 用户级指令所在的家目录（与 `@deepseek-ai/dsh-agent-instructions` 的默认值同一个口径）。 */
const DSH_HOME = process.env.DSH_HOME ?? join(homedir(), '.dsh');

/**
 * 一个预设的行集。
 *
 * `tool-bash` 的禁用条件在 YAML 里写作 `!!js process.platform === 'win32'`，
 * 代码里直接算成布尔即可——注册时就在本机进程里，没有「稍后在别的机器上求值」这回事。
 */
function rows(prompt: string): PresetDefinition['plugins'] {
	return [
		{
			id: 'instructions',
			name: '@deepseek-ai/dsh-agent-instructions',
			config: {
				dshHome: DSH_HOME,
				maxBytes: INSTRUCTION_BYTES,
				instructionFileCandidates: ['AGENTS.md'],
			},
		},
		{ id: 'persona', name: '@deepseek-ai/dsh-persona', config: { prefix: prompt } },
		{ id: 'tool-bash', name: '@deepseek-ai/dsh-tool-bash', disabled: process.platform === 'win32' },
		{ id: 'tool-fs', name: '@deepseek-ai/dsh-tool-fs' },
		// 这一项没有默认值，不给就是「invalid config」——与 dev 预设同一个取值。
		{
			id: 'tool-fs-search',
			name: '@deepseek-ai/dsh-tool-fs-search',
			config: { sampleOverCapGlobResults: false },
		},
	];
}

export const PLAYWRITER_DEFINITION: PresetDefinition = {
	id: PLAYWRITER_PRESET,
	name: '剧作家',
	description: '写 Stage DSL 的剧作家：实时为一部正在直播的视觉小说写剧本',
	plugins: rows(PLAYWRITER_PROMPT),
};

export const STAGEHAND_DEFINITION: PresetDefinition = {
	id: STAGEHAND_PRESET,
	name: '搭台助手',
	description: '备料的搭台助手：写设定、角色卡与创作口径，把剧目准备好（素材生成工具在下一阶段）',
	plugins: rows(STAGEHAND_PROMPT),
};

/**
 * 注册两个预设，返回一次性卸载器。
 *
 * `register` 是**急切装载**：它在这里就把行集挂起来，激活失败不抛异常，而是记在名册的可读诊断里
 * （GUI 的预设列表看得到哪一行不可用）。所以这一步 await 得到的是「已经挂好或已经知道坏在哪」。
 */
export async function registerPresets(ctx: Context): Promise<() => void> {
	const disposers = [
		await ctx.agentPresets.register(PLAYWRITER_DEFINITION),
		await ctx.agentPresets.register(STAGEHAND_DEFINITION),
	];
	ctx.logger.info(`[dsh-aivn] presets registered: ${PLAYWRITER_PRESET}, ${STAGEHAND_PRESET}`);
	return () => {
		for (const dispose of disposers.splice(0)) void dispose();
	};
}
