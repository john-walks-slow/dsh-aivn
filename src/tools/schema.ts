/**
 * 中立 IR → dsh-tools 的参数 schema：**插件自己的编译器**。
 *
 * 编译器住在宿主里，因为这一步需要宿主的 SDK——包不认识 `defineTool`，也不认识 TypeBox（规约 R5）。
 * 换来的好处是两边共用同一份参数真相源：字段的形状、约束、说明只写在能力里。
 *
 * dsh 的 schema 是**受约束的子集**（`json-schema.ts` 的 `assertSupportedJsonSchema`）：没有
 * `minLength` / `maximum` 这类关键字。所以共享字段只允许写共同子集（包单测盯着），确实想要的
 * 收紧由服务端的 face 用 `tighten` 声明——那属于它那一面，不流到这里。
 */
import type { ParameterPropertySpec, ParameterSchemaSpec } from '@deepseek-ai/dsh-tools';
import type { FieldMap, SchemaNode } from '@aivn/agent';

/** 共同子集之外的关键字在这里当场拒绝，别让它悄悄落到 dsh 的校验器上。 */
const HOST_ONLY_KEYWORDS = ['minLength', 'maxLength', 'minimum', 'maximum'];

export function toDsh(fields: FieldMap): ParameterSchemaSpec {
	const out: Record<string, ParameterPropertySpec> = {};
	for (const [name, field] of Object.entries(fields)) {
		out[name] = field.required === true ? { ...toDshNode(field), required: true } : toDshNode(field);
	}
	return out;
}

function toDshNode(node: SchemaNode): ParameterPropertySpec {
	for (const keyword of HOST_ONLY_KEYWORDS) {
		if (keyword in node) throw new Error(`共享字段用了 dsh 不认的关键字 ${keyword}：收紧应当写在宿主的 face 上`);
	}
	const annotations = {
		...(node.description !== undefined ? { description: node.description } : {}),
		...(node.title !== undefined ? { title: node.title } : {}),
	};
	if ('oneOf' in node) {
		const branches = node.oneOf.map(toDshNode);
		if (branches.length < 2) throw new Error('oneOf 至少要两支');
		return { oneOf: branches as [ParameterPropertySpec, ParameterPropertySpec, ...ParameterPropertySpec[]], ...annotations };
	}
	switch (node.type) {
		case 'string':
			return {
				type: 'string',
				...annotations,
				...(node.enum ? { enum: [...node.enum] } : {}),
				...(node.const !== undefined ? { const: node.const } : {}),
			};
		case 'integer':
			return {
				type: 'integer',
				...annotations,
				...(node.enum ? { enum: [...node.enum] } : {}),
				...(node.const !== undefined ? { const: node.const } : {}),
			};
		case 'number':
			return {
				type: 'number',
				...annotations,
				...(node.enum ? { enum: [...node.enum] } : {}),
				...(node.const !== undefined ? { const: node.const } : {}),
			};
		case 'boolean':
			return { type: 'boolean', ...annotations, ...(node.const !== undefined ? { const: node.const } : {}) };
		case 'array':
			return { type: 'array', ...annotations, ...(node.items ? { items: toDshNode(node.items) } : {}) };
		case 'object':
			return {
				type: 'object',
				...annotations,
				properties: toDsh(node.properties),
				additionalProperties: node.additionalProperties ?? true,
			};
		case 'json':
			return { type: 'json', ...annotations };
	}
}
