/**
 * 搭台助手的能力面（`can`）。
 *
 * AIVN 的能力面是**用户逐剧目勾**的（`play.json` 的 `agents.<role>.capabilities` + Agent 设置页），
 * 所以那边每轮拼提示词时都得现算。插件没有那个设置面：能力面由**预设行集**与**插件配置**决定，
 * 装载时就是定值，于是只留真正会变的三位：
 *
 * - `shell`：插件配置 `shell` 开了没有（默认关，与 AIVN 的 `defaultOff` 同口径）；
 * - `voice`：配了 Fish key 没有（TTS 与音色库共用同一把 key）；
 * - `search`：配了 Exa key 没有。
 *
 * 其余几位（files / skill / view / readiness）在插件里恒真——预设行集给死了，成位只会留下一份
 * 永不执行的假分支；persona 里直接说真话。生图与音乐两位等阶段 2 接上后端再加。
 */
export interface Capabilities {
	/** 命令行（`bash`）：默认关，用户在插件配置里放。 */
	shell: boolean;
	/** 音色库（`list_voices`）：配了 Fish key 才有。 */
	voice: boolean;
	/** 联网检索（`web_search`）：配了 Exa key 才有。 */
	search: boolean;
}

/** 有 key 才算配好：空串与纯空白等同于没配。 */
function hasKeys(keys: readonly string[] | undefined): boolean {
	return (keys ?? []).some((key) => key.trim() !== '');
}

export function resolveCapabilities(input: {
	shell: boolean;
	ttsKeys: readonly string[] | undefined;
	exaKeys: readonly string[] | undefined;
}): Capabilities {
	return {
		shell: input.shell,
		voice: hasKeys(input.ttsKeys),
		search: hasKeys(input.exaKeys),
	};
}
