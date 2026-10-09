/**
 * 结局账本 —— 工作区根的 `endings.json`。
 *
 * **它记的是「这座剧目发生过什么」，与剧内状态（`memory/always/state/*`）无关。** 剧内状态属于
 * 单个周目，新周目开始会被重置；账本必须跨周目继承，所以放在工作区根、由引擎独占，任何 reset
 * 都不该碰它（这正是「结局记在单独地方」的落点）。结构照 VN 的 persistent endings set：以 id
 * 为键、`reachedIn` 记在第几周目达成（集合语义天然去重，舞台重投影时重放结局不会重复记账）。
 *
 * 写者只有引擎：实时解析到 `ending` IR 的那一刻落账（见 `stage-tap`），**重建（`rebuildStage`）
 * 只重推终局标记、绝不落账**。写入走「临时文件 + rename」的原子写，避免半截 JSON。
 *
 * 坏文件的口径：**读不出来就报错、原样留着**（不覆盖）——账本是用户可达的少量数据，静默重置
 * 等于把之前的周目记录抹掉。调用方（stage-tap / play-context）各自决定降级方式。
 */
import { randomUUID } from 'node:crypto';
import { readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { EndingAttrs } from '@aivn/core';

export const LEDGER_FILE = 'endings.json';
const LEDGER_VERSION = 1;

/** 账本里一条结局。字段都可缺省（老账本 / 手写账本），解码时逐项归一。 */
export interface EndingRecord {
  /** 人话名（`<ending name=…>`）；缺省时渲染回落 id。 */
  name?: string;
  subtitle?: string;
  /** 首次达成（ISO）。 */
  firstAt: string;
  /** 最近一次达成（ISO）。 */
  lastAt: string;
  /** 在哪些周目达成过（升序、去重）。 */
  reachedIn: number[];
  /** 归档摘要（`<ending summary=…>`，落账时随属性一起来）。 */
  summary?: string;
}

export interface EndingsLedgerData {
  version: number;
  /** 已经开过多少个周目（空会话面开始的剧作家会话数）。 */
  playthroughs: number;
  /** 结局 id → 记录。 */
  endings: Record<string, EndingRecord>;
}

/** 账本文件路径。 */
export function ledgerPath(dir: string): string {
  return join(dir, LEDGER_FILE);
}

/**
 * 读账本。**文件不存在给空账本；读不出来（坏 JSON / 结构不对）抛错**——调用方据此知道
 * 「这是坏的」而不是「这是空的」，才不会把坏文件当空文件覆盖掉。
 */
export function readLedger(dir: string): EndingsLedgerData {
  let raw: string;
  try {
    raw = readFileSync(ledgerPath(dir), 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return emptyLedger();
    throw error;
  }
  return decodeLedger(raw, dir);
}

function emptyLedger(): EndingsLedgerData {
  return { version: LEDGER_VERSION, playthroughs: 0, endings: {} };
}

function decodeLedger(raw: string, dir: string): EndingsLedgerData {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    throw new Error(`${dir} 的 ${LEDGER_FILE} 不是合法 JSON`);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error(`${dir} 的 ${LEDGER_FILE} 不是一个对象`);
  }
  const obj = parsed as Record<string, unknown>;
  const endings: Record<string, EndingRecord> = {};
  const rawEndings = obj.endings;
  if (typeof rawEndings === 'object' && rawEndings !== null && !Array.isArray(rawEndings)) {
    for (const [id, value] of Object.entries(rawEndings as Record<string, unknown>)) {
      const record = decodeRecord(value);
      if (record) endings[id] = record;
    }
  }
  const playthroughs =
    typeof obj.playthroughs === 'number' && Number.isFinite(obj.playthroughs) && obj.playthroughs >= 0
      ? Math.floor(obj.playthroughs)
      : 0;
  return { version: LEDGER_VERSION, playthroughs, endings };
}

/** 一条记录归一：缺时间戳补当前时刻、`reachedIn` 只留非负整数并去重排序。 */
function decodeRecord(value: unknown): EndingRecord | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
  const obj = value as Record<string, unknown>;
  const now = new Date().toISOString();
  const text = (key: string): string | undefined =>
    typeof obj[key] === 'string' && (obj[key] as string).trim() !== '' ? (obj[key] as string).trim() : undefined;
  const reachedIn = Array.isArray(obj.reachedIn)
    ? Array.from(
        new Set(
          obj.reachedIn
            .filter((n): n is number => typeof n === 'number' && Number.isFinite(n) && n >= 0)
            .map((n) => Math.floor(n)),
        ),
      ).sort((a, b) => a - b)
    : [];
  return {
    // 老账本用的是改名前那个键（`title`），缺 `name` 时回落读它——账本是用户可达的数据，
    // 一次改名不该让旧周目的人话名消失（读到的仍是同一条记录）。
    ...(text('name') ?? text('title') ? { name: text('name') ?? text('title') } : {}),
    ...(text('subtitle') ? { subtitle: text('subtitle') } : {}),
    firstAt: text('firstAt') ?? now,
    lastAt: text('lastAt') ?? now,
    reachedIn,
    ...(text('summary') ? { summary: text('summary') } : {}),
  };
}

