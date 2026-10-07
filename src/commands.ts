/**
 * 人侧入口：`/new-play` 起一座新剧目。
 *
 * 它只是把「按《剧目文件》写几份文件」这一步替用户做了（`scaffoldPlay`）：不花一次 LLM 往返，
 * 也不受模型心情影响。模型自己起剧目时走的是文件工具，两边落出来的形状必须一样。
 *
 * 命令名只能是 `/^[a-z][a-z0-9_-]*$/`（`parseCommand` 的语法），所以是 `/new-play` 而不是别的小写以外的东西。
 */
import { basename } from 'node:path';
import type { Context } from '@deepseek-ai/cordis';
import type { CommandResult } from '@deepseek-ai/dsh-commands';
import type {} from '@deepseek-ai/dsh-commands';
import { scaffoldPlay } from './scaffold';
import type { LiveAgent } from './session';

const DESCRIPTION = '把当前工作目录立成一座剧目（写 play.json 与骨架文件）';

export function installPlayCommands(ctx: Context): () => void {
	return ctx.commands.register({
		name: 'new-play',
		description: DESCRIPTION,
		input: { hint: '剧目名（不写就取工作目录名）' },
		async handler({ agent, rawInput }): Promise<CommandResult> {
			const dir = (agent as unknown as LiveAgent).session?.header?.cwd;
			if (!dir) return { kind: 'error', text: '这个会话还没有工作目录，取不到剧目根。' };

			const title = rawInput.trim() || basename(dir);
			try {
				const result = await scaffoldPlay(dir, { title });
				const lines = [`已把 ${result.dir} 立成剧目《${title}》（id: ${result.id}）。`];
				if (result.kept.length > 0) lines.push(`已经有、这份没动：${result.kept.join('、')}`);
				lines.push(`新写下：${result.written.join('、')}`);
				lines.push('接下来切到「舞台」页签就能开演；想先补设定与角色卡，直接说就行（两个预设都能备料，也可以切到搭台助手专门备料）。');
				return { kind: 'success', text: lines.join('\n') };
			} catch (error) {
				return { kind: 'error', text: error instanceof Error ? error.message : String(error) };
			}
		},
	});
}
