/**
 * Gemini 原生生图（`POST {base}/v1beta/models/{model}:generateContent`）。
 *
 * 官方 Gemini API、flow2api、cpa 都认这个形状：提示词与垫图都塞进 `contents[].parts[]`，
 * 画幅与档位走 `generationConfig.imageConfig`（驼峰；网关报错报文里的路径是
 * `generation_config.image_config.aspect_ratio`，同一处）。
 *
 * 三条铁律：
 * - **垫图只在 Gemini 格式下走得通**（`inlineData`，排在提示词之后）；
 * - **画幅写错不一定报错**：上游不认的画幅会静默回一张横图，所以落盘前还有一道 `assertCanvas`；
 * - **档位只能填 `1K / 2K / 4K`**（官方大小写敏感），像素尺寸由 `aspectRatio` × 档位决定。
 *
 * 模型名不做白名单：这里是通用格式，填哪家的模型名由部署方决定。flow2api 那条路的画幅档位写在
 * **模型别名**里（`gemini-3.1-flash-image-portrait-2k` 这种），`imageConfig` 会被忽略。
 */
import {
	IMAGE_ASPECTS,
	IMAGE_SIZES,
	higherTier,
	imageSizeText,
	parseImageSize,
	type GeneratedImage,
	type ImageBackend,
	type ImageRequest,
	type ImageSize,
} from './image';

export interface GeminiImageOptions {
	baseUrl: string;
	/** 不给就不带鉴权头（本机网关常常不校验）。 */
	apiKey?: string;
	model: string;
	/** 配置里的尺寸原文：档位（像素尺寸由画幅与档位共同决定，这个格式没有 WxH 入参）。 */
	size: string;
	timeoutMs: number;
}

interface GeminiPart {
	text?: string;
	inlineData?: { mimeType?: string; data?: string };
	fileData?: { mimeType?: string; fileUri?: string };
}

interface GeminiCandidate {
	content?: { parts?: GeminiPart[] };
	finishReason?: string;
	finishMessage?: string;
}

export class GeminiImageGen implements ImageBackend {
	private readonly tier: ImageSize;

	constructor(private readonly opts: GeminiImageOptions) {
		const spec = parseImageSize(opts.size);
		if (spec.kind !== 'tier') {
			throw new Error(
				`gemini 格式的档位只认 ${IMAGE_SIZES.join(' / ')}，像素尺寸由画幅 × 档位决定，` +
					`填不了 ${imageSizeText(spec)}。要按像素出图请把配置里的 image.format 换成 openai。`,
			);
		}
		this.tier = spec.tier;
	}

	/**
	 * 档位 = 本次请求的尺寸（剧目覆盖或配置）与本次请求下限里更高的那个
	 * （立绘要 2K 抠底，背景 / CG 跟配置）。
	 */
	private tierOf(req: ImageRequest): ImageSize {
		const base = req.size ? geminiTier(req.size) : this.tier;
		return req.minTier ? higherTier(base, req.minTier) : base;
	}

	async generate(req: ImageRequest): Promise<GeneratedImage> {
		const aspectRatio = req.aspectRatio ?? '16:9';
		if (!IMAGE_ASPECTS.includes(aspectRatio)) {
			throw new Error(`画幅（${aspectRatio}）不受支持。可用：${IMAGE_ASPECTS.join(' / ')}`);
		}
		const model = req.model ?? this.opts.model;
		const res = await fetch(
			`${this.opts.baseUrl.replace(/\/+$/, '')}/v1beta/models/${encodeURIComponent(model)}:generateContent`,
			{
				method: 'POST',
				headers: {
					...(this.opts.apiKey ? { 'x-goog-api-key': this.opts.apiKey } : {}),
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					contents: [{ role: 'user', parts: toParts(req) }],
					generationConfig: {
						responseModalities: ['IMAGE'],
						imageConfig: { aspectRatio, imageSize: this.tierOf(req) },
					},
				}),
				signal: AbortSignal.timeout(this.opts.timeoutMs),
			},
		);
		if (!res.ok) {
			const body = await res.text().catch(() => '');
			throw new Error(`生图失败 HTTP ${res.status}：${body.slice(0, 300)}`);
		}
		return parseImage(await res.json().catch(() => null));
	}
}

/** 剧目覆盖的尺寸也必须是档位：Gemini 这一侧没有「指定 WxH」这个入参。 */
function geminiTier(raw: string): ImageSize {
	const spec = parseImageSize(raw);
	if (spec.kind !== 'tier') {
		throw new Error(
			`gemini 格式的档位只认 ${IMAGE_SIZES.join(' / ')}，像素尺寸由画幅 × 档位决定，` +
				`填不了 ${imageSizeText(spec)}。要按像素出图请把配置里的 image.format 换成 openai。`,
		);
	}
	return spec.tier;
}

/** 提示词在前、垫图在后——垫图的顺序决定它对提示词的约束强度。 */
function toParts(req: ImageRequest): GeminiPart[] {
	const parts: GeminiPart[] = [{ text: req.prompt }];
	for (const ref of req.references ?? []) {
		parts.push({ inlineData: { mimeType: ref.mimeType, data: ref.data.toString('base64') } });
	}
	return parts;
}

/**
 * 三种返回形态要报三种错：网关的取图步骤失败时只给地址不给字节（配置问题），
 * 被内容策略拒绝时只回一句话（用户得知道为什么），混成「响应无图片」会让人查错方向。
 */
function parseImage(body: unknown): GeneratedImage {
	const candidate = (body as { candidates?: GeminiCandidate[] } | null)?.candidates?.[0];
	const parts = candidate?.content?.parts;
	if (!Array.isArray(parts)) throw new Error('出图响应里没有 candidates');

	const inline = parts.find((part) => part?.inlineData?.data);
	if (inline?.inlineData?.data) {
		return {
			data: Buffer.from(inline.inlineData.data, 'base64'),
			mimeType: inline.inlineData.mimeType ?? 'image/jpeg',
		};
	}

	const file = parts.find((part) => part?.fileData?.fileUri);
	if (file?.fileData) {
		throw new Error(`只回了文件地址（${file.fileData.fileUri}）没有图像字节，网关的取图步骤没跑通`);
	}

	const text = parts.find((part) => typeof part?.text === 'string')?.text;
	if (text) throw new Error(`未出图：${text.slice(0, 200)}`);

	const why =
		candidate?.finishMessage ??
		candidate?.finishReason ??
		(body as { promptFeedback?: { blockReason?: string } } | null)?.promptFeedback?.blockReason;
	throw new Error(`出图响应里没有图像内容${why ? `：${String(why).slice(0, 200)}` : ''}`);
}
