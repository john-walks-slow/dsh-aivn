/**
 * dsh-aivn 的插件配置卡：侧边栏 **Plugins 页 → dsh-aivn** 里那张表单。
 *
 * 宿主半边把 17 个字段都标成了 `.volatile()`（`src/index.ts` 的 `Config`），于是这张卡改完
 * **就地生效**：写入落进当前 profile 的 `cordis.patch.yml`，loader 原位提交进运行中的引用，
 * 插件重建能力面——不用重启 dsh，也不用再手改配置文件。
 *
 * 分两段：P0 决定能力开不开（Key 与后端），P1 是默认就能用的口味项。四个密钥字段
 * （Fish / Exa / 生图 / 配乐）宿主管线上全程脱敏，这里只报「配没配」；它们走
 * `SettingsSecretSpec` 而不是普通字段——留空 = 保持现状，清除要显式点卡片上的按钮。
 *
 * 表单不自绘：外框、字段、保存/放弃与「已改」标记都用 `@deepseek-ai/dsh-client-ui-primitives`
 * 那套（与 DSH 自己的设置页同一份实现），这里只负责把 17 个字段摆成两段、附上中文说明。
 */
import { Switch, SettingsForm, SettingsFormModel, SettingsSecretField, SettingsValueField } from '@deepseek-ai/dsh-client-ui-primitives';
import type {
	SettingsFieldSpec,
	SettingsFieldState,
	SettingsFormActions,
	SettingsFormScope,
	SettingsFormShell,
	SettingsSecretSpec,
} from '@deepseek-ai/dsh-client-ui-primitives';
import type { SettingsDescribeFace } from '@deepseek-ai/dsh-client-ui-settings/client';
import type { FC } from 'react';
import type { SnapshotStore } from '@deepseek-ai/dsh-client-store';

/** 表单的 namespace = profile 里这一行的条目 id（`cordis.patch.yml` 的 `- id: dsh-aivn`）。 */
export const NS = 'dsh-aivn';

/** 生图接口格式的三个取值（宿主 schema 的 union 同此）。 */
const IMAGE_FORMATS = ['gemini', 'openai', 'modelslab'] as const;

type FieldKind = 'text' | 'number' | 'secret' | 'switch' | 'format';

interface Field {
	readonly field: string;
	readonly label: string;
	readonly hint: string;
	readonly kind: FieldKind;
	/** 这一格存的是一个列表（逗号分隔的 key 池），而不是单个值。 */
	readonly multiple?: boolean;
}

interface Group {
	readonly title: string;
	readonly blurb: string;
	readonly fields: readonly Field[];
}

/**
 * 字段表。顺序就是界面上的顺序：P0 在前（不配就没有那项能力），P1 在后（默认能用，按口味调）。
 *
 * `hint` 是给用户看的一句话后果，与 README 的字段表同口径。
 */
