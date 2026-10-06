/**
 * 两个 Agent 预设：剧作家（写戏的那位）与搭台助手（备料的那位）。
 *
 * 预设用 `ctx.agentPresets.register(definition)` 声明式注册——行集与 `~/.dsh/.agent-presets/dev/agent.cordis.yml`
 * 同一套写法，只是写在代码里。**绝对不要在本预设里再列一行 `dsh-aivn`**：宿主已经装了本插件，
 * 预设里再来一行会重复装一遍路由与事件订阅（它不在行的清单里，靠的是 profile 的 bundle patch）。
 *
 * 行集：指令文件发现 + persona + 文件工具；搭台助手另加技能库（自带的 `skills/`）与一行
 * 默认关的 shell。**剧作家不给技能库也不给 shell**——写戏、读文件用不上；AIVN 的 `read_skill`
 * 同样只给工坊。
 */
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Context } from '@deepseek-ai/cordis';
import type { PresetDefinition } from '@deepseek-ai/dsh-agent-preset-registry';
import { PLAYWRITER_PRESET, STAGEHAND_PRESET } from '../session';
import { stagehandStatic } from '../stagehand/prompt';
import { PLAYWRITER_PROMPT } from './prompt';

/** 与 dev 预设同一个预算：一次注入的指令文本上限。 */
const INSTRUCTION_BYTES = 65_536;

/** 用户级指令所在的家目录（与 `@deepseek-ai/dsh-agent-instructions` 的默认值同一个口径）。 */
const DSH_HOME = process.env.DSH_HOME ?? join(homedir(), '.dsh');

/**
 * 插件自带的技能库目录（`<package>/skills`）。
 *
 * 宿主半边是构建产物 `lib/index.js`，所以从它往上退一层就是包根。`includeDefaultRoots: false`
 * 是刻意的：技能清单直接进 system prompt，把宿主上那几十个本机运维技能一起塞给搭台助手
 * 只会淹掉这两份剧目做法（AIVN 的工坊 likewise 只看得到随包的这几份）。
 */
const SKILLS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'skills');

/**
 * 一个预设的行集。
 *
 * `bash` 给搭台助手留一行：`opts.bash === false` 时关着（注册器跳过 `disabled` 的行），
 * `true` 时真装——开与关都由插件配置 `shell` 决定（AIVN 那边这个能力也是 `defaultOff`，
 * 只是开关长在 Agent 设置页上）。剧作家不给这一项：它写戏、读文件，没有要 shell 做的事。
 *
 * `skills` 同理只给搭台助手：技能库是它备课时的做法速查。
 */
/** 行集里的一行（`plugins` 是只读数组，装配时用可变数组攒，最后交出去当只读）。 */
type PresetPlugin = PresetDefinition['plugins'][number];

function rows(prompt: string, opts: { bash?: boolean; skills?: boolean } = {}): PresetDefinition['plugins'] {
	const plugins: PresetPlugin[] = [
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
	];
	if (opts.bash === true) plugins.push({ id: 'tool-bash', name: '@deepseek-ai/dsh-tool-bash' });
	else if (opts.bash === false) plugins.push({ id: 'tool-bash', name: '@deepseek-ai/dsh-tool-bash', disabled: true });
	plugins.push(
		{ id: 'tool-fs', name: '@deepseek-ai/dsh-tool-fs' },
		// 这一项没有默认值，不给就是「invalid config」——与 dev 预设同一个取值。
		{
			id: 'tool-fs-search',
			name: '@deepseek-ai/dsh-tool-fs-search',
			config: { sampleOverCapGlobResults: false },
		},
	);
	if (opts.skills === true) {
		plugins.push(
			// 提供者在前、工具行在后：工具要往已知的技能源里查。
			{
				id: 'skill-filesystem',
				name: '@deepseek-ai/dsh-skill-filesystem',
				config: { includeDefaultRoots: false, customSkillDirs: [SKILLS_DIR] },
			},
			{ id: 'tool-skill', name: '@deepseek-ai/dsh-tool-skill' },
		);
	}
	return plugins;
}

export const PLAYWRITER_DEFINITION: PresetDefinition = {
	id: PLAYWRITER_PRESET,
	name: '剧作家',
	description: '写 Stage DSL 的剧作家：实时为一部正在直播的视觉小说写剧本',
	plugins: rows(PLAYWRITER_PROMPT),
};

/**
 * 搭台助手的预设定义。
 *
 * 行集里的 `tool-bash` 行由 `shell` 决定真装还是留一行 `disabled`；persona 用的是**静态前缀**
 * （`stagehandStatic()`）——能力位门控的那几章由 `preset-tools.ts` 挂在这个 Agent 的
 * `systemPrompt` 上现读，配置改了就换，不必重挂预设。
 */
function stagehandDefinition(shell: boolean): PresetDefinition {
	return {
		id: STAGEHAND_PRESET,
		name: '搭台助手',
		description: '备料的搭台助手：写设定、角色卡与创作口径，出品素材，把剧目准备好',
		plugins: rows(stagehandStatic(), { bash: shell, skills: true }),
	};
}

/** 预设的注册句柄：`restage` 用于 shell 翻转后的重注册（先卸再装）。 */
export interface PresetRegistry {
	/** 重注册搭台助手预设。只影响之后新建的会话，见 `restage` 的调用点注释。 */
	restage(shell: boolean): Promise<void>;
	dispose(): void;
}

/**
 * 注册两个预设，返回注册句柄。
 *
 * `register` 是**急切装载**：它在这里就把行集挂起来，激活失败不抛异常，而是记在名册的可读诊断里
 * （GUI 的预设列表看得到哪一行不可用）。所以这一步 await 得到的是「已经挂好或已经知道坏在哪」。
 */
export async function registerPresets(ctx: Context, opts: { shell: boolean }): Promise<PresetRegistry> {
	let stagehandOff = await ctx.agentPresets.register(stagehandDefinition(opts.shell));
	const playwriterOff = await ctx.agentPresets.register(PLAYWRITER_DEFINITION);
	ctx.logger.info(`[dsh-aivn] presets registered: ${PLAYWRITER_PRESET}, ${STAGEHAND_PRESET}`);

	return {
		async restage(shell) {
			// 同 id 重复注册会直接抛（`Duplicate agent preset`），先卸旧的。
			stagehandOff();
			stagehandOff = await ctx.agentPresets.register(stagehandDefinition(shell));
		},
		dispose() {
			stagehandOff();
			void playwriterOff();
		},
	};
}
