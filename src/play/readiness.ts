/**
 * 剧目自查：这座剧目**读不读得出来**、还缺什么。
 *
 * 判据与报告都在 `@aivn/agent` 的 `readiness/play.ts`——独立服务端的 `get_readiness`
 * 与 DSH 侧的搭台助手/剧作家自查用的是同一套（判据只有一份，工具与注入才不会漂）。
 */
export type { PlayReadiness } from '@aivn/agent';
export { readPlayReadiness, renderReadiness } from '@aivn/agent';
