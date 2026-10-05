/**
 * 构建期把样式当文本 import（见 `build.mjs` 的 `loader: { '.css': 'text' }`）。
 *
 * 插件的 CSS 不走打包器的样式管道：DSH 的客户端 bundle 是 `__ModuleLoader__` 装载的
 * 一段脚本，没有注入 `<link>` 的地方，样式得自己挂到 `<head>` 上（canonical 做法见
 * `@deepseek-ai/dsh-client-ui-agent-preset`）。所以这里要的是字符串，不是副作用模块。
 */
declare module '*.css' {
	const text: string;
	export default text;
}