const GROUPS: readonly Group[] = [
	{
		title: 'P0 · 决定能力开不开',
		blurb: '不配就没有那项能力：对应的工具不注册，两个预设的提示词里也不提它。Key 类字段只写不回显，留空 = 保持现状。',
		fields: [
			{
				field: 'ttsKeys',
				multiple: true,
				label: 'Fish Audio Key',
				hint: '配了才有台词语音与 list_voices；多把用逗号分隔（轮询分摊额度）。留空可走环境变量 DSH_AIVN_TTS_KEYS',
				kind: 'secret',
			},
			{
				field: 'searchKeys',
				multiple: true,
				label: 'Exa 检索 Key',
				hint: '配了才有 web_search；多把用逗号分隔。留空可走环境变量 DSH_AIVN_EXA_KEYS',
				kind: 'secret',
			},
			{
				field: 'imageFormat',
				label: '生图接口格式',
				hint: `协议形状，不是产品名：${IMAGE_FORMATS.join(' / ')}`,
				kind: 'format',
			},
			{
				field: 'imageBaseUrl',
				label: '生图接口地址',
				hint: '与「生图模型」都给齐才算配好生图——只给其一等于没有',
				kind: 'text',
			},
			{
				field: 'imageModel',
				label: '生图模型',
				hint: '同上；配齐后两个预设都拿到 generate_image / generate_asset；cut / import_asset 不门控，没配生图也能抠底与登记外部图',
				kind: 'text',
			},
			{
				field: 'imageApiKey',
				label: '生图 API Key',
				hint: '本机网关不校验就不用填（不带鉴权头）',
				kind: 'secret',
			},
			{
				field: 'musicBaseUrl',
				label: '配乐接口地址',
				hint: '与「配乐模型」都给齐才有 generate_bgm（只有 Gemini 形状）',
				kind: 'text',
			},
			{
				field: 'musicModel',
				label: '配乐模型',
				hint: '同上',
				kind: 'text',
			},
			{
				field: 'musicApiKey',
				label: '配乐 API Key',
				hint: '同一份网关的 Key，可留空',
				kind: 'secret',
			},
			{
				field: 'shell',
				label: 'Agent 命令行（bash）',
				hint: '开了才给两个预设装 tool-bash。bash 是预设的「一行」，改完只对**新建**会话生效',
				kind: 'switch',
			},
		],
	},
	{
		title: 'P1 · 默认就能用，按口味调',
		blurb: '这一段的默认值都是挑过的，改之前先想清楚为什么改。',
		fields: [
			{ field: 'ttsBaseUrl', label: 'TTS 接口地址', hint: '换自建网关时改', kind: 'text' },
			{
				field: 'ttsModel',
				label: 'TTS 模型',
				hint: '换模型后同一句话不再命中旧音频缓存（缓存键含模型）',
				kind: 'text',
			},
			{
				field: 'ttsConcurrency',
				label: 'TTS 并发上限',
				hint: '同时合成的上限：摊往返，又不把额度一次打空',
				kind: 'number',
			},
			{ field: 'searchBaseUrl', label: 'Exa 接口地址', hint: '换代理 / 镜像时改', kind: 'text' },
			{
				field: 'imageSize',
				label: '生图档位',
				hint: '1K / 2K / 4K（K 大写），或字面像素 1536x1024；gemini 形状只认档位',
				kind: 'text',
			},
			{ field: 'imageTimeoutMs', label: '生图超时（毫秒）', hint: '出图慢就调大', kind: 'number' },
			{ field: 'musicTimeoutMs', label: '配乐超时（毫秒）', hint: '一首曲子实测约 84 秒', kind: 'number' },
		],
	},
];

/** 全部字段名，按界面顺序。 */
const FIELD_NAMES: readonly string[] = GROUPS.flatMap((group) => group.fields.map((field2) => field2.field));

/** 密钥字段（只写、不回显、留空保持现状）。 */
const SECRET_FIELDS = new Set(['ttsKeys', 'searchKeys', 'imageApiKey', 'musicApiKey']);

/** 这些字段存的是「有没有配」而不是值本身，顶部那行能力状态灯据此现算。 */
const LIGHTS: readonly { label: string; hint: string; on: (value: Record<string, unknown>, configured: ReadonlySet<string>) => boolean }[] = [
	{ label: '语音', hint: '台词语音与音色库', on: (_value, configured) => configured.has('ttsKeys') },
	{ label: '检索', hint: 'web_search', on: (_value, configured) => configured.has('searchKeys') },
	{
		label: '生图',
		hint: '地址与模型都给齐才算',
		on: (value) => filled(value.imageBaseUrl) && filled(value.imageModel),
	},
	{
		label: '配乐',
		hint: '地址与模型都给齐才算',
		on: (value) => filled(value.musicBaseUrl) && filled(value.musicModel),
	},
	{ label: '命令行', hint: '只对新会话生效', on: (value) => value.shell === true },
];

/** 非空字符串（配置里的空串与没配等价）。 */
function filled(value: unknown): boolean {
	return typeof value === 'string' && value.trim() !== '';
}

/** 表单外框的文案（宿主表单模型要的那几项）。 */
const LABELS = {
	unavailable: '宿主没有在服务 dsh-aivn 的配置命名空间。',
	readOnly: '这份部署的配置是只读的。',
	saveFailed: '没存上：宿主拒绝了这次写入（可能是别处先改过）。',
	save: '保存',
	saving: '保存中…',
};

/** 生图格式：只收三个值，写错就地挡下（`invalid` 会红在控件上）。 */
function formatSpec(field: string): SettingsFieldSpec {
	return {
		field,
		format: (value) => (typeof value === 'string' ? value : ''),
		parse: (text) => {
			const value = text.trim();
			return (IMAGE_FORMATS as readonly string[]).includes(value) ? { kind: 'set', value } : undefined;
		},
	};
}

/** 开关：草稿用 `'true'` / `'false'` 两个字符串表示。 */
function switchSpec(field: string): SettingsFieldSpec {
	return {
		field,
		format: (value) => (value === true ? 'true' : 'false'),
		parse: (text) => ({ kind: 'set', value: text === 'true' }),
	};
}