/** 原子落盘：临时文件 + rename（崩在写一半时旧档原样保住）。 */
function writeLedger(dir: string, data: EndingsLedgerData): void {
  const path = ledgerPath(dir);
  const tmp = `${path}.${randomUUID()}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  renameSync(tmp, path);
}

/**
 * 结局账本的读写门面。
 *
 * 会话（周目）号只在内存里映射（`beginPlaythrough` 时登记）：它服务的是「这一条结局是第几周目
 * 达成的」，而周目边界只可能出现在**空会话面的新会话**上——引擎重启后恢复的会话带着整份历史，
 * 不会再走一次 begin，也就不会重复计数。
 */
export class EndingsLedger {
  private readonly playthroughOf = new Map<string, number>();

  /** 告警出口（坏账本、写盘失败）。由 `index.ts` 接到宿主 logger。 */
  constructor(private readonly onWarn: (message: string) => void) {}

  /**
   * 新周目开始：账本 `playthroughs` +1，返回本周目号。**同一会话只登记一次**（`onInput` 在同一轮里
   * 可能被调多次）。
   */
  beginPlaythrough(dir: string, sessionId: string): number {
    const cached = this.playthroughOf.get(sessionId);
    if (cached !== undefined) return cached;
    const data = this.load(dir);
    if (data === null) {
      // 账本坏了：仍让本周目有号（内存里给一个），但不覆盖坏文件。
      const fallback = (this.playthroughOf.get(sessionId) ?? 0) + 1;
      this.playthroughOf.set(sessionId, fallback);
      return fallback;
    }
    data.playthroughs += 1;
    if (this.save(dir, data)) this.playthroughOf.set(sessionId, data.playthroughs);
    return data.playthroughs;
  }

  /**
   * 结局达成：以 id 去重，`reachedIn` 取并集、`lastAt` 刷新。
   *
   * `name` / `subtitle` / `summary` 三个归档字段全在 `EndingAttrs` 上（`<ending …/>` 自带），
   * 所以这条落账**一次到位**——不像从前要等收束散文那一轮回来再回填。缺省字段不抹掉旧值
   * （同一个结局重达成时，模型这一轮没写 `summary` 不该把上一轮的归档摘要清空）。
   */
  recordEnding(dir: string, sessionId: string, attrs: EndingAttrs): void {
    const data = this.load(dir);
    if (data === null) return;
    const playthrough = this.playthroughOf.get(sessionId) ?? Math.max(1, data.playthroughs);
    const now = new Date().toISOString();
    const prev = data.endings[attrs.id];
    const reachedIn = Array.from(new Set([...(prev?.reachedIn ?? []), playthrough])).sort((a, b) => a - b);
    data.endings[attrs.id] = {
      ...(attrs.name ? { name: attrs.name } : prev?.name ? { name: prev.name } : {}),
      ...(attrs.subtitle ? { subtitle: attrs.subtitle } : prev?.subtitle ? { subtitle: prev.subtitle } : {}),
      firstAt: prev?.firstAt ?? now,
      lastAt: now,
      reachedIn,
      ...(attrs.summary ? { summary: attrs.summary } : prev?.summary ? { summary: prev.summary } : {}),
    };
    this.save(dir, data);
  }

  /** 会话收摊：周目映射跟着丢。 */
  forget(sessionId: string): void {
    this.playthroughOf.delete(sessionId);
  }

  private load(dir: string): EndingsLedgerData | null {
    try {
      return readLedger(dir);
    } catch (error) {
      this.onWarn(`[dsh-aivn] 读结局账本失败（这一次不记账，文件原样保留）：${describe(error)}`);
      return null;
    }
  }

  private save(dir: string, data: EndingsLedgerData): boolean {
    try {
      writeLedger(dir, data);
      return true;
    } catch (error) {
      this.onWarn(`[dsh-aivn] 写结局账本失败：${describe(error)}`);
      return false;
    }
  }
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
