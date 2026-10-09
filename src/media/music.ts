/**
 * 音乐生成后端契约 —— 实现在 `@aivn/agent`（`media/music.ts`），两个宿主共用一份。
 *
 * 这个文件以前是那份契约的第二份拷贝（另一份在服务端的 `musicBackend.ts`），两边靠人同步。
 * 这里只做转出，让插件既有的 `from './music'` 引用点原样成立。
 */
export { GeminiMusicGen, MUSIC_EXT_BY_MIME, parseMusic } from '@aivn/agent';
export type { GeneratedMusic, GeminiMusicOptions, MusicBackend, MusicRequest } from '@aivn/agent';
