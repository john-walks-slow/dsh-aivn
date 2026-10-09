/**
 * 网络图片下载 —— 判据与实现都在 `@aivn/agent`（`media/web-image.ts`），两个宿主共用一份。
 *
 * 这个文件以前是那份 SSRF 判据的第二份拷贝（另一份在服务端的 `webImage.ts`）；内网判据
 * 抄错一次就是一个洞，所以它只该有一份。这里只剩转出：插件的出口代理不自己配，
 * DSH 进程带着 `NODE_USE_ENV_PROXY` 与 `HTTP(S)_PROXY`，包缺省的全局 fetch 自己走。
 */
export { fetchWebImage, MAX_WEB_IMAGE_BYTES, readCapped, webImageBase } from '@aivn/agent';
export type { WebImage, WebImageFetcher } from '@aivn/agent';
