/**
 * 两个 Agent 预设：剧作家（写戏的那位）与搭台助手（备料的那位）。
 *
 * 预设用 `ctx.agentPresets.register(definition)` 声明式注册——行集与 `~/.dsh/.agent-presets/dev/agent.cordis.yml`
 * 同一套写法，只是写在代码里。**绝对不要在本预设里再列一行 `dsh-aivn`**：宿主已经装了本插件，
 * 预设里再来一行会重复装一遍路由与事件订阅（它不在行的清单里，靠的是 profile 的 bundle patch）。
 *
 * 行集：persona + 文件工具 + 一行默认关的 shell + 一份**私有**技能库。两个预设的行集同构——
 * 剧作家单飞时也要会备料（画风、图单、选源），技能库是它按需查的做法速查。
 *
 * **这两个预设不看宿主的 skill 与指令**：
 * - 故意不装 `@deepseek-ai/dsh-agent-instructions`：剧目上下文全由 A 区注入，
 *   `$DSH_HOME/AGENTS.md`（整台机器的运维通例）与工作区的 `AGENTS.md` 都是噪音，
 *   而剧目目录常常就落在某个仓库里，装了这一行就一定会把宿主的开发指引塞给剧作家。
 * - 技能库挂在 `isolate` realm 里（见 {@link skillRows}）：不隔离就一定会漏进全局层的技能。
 */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Context } from '@deepseek-ai/cordis';
import type { PresetDefinition } from '@deepseek-ai/dsh-agent-preset-registry';
import { PLAYWRITER_PRESET, STAGEHAND_PRESET } from '../session';
import { stagehandStatic } from '../stagehand/prompt';
import { PLAYWRITER_PROMPT } from './prompt';

/**
 * 插件自带的技能库目录（`<package>/skills`）。
 *
 * 宿主半边是构建产物 `lib/index.js`，所以从它往上退一层就是包根。技能清单直接进 system prompt，
 * 把宿主上那几十个本机运维技能一起塞给 Agent 只会淹掉随包的这几份剧目做法。
 */
const SKILLS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'skills');

/**
 * 一个预设的行集。
 *
 * `bash` 给两个预设都留一行：`opts.bash === false` 时关着（注册器跳过 `disabled` 的行），
 * `true` 时真装——开与关都由插件配置 `shell` 决定。`skills` 同理两个预设都装：技能库
 * （`<package>/skills`）是备料时的做法速查，剧作家单飞时也要看得到。
 */
/** 行集里的一行（`plugins` 是只读数组，装配时用可变数组攒，最后交出去当只读）。 */
type PresetPlugin = PresetDefinition['plugins'][number];

function rows(prompt: string, opts: { bash?: boolean; skills?: boolean } = {}): PresetDefinition['plugins'] {
	const plugins: PresetPlugin[] = [
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
	if (opts.skills === true) plugins.push(skillRows());
	return plugins;
}

/**
 * 私有技能库：注册表 + 文件系统 provider + `skill` 工具，三者同处一个 `isolate` realm。
 *
 * 为什么非隔离不可：公开的技能注册表会把**全局层**并进每个 agent 的目录——宿主行与
 * 第三方插件（`ctx.skills.registerProvider`）注册的 runtime skill 都落在那里，预设层只能
 * 同名覆盖、删不掉。不隔离时 `includeDefaultRoots: false` 只挡住了「根」，挡不住那些
 * 代码里注册进来的技能。把 `dsh-skill` 挂进 realm 后预设拿到一份私有注册表，
 * `skill` 工具与浏览器侧（`serviceForAgent`）都按 realm 找到它，目录里只剩随包的做法。
 *
 * `includeDefaultRoots: false` 是这一层里的第二道：排掉私有注册表的项目/用户/bundled 根，
 * 只留随包的 `skills/`。
 */
function skillRows(): PresetPlugin {
	return {
		id: 'skills',
		name: 'cordis:group',
		group: true,
		isolate: { skills: true },
		config: [
			// 提供者在前、工具行在后：工具要往已知的技能源里查。
			{ id: 'skill', name: '@deepseek-ai/dsh-skill' },
			{
				id: 'skill-filesystem',
				name: '@deepseek-ai/dsh-skill-filesystem',
				config: { includeDefaultRoots: false, customSkillDirs: [SKILLS_DIR] },
			},
			{ id: 'tool-skill', name: '@deepseek-ai/dsh-tool-skill' },
		],
	};
}

function playwriterDefinition(shell: boolean): PresetDefinition {
	return {
		id: PLAYWRITER_PRESET,
		name: '剧作家',
		description: '写 Stage DSL 的剧作家：实时为一部正在直播的视觉小说写剧本',
		plugins: rows(PLAYWRITER_PROMPT, { bash: shell, skills: true }),
	};
}

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
	/** 重注册两个预设。只影响之后新建的会话，见 `restage` 的调用点注释。 */
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
	let playwriterOff = await ctx.agentPresets.register(playwriterDefinition(opts.shell));
	ctx.logger.info(`[dsh-aivn] presets registered: ${PLAYWRITER_PRESET}, ${STAGEHAND_PRESET}`);

	return {
		async restage(shell) {
			// 同 id 重复注册会直接抛（`Duplicate agent preset`），先卸旧的。
			stagehandOff();
			void playwriterOff();
			stagehandOff = await ctx.agentPresets.register(stagehandDefinition(shell));
			playwriterOff = await ctx.agentPresets.register(playwriterDefinition(shell));
		},
		dispose() {
			stagehandOff();
			void playwriterOff();
		},
	};
}