function specFor(kind: FieldKind, field: string): SettingsFieldSpec {
	if (kind === 'number') return numberSpec(field);
	if (kind === 'switch') return switchSpec(field);
	if (kind === 'format') return formatSpec(field);
	return textSpec(field);
}

/** 文本字段：空草稿 = 清除（回到 schema 默认值）。 */
function textSpec(field: string): SettingsFieldSpec {
	return {
		field,
		format: (value) => (typeof value === 'string' ? value : ''),
		parse: (text) => (text === '' ? { kind: 'clear' } : { kind: 'set', value: text }),
	};
}

/** 数字字段：空草稿 = 清除；非数字草稿挡下保存。 */
function numberSpec(field: string): SettingsFieldSpec {
	return {
		field,
		format: (value) => (typeof value === 'number' ? String(value) : ''),
		parse: (text) => {
			if (text === '') return { kind: 'clear' };
			const value = Number(text);
			return Number.isFinite(value) ? { kind: 'set', value } : undefined;
		},
	};
}

/** 卡片的一格：草稿状态 + 该格是不是已存着密钥。 */
export interface CardFieldState extends SettingsFieldState {
	readonly configured: boolean;
}

/** 卡片渲染要的全部状态（控制器 `bind` 出来的那份投影）。 */
export interface AivnCardState extends SettingsFormShell {
	readonly fields: Readonly<Record<string, CardFieldState>>;
	readonly lights: readonly { readonly label: string; readonly hint: string; readonly on: boolean }[];
}

/**
 * 一张卡片的控制器：把配置作用域 + 脱敏边车折成组件的读面，并把表单动作注入槽位。
 *
 * 与 web-search 那张同样的分工：`SettingsFormModel` 管草稿与保存，这里只多做两件事——
 * 从 describe 镜像读「哪些密钥已配置」，以及从现值算顶部那行能力状态灯。
 */
export class AivnConfigController {
	private readonly form: SettingsFormModel<Record<string, unknown>>;
	private readonly store: SnapshotStore<AivnCardState>;
	private readonly unsubscribeMirror: () => void;

	constructor(
		private readonly scope: SettingsFormScope<Record<string, unknown>>,
		private readonly describe: SettingsDescribeFace,
	) {
		const specs = GROUPS.flatMap((group) => group.fields)
			.filter((field) => !SECRET_FIELDS.has(field.field))
			.map((field) => specFor(field.kind, field.field));
		// 密钥不进 section（宿主管线上被脱敏）：它们走「只写控件」，写入直接对作用域发 mutate。
		const secrets: SettingsSecretSpec[] = GROUPS.flatMap((group) => group.fields)
			.filter((field) => SECRET_FIELDS.has(field.field))
			.map((field) => ({
				field: field.field,
				write: (text) => this.writeSecret(field, text),
			}));

		this.form = new SettingsFormModel(scope, specs, secrets);
		this.store = this.form.bind(() => this.projection());
		this.unsubscribeMirror = describe.subscribe(() => this.store.set(this.projection()));
	}

	/** 密钥写入：留空 = 什么都不写（保持现状）；非空 = 整组替换。 */
	private async writeSecret(field: Field, text: string): Promise<boolean> {
		if (text.trim() === '') return true;
		const value = field.multiple === true ? splitKeys(text) : text.trim();
		return this.scope.mutate([{ op: 'set', path: [field.field], value }]);
	}

	/** 「清除已存 Key」按钮：走 unset，让该字段回到「没配」。 */
	clearSecret(field: string): Promise<boolean> {
		return this.scope.mutate([{ op: 'unset', path: [field] }]);
	}

	private projection(): AivnCardState {
		const value = (this.scope.getSnapshot().value ?? {}) as Record<string, unknown>;
		const namespace = this.describe
			.getSnapshot()
			.view?.namespaces.find((row) => row.ns === NS);
		const configured = new Set(
			(namespace?.secrets ?? [])
				.filter((secret) => secret.set)
				.map((secret) => secret.path[0] ?? '')
				.filter((field) => field !== ''),
		);

		const fields: Record<string, CardFieldState> = {};
		for (const field of FIELD_NAMES) {
			fields[field] = { ...this.form.field(field), configured: configured.has(field) };
		}

		return {
			...this.form.shell(),
			fields,
			lights: LIGHTS.map((light) => ({ label: light.label, hint: light.hint, on: light.on(value, configured) })),
		};
	}

