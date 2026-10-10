/**
 * 生图后端契约 —— 实现在 `@aivn/agent`（`media/image.ts`），两个宿主共用一份。
 *
 * 这个文件以前是那份契约的第二份拷贝（另一份在服务端的 `imageBackend.ts`），两边靠人同步。
 * 这里只做转出，让插件既有的 `from './image'` 引用点原样成立。
 */
export {
	aspectMatches,
	extOf,
	IMAGE_ASPECTS,
	IMAGE_SIZES,
	imageSizeText,
	parseImageSize,
	sizeOfImage,
	sniffImageMime,
	tierArea,
} from '@aivn/agent';
export type {
	GeneratedImage,
	ImageAspect,
	ImageBackend,
	ImageRequest,
	ImageSize,
	ImageSizeSpec,
} from '@aivn/agent';
