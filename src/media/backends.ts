/**
 * 按配置装配生图与音乐后端。
 *
 * 与 AIVN `imageFactory.ts` / `musicFactory.ts` 同一个形状，只把「enabled 开关」换成
 * **配全就算有**：地址与模型都给了才建客户端，否则返回 null——工具不注册、persona 走 fallback
 * 章（AIVN 那边 `can.image` 在后端缺失时仍为真，是本插件刻意修掉的一处不一致）。
 *
 * 密钥可给可不给：本机网关（flow2api）常常不校验，给了才带鉴权头。
 *
 * 生图按**接口格式**而不是按产品名装配：`gemini` / `openai` / `modelslab` 三种协议形状，
 * 接的是官方 API 还是自建网关由 `baseUrl` 决定。音乐没有 format 分支——音频只有 Gemini 形状。
 */
import type { ImageBackend } from './image';
import { GeminiImageGen } from './gemini-image';
import { ModelsLabImageGen } from './modelslab-image';
import { OpenAiImageGen } from './openai-image';
import { GeminiMusicGen, type MusicBackend } from './music';

export const IMAGE_FORMATS = ['gemini', 'openai', 'modelslab'] as const;
export type ImageFormat = (typeof IMAGE_FORMATS)[number];

export interface ImageConfigShape {
	format: ImageFormat;
	baseUrl: string;
	apiKey: string;
	model: string;
	/** 档位（`1K`/`2K`/`4K`，K 大写）或字面像素（`1536x1024`）。 */
	size: string;
	timeoutMs: number;
}

export interface MusicConfigShape {
	baseUrl: string;
	apiKey: string;
	model: string;
	timeoutMs: number;
}

export interface MediaBackends {
	image: ImageBackend | null;
	music: MusicBackend | null;
}

/** 地址与模型缺一不可；只有其一 = 没配全，当作没有这个后端。 */
function configured(baseUrl: string, model: string): boolean {
	return baseUrl.trim() !== '' && model.trim() !== '';
}

export function createMediaBackends(config: {
	image?: Partial<ImageConfigShape>;
	music?: Partial<MusicConfigShape>;
}): MediaBackends {
	const image = config.image;
	const music = config.music;

	return {
		image:
			image && configured(image.baseUrl ?? '', image.model ?? '')
				? createImageBackend({
						format: image.format ?? 'gemini',
						baseUrl: image.baseUrl!,
						apiKey: image.apiKey ?? '',
						model: image.model!,
						size: image.size ?? '1K',
						timeoutMs: image.timeoutMs ?? 180_000,
					})
				: null,
		music:
			music && configured(music.baseUrl ?? '', music.model ?? '')
				? new GeminiMusicGen({
						baseUrl: music.baseUrl!,
						apiKey: music.apiKey ?? '',
						model: music.model!,
						timeoutMs: music.timeoutMs ?? 240_000,
					})
				: null,
	};
}

export function createImageBackend(opts: ImageConfigShape): ImageBackend {
	const shared = {
		baseUrl: opts.baseUrl,
		apiKey: opts.apiKey,
		model: opts.model,
		timeoutMs: opts.timeoutMs,
	};
	if (opts.format === 'gemini') return new GeminiImageGen({ ...shared, size: opts.size });
	if (opts.format === 'modelslab') return new ModelsLabImageGen({ ...shared, size: opts.size });
	return new OpenAiImageGen({ ...shared, size: opts.size });
}
