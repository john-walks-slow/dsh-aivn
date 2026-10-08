/**
 * 剧内状态（`memory/always/state/*`）的重置。
 *
 * 这三个文件是**单个周目**的状态，由剧作家自己维护（见提示词《世界状态》）。新周目开始时必须回到
 * 起点，否则新会话会读到上一周目残留的场景 / 好感 / 旗标——而 A 区【状态】快照会在第一轮就把这份
 * 残留喂给剧作家，模型很容易顺着旧状态续写。
 *
 * 重置由**引擎**在周目边界（空会话面的新会话第一句话）执行，而不是交给剧作家「开场时自己重置」：
 * 边界只有引擎知道，软件约定不可靠。只写这三个文件——`memory/always/premise.md`、`craft.md`、
 * `memory/index/*`、`characters/*`、`assets/*` 一概不动（它们是剧目定义与跨周目设定，不是本周目的状态）。
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Play } from './play';

/** 剧内状态目录（相对剧目根）。 */
export const PLAY_STATE_DIR = 'memory/always/state';

/** 新周目起点：把剧内状态写回剧目声明的初值（`play.json` 的 `initialScene` / `initialState`）。 */
export function resetPlayState(play: Play): void {
  const dir = join(play.dir, PLAY_STATE_DIR);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'scene.md'), `${play.config.initialScene}\n`, 'utf8');
  writeFileSync(join(dir, 'threads.md'), '', 'utf8');
  const { affinity, flags } = play.config.initialState;
  writeFileSync(join(dir, 'state.json'), `${JSON.stringify({ affinity, flags }, null, 2)}\n`, 'utf8');
}