	/** 槽位注册要注入的那张面（`hooks` 会被框架折成 `useAivnCard`）。 */
	inject(): SettingsFormActions & {
		hooks: { aivnCard: SnapshotStore<AivnCardState> };
		clearSecret: (field: string) => void;
	} {
		return {
			hooks: { aivnCard: this.store },
			...this.form.actions(),
			clearSecret: (field) => {
				void this.clearSecret(field);
			},
		};
	}

	dispose(): void {
		this.unsubscribeMirror();
		this.form.dispose();
	}
}

/** 逗号 / 空格 / 换行分隔的 key 列表。 */
function splitKeys(text: string): string[] {
	return text
		.split(/[\s,，]+/)
		.map((key) => key.trim())
		.filter((key) => key !== '');
}

/** 槽位给这张卡的 props：宿主那半边给的视图信息 + 注入面。 */
export interface AivnConfigCardProps {
	readonly view: 'summary' | 'page';
	readonly useAivnCard: <S>(select: (state: AivnCardState) => S) => S;
	readonly save: () => void;
	readonly discard: () => void;
	readonly edit: (field: string, text: string) => void;
	readonly resetField: (field: string) => void;
	readonly clearSecret: (field: string) => void;
}

/** 一句话摘要（Plugins 页还没展开这张卡时显示的那行）。 */
const SUMMARY = 'Fish / Exa Key、生图与配乐后端、命令行开关';

/** 这张卡。 */
export const AivnConfigCard: FC<AivnConfigCardProps> = (props) => {
	const state = props.useAivnCard((value) => value);
	if (props.view === 'summary') return <>{SUMMARY}</>;
	const disabled = !state.writable;

	return (
		<SettingsForm labels={LABELS} state={state} onSave={props.save} onDiscard={props.discard}>
			<p className="aivn-config-lights">
				{state.lights.map((light) => (
					<span key={light.label} title={light.hint} data-on={light.on ? 'true' : 'false'}>
						{light.label} {light.on ? '开' : '关'}
					</span>
				))}
				<span className="aivn-config-lights-note">（按当前配置算；环境变量里的 Key 不在这里显示）</span>
			</p>
			{GROUPS.map((group) => (
				<section key={group.title}>
					<h4>{group.title}</h4>
					<p>{group.blurb}</p>
					{group.fields.map((field) => (
						<FieldRow
							key={field.field}
							field={field}
							state={state.fields[field.field]}
							disabled={disabled}
							edit={props.edit}
							resetField={props.resetField}
							clearSecret={props.clearSecret}
						/>
					))}
				</section>
			))}
		</SettingsForm>
	);
};

/** 一格的渲染：密钥、开关、其余都是文本/数字控件。 */
function FieldRow(props: {
	field: Field;
	state: CardFieldState;
	disabled: boolean;
	edit: (field: string, text: string) => void;
	resetField: (field: string) => void;
	clearSecret: (field: string) => void;
}) {
	const { field, state, disabled } = props;

	if (field.kind === 'secret') {
		return (
			<div className="aivn-config-secret">
				<SettingsSecretField
					id={`aivn-config-${field.field}`}
					label={field.label}
					hint={field.hint}
					text={state.text}
					configured={state.configured}
					stateLabel={state.configured ? '已配置' : '未配置'}
					disabled={disabled}
					onEdit={(text) => props.edit(field.field, text)}
				/>
				{state.configured ? (
					<button type="button" disabled={disabled} onClick={() => props.clearSecret(field.field)}>
						清除已存 Key
					</button>
				) : null}
			</div>
		);
	}

	if (field.kind === 'switch') {
		return (
			<div className="aivn-config-switch">
				<Switch
					checked={state.text === 'true'}
					disabled={disabled}
					label={field.label}
					onChange={(next) => props.edit(field.field, next ? 'true' : 'false')}
				/>
				<p>{field.hint}</p>
			</div>
		);
	}

	return (
		<SettingsValueField
			id={`aivn-config-${field.field}`}
			label={field.label}
			hint={field.hint}
			overriddenLabel="已改"
			resetLabel="恢复默认"
			invalidLabel={field.kind === 'number' ? '要一个数字' : '取值不对'}
			numeric={field.kind === 'number'}
			disabled={disabled}
			text={state.text}
			overridden={state.overridden}
			invalid={state.invalid}
			onEdit={(text) => props.edit(field.field, text)}
			onReset={() => props.resetField(field.field)}
		/>
	);
}
