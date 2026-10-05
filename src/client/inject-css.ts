/**
 * 把一份 CSS 文本挂到 `<head>` 上，同一个 id 只挂一次。
 *
 * DSH 的客户端 bundle 是 `__ModuleLoader__` 装载的一段脚本，没有插 `<link>` 的地方，
 * 样式得自己挂（canonical 做法见 `@deepseek-ai/dsh-client-ui-agent-preset`）。
 * 按 id 去重：热重载与多视图并存时不会叠出第二份。
 */
export function injectCss(id: string, text: string): void {
	if (typeof document === 'undefined') return;
	if (document.querySelector(`style[data-plugin-css="${id}"]`) !== null) return;

	const tag = document.createElement('style');
	tag.dataset.plugin = 'dsh-aivn';
	tag.dataset.pluginCss = id;
	tag.textContent = text;
	document.head.appendChild(tag);
}
