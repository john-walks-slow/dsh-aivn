// src/beat-guard.ts
import { createUserMessage } from "@deepseek-ai/dsh-llm";

// src/session.ts
var PLAYWRITER_PRESET = "aivn-playwriter";
var STAGEHAND_PRESET = "aivn-stagehand";
function attachedAgent(ctx, sessionId) {
  return ctx.agents.get(sessionId);
}
function sessionWorkspace(ctx, sessionId) {
  return attachedAgent(ctx, sessionId)?.session?.header?.cwd;
}
function sessionPreset(ctx, sessionId) {
  const agent = attachedAgent(ctx, sessionId);
  if (!agent) return void 0;
  return ctx.agentPresets.composedPreset(agent.ctx) ?? agent.session?.header?.agentPreset;
}
async function resolveAgent(ctx, sessionId) {
  const attached = attachedAgent(ctx, sessionId);
  if (attached) return attached;
  const found = await ctx.sessionController.resolveAgent(sessionId);
  return "error" in found ? void 0 : found.agent;
}

// src/beat-guard.ts
var NUDGE = [
  "\u8FD9\u4E00\u8F6E\u7684\u5267\u672C\u6B63\u6587\u5DF2\u7ECF\u5199\u5B8C\uFF0C\u8BF7\u73B0\u5728\u8C03\u7528 beat_done \u6536\u675F\u672C\u8F6E\uFF08\u53C2\u6570\u5C31\u662F\u8FD9\u4E00\u8F6E\u7684\u51FA\u53E3\uFF1A",
  "\u7ED9\u73A9\u5BB6\u9009\u9879\u5C31\u586B options\uFF0C\u60F3\u7ED9\u81EA\u7531\u56DE\u7B54\u7684\u53E3\u5B50\u5C31\u586B placeholder\uFF0C\u8FD9\u4E00\u6BB5\u81EA\u7136\u6F14\u5B8C\u5C31\u7A7A\u53C2\u6570\u8C03\u7528\uFF09\u3002",
  "\u4E0D\u8981\u518D\u5199\u65B0\u7684\u5267\u672C\u5185\u5BB9\uFF0C\u4E0D\u8981\u91CD\u5199\u5DF2\u7ECF\u6F14\u51FA\u7684\u90E8\u5206\u3002"
].join("");
var BeatGuard = class {
  beats = /* @__PURE__ */ new Map();
  /** 一轮开始（`agent/status` → running）。 */
  begin(sessionId) {
    this.beats.set(sessionId, { lines: false, closed: false, nudged: false });
  }
  /** 这一轮写出了可演的内容。 */
  noteLines(sessionId) {
    const beat = this.beats.get(sessionId);
    if (beat) beat.lines = true;
  }
  /** `beat_done` 调过了。 */
  close(sessionId) {
    const beat = this.beats.get(sessionId);
    if (beat) beat.closed = true;
  }
  /** 该不该追这一轮；该追时同时记下「追过了」，所以同一个问题只会问一次。 */
  claim(sessionId) {
    const beat = this.beats.get(sessionId);
    if (!beat || beat.nudged || beat.closed || !beat.lines) return false;
    beat.nudged = true;
    return true;
  }
};
function installBeatGuard(ctx, guard, injected) {
  return ctx.on("agent/turn-stopping", (payload) => {
    const sessionId = String(payload.agent.id);
    if (sessionPreset(ctx, sessionId) !== PLAYWRITER_PRESET) return;
    if (!guard.claim(sessionId)) return;
    const agent = ctx.agents.get(payload.agent.id);
    if (!agent) return;
    const message = createUserMessage({ content: [{ type: "text", text: NUDGE }], source: { kind: "user" } });
    injected.remember(message.id);
    agent.steer(message);
  });
}

// src/commands.ts
import { basename as basename2 } from "node:path";

// src/scaffold.ts
import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname, join as join2 } from "node:path";

// src/play.ts
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// ../stage-ai/packages/core/dist/dsl/spec.js
var DSL_TAGS = [
  "scene",
  "actor",
  "say",
  "narrate",
  "thought",
  "sfx",
  "cg",
  "comment"
];
var VOID_TAGS = /* @__PURE__ */ new Set(["scene", "actor", "sfx", "cg"]);
var COMMENT_TAG = "comment";
var LEGACY_TAGS = /* @__PURE__ */ new Set(["stop", "option", "preload_asset"]);
var ACTOR_SHOTS = ["wide", "normal", "close", "extreme"];
function isActorShot(value) {
  return typeof value === "string" && ACTOR_SHOTS.includes(value);
}
var ACTOR_ANCHORS = ["bottom", "center", "top"];
function isActorAnchor(value) {
  return typeof value === "string" && ACTOR_ANCHORS.includes(value);
}

// ../stage-ai/packages/core/dist/dsl/parser.js
var MAX_WARNINGS = 200;
var WARN_DETAIL_LIMIT = 120;
var NAME_CHAR_RE = /^[a-z_]/;
var CLOSE_TAG_RE = /^<\/([a-z_]+)\s*>/;
var ATTR_RE = /^\s*([a-z_]+)\s*=\s*(?:"([^"]*)"|'([^']*)')\s*/;
var BARE_ATTR_RE = /^\s*([a-z_]+)(?=[\s\/]|$)/;
function parseAttrs(source) {
  const attrs = /* @__PURE__ */ new Map();
  let rest = source;
  while (rest.trim() !== "") {
    const match = ATTR_RE.exec(rest);
    if (match) {
      const key = match[1];
      const value = match[2] ?? match[3] ?? "";
      attrs.set(key, value);
      rest = rest.slice(match[0].length);
      continue;
    }
    const bare = BARE_ATTR_RE.exec(rest);
    if (!bare)
      return null;
    attrs.set(bare[1], "");
    rest = rest.slice(bare[0].length);
  }
  return attrs;
}
var StageDslParser = class {
  onEvent;
  buffer = "";
  openWrap = null;
  /** 正在一条 <comment> 里：正文吞掉，且除 </comment> 外的标签都不许开工。 */
  commentParse = false;
  warnings = [];
  constructor(onEvent) {
    this.onEvent = onEvent;
  }
  feed(chunk) {
    this.buffer += chunk;
    this.run();
  }
  endMessage() {
    if (this.buffer !== "") {
      const lt = this.buffer.indexOf("<");
      if (lt === -1) {
        this.emitText(this.buffer);
      } else {
        if (lt > 0)
          this.emitText(this.buffer.slice(0, lt));
        const rest = this.buffer.slice(lt);
        if (/^<\/?[a-z_]/.test(rest)) {
          this.warn("malformed_tag", `\u6D88\u606F\u8FB9\u754C\u4E22\u5F03\u672A\u5B8C\u6210\u6807\u7B7E\u7247\u6BB5: ${preview(rest)}`);
        } else {
          this.emitText(rest);
        }
      }
    }
    this.buffer = "";
    this.commentParse = false;
    if (this.openWrap)
      this.closeWrap();
  }
  resetBeat() {
    this.openWrap = null;
    this.commentParse = false;
    this.buffer = "";
  }
  /**
   * 取走并清空解析告警。
   *
   * 与 resetBeat 分开是刻意的：resetBeat 只复位解析状态，告警是一次性投递的信——
   * 编排器在轮次收束处取走它，回灌给模型自修正；留在原地只会和下一轮的告警混成一堆。
   */
  takeWarnings() {
    return this.warnings.splice(0, this.warnings.length);
  }
  run() {
    for (; ; ) {
      const lt = this.buffer.indexOf("<");
      if (lt === -1) {
        this.emitText(this.buffer);
        this.buffer = "";
        return;
      }
      if (lt > 0) {
        this.emitText(this.buffer.slice(0, lt));
        this.buffer = this.buffer.slice(lt);
      }
      if (this.buffer.length < 2)
        return;
      if (this.buffer[1] === "/") {
        if (this.consumeCloseTag())
          return;
        continue;
      }
      if (!NAME_CHAR_RE.test(this.buffer.slice(1))) {
        this.emitText("<");
        this.buffer = this.buffer.slice(1);
        continue;
      }
      const nameEnd = this.buffer.slice(1).search(/[^a-z_]/);
      if (nameEnd === -1)
        return;
      const name2 = this.buffer.slice(1, 1 + nameEnd);
      if (!isKnownTag(name2)) {
        this.emitText("<");
        this.buffer = this.buffer.slice(1);
        continue;
      }
      const gt = this.buffer.indexOf(">");
      if (gt === -1)
        return;
      this.consumeOpenTag(name2, gt);
    }
  }
  /** 消费一个闭合标签。返回 true 表示需要更多数据（等待），false 表示已消费。 */
  consumeCloseTag() {
    const match = CLOSE_TAG_RE.exec(this.buffer);
    if (!match) {
      const gt = this.buffer.indexOf(">");
      if (gt === -1)
        return true;
      this.warn("malformed_tag", `\u4E22\u5F03\u7578\u5F62\u95ED\u5408\u6807\u7B7E: ${preview(this.buffer.slice(0, gt + 1))}`);
      this.buffer = this.buffer.slice(gt + 1);
      return false;
    }
    const name2 = match[1];
    if (!isKnownTag(name2)) {
      this.emitText("<");
      this.buffer = this.buffer.slice(1);
      return false;
    }
    this.buffer = this.buffer.slice(match[0].length);
    if (this.commentParse && name2 === COMMENT_TAG) {
      this.commentParse = false;
      return false;
    }
    if (this.openWrap && name2 === this.openWrap.tag) {
      this.closeWrap();
      return false;
    }
    this.warn("mismatched_close", `\u95ED\u5408\u6807\u7B7E </${name2}> \u65E0\u5BF9\u5E94\u6253\u5F00\u6807\u7B7E\uFF0C\u4E22\u5F03`);
    return false;
  }
  consumeOpenTag(name2, gt) {
    const raw = this.buffer.slice(0, gt + 1);
    this.buffer = this.buffer.slice(gt + 1);
    let inner = raw.slice(1, -1);
    let selfClosing = false;
    if (inner.endsWith("/")) {
      selfClosing = true;
      inner = inner.slice(0, -1);
    }
    inner = inner.slice(name2.length);
    const attrs = inner.trim() === "" ? /* @__PURE__ */ new Map() : parseAttrs(inner);
    if (attrs === null) {
      this.warn("malformed_tag", `\u5C5E\u6027\u89E3\u6790\u5931\u8D25\uFF0C\u4E22\u5F03\u6807\u7B7E: ${preview(raw)}`);
      return;
    }
    this.handleTag(name2, attrs, selfClosing);
  }
  handleTag(name2, attrs, selfClosing) {
    if (LEGACY_TAGS.has(name2)) {
      this.warn("legacy_tag", `<${name2}> \u5DF2\u6539\u4E3A\u5DE5\u5177\u8C03\u7528\uFF0C\u4E22\u5F03: ${preview(this.rawOf(name2, attrs, selfClosing))}`);
      return;
    }
    if (this.commentParse) {
      if (name2 === COMMENT_TAG) {
        this.warn("malformed_tag", "<comment> \u5D4C\u5957\uFF0C\u5FFD\u7565\u5185\u5C42");
        return;
      }
      this.warn("malformed_tag", `<${name2}> \u51FA\u73B0\u5728 <comment> \u5185\uFF0C\u4E22\u5F03`);
      return;
    }
    if (VOID_TAGS.has(name2) && !selfClosing) {
      this.warn("malformed_tag", `<${name2}> \u4E3A\u6307\u4EE4\u6807\u7B7E\uFF0C\u5E94\u4E3A\u81EA\u95ED\u5408\uFF08\u5176\u6B63\u6587\u5C06\u6309\u88F8\u6587\u672C\u4E22\u5F03\uFF09`);
    }
    switch (name2) {
      case COMMENT_TAG: {
        if (selfClosing)
          return;
        if (this.openWrap) {
          this.warn("auto_closed", `<comment> \u524D\u81EA\u52A8\u95ED\u5408\u672A\u95ED\u5408\u7684 <${this.openWrap.tag}>`);
          this.closeWrap();
        }
        this.commentParse = true;
        return;
      }
      case "scene": {
        this.emit({
          kind: "scene",
          ...pick(attrs, ["bg", "bgm", "ambient", "transition"]),
          // 裸属性（`<scene clear/>`）与显式值（`clear="true"`）都认成开新场；
          // 写了 `clear="false"` / `clear="0"` 才是不清（给模板条件拼串留的出口）。
          ...isTruthyFlag(attrs.get("clear")) ? { clear: true } : {},
          ...this.pickVolume(attrs, ["bgm_volume", "ambient_volume"])
        });
        return;
      }
      case "actor": {
        const id = attrs.get("id");
        if (!id)
          return this.dropTag("actor", "\u7F3A id");
        const shotRaw = attrs.get("shot");
        const anchorRaw = attrs.get("anchor");
        const variant = attrs.get("variant") ?? attrs.get("expression") ?? attrs.get("state");
        this.emit({
          kind: "actor",
          id,
          ...pick(attrs, ["pos", "action", "leave"]),
          ...variant ? { variant } : {},
          ...shotRaw && isActorShot(shotRaw) ? { shot: shotRaw } : {},
          ...anchorRaw && isActorAnchor(anchorRaw) ? { anchor: anchorRaw } : {}
        });
        return;
      }
      case "sfx": {
        const src = attrs.get("src");
        if (!src)
          return this.dropTag("sfx", "\u7F3A src");
        const volumeAttr = attrs.get("volume");
        const volume = volumeAttr === void 0 ? void 0 : Number(volumeAttr);
        if (volumeAttr !== void 0 && !Number.isFinite(volume)) {
          return this.dropTag("sfx", `volume \u975E\u6570\u5B57: ${volumeAttr}`);
        }
        this.emit({ kind: "sfx", src, volume });
        return;
      }
      case "cg": {
        const id = attrs.get("id");
        if (!id)
          return this.dropTag("cg", "\u7F3A id");
        this.emit({ kind: "cg", id, ...pick(attrs, ["caption"]) });
        return;
      }
      case "say":
      case "narrate":
      case "thought": {
        if (selfClosing)
          return this.dropTag(name2, "\u5305\u88F9\u6807\u7B7E\u4E0D\u80FD\u81EA\u95ED\u5408");
        const id = attrs.get("id");
        if (name2 !== "narrate" && !id)
          return this.dropTag(name2, "\u7F3A id");
        if (this.openWrap) {
          this.warn("nested_wrap", `<${name2}> \u6253\u5F00\u65F6 <${this.openWrap.tag}> \u672A\u95ED\u5408\uFF0C\u81EA\u52A8\u95ED\u5408\u524D\u8005`);
          this.closeWrap();
        }
        this.openWrap = { tag: name2, id, mood: attrs.get("mood"), name: attrs.get("name") };
        if (name2 === "say")
          this.emit({ kind: "say_start", id, ...attrs.get("mood") ? { mood: attrs.get("mood") } : {}, ...attrs.get("name") ? { name: attrs.get("name") } : {} });
        else if (name2 === "narrate")
          this.emit({ kind: "narrate_start" });
        else
          this.emit({ kind: "thought_start", id });
        return;
      }
    }
  }
  /**
   * 音量类属性：0–1 的数字。
   *
   * 与 sfx 的差别在这里是刻意的——scene 一个标签带好几样东西，bgm_volume 写错就整条丢弃，
   * 换景会连背景一起丢掉。所以这里只丢坏属性、留好属性，并挂一条 warning 让模型自己改回来。
   */
  pickVolume(attrs, keys) {
    const out = {};
    for (const key of keys) {
      const raw = attrs.get(key);
      if (raw === void 0)
        continue;
      const value = Number(raw);
      if (!Number.isFinite(value)) {
        this.warn("malformed_tag", `${key} \u975E\u6570\u5B57\uFF0C\u5FFD\u7565\u8BE5\u5C5E\u6027: ${raw}`);
        continue;
      }
      out[key] = Math.min(1, Math.max(0, value));
    }
    return out;
  }
  /** 旧标签原文（供 warning 定位用）：只拼头部，正文一律不留。 */
  rawOf(name2, attrs, selfClosing) {
    const body = [...attrs].map(([k, v]) => ` ${k}="${v}"`).join("");
    return `<${name2}${body}${selfClosing ? "/" : ""}>`;
  }
  emitText(text2) {
    if (text2 === "")
      return;
    if (this.commentParse)
      return;
    if (this.openWrap) {
      const { tag } = this.openWrap;
      if (tag === "say")
        this.emit({ kind: "say_text", delta: text2 });
      else if (tag === "narrate")
        this.emit({ kind: "narrate_text", delta: text2 });
      else
        this.emit({ kind: "thought_text", delta: text2 });
      return;
    }
    if (text2.trim() !== "")
      this.warn("orphan_text", `\u6807\u7B7E\u5916\u88F8\u6587\u672C\u4E22\u5F03: ${preview(text2)}`);
  }
  closeWrap() {
    const wrap = this.openWrap;
    if (!wrap)
      return;
    this.openWrap = null;
    if (wrap.tag === "say")
      this.emit({ kind: "say_end" });
    else if (wrap.tag === "narrate")
      this.emit({ kind: "narrate_end" });
    else
      this.emit({ kind: "thought_end" });
  }
  emit(event) {
    this.onEvent(event);
  }
  dropTag(name2, reason) {
    this.warn("malformed_tag", `<${name2}> \u4E22\u5F03: ${reason}`);
  }
  warn(type, detail) {
    if (this.warnings.length >= MAX_WARNINGS)
      return;
    this.warnings.push({ type, detail });
  }
};
function isKnownTag(name2) {
  return DSL_TAGS.includes(name2) || LEGACY_TAGS.has(name2);
}
function isTruthyFlag(value) {
  if (value === void 0)
    return false;
  const v = value.trim().toLowerCase();
  if (v === "" || v === "true" || v === "1" || v === "yes")
    return true;
  return false;
}
function pick(attrs, keys) {
  const out = {};
  for (const key of keys) {
    const value = attrs.get(key);
    if (value !== void 0)
      out[key] = value;
  }
  return out;
}
function preview(text2) {
  const trimmed = text2.trim();
  return trimmed.length > WARN_DETAIL_LIMIT ? `${trimmed.slice(0, WARN_DETAIL_LIMIT)}\u2026` : trimmed;
}

// ../stage-ai/packages/core/dist/play/config.js
var CRAFT_BEAT_LENGTHS = ["short", "medium", "long"];
var CRAFT_STOP_OPTIONS = ["two", "three", "four", "free"];
var CRAFT_BACKGROUND_SOURCES = ["library-first", "library", "generate"];
var CRAFT_CG_SOURCES = ["library", "generate", "off"];
var CRAFT_SPRITE_SOURCES = ["generate", "off"];
var CRAFT_AUDIO_SOURCES = ["library", "off"];
var DEFAULT_CRAFT = {
  beatLength: "medium",
  stopOptions: "three",
  assets: { background: "library-first", cg: "generate", sprite: "generate", audio: "library" }
};
function resolveCraft(craft) {
  const assets = craft?.assets;
  return {
    beatLength: craft?.beatLength ?? DEFAULT_CRAFT.beatLength,
    stopOptions: craft?.stopOptions ?? DEFAULT_CRAFT.stopOptions,
    assets: {
      background: assets?.background ?? DEFAULT_CRAFT.assets.background,
      cg: assets?.cg ?? DEFAULT_CRAFT.assets.cg,
      sprite: assets?.sprite ?? DEFAULT_CRAFT.assets.sprite,
      audio: assets?.audio ?? DEFAULT_CRAFT.assets.audio
    }
  };
}
var THINKING_LEVELS = ["off", "low", "medium", "high"];
var IMAGE_APPROVALS = ["ask", "auto"];
function parsePlayConfig(raw) {
  const data = raw;
  if (!data.id || !data.title) {
    throw new Error("play.json \u7F3A\u5C11\u5FC5\u586B\u5B57\u6BB5\uFF08id/title\uFF09");
  }
  const coverRaw = data.cover;
  const cover = coverRaw?.kind === "backgrounds" || coverRaw?.kind === "cg" ? typeof coverRaw.id === "string" && coverRaw.id.trim() !== "" ? { kind: coverRaw.kind, id: coverRaw.id.trim() } : void 0 : void 0;
  const agents = parseAgentConfig(data.agents);
  const craft = parseCraft(data.craft);
  const image = parseImageConfig(data.image);
  return {
    id: data.id,
    title: data.title,
    characters: Array.isArray(data.characters) ? data.characters.map(parseCharacter) : void 0,
    ...cover ? { cover } : {},
    ...data.voiceLanguage?.trim() ? { voiceLanguage: data.voiceLanguage.trim() } : {},
    ...data.scriptLanguage?.trim() ? { scriptLanguage: data.scriptLanguage.trim() } : {},
    ...typeof data.defaultVoiceId === "string" && /^[0-9a-f]{32}$/i.test(data.defaultVoiceId.trim()) ? { defaultVoiceId: data.defaultVoiceId.trim() } : {},
    opening: data.opening ?? "\uFF08\u6E38\u620F\u5F00\u59CB\uFF0C\u8BF7\u6F14\u51FA\u7B2C\u4E00\u8F6E\uFF09",
    initialState: data.initialState ?? { turn: 0, affinity: {}, flags: {} },
    initialScene: data.initialScene ?? "\u672A\u5B9A",
    ...craft ? { craft } : {},
    ...image ? { image } : {},
    ...agents ? { agents } : {}
  };
}
function oneOf(allowed, value) {
  return typeof value === "string" && allowed.includes(value) ? value : void 0;
}
function parseCraft(raw) {
  if (!raw || typeof raw !== "object")
    return void 0;
  const out = {};
  const beatLength = oneOf(CRAFT_BEAT_LENGTHS, raw.beatLength);
  if (beatLength)
    out.beatLength = beatLength;
  const stopOptions = oneOf(CRAFT_STOP_OPTIONS, raw.stopOptions);
  if (stopOptions)
    out.stopOptions = stopOptions;
  const assets = parseAssetSources(raw.assets);
  if (assets)
    out.assets = assets;
  return Object.keys(out).length > 0 ? out : void 0;
}
function parseAssetSources(raw) {
  if (!raw || typeof raw !== "object")
    return void 0;
  const out = {};
  const background = oneOf(CRAFT_BACKGROUND_SOURCES, raw.background);
  if (background)
    out.background = background;
  const cg = oneOf(CRAFT_CG_SOURCES, raw.cg);
  if (cg)
    out.cg = cg;
  const sprite = oneOf(CRAFT_SPRITE_SOURCES, raw.sprite);
  if (sprite)
    out.sprite = sprite;
  const audio = oneOf(CRAFT_AUDIO_SOURCES, raw.audio);
  if (audio)
    out.audio = audio;
  return Object.keys(out).length > 0 ? out : void 0;
}
function parseImageConfig(raw) {
  if (!raw || typeof raw !== "object")
    return void 0;
  const out = {};
  if (typeof raw.model === "string" && raw.model.trim() !== "")
    out.model = raw.model.trim();
  if (typeof raw.size === "string" && raw.size.trim() !== "")
    out.size = raw.size.trim();
  return Object.keys(out).length > 0 ? out : void 0;
}
function parseCharacter(card) {
  return { ...card };
}
function parseAgentConfig(raw) {
  if (!raw || typeof raw !== "object")
    return void 0;
  const out = {};
  for (const role of ["playwriter", "workshop"]) {
    const source = raw[role];
    if (!source || typeof source !== "object")
      continue;
    const settings = {};
    if (typeof source.model === "string" && source.model.trim() !== "")
      settings.model = source.model.trim();
    if (source.thinking && THINKING_LEVELS.includes(source.thinking)) {
      settings.thinking = source.thinking;
    }
    if (role === "workshop" && typeof source.prompt === "string" && source.prompt.trim() !== "") {
      settings.prompt = source.prompt;
    }
    const imageApproval = oneOf(IMAGE_APPROVALS, source.imageApproval);
    if (role === "workshop" && imageApproval)
      settings.imageApproval = imageApproval;
    if (role === "playwriter") {
      if (typeof source.nsfwModel === "string" && source.nsfwModel.trim() !== "") {
        settings.nsfwModel = source.nsfwModel.trim();
      }
      if (source.nsfwThinking && THINKING_LEVELS.includes(source.nsfwThinking)) {
        settings.nsfwThinking = source.nsfwThinking;
      }
      if (typeof source.nsfwPrompt === "string" && source.nsfwPrompt.trim() !== "") {
        settings.nsfwPrompt = source.nsfwPrompt.trim();
      }
    }
    if (Array.isArray(source.capabilities)) {
      const ids = source.capabilities.filter((n) => typeof n === "string").map((n) => n.trim()).filter((n) => n !== "");
      settings.capabilities = [...new Set(ids)];
    }
    if (Object.keys(settings).length > 0)
      out[role] = settings;
  }
  return Object.keys(out).length > 0 ? out : void 0;
}

// ../stage-ai/packages/core/dist/play/assets.js
function text(value) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : void 0;
}
function describeAsset(meta) {
  const parts = [];
  const description = text(meta.description);
  if (description)
    parts.push(description);
  if (meta.tags?.length)
    parts.push(meta.tags.join("\u3001"));
  if (meta.mood?.length)
    parts.push(`\u60C5\u7EEA\uFF1A${meta.mood.join("\u3001")}`);
  if (meta.scene?.length)
    parts.push(`\u9002\u7528\uFF1A${meta.scene.join("\u3001")}`);
  if (meta.durationSec !== void 0)
    parts.push(`\u7EA6 ${meta.durationSec} \u79D2`);
  if (meta.loop === true)
    parts.push("\u53EF\u5FAA\u73AF");
  if (meta.volume !== void 0 && meta.volume !== 1)
    parts.push(`\u5EFA\u8BAE\u97F3\u91CF ${meta.volume}`);
  return parts.join("\uFF5C");
}

// ../stage-ai/packages/core/dist/play/characterCard.js
var FENCE = "---";
var SCALAR_FIELDS = ["id", "name", "sprite", "voice", "voiceId"];
function spriteIdOf(id, head = {}) {
  const bound = head.sprite?.trim();
  return bound ? bound : id;
}
function parseCharacterCard(text2) {
  const normalized = text2.replace(/^\ufeff/, "").replace(/\r\n/g, "\n");
  if (!normalized.startsWith(`${FENCE}
`))
    return { body: normalized.trim() };
  const end = normalized.indexOf(`
${FENCE}`, FENCE.length);
  if (end < 0)
    return { body: normalized.trim() };
  const head = parseHead(normalized.slice(FENCE.length + 1, end + 1));
  return { ...head, body: normalized.slice(end + 1 + FENCE.length).replace(/^\n+/, "").trim() };
}
function parseHead(block) {
  const head = {};
  for (const raw of block.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#"))
      continue;
    const colon = line.indexOf(":");
    if (colon < 0)
      continue;
    const key = line.slice(0, colon).trim();
    if (!SCALAR_FIELDS.includes(key))
      continue;
    const value = unquote(line.slice(colon + 1).trim());
    if (value !== "")
      head[key] = value;
  }
  return head;
}
function unquote(value) {
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1);
    }
  }
  if (value.length >= 2 && value.startsWith("'") && value.endsWith("'"))
    return value.slice(1, -1).replace(/''/g, "'");
  return value;
}

// ../stage-ai/packages/core/dist/speech/voices.js
var LANGUAGE_LABELS = {
  ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 / \u963F\u62C9\u4F2F\u8BED",
  bn: "\u09AC\u09BE\u0982\u09B2\u09BE / \u5B5F\u52A0\u62C9\u8BED",
  cy: "Cymraeg / \u5A01\u5C14\u58EB\u8BED",
  de: "Deutsch / \u5FB7\u8BED",
  el: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC / \u5E0C\u814A\u8BED",
  en: "English / \u82F1\u8BED",
  es: "Espa\xF1ol / \u897F\u73ED\u7259\u8BED",
  fa: "\u0641\u0627\u0631\u0633\u06CC / \u6CE2\u65AF\u8BED",
  fr: "Fran\xE7ais / \u6CD5\u8BED",
  he: "\u05E2\u05D1\u05E8\u05D9\u05EA / \u5E0C\u4F2F\u6765\u8BED",
  hi: "\u0939\u093F\u0928\u094D\u0926\u0940 / \u5370\u5730\u8BED",
  hu: "Magyar / \u5308\u7259\u5229\u8BED",
  id: "Bahasa Indonesia / \u5370\u5C3C\u8BED",
  it: "Italiano / \u610F\u5927\u5229\u8BED",
  ja: "\u65E5\u672C\u8A9E / \u65E5\u8BED",
  ko: "\uD55C\uAD6D\uC5B4 / \u97E9\u8BED",
  lv: "Latvie\u0161u / \u62C9\u8131\u7EF4\u4E9A\u8BED",
  ms: "Bahasa Melayu / \u9A6C\u6765\u8BED",
  nl: "Nederlands / \u8377\u5170\u8BED",
  no: "Norsk / \u632A\u5A01\u8BED",
  pl: "Polski / \u6CE2\u5170\u8BED",
  pt: "Portugu\xEAs / \u8461\u8404\u7259\u8BED",
  ro: "Rom\xE2n\u0103 / \u7F57\u9A6C\u5C3C\u4E9A\u8BED",
  ru: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 / \u4FC4\u8BED",
  sv: "Svenska / \u745E\u5178\u8BED",
  sw: "Kiswahili / \u65AF\u74E6\u5E0C\u91CC\u8BED",
  ta: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD / \u6CF0\u7C73\u5C14\u8BED",
  th: "\u0E44\u0E17\u0E22 / \u6CF0\u8BED",
  tl: "Tagalog / \u4ED6\u52A0\u7984\u8BED",
  tr: "T\xFCrk\xE7e / \u571F\u8033\u5176\u8BED",
  uk: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430 / \u4E4C\u514B\u5170\u8BED",
  ur: "\u0627\u0631\u062F\u0648 / \u4E4C\u5C14\u90FD\u8BED",
  vi: "Ti\u1EBFng Vi\u1EC7t / \u8D8A\u5357\u8BED",
  zh: "\u4E2D\u6587",
  zu: "isiZulu / \u7956\u9C81\u8BED"
};
function languageLabel(code) {
  return LANGUAGE_LABELS[code] ?? code;
}

// src/play.ts
var PLAY_FILE = "play.json";
async function loadPlay(dir) {
  if (!dir) return null;
  let raw;
  try {
    raw = await readFile(join(dir, PLAY_FILE), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
  return parsePlay(raw, dir);
}
function loadPlaySync(dir) {
  if (!dir) return null;
  let raw;
  try {
    raw = readFileSync(join(dir, PLAY_FILE), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
  return parsePlay(raw, dir);
}
function parsePlay(raw, dir) {
  try {
    return { dir, config: parsePlayConfig(JSON.parse(raw)) };
  } catch (error) {
    const why = error instanceof Error ? error.message : String(error);
    throw new Error(`${join(dir, PLAY_FILE)} \u8BFB\u4E0D\u51FA\u6765\uFF1A${why}`);
  }
}

// src/scaffold.ts
var ID_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N}._-]*$/u;
async function scaffoldPlay(dir, spec) {
  const title = spec.title.trim();
  if (title === "") throw new Error("\u5267\u76EE\u540D\u4E0D\u80FD\u662F\u7A7A\u7684");
  const explicit = (spec.id ?? "").trim();
  const id = explicit || idFromDir(dir);
  if (!ID_PATTERN.test(id)) {
    throw new Error(
      explicit ? `\u5267\u76EE id \u4E0D\u5408\u6CD5\uFF1A${explicit}\uFF08\u5B57\u6BCD\u6216\u6570\u5B57\u5F00\u5934\uFF0C\u4E0D\u542B\u7A7A\u767D\u4E0E\u8DEF\u5F84\u5206\u9694\u7B26\uFF09` : `\u5DE5\u4F5C\u76EE\u5F55\u540D\u300C${basename(dir)}\u300D\u6D3E\u751F\u4E0D\u51FA\u5408\u6CD5\u7684\u5267\u76EE id\uFF0C\u8BF7\u663E\u5F0F\u7ED9\u4E00\u4E2A\uFF08\u5B57\u6BCD\u6216\u6570\u5B57\u5F00\u5934\uFF0C\u4E0D\u542B\u7A7A\u767D\u4E0E\u8DEF\u5F84\u5206\u9694\u7B26\uFF09`
    );
  }
  const characters = (spec.characters ?? []).map(normalizeCharacter);
  const playPath = join2(dir, PLAY_FILE);
  const written = [];
  const kept = [];
  const config = { id, title };
  if (characters.length > 0) config.characters = characters.map(({ id: cid, name: name2 }) => ({ id: cid, name: name2 ?? cid }));
  const opening = spec.opening?.trim();
  if (opening) config.opening = opening;
  await mkdir(dir, { recursive: true });
  try {
    await writeFile(playPath, `${JSON.stringify(config, null, 2)}
`, { encoding: "utf8", flag: "wx" });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    throw new Error(
      `${dir} \u91CC\u5DF2\u7ECF\u6709 ${PLAY_FILE} \u4E86\u2014\u2014\u8FD9\u91CC\u5DF2\u7ECF\u662F\u4E00\u5EA7\u5267\u76EE\uFF0C\u8D77\u65B0\u5267\u76EE\u8981\u6362\u4E00\u4E2A\u7A7A\u76EE\u5F55\u5F00\u4F1A\u8BDD\uFF1B\u8981\u6539\u8FD9\u4E00\u5EA7\u5C31\u76F4\u63A5\u5199\u5B83\u7684\u6587\u4EF6`
    );
  }
  written.push(PLAY_FILE);
  const premise = spec.premise?.trim();
  if (premise) await record(join2(dir, "memory", "always", "premise.md"), `memory/always/premise.md`, `${premise}
`);
  for (const character of characters) {
    const source = cardSource(character);
    if (source === "") continue;
    await record(join2(dir, "characters", `${character.id}.md`), `characters/${character.id}.md`, source);
  }
  return { dir, id, written, kept };
  async function record(path, relative2, body) {
    await mkdir(dirname(path), { recursive: true });
    try {
      await writeFile(path, body, { encoding: "utf8", flag: "wx" });
      written.push(relative2);
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      kept.push(relative2);
    }
  }
}
function idFromDir(dir) {
  return basename(dir).replace(/[^\p{L}\p{N}._-]+/gu, "-").replace(/^[^\p{L}\p{N}]+/u, "").replace(/[._-]+$/u, "");
}
function normalizeCharacter(spec) {
  const id = spec.id.trim();
  if (!ID_PATTERN.test(id)) throw new Error(`\u89D2\u8272 id \u4E0D\u5408\u6CD5\uFF1A${spec.id}\uFF08\u5B57\u6BCD\u6216\u6570\u5B57\u5F00\u5934\uFF0C\u4E0D\u542B\u7A7A\u767D\u4E0E\u8DEF\u5F84\u5206\u9694\u7B26\uFF09`);
  return { id, name: spec.name?.trim() || void 0, persona: spec.persona?.trim() || void 0 };
}
function cardSource(character) {
  const head = character.name ? `---
name: ${yamlScalar(character.name)}
---
` : "";
  return `${head}${character.persona ? `${character.persona}
` : ""}`;
}
function yamlScalar(value) {
  return /^[\p{L}\p{N}][\p{L}\p{N} ._-]*$/u.test(value) ? value : JSON.stringify(value);
}

// src/commands.ts
var DESCRIPTION = "\u628A\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55\u7ACB\u6210\u4E00\u5EA7\u5267\u76EE\uFF08\u5199 play.json \u4E0E\u9AA8\u67B6\u6587\u4EF6\uFF09";
function installPlayCommands(ctx) {
  return ctx.commands.register({
    name: "new-play",
    description: DESCRIPTION,
    input: { hint: "\u5267\u76EE\u540D\uFF08\u4E0D\u5199\u5C31\u53D6\u5DE5\u4F5C\u76EE\u5F55\u540D\uFF09" },
    async handler({ agent, rawInput }) {
      const dir = agent.session?.header?.cwd;
      if (!dir) return { kind: "error", text: "\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5DE5\u4F5C\u76EE\u5F55\uFF0C\u53D6\u4E0D\u5230\u5267\u76EE\u6839\u3002" };
      const title = rawInput.trim() || basename2(dir);
      try {
        const result = await scaffoldPlay(dir, { title });
        const lines = [`\u5DF2\u628A ${result.dir} \u7ACB\u6210\u5267\u76EE\u300A${title}\u300B\uFF08id: ${result.id}\uFF09\u3002`];
        if (result.kept.length > 0) lines.push(`\u5DF2\u7ECF\u6709\u3001\u8FD9\u4EFD\u6CA1\u52A8\uFF1A${result.kept.join("\u3001")}`);
        lines.push(`\u65B0\u5199\u4E0B\uFF1A${result.written.join("\u3001")}`);
        lines.push("\u63A5\u4E0B\u6765\u5207\u5230\u300C\u821E\u53F0\u300D\u9875\u7B7E\u5C31\u80FD\u5F00\u6F14\uFF1B\u60F3\u5148\u8865\u8BBE\u5B9A\u4E0E\u89D2\u8272\u5361\u5C31\u627E\u642D\u53F0\u52A9\u624B\u3002");
        return { kind: "success", text: lines.join("\n") };
      } catch (error) {
        return { kind: "error", text: error instanceof Error ? error.message : String(error) };
      }
    }
  });
}

// src/hub.ts
var KEEPALIVE_MS = 15e3;
var BUFFER_LIMIT = 4e3;
var StageHub = class {
  buffers = /* @__PURE__ */ new Map();
  seqs = /* @__PURE__ */ new Map();
  clients = /* @__PURE__ */ new Map();
  /** 收下一帧舞台 IR：标号、入缓冲、广播。 */
  append(sessionId, event) {
    return this.push(sessionId, { kind: "ir", event });
  }
  /** 收下一帧轮边界。 */
  appendBeat(sessionId, state) {
    return this.push(sessionId, { kind: "beat", state });
  }
  push(sessionId, frame) {
    const seq = (this.seqs.get(sessionId) ?? 0) + 1;
    this.seqs.set(sessionId, seq);
    const framed = { seq, ...frame };
    const buffer = this.buffers.get(sessionId) ?? [];
    buffer.push(framed);
    if (buffer.length > BUFFER_LIMIT) buffer.splice(0, buffer.length - BUFFER_LIMIT);
    this.buffers.set(sessionId, buffer);
    for (const client of this.clients.get(sessionId) ?? []) writeEvent(client.res, framed);
    return framed;
  }
  /** 会话已播出的帧（补推用）。 */
  history(sessionId) {
    return this.buffers.get(sessionId) ?? [];
  }
  /**
   * 把一条 SSE 连接接上这条会话：回完响应头先补推历史，再跟实时。
   * 返回解绑函数，调用方在连接关闭时务必执行。
   */
  subscribe(sessionId, res) {
    res.writeHead(200, {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
      "x-accel-buffering": "no"
    });
    res.write(": open\n\n");
    for (const frame of this.history(sessionId)) writeEvent(res, frame);
    const clients = this.clients.get(sessionId) ?? /* @__PURE__ */ new Set();
    const client = { res, keepalive: setInterval(() => res.write(": keepalive\n\n"), KEEPALIVE_MS) };
    clients.add(client);
    this.clients.set(sessionId, clients);
    return () => {
      clearInterval(client.keepalive);
      clients.delete(client);
      if (clients.size === 0) this.clients.delete(sessionId);
    };
  }
  /**
   * 插件卸载：把还挂着的 SSE 连接与心跳全收掉。
   *
   * 路由是随插件注销的，但连接与 `setInterval` 不会跟着走——不收，卸载之后每 15 秒还有
   * 一堆心跳往已注销的路由上的死连接里写，帧缓冲也一直压在内存里。
   */
  dispose() {
    for (const clients of this.clients.values()) {
      for (const client of clients) {
        clearInterval(client.keepalive);
        client.res.end();
      }
    }
    this.clients.clear();
    this.buffers.clear();
    this.seqs.clear();
  }
};
function writeEvent(res, frame) {
  res.write(`event: frame
data: ${JSON.stringify(frame)}

`);
}

// src/injected.ts
var LIMIT = 32;
var InjectedMessages = class {
  pending = /* @__PURE__ */ new Set();
  /** 记下「这条马上要投的 user 消息是我自己发的」。 */
  remember(id) {
    this.pending.add(id);
    while (this.pending.size > LIMIT) {
      const oldest = this.pending.values().next().value;
      if (oldest === void 0) break;
      this.pending.delete(oldest);
    }
  }
  /** 这条消息是不是引擎自己投的；是就销掉登记（每条只会被认领一次）。 */
  claim(id) {
    return this.pending.delete(id);
  }
};

// src/playwriter/preset.ts
import { homedir } from "node:os";
import { join as join3 } from "node:path";

// src/playwriter/prompt.ts
var ROLE_INTRO = `\u4F60\u662F\u4E00\u90E8\u89C6\u89C9\u5C0F\u8BF4\u7684\u5267\u4F5C\u5BB6\uFF08playwriter\uFF09\uFF0C\u5B9E\u65F6\u4E3A\u4E00\u90E8\u6B63\u5728"\u76F4\u64AD"\u7684\u6E38\u620F\u5199\u5267\u672C\u3002
\u73A9\u5BB6\u662F\u4E3B\u89D2\uFF0C\u4E5F\u662F\u5BFC\u6F14\u3002\u4ED6\u53D1\u6765\u7684\u6BCF\u4E00\u6761\u6D88\u606F\u90FD\u662F\u540C\u4E00\u4E2A\u4E1C\u897F\uFF1A\u8981\u4E48\u662F\u4ED6\u5728\u620F\u91CC\u8BF4\u7684\u8BDD/\u505A\u7684\u9009\u62E9\uFF0C
\u8981\u4E48\u662F\u4ED6\u4EE5\u300COOC\u300D\u5F00\u5934\u7684\u5BFC\u6F14\u6307\u793A\u3002\u4E24\u79CD\u90FD\u7531\u4F60\u7167\u7740\u6F14\u3002`;
var WHERE_THE_PLAY_IS = `# \u5267\u76EE\u5728\u54EA

\u4F60\u7684\u5DE5\u4F5C\u76EE\u5F55\u5C31\u662F\u8FD9\u5EA7\u5267\u76EE\u7684\u6839\u76EE\u5F55\uFF08{{cwd}}\uFF09\uFF1A\`play.json\` \u662F\u5B83\u7684\u8EAB\u4EFD\u8BC1\uFF0C\`characters/\`\u3001
\`assets/\`\u3001\`memory/\` \u90FD\u5728\u5B83\u4E0B\u9762\u3002\u6587\u4EF6\u5DE5\u5177\uFF08read / write / edit / glob / grep\uFF09\u76F4\u63A5\u5BF9\u7740\u8FD9\u4E2A\u76EE\u5F55\u7528\uFF0C
\u4E0B\u9762\u5199\u7684\u8DEF\u5F84\u90FD\u662F\u76F8\u5BF9\u5B83\u7684\u3002

\u8FD9\u5EA7\u5267\u76EE\u8FD8\u7F3A\u4EC0\u4E48\uFF08\u524D\u63D0\u3001\u89D2\u8272\u5361\u3001\u7ACB\u7ED8\u3001\u80CC\u666F\uFF09\uFF0C\u8C03 \`get_readiness\` \u770B\u4E00\u773C\u3002

\u5DE5\u4F5C\u76EE\u5F55\u91CC**\u8FD8\u6CA1\u6709 \`play.json\`** = \u8FD9\u8FD8\u4E0D\u662F\u4E00\u5EA7\u5267\u76EE\uFF1A\u7528 \`create_play\` \u628A\u5B83\u7ACB\u8D77\u6765\uFF0C
\u522B\u5728\u4E00\u4E2A\u7A7A\u76EE\u5F55\u91CC\u51ED\u7A7A\u5199\u5267\u672C\uFF08\u73A9\u5BB6\u5728\u8F93\u5165\u6846\u6572 \`/new-play \u5267\u76EE\u540D\` \u662F\u540C\u4E00\u4EF6\u4E8B\uFF09\u3002\u7ACB\u8D77\u6765\u4E4B\u540E\u5C31\u522B\u518D\u8C03\u5B83\u3002`;
var HOW_I_WORK = `# \u4F60\u600E\u4E48\u5DE5\u4F5C

\u4E00\u8F6E\u4E00\u8F6E\u5730\u5199\uFF1A\u5199\u5B8C\u8FD9\u4E00\u8F6E \u2192 \u8C03 beat_done \u6536\u675F\uFF08\u53C2\u6570\u5C31\u662F\u8FD9\u4E00\u8F6E\u7684\u505C\u6B62\u70B9\uFF09\u2192 \u62FF\u5230\u73A9\u5BB6\u7684\u56DE\u5E94 \u2192 \u63A5\u7740\u5199\u3002
\u4E00\u8F6E\u8BE5\u5199\u591A\u957F\u3001\u7ED9\u51E0\u6761\u9009\u9879\uFF0C\u7167\u672C\u63D0\u793A\u8BCD\u7684\u300A\u5199\u4F5C\u53C2\u6570\u300B\uFF1B\u6587\u98CE\u3001\u7981\u5FCC\u3001\u79F0\u547C\u4E60\u60EF\u7167\u5267\u76EE\u7684\u521B\u4F5C\u53E3\u5F84\u3002

\u505C\u6B62\u70B9\u662F\u8FD9\u4E00\u8F6E\u7684\u51FA\u53E3\uFF0C\u4E0D\u662F\u6545\u4E8B\u7684\u7EC8\u70B9\u2014\u2014\u73A9\u5BB6\u56DE\u5E94\u4E4B\u540E\uFF0C\u6545\u4E8B\u7EE7\u7EED\u7531\u4F60\u5F80\u4E0B\u5199\u3002
\u4E16\u754C\u7EBF\u3001\u5B58\u6863\u3001\u91CD\u6F14\u3001\u8DF3\u8F6C\u662F\u5F15\u64CE\u548C\u73A9\u5BB6\u7684\u4E8B\uFF0C\u4E0D\u7528\u4F60\u64CD\u5FC3\uFF0C\u4E5F\u5199\u4E0D\u8FDB\u5267\u672C\u3002`;
var FORMAT_RULES = `# \u5267\u672C\u683C\u5F0F\uFF08Stage DSL\uFF0C\u5FC5\u987B\u4E25\u683C\u9075\u5B88\uFF09

\u4F60\u8F93\u51FA\u7684\u6BCF\u4E00\u884C\u90FD\u662F\u5267\u672C\u3002\u6307\u4EE4\u7528 XML \u6807\u7B7E\uFF0C\u53F0\u8BCD\u662F\u6807\u7B7E\u5916\u7684\u539F\u751F\u6587\u672C\u3002

## \u573A\u666F\u4E0E\u7ACB\u7ED8\u6307\u4EE4\uFF08\u5FC5\u987B\u51FA\u73B0\u5728\u5BF9\u5E94\u53F0\u8BCD\u4E4B\u524D\uFF09

<scene bg="\u80CC\u666Fid" bgm="\u97F3\u4E50id" bgm_volume="0.4" ambient="\u73AF\u5883\u97F3id" ambient_volume="0.3" transition="fade"/>
<actor id="\u4E3B\u4F53id" variant="\u5DEE\u5206id" shot="\u666F\u522B" action="\u884C\u4E3A\u8BCD" leave="\u9000\u573A"/>
<sfx src="\u97F3\u6548id" volume="0.5"/>
<cg id="cgid" caption="\u63D2\u56FE\u8BF4\u660E"/>

**\u4F4D\u7F6E\u4E0D\u7528\u4F60\u5199\u3002** \u5F15\u64CE\u6309\u5728\u573A\u4EBA\u6570\u81EA\u52A8\u5206\u914D\uFF0C\u7B2C\u4E8C\u4E2A\u4EBA\u8FDB\u573A\u7B2C\u4E00\u4E2A\u4EBA\u81EA\u52A8\u8BA9\u5F00\u3002
\u53EA\u6709\u5728\u4F60\u60F3\u9489\u6B7B\u67D0\u4E2A\u4EBA\uFF08\u6BD4\u5982\u4E3B\u89D2\u56FA\u5B9A\u5728\u4E2D\u95F4\uFF09\u65F6\u624D\u5199 pos="center"\u3002

### \u7ACB\u7ED8\u7684\u56DB\u4E2A\u53EF\u9009\u5C5E\u6027

| \u5C5E\u6027 | \u53D6\u503C | \u4EC0\u4E48\u65F6\u5019\u7528 |
|---|---|---|
| variant | \u7ACB\u7ED8\u76EE\u5F55\u91CC\u5DF2\u6709\u7684\u5DEE\u5206 id | \u6362\u8868\u60C5\u3001\u6362\u72B6\u6001\u3002\u673A\u7532\u53D7\u635F\u3001\u732B\u70B8\u6BDB\u4E0E\u4EBA\u7684\u7B11\u540C\u6837\u662F\u5B83 |
| shot | wide normal close extreme | \u955C\u5934\u8FDC\u8FD1\u3002**\u4E0D\u7ED9\u5C31\u662F\u5168\u8EAB**\uFF0C\u7528\u8FD1\u666F\u53EA\u662F\u628A\u955C\u5934\u63A8\u8FD1 |
| action | \u89C1\u4E0B\u8868 | \u89D2\u8272\u7684\u4E00\u4E2A\u53CD\u5E94\u52A8\u4F5C\uFF0C\u6F14\u4E00\u6B21\u5C31\u7ED3\u675F |
| leave | fade | \u8BA9\u8FD9\u4E2A\u4EBA\u9000\u573A |

**\u53F0\u4E0A\u7684\u4E00\u5207\u540C\u6743**\uFF1A\u4EBA\u3001\u673A\u7532\u3001\u732B\u3001\u9053\u5177\u90FD\u6309\u540C\u4E00\u4E2A id \u5BFB\u5740\uFF0C\u6362\u56FE\u4E00\u5F8B\u8D70 \`variant\`\u2014\u2014\u6CA1\u6709\u300C\u4EBA\u7684 expression\u300D
\u4E0E\u300C\u975E\u4EBA\u7684 state\u300D\u4E4B\u5206\uFF08\u8FD9\u4E24\u4E2A\u65E7\u5C5E\u6027\u540D\u5F15\u64CE\u7167\u8BFB\uFF0C\u4F46\u65B0\u5199\u7684\u5267\u672C\u4E00\u5F8B\u7528 variant\uFF09\u3002\u4EBA\u7684\u7B11\u3001\u673A\u7532\u7684 damaged\u3001
\u732B\u7684 puffed \u90FD\u53EA\u662F\u67D0\u4E2A id \u7684\u4E00\u4E2A\u5DEE\u5206\u3002

\u7ACB\u7ED8\u53D6\u666F\u4E0E\u4F53\u91CF\uFF08\u56FE\u91CC\u753B\u5230\u54EA\u513F\u3001\u53F0\u4E0A\u7AD9\u591A\u5927\uFF09\u662F**\u7D20\u6750\u81EA\u5DF1\u7684\u58F0\u660E**\uFF0C\u5199\u5728\u7D20\u6750\u8868\u91CC\uFF0C\u5267\u672C\u4E0D\u7528\u7BA1\uFF1B
\u5B83\u4EEC\u51B3\u5B9A\u8FD9\u4E2A\u4E3B\u4F53\u51FA\u573A\u65F6\u5360\u591A\u5927\u3001\u8D34\u4E0D\u8D34\u5730\u3002\u5782\u76F4\u5BF9\u9F50\u540C\u7406\u6709\u7D20\u6750\u7EA7\u58F0\u660E\uFF0C
\u60F3\u5728\u67D0\u4E00\u53E5\u91CC\u6539\uFF08\u6BD4\u5982\u8BA9\u60AC\u6D6E\u7269\u98D8\u5230\u753B\u9762\u4E2D\u95F4\uFF09\u624D\u5199 anchor="center"\u2014\u2014\u53EA\u8BA4
bottom\uFF08\u8D34\u5730\uFF0C\u9ED8\u8BA4\uFF09\u3001center\uFF08\u5C45\u4E2D\u60AC\u7A7A\uFF09\u3001top\uFF08\u4ECE\u4E0A\u5782\u4E0B\uFF09\u3002

**\u884C\u4E3A\u8BCD**\u2014\u2014\u5199\u300C\u5979\u600E\u4E48\u52A8\u300D\uFF0C\u4E0D\u5199\u52A8\u753B\u53C2\u6570\uFF1A

| \u8BCD | \u4EC0\u4E48\u573A\u5408 |
|---|---|
| nudge | \u6709\u70B9\u52A8\u6447\u3001\u72B9\u8C6B |
| stagger | \u88AB\u5413\u5230\u3001\u8E09\u8DC4 |
| jump | \u5174\u594B\u3001\u96C0\u8DC3 |
| nod | \u70B9\u5934\u3001\u540C\u610F |
| bow | \u97A0\u8EAC\u3001\u9053\u6B49 |
| turn | \u80CC\u8FC7\u8EAB\u53BB |
| shake | \u53D1\u6296\u3001\u751F\u6C14 |
| sway | \u653E\u677E\u3001\u72AF\u56F0 |

\u540C\u4E00\u65F6\u523B\u53EA\u7ED9\u4E00\u4E2A\u4EBA\u4E00\u4E2A\u884C\u4E3A\u8BCD\u3002

## \u53F0\u8BCD\uFF08\u4E09\u7C7B\uFF0C\u6B63\u6587\u4E3A\u539F\u751F\u6587\u672C\uFF0C\u4E0D\u8981\u8F6C\u4E49\uFF09

<say id="\u89D2\u8272id" mood="\u60C5\u7EEA">\u53F0\u8BCD\u6B63\u6587\uFF0C\u53EF\u4EE5\u6362\u884C\u3002</say>
<narrate>\u65C1\u767D\u6B63\u6587\u3002</narrate>
<thought id="\u89D2\u8272id">\uFF08\u5185\u5FC3\u72EC\u767D\uFF09</thought>

## \u6CE8\u91CA\uFF08\u4E0D\u4EA7\u751F\u6D3B\u52A8\u5185\u5BB9\uFF09

<comment>\u6B63\u6587</comment>

\u5B83\u4E0D\u4E0A\u821E\u53F0\u3001\u4E0D\u8FDB\u8C31\u7CFB\u3001\u4E0D\u4EA7\u51FA\u4EFB\u4F55\u4E8B\u4EF6\u3002

## \u7ED3\u675F\u8F6E\uFF08beat_done\uFF09

\u4E00\u8F6E\u5230\u8FB9\u754C\u65F6\u4F60\u53EA\u505A\u4E00\u4E2A\u52A8\u4F5C\uFF1A**\u8C03\u7528 beat_done \u5DE5\u5177**\u2014\u2014\u4E00\u6B21\u771F\u6B63\u7684\u5DE5\u5177\u8C03\u7528\uFF0C\u53C2\u6570\u5C31\u662F\u8FD9\u4E00\u8F6E\u7684\u51FA\u53E3\u3002
**\u4E0D\u8981\u5199 \`<beat_done \u2026/>\` \u8FD9\u6837\u7684\u6807\u7B7E**\uFF1A\u6807\u7B7E\u4E0D\u662F\u5DE5\u5177\u8C03\u7528\uFF0C\u5F15\u64CE\u8BA4\u4E0D\u51FA\u5B83\uFF0C\u53EA\u4F1A\u628A\u5B83\u5F53\u6210\u4E00\u884C\u5199\u574F\u7684
\u6807\u7B7E\u4E22\u6389\uFF0C\u4E8E\u662F\u8FD9\u4E00\u8F6E\u6CA1\u6709\u6536\u675F\u3001\u73A9\u5BB6\u6CA1\u6709\u53EF\u70B9\u7684\u4E1C\u897F\u3002\u4E0A\u9762\u90A3\u4E9B <scene>\u3001<say> \u662F\u53F0\u8BCD\u6B63\u6587\uFF0Cbeat_done \u4E0D\u662F\u3002

- \u7ED9\u73A9\u5BB6\u9009\u9879 \u2192 beat_done(options=["\u2026","\u2026"])\uFF0C\u7ED9\u51E0\u6761\u4E92\u65A5\u7684\u9009\u9879\u7167\u300A\u5199\u4F5C\u53C2\u6570\u300B\uFF1B
  \u9009\u9879\u6587\u672C\u5C31\u662F\u73A9\u5BB6\u9762\u677F\u4E0A\u90A3\u4E00\u884C\uFF0C\u8981\u77ED\u3001\u8981\u50CF\u73A9\u5BB6\u4F1A\u8BF4\u7684\u8BDD\u3002
- \u60F3\u7ED9\u4E00\u4E2A\u81EA\u7531\u56DE\u7B54\u7684\u53E3\u5B50 \u2192 beat_done(placeholder="\u60F3\u5BF9\u4ED6\u8BF4\u4EC0\u4E48\uFF1F")\u3002
- \u8FD9\u4E00\u6BB5\u81EA\u7136\u6F14\u5B8C \u2192 beat_done()\uFF0C\u4E24\u4E2A\u53C2\u6570\u90FD\u4E0D\u7ED9\u3002

beat_done **\u72EC\u5360\u4E00\u6B21\u5DE5\u5177\u8C03\u7528**\uFF0C\u4E0D\u4E0E update_state\u3001write / edit \u7B49\u5176\u4ED6\u5DE5\u5177\u653E\u5728\u540C\u4E00\u6279\u91CC\u3002
\u8C03\u5B8C\u4E4B\u540E\u672C\u8F6E\u5C31\u7ED3\u675F\uFF0C\u4E0D\u8981\u518D\u8F93\u51FA\u4EFB\u4F55\u5185\u5BB9\uFF08\u6CA1\u6709\u505C\u6B62\u70B9\u65F6\u4E5F\u4E0D\u8981\u5199\u6536\u5C3E\u4EA4\u4EE3\u6216\u8FC7\u573A\u8BF4\u660E\uFF09\u3002`;
var MEMORY_RULES = `## \u8BB0\u5FC6\u5361\uFF08memory/index/\uFF09

\u4E16\u754C\u8BBE\u5B9A\u3001\u5730\u70B9\u3001\u7EC4\u7EC7\u3001\u4F0F\u7B14\u5199\u6210\u4E00\u5F20\u5361\uFF1A\`memory/index/<\u5206\u7C7B>/<\u540D\u5B57>.md\`\uFF0C\u9996\u884C \`# \u6807\u9898\`\u3001\u6B21\u884C\u4E00\u53E5\u8BDD\u6458\u8981\uFF0C
\u5176\u4F59\u662F\u8BE6\u60C5\u3002\u5206\u7C7B\u53EA\u662F\u5B50\u76EE\u5F55\uFF08\`locations/\` \u653E\u5730\u70B9\u3001\`lore/\` \u653E\u4E16\u754C\u8BBE\u5B9A\uFF09\u3002

    write(path="memory/index/lore/\u65E7\u6821\u820D.md", content="# \u65E7\u6821\u820D\\n\u4E09\u5E74\u524D\u5C01\u4E86\uFF0C\u94A5\u5319\u5728\u5C0F\u6625\u624B\u91CC\u3002\\n\\n\u66F4\u7EC6\u7684\u8BBE\u5B9A\u2026\u2026")

- **\u6539\u65E2\u6709\u5361\u5148 read\u3001\u518D\u7528 edit \u5B9A\u70B9\u6539**\uFF0C\u6574\u7BC7 write \u5BB9\u6613\u628A\u6CA1\u63D0\u5230\u7684\u5185\u5BB9\u62B9\u6389\u3002
- \u5199\u5177\u4F53\u53EF\u7528\u7684\u8BBE\u5B9A\uFF08\u5730\u70B9\u957F\u4EC0\u4E48\u6837\u3001\u7EA6\u5B9A\u662F\u4EC0\u4E48\uFF09\uFF0C\u4E0D\u5199\u300C\u5F85\u8865\u5145\u300D\u3002
- \u89D2\u8272\u4E0D\u5728\u8FD9\u91CC\uFF0C\u8D70 \`characters/<id>.md\`\uFF08\u89C1\u300A\u5F15\u5165\u65B0\u89D2\u8272\u300B\uFF09\uFF1B\u5F53\u524D\u72B6\u6001\uFF08\u573A\u666F/\u5267\u60C5\u7EBF/\u597D\u611F\u5EA6/\u65D7\u6807\uFF09\u8D70 \`update_state\`\u3002
- \`memory/arcs/\`\u3001\`memory/archive/\` \u4E0D\u8981\u52A8\u3002`;
var NEW_CHARACTER_RULES = `## \u5F15\u5165\u65B0\u89D2\u8272

\u9700\u8981\u5F15\u5165\u53F0\u4E0A\u8FD8\u6CA1\u6709\u7684\u65B0\u4E3B\u4F53\u65F6\uFF0C\u6309\u4EE5\u4E0B\u6B65\u9AA4\uFF1A

**1. \u8981\u4EBA\u8BBE\u624D\u5EFA\u6863\uFF08write\uFF09**\u2014\u2014**\u5361\u662F\u53EF\u9009\u7684**\uFF1A\u53EA\u4E0A\u53F0\u4E0D\u51FA\u58F0\u3001\u6216\u672C\u6765\u5C31\u662F\u6765\u6362\u5F20\u56FE\u7684\u4E3B\u4F53
\uFF08\u673A\u7532\u3001\u732B\u3001\u9053\u5177\uFF09\u4E0D\u8BE5\u6709\u4E00\u5F20\u5361\u3002\u8981\u5EFA\u5C31\u628A\u8BBE\u5B9A\u5199\u8FDB \`characters/<id>.md\`\uFF0C**\u6587\u4EF6\u540D\u5C31\u662F\u4E3B\u4F53 id**\uFF1A

    write(path="characters/xiaoyu.md", content="---\\nname: \u5C0F\u96E8\\n---\\n\u5496\u5561\u5E97\u6253\u5DE5\u7684\u5C11\u5973\uFF0C\u8BF4\u8BDD\u6E29\u67D4\uFF0C\u5E38\u7528\u7701\u7565\u53F7\u3002")

\u5361\u7247\u662F frontmatter \u5934\u90E8 + \u6B63\u6587\u4E24\u6BB5\uFF0C\u5934\u90E8\u53EA\u5199 name / sprite / voice \u4E09\u9879\uFF08\u89C1\u300A\u89D2\u8272\u8868\u300B\uFF09\u3002

- **\u5DEE\u5206\u4E0E\u53D6\u666F\u4F53\u91CF\u4E0D\u5199\u5728\u5361\u4E0A**\uFF1A\u5DEE\u5206\u5C31\u662F\u7ACB\u7ED8\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u540D\uFF0C\u53D6\u666F/\u4F53\u91CF/\u540D\u724C\u843D\u5728 \`assets/manifest.json\`\u3002
  \u5361\u4E0A\u552F\u4E00\u4E0E\u7ACB\u7ED8\u6709\u5173\u7684\u662F \`sprite\` \u90A3\u4E00\u683C\u2014\u2014**\u7528\u54EA\u4E00\u5957**\u7ACB\u7ED8\u3002
- **\u6539\u65E2\u6709\u5361\u5148 read\u3001\u518D\u7528 edit \u5B9A\u70B9\u6539**\uFF1A\u6574\u7BC7 write \u4F1A\u628A\u4F60\u6CA1\u63D0\u5230\u7684\u5B57\u6BB5\u62B9\u6389\u3002
- \u73A9\u5BB6\u626E\u6F14\u7684\u4E3B\u89D2\u4E5F\u662F\u4E00\u5F20\u666E\u901A\u5361\uFF0Cid \u56FA\u5B9A \`protagonist\`\uFF1A\u8981\u6539\u4E3B\u89D2\u8BBE\u5B9A\u5C31\u6539\u5B83\uFF0C\u522B\u53E6\u5EFA\u4E00\u5F20\u3002

**2. \u7ACB\u7ED8**\uFF1A\u672C\u5267\u76EE\u6CA1\u6709\u751F\u56FE\u2014\u2014\u7ACB\u7ED8\u7531\u73A9\u5BB6\u624B\u5DE5\u653E\u8FDB \`assets/sprites/<\u7ACB\u7ED8\u76EE\u5F55>/\`\uFF0C
\u6587\u4EF6\u540D\uFF08\u53BB\u6389\u6269\u5C55\u540D\uFF09\u5C31\u662F \`variant\` \u540D\uFF0C\`<actor id="xiaoyu" variant="smile">\` \u76F4\u63A5\u53EF\u7528\u3002
\u53F0\u4E0A\u8FD8\u6CA1\u6709\u7ACB\u7ED8\u7684\u4E3B\u4F53\u5148\u522B\u8BA9\u5B83\u4E0A\u53F0\u2014\u2014\u6539\u7528\u65C1\u767D/\u53F0\u8BCD\u4EA4\u4EE3\uFF0C\u6216\u53EA\u5199\u6709\u7ACB\u7ED8\u7684\u89D2\u8272\u3002

**3. \u4E34\u65F6\u89D2\u8272\uFF08\u4E00\u6B21\u6027 NPC\uFF09**\uFF1A\u53EA\u51FA\u58F0\u4E0D\u51FA\u56FE\u4E5F\u884C\uFF0C\u76F4\u63A5\u5728 say \u4E0A\u5199 name \u5C5E\u6027\uFF1A

    <say id="passerby" name="\u8DEF\u4EBA\u7532">\u4F60\u597D\u554A\u3002</say>

name \u53EA\u8986\u76D6\u672C\u53E5\u540D\u724C\uFF0C\u4E0D\u5199\u5165\u89D2\u8272\u8868\u3002\u53EA\u60F3\u51FA\u58F0\u3001\u4E0D\u4E0A\u53F0\u7684\u8DEF\u4EBA\u7528\u8FD9\u6761\u5C31\u591F\u4E86\u3002`;
var CONTRACT_RULES = `# \u6F14\u51FA\u5951\u7EA6\uFF08\u5F15\u64CE\u89C4\u5219\uFF0C\u4E0D\u53EF\u6539\uFF09

\u4F60\u662F\u5267\u672C\u5F15\u64CE\uFF0C\u4E0D\u662F\u52A9\u624B\uFF1A\u8F93\u51FA\u91CC\u53EA\u6709\u5267\u672C\u672C\u8EAB\u3002\u4E0D\u804A\u5929\u3001\u4E0D\u5BD2\u6684\u3001\u4E0D\u79F0\u547C\u73A9\u5BB6\u672C\u4EBA\u3001\u4E0D\u89E3\u91CA\u81EA\u5DF1\u5728\u505A\u4EC0\u4E48\u3001
\u4E0D\u62A5\u544A\u5267\u672C\u6216\u5F15\u64CE\u7684\u72B6\u6001\u3001\u4E0D\u5728\u7ED3\u5C3E\u63D0\u95EE\u6216\u63D0\u8BAE\u4E0B\u4E00\u6B65\u3002

1. \u6307\u4EE4\u5148\u4E8E\u53F0\u8BCD\uFF1A\u5148\u94FA\u573A\u666F/\u7ACB\u7ED8\uFF0C\u518D\u5199\u8FD9\u4E00\u8F6E\u7684\u53F0\u8BCD\u3002
2. \u89D2\u8272\u60C5\u7EEA/\u8868\u60C5\u53D8\u5316\u65F6\uFF0C\u7528 actor \u6307\u4EE4\u540C\u6B65\u5207\u6362 variant \u5DEE\u5206\u2014\u2014say \u7684 mood \u53EA\u662F\u6587\u5B57\u6807\u6CE8\uFF0C\u4E0D\u9A71\u52A8\u7ACB\u7ED8\u3002
3. \u4E16\u754C\u72B6\u6001\uFF08\u5F53\u524D\u573A\u666F\u3001\u5267\u60C5\u7EBF\u3001\u597D\u611F\u5EA6\u3001\u65D7\u6807\uFF09\u843D\u5728 \`memory/always/state/\`\uFF0C\u7531 update_state \u7EF4\u62A4\u3002
   \u5F00\u5199\u524D read \u5B83\uFF0C\u628A\u5B83\u5F53\u4F5C\u6700\u65B0\u4E16\u754C\u72B6\u6001\u3002
4. \u73A9\u5BB6\u6D88\u606F\u4EE5\u300COOC\u300D\u5F00\u5934 = \u5BFC\u6F14\u6307\u793A\uFF0C\u636E\u6B64\u8C03\u6574\u63A5\u4E0B\u6765\u7684\u6F14\u51FA\u65B9\u5411\uFF0C\u4F46\u4E0D\u8981\u590D\u8FF0\u5B83\u3001\u4E0D\u8981\u8DF3\u51FA\u620F\u5916\u56DE\u5E94\u5B83\uFF1B
   \u5426\u5219 = \u5176\u4E2D\u67D0\u4E2A\u89D2\u8272\uFF08\u53EF\u80FD\u5C31\u662F\u4E3B\u89D2\uFF0C\u4E5F\u53EF\u80FD\u662F\u522B\u4EBA\uFF09\u7684\u884C\u52A8\u3001\u8BDD\u8BED\u6216\u5FC3\u7406\uFF0C\u7167\u5B57\u9762\u610F\u601D\u6F14\u6210\u8BE5\u89D2\u8272\u7684\u8A00\u884C\u3002
   \u4E24\u79CD\u90FD\u4E0D\u8981\u5728\u5267\u672C\u91CC\u590D\u8FF0\u8FD9\u6BB5\u6587\u5B57\u672C\u8EAB\u3002
5. \u73A9\u5BB6\u5728\u505C\u6B62\u70B9\u70B9\u4E86\u9009\u9879\u65F6\uFF0C\u53D1\u6765\u7684\u5C31\u662F\u90A3\u6761\u9009\u9879\u539F\u6587\u2014\u2014\u7167\u5B83\u6F14\u3002
   \u73A9\u5BB6\u53EA\u53D1\u6765\u300C\uFF08\u7EE7\u7EED\uFF09\u300D\u8FD9\u7C7B**\u6CA1\u6709\u5185\u5BB9**\u7684\u63A8\u8FDB\u6307\u4EE4\u65F6\uFF08\u4ED6\u5728\u505C\u6B62\u70B9\u6309\u4E86\u300C\u7EE7\u7EED\u300D\uFF09\uFF1A\u4E0D\u8981\u53CD\u95EE\u3001\u4E0D\u8981\u786E\u8BA4\u3001
   \u4E0D\u8981\u8BC4\u8BBA\u4ED6\u6309\u4E86\u7EE7\u7EED\uFF0C\u76F4\u63A5\u63A5\u7740\u5F80\u4E0B\u5199\u4E00\u8F6E\u3002
6. \u89D2\u8272\u8868\u91CC id \u56FA\u5B9A\u4E3A protagonist \u7684\u90A3\u5F20\u5361\u5C31\u662F\u73A9\u5BB6\u672C\u4EBA\u3002\u5B83\u548C\u522B\u7684\u89D2\u8272\u5B8C\u5168\u540C\u6743\uFF1A
   \u6709\u7ACB\u7ED8\u3001\u80FD\u4E0A\u53F0\u88AB <actor> \u8C03\u7528\u2014\u2014\u4F46\u662F\u5426\u8BA9\u4E3B\u89D2\u9732\u9762\uFF0C\u7167\u5267\u76EE\u7684\u521B\u4F5C\u53E3\u5F84\uFF0C\u5F15\u64CE\u6CA1\u6709\u9ED8\u8BA4\u3002`;
var PLAYWRITER_PROMPT = `${ROLE_INTRO}
${WHERE_THE_PLAY_IS}

${HOW_I_WORK}`;
var PLAYWRITER_TAIL = `${FORMAT_RULES}

${MEMORY_RULES}

${NEW_CHARACTER_RULES}

${CONTRACT_RULES}`;
var STAGEHAND_PROMPT = `\u4F60\u662F\u8FD9\u90E8\u89C6\u89C9\u5C0F\u8BF4\u7684\u642D\u53F0\u52A9\u624B\uFF1A\u4E0D\u5199\u5267\u672C\u3001\u4E0D\u4E0A\u53F0\uFF0C\u8D1F\u8D23\u628A\u5267\u76EE\u51C6\u5907\u597D\u2014\u2014
\u4E16\u754C\u89C2\u524D\u63D0\u3001\u89D2\u8272\u5361\u3001\u7D20\u6750\uFF08\u80CC\u666F\u3001\u7ACB\u7ED8\u3001\u63D2\u56FE\u3001\u97F3\u4E50\u3001\u97F3\u6548\uFF09\u4E0E\u521B\u4F5C\u53E3\u5F84\u3002

# \u5267\u76EE\u5728\u54EA

\u4F60\u7684\u5DE5\u4F5C\u76EE\u5F55\u5C31\u662F\u8FD9\u5EA7\u5267\u76EE\u7684\u6839\u76EE\u5F55\uFF08{{cwd}}\uFF09\uFF1A\`play.json\` \u662F\u5B83\u7684\u8EAB\u4EFD\u8BC1\uFF0C\`characters/\`\u3001
\`assets/\`\u3001\`memory/\` \u90FD\u5728\u5B83\u4E0B\u9762\u3002\u6587\u4EF6\u5DE5\u5177\uFF08read / write / edit / glob / grep\uFF09\u76F4\u63A5\u5BF9\u7740\u8FD9\u4E2A\u76EE\u5F55\u7528\uFF0C
\u4E0B\u9762\u5199\u7684\u8DEF\u5F84\u90FD\u662F\u76F8\u5BF9\u5B83\u7684\u3002

\u5267\u76EE\u7684\u9AA8\u67B6\uFF1A

- \`memory/always/premise.md\` \u2014\u2014 \u4E16\u754C\u89C2\u524D\u63D0\uFF08\u552F\u4E00\u771F\u76F8\u6E90\uFF09\uFF1B
- \`memory/always/craft.md\` \u2014\u2014 \u521B\u4F5C\u53E3\u5F84\uFF1A\u6587\u98CE\u3001\u7981\u5FCC\u3001\u79F0\u547C\u4E60\u60EF\uFF1B
- \`characters/<id>.md\` \u2014\u2014 \u89D2\u8272\u5361\uFF08frontmatter \u5199 name / sprite / voice\uFF0C\u6B63\u6587\u5199\u4EBA\u8BBE\uFF09\uFF1B
- \`assets/backgrounds/ | cg/ | sprites/<\u4E3B\u4F53id>/ | bgm/ | sfx/\` \u2014\u2014 \u7D20\u6750\u672C\u8EAB\uFF1B
- \`assets/manifest.json\` \u2014\u2014 \u7D20\u6750\u63CF\u8FF0\u8868\uFF1B\`play.json\` \u7684 \`craft\` \u6BB5 \u2014\u2014 \u5199\u4F5C\u53C2\u6570\u3002

# \u8D77\u4E00\u5EA7\u65B0\u5267\u76EE

\u5DE5\u4F5C\u76EE\u5F55\u91CC**\u8FD8\u6CA1\u6709 \`play.json\`** = \u8FD9\u8FD8\u4E0D\u662F\u4E00\u5EA7\u5267\u76EE\uFF1A\u7528 \`create_play\` \u628A\u5B83\u7ACB\u8D77\u6765\u2014\u2014\u7ED9\u5B83\u5267\u76EE\u540D\u3001
\u4E16\u754C\u89C2\u524D\u63D0\u3001\u5F00\u5C40\u6307\u4EE4\u4E0E\u5148\u51FA\u573A\u7684\u51E0\u4E2A\u89D2\u8272\uFF0C\u5B83\u4F1A\u5199\u4E0B \`play.json\`\u3001\`memory/always/premise.md\`
\u4E0E \`characters/<id>.md\`\u3002**\u8D77\u65B0\u5267\u76EE\u5C31\u7528\u5B83\uFF0C\u4E0D\u8981\u624B\u5DE5 write \u4E00\u4EFD \`play.json\`**\uFF1A
\u5F15\u64CE\u8BA4\u7684\u5B57\u6BB5\u6BD4\u770B\u4E0A\u53BB\u591A\uFF0C\u624B\u5199\u7684\u5BB9\u6613\u7F3A\u3002

\u5DF2\u7ECF\u6709 \`play.json\` \u4E86\u5C31\u522B\u518D\u8C03\u5B83\uFF08\u4F1A\u62FF\u5230\u62A5\u9519\u56DE\u6267\uFF09\uFF1A\u8865\u8BBE\u5B9A\u3001\u52A0\u89D2\u8272\u5361\u3001\u6539\u5199\u4F5C\u53E3\u5F84\u90FD\u76F4\u63A5\u5199\u6587\u4EF6\u3002

# \u8FD9\u4E00\u9636\u6BB5\u4F60\u624B\u4E0A\u6709\u4EC0\u4E48

\u6587\u4EF6\u5DE5\u5177\uFF08read / write / edit / glob / grep\uFF09\u52A0\u4E00\u4E2A \`create_play\`\uFF0C\u6CA1\u6709\u522B\u7684\u3002\u5199\u8BBE\u5B9A\u3001\u5199\u89D2\u8272\u5361\u3001
\u5199\u521B\u4F5C\u53E3\u5F84\u90FD\u6CA1\u95EE\u9898\uFF1B**\u7D20\u6750\uFF08\u56FE\u3001\u97F3\u4E50\u3001\u97F3\u6548\uFF09\u672C\u9636\u6BB5\u6CA1\u6709\u751F\u6210\u5DE5\u5177**\uFF0C\u8981\u73A9\u5BB6\u81EA\u5DF1\u653E\u8FDB \`assets/\`\u3002

\u6240\u4EE5\u7528\u6237\u8981\u7D20\u6750\u65F6\uFF0C\u628A\u4F60\u7684\u56DE\u7B54\u843D\u5230**\u53EF\u6267\u884C\u7684\u90A3\u4E00\u6B65**\uFF1A\u9700\u8981\u4EC0\u4E48\u3001\u653E\u8FDB\u54EA\u4E2A\u76EE\u5F55\u3001\u6587\u4EF6\u540D\u600E\u4E48\u8D77\u3001
\u653E\u8FDB \`assets/manifest.json\` \u7684\u54EA\u4E00\u6761\u63CF\u8FF0\u3002\u4E0D\u8981\u542B\u7CCA\u5730\u8BF4\u300C\u6211\u53BB\u51C6\u5907\u300D\u3002
`;

// src/playwriter/preset.ts
var INSTRUCTION_BYTES = 65536;
var DSH_HOME = process.env.DSH_HOME ?? join3(homedir(), ".dsh");
function rows(prompt, opts = {}) {
  const plugins = [
    {
      id: "instructions",
      name: "@deepseek-ai/dsh-agent-instructions",
      config: {
        dshHome: DSH_HOME,
        maxBytes: INSTRUCTION_BYTES,
        instructionFileCandidates: ["AGENTS.md"]
      }
    },
    { id: "persona", name: "@deepseek-ai/dsh-persona", config: { prefix: prompt } }
  ];
  if (opts.bash === "off") plugins.push({ id: "tool-bash", name: "@deepseek-ai/dsh-tool-bash", disabled: true });
  plugins.push(
    { id: "tool-fs", name: "@deepseek-ai/dsh-tool-fs" },
    // 这一项没有默认值，不给就是「invalid config」——与 dev 预设同一个取值。
    {
      id: "tool-fs-search",
      name: "@deepseek-ai/dsh-tool-fs-search",
      config: { sampleOverCapGlobResults: false }
    }
  );
  return plugins;
}
var PLAYWRITER_DEFINITION = {
  id: PLAYWRITER_PRESET,
  name: "\u5267\u4F5C\u5BB6",
  description: "\u5199 Stage DSL \u7684\u5267\u4F5C\u5BB6\uFF1A\u5B9E\u65F6\u4E3A\u4E00\u90E8\u6B63\u5728\u76F4\u64AD\u7684\u89C6\u89C9\u5C0F\u8BF4\u5199\u5267\u672C",
  plugins: rows(PLAYWRITER_PROMPT)
};
var STAGEHAND_DEFINITION = {
  id: STAGEHAND_PRESET,
  name: "\u642D\u53F0\u52A9\u624B",
  description: "\u5907\u6599\u7684\u642D\u53F0\u52A9\u624B\uFF1A\u5199\u8BBE\u5B9A\u3001\u89D2\u8272\u5361\u4E0E\u521B\u4F5C\u53E3\u5F84\uFF0C\u628A\u5267\u76EE\u51C6\u5907\u597D\uFF08\u7D20\u6750\u751F\u6210\u5DE5\u5177\u5728\u4E0B\u4E00\u9636\u6BB5\uFF09",
  plugins: rows(STAGEHAND_PROMPT, { bash: "off" })
};
async function registerPresets(ctx) {
  const disposers = [
    await ctx.agentPresets.register(PLAYWRITER_DEFINITION),
    await ctx.agentPresets.register(STAGEHAND_DEFINITION)
  ];
  ctx.logger.info(`[dsh-aivn] presets registered: ${PLAYWRITER_PRESET}, ${STAGEHAND_PRESET}`);
  return () => {
    for (const dispose of disposers.splice(0)) void dispose();
  };
}

// src/play-context.ts
import { existsSync as existsSync2, readdirSync as readdirSync2, readFileSync as readFileSync3 } from "node:fs";
import { join as join5, relative, sep as sep2 } from "node:path";

// src/assets.ts
import { existsSync, readdirSync, readFileSync as readFileSync2 } from "node:fs";
import { extname, join as join4, normalize, resolve, sep } from "node:path";
var MEDIA = /\.(png|jpe?g|webp|mp3|ogg|wav|m4a)$/i;
var CONTENT_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".wav": "audio/wav",
  ".m4a": "audio/mp4",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};
function listAssets(dir) {
  const root = join4(dir, "assets");
  const index = {};
  if (!existsSync(root)) return index;
  for (const kind of ["backgrounds", "cg", "sprites", "sfx", "bgm"]) {
    const kindDir = join4(root, kind);
    if (!existsSync(kindDir)) continue;
    if (kind === "sprites") {
      for (const entry of readdirSync(kindDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const files = readdirSync(join4(kindDir, entry.name)).filter((name2) => MEDIA.test(name2));
        index[`sprites/${entry.name}`] = files.sort((a, b) => a.localeCompare(b));
      }
    } else {
      index[kind] = readdirSync(kindDir).filter((name2) => MEDIA.test(name2)).sort((a, b) => a.localeCompare(b));
    }
  }
  return index;
}
function readManifest(dir) {
  const path = join4(dir, "assets", "manifest.json");
  let raw;
  try {
    raw = readFileSync2(path, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    const why = error instanceof Error ? error.message : String(error);
    throw new Error(`${path} \u4E0D\u662F\u5408\u6CD5 JSON\uFF1A${why}`);
  }
}
function resolveInPlay(dir, relative2) {
  const root = resolve(dir);
  const target = resolve(root, normalize(relative2));
  if (target !== root && !target.startsWith(root + sep)) return null;
  return target;
}
function contentTypeOf(path) {
  return CONTENT_TYPES[extname(path).toLowerCase()] ?? "application/octet-stream";
}

// src/playwriter/craft.ts
var PHASE1_CAPABILITIES = { image: false, library: false };
var BEAT_LENGTH_LABEL = {
  short: "\u77ED",
  medium: "\u4E2D\u7B49",
  long: "\u957F"
};
var BEAT_LENGTH_DIRECTIVE = {
  short: "\u4E00\u8F6E 3~6 \u53E5\u53F0\u8BCD/\u65C1\u767D\uFF0C\u4E00\u4E2A\u6765\u56DE\u6216\u4E00\u6B21\u884C\u52A8\u5C31\u6536\uFF0C\u522B\u94FA\u65B0\u573A\u666F\u3002",
  medium: "\u4E00\u8F6E 8~15 \u53E5\u53F0\u8BCD/\u65C1\u767D\uFF0C\u6F14\u5B8C\u4E00\u5C0F\u6BB5\u5BF9\u8BDD\u6216\u4E00\u6B21\u884C\u52A8\u5C31\u6536\u3002",
  long: "\u4E00\u8F6E 20~30 \u53E5\u53F0\u8BCD/\u65C1\u767D\uFF0C\u53EF\u4EE5\u6F14\u5B8C\u4E00\u6574\u573A\u620F\uFF0C\u5141\u8BB8\u6362\u573A\u666F\u3002"
};
var STOP_OPTIONS_DIRECTIVE = {
  two: '\u6709\u505C\u6B62\u70B9\u65F6\u7ED9 2 \u6761\u4E92\u65A5\u9009\u9879\uFF1Abeat_done(options=["\u2026", "\u2026"])\u3002',
  three: '\u6709\u505C\u6B62\u70B9\u65F6\u7ED9 3 \u6761\u4E92\u65A5\u9009\u9879\uFF1Abeat_done(options=["\u2026", "\u2026", "\u2026"])\u3002',
  four: '\u6709\u505C\u6B62\u70B9\u65F6\u7ED9 4 \u6761\u4E92\u65A5\u9009\u9879\uFF1Abeat_done(options=["\u2026", "\u2026", "\u2026", "\u2026"])\u3002',
  free: '\u56FA\u5B9A\u505C\u5728\u81EA\u7531\u8F93\u5165\u6846\uFF1Abeat_done(placeholder="\u2026")\uFF0C\u4E0D\u7ED9 options\u3002'
};
var STOP_OPTIONS_LABEL = {
  two: "\u6BCF\u6B21 2 \u6761",
  three: "\u6BCF\u6B21 3 \u6761",
  four: "\u6BCF\u6B21 4 \u6761",
  free: "\u56FA\u5B9A\u81EA\u7531\u8F93\u5165"
};
var BACKGROUND_LABEL = {
  "library-first": "\u8D44\u6E90\u5E93\u4F18\u5148\uFF0C\u6CA1\u6709\u518D\u51FA\u56FE",
  library: "\u53EA\u7528\u8D44\u6E90\u5E93\u91CC\u73B0\u6210\u7684",
  generate: "\u76F4\u63A5\u51FA\u56FE"
};
var CG_LABEL = {
  library: "\u53EA\u7528\u8D44\u6E90\u5E93\u91CC\u73B0\u6210\u7684",
  generate: "\u76F4\u63A5\u51FA\u56FE",
  off: "\u4E0D\u7528\u63D2\u56FE"
};
var SPRITE_LABEL = {
  generate: "\u51FA\u56FE",
  off: "\u4E0D\u51FA\u7ACB\u7ED8"
};
var AUDIO_LABEL = {
  library: "\u53EA\u7528\u8D44\u6E90\u5E93\u91CC\u73B0\u6210\u7684",
  off: "\u4E0D\u7528\u97F3\u4E50\u97F3\u6548"
};
function renderCraftParams(craft, can) {
  const { assets } = craft;
  const lines = [
    `- \u4E00\u8F6E\u7BC7\u5E45\uFF1A${BEAT_LENGTH_LABEL[craft.beatLength]}\u2014\u2014${BEAT_LENGTH_DIRECTIVE[craft.beatLength]}`,
    `- \u505C\u6B62\u70B9\uFF1A${STOP_OPTIONS_DIRECTIVE[craft.stopOptions]}`,
    "- \u7D20\u6750\u6765\u6E90\uFF1A",
    `  - \u80CC\u666F\uFF1A${backgroundDirective(assets.background, can)}`,
    `  - \u63D2\u56FE\uFF08cg\uFF09\uFF1A${cgDirective(assets.cg, can)}`,
    `  - \u7ACB\u7ED8\uFF1A${spriteDirective(assets.sprite, can)}`,
    `  - \u97F3\u4E50\u4E0E\u97F3\u6548\uFF1A${audioDirective(assets.audio, can)}`
  ];
  return `
# \u5199\u4F5C\u53C2\u6570\uFF08\u672C\u5267\u76EE\u8BBE\u5B9A\uFF0C\u7167\u5B83\u5199\uFF09

${lines.join("\n")}
`;
}
function noImage(kind, can) {
  if (kind === "sprite") {
    return "\u672C\u5267\u76EE\u6CA1\u5F00\u751F\u56FE\uFF1A\u4E0D\u8981\u7ED9\u89D2\u8272\u51FA\u65B0\u7ACB\u7ED8\u5DEE\u5206\uFF0C\u89D2\u8272\u5DF2\u6709\u7684\u5DEE\u5206\u7167\u5E38\u7528\uFF1B\u7F3A\u7ACB\u7ED8\u5C31\u7528\u65C1\u767D\u4EA4\u4EE3\u3002";
  }
  const what = kind === "background" ? "\u80CC\u666F" : "\u63D2\u56FE";
  const pool = can.library ? "\u7D20\u6750\u8D44\u6E90\u5E93\u91CC\u73B0\u6210\u7684" : "\u7D20\u6750\u6E05\u5355\u91CC\u5DF2\u6709\u7684";
  return `\u672C\u5267\u76EE\u6CA1\u5F00\u751F\u56FE\uFF1A\u9700\u8981\u65B0${what}\u65F6\u7528${pool}\uFF0C\u6216\u6362\u4E00\u6BB5\u80FD\u6F14\u7684\u620F\u3001\u7528\u65C1\u767D\u4EA4\u4EE3\u3002`;
}
function backgroundDirective(source, can) {
  if (!can.image) return noImage("background", can);
  switch (source) {
    case "library-first":
      return can.library ? "\u4F18\u5148\u7528\u7D20\u6750\u8D44\u6E90\u5E93\u91CC\u73B0\u6210\u7684\uFF1B\u5E93\u91CC\u6CA1\u6709\u5408\u9002\u7684\u518D generate_image \u51FA\u4E00\u5F20\u3002" : "\u76F4\u63A5 generate_image \u51FA\uFF08\u672C\u5267\u76EE\u6CA1\u914D\u7D20\u6750\u8D44\u6E90\u5E93\uFF09\u3002";
    case "library":
      return can.library ? "\u53EA\u7528\u7D20\u6750\u8D44\u6E90\u5E93\u91CC\u73B0\u6210\u7684\uFF1B\u7F3A\u4E86\u5C31\u6362\u4E00\u5904\u80FD\u6F14\u7684\u573A\u666F\uFF0C\u4E0D\u8981\u51FA\u56FE\u3002" : "\u672C\u5267\u76EE\u6CA1\u914D\u7D20\u6750\u8D44\u6E90\u5E93\uFF1A\u591A\u7528\u65C1\u767D\u4EA4\u4EE3\u573A\u666F\uFF0C\u4E0D\u8981\u51FA\u56FE\u3002";
    case "generate":
      return "\u81EA\u5DF1 generate_image \u51FA\uFF0C\u4E0D\u7528\u53BB\u5E93\u91CC\u627E\u3002";
  }
}
function cgDirective(source, can) {
  if (source === "off") return "\u4E0D\u8981\u5199 <cg>\u2014\u2014\u672C\u5267\u76EE\u4E0D\u51FA\u63D2\u56FE\uFF0C\u8981\u505C\u987F\u5C31\u5199\u65C1\u767D\u6216\u6536\u675F\u672C\u8F6E\u3002";
  if (!can.image) return noImage("cg", can);
  switch (source) {
    case "library":
      return can.library ? "\u4F18\u5148\u7528\u7D20\u6750\u8D44\u6E90\u5E93\u91CC\u73B0\u6210\u7684\u63D2\u56FE\uFF1B\u6CA1\u6709\u5C31\u6539\u7528\u65C1\u767D\u4EA4\u4EE3\uFF0C\u4E0D\u8981\u51FA\u56FE\u3002" : "\u672C\u5267\u76EE\u6CA1\u914D\u7D20\u6750\u8D44\u6E90\u5E93\uFF1A\u4E0D\u8981\u5199 <cg>\uFF0C\u7528\u65C1\u767D\u4EA4\u4EE3\u3002";
    case "generate":
      return "\u81EA\u5DF1 generate_image \u51FA\u3002";
    default:
      return "";
  }
}
function spriteDirective(source, can) {
  if (source === "off") return "\u4E0D\u8981\u7ED9\u89D2\u8272\u51FA\u7ACB\u7ED8\uFF1B\u89D2\u8272\u5DF2\u6709\u7684\u5DEE\u5206\u7167\u5E38\u7528\u3002";
  if (!can.image) return noImage("sprite", can);
  return '\u81EA\u5DF1 generate_image\uFF08kind="sprite"\uFF09\u51FA\u3002';
}
function audioDirective(source, can) {
  if (source === "off") return "\u4E0D\u8981\u5199 bgm/ambient/sfx\u2014\u2014\u672C\u5267\u76EE\u4E0D\u7528\u97F3\u4E50\u97F3\u6548\u3002";
  return can.library ? "\u53EA\u7528\u7D20\u6750\u8D44\u6E90\u5E93\u91CC\u73B0\u6210\u7684 bgm/sfx\u3002" : "\u53EA\u7528\u7D20\u6750\u6E05\u5355\u91CC\u5DF2\u6709\u7684 bgm/sfx\uFF1B\u6CA1\u6709\u5408\u9002\u7684\u5B81\u53EF\u4E0D\u7ED9\u3002";
}
function describeCraftParams(craft) {
  const { assets } = craft;
  return [
    `\u6BCF\u8F6E\u7BC7\u5E45\uFF1A${BEAT_LENGTH_LABEL[craft.beatLength]}`,
    `\u505C\u6B62\u70B9\u9009\u9879\uFF1A${STOP_OPTIONS_LABEL[craft.stopOptions]}`,
    `\u7D20\u6750\u6765\u6E90\uFF1A\u80CC\u666F ${BACKGROUND_LABEL[assets.background]}\uFF1B\u63D2\u56FE ${CG_LABEL[assets.cg]}\uFF1B\u7ACB\u7ED8 ${SPRITE_LABEL[assets.sprite]}\uFF1B\u97F3\u6548 ${AUDIO_LABEL[assets.audio]}`
  ].join("\n");
}
function mergeCraftParams(current, patch) {
  const now = resolveCraft(current);
  const assetsPatch = patch.assets === null ? null : patch.assets;
  const pick2 = (value, fallback, current2) => value === void 0 ? current2 : value ?? fallback;
  const assets = {
    background: assetsPatch === null ? DEFAULT_CRAFT.assets.background : pick2(assetsPatch?.background, DEFAULT_CRAFT.assets.background, now.assets.background),
    cg: assetsPatch === null ? DEFAULT_CRAFT.assets.cg : pick2(assetsPatch?.cg, DEFAULT_CRAFT.assets.cg, now.assets.cg),
    sprite: assetsPatch === null ? DEFAULT_CRAFT.assets.sprite : pick2(assetsPatch?.sprite, DEFAULT_CRAFT.assets.sprite, now.assets.sprite),
    audio: assetsPatch === null ? DEFAULT_CRAFT.assets.audio : pick2(assetsPatch?.audio, DEFAULT_CRAFT.assets.audio, now.assets.audio)
  };
  const beatLength = pick2(patch.beatLength, DEFAULT_CRAFT.beatLength, now.beatLength);
  const stopOptions = pick2(patch.stopOptions, DEFAULT_CRAFT.stopOptions, now.stopOptions);
  const out = {};
  if (beatLength !== DEFAULT_CRAFT.beatLength) out.beatLength = beatLength;
  if (stopOptions !== DEFAULT_CRAFT.stopOptions) out.stopOptions = stopOptions;
  const assetOut = {};
  if (assets.background !== DEFAULT_CRAFT.assets.background) assetOut.background = assets.background;
  if (assets.cg !== DEFAULT_CRAFT.assets.cg) assetOut.cg = assets.cg;
  if (assets.sprite !== DEFAULT_CRAFT.assets.sprite) assetOut.sprite = assets.sprite;
  if (assets.audio !== DEFAULT_CRAFT.assets.audio) assetOut.audio = assets.audio;
  if (Object.keys(assetOut).length > 0) out.assets = assetOut;
  return Object.keys(out).length > 0 ? out : void 0;
}
var CRAFT_ENUMS = {
  beatLength: CRAFT_BEAT_LENGTHS,
  stopOptions: CRAFT_STOP_OPTIONS,
  background: CRAFT_BACKGROUND_SOURCES,
  cg: CRAFT_CG_SOURCES,
  sprite: CRAFT_SPRITE_SOURCES,
  audio: CRAFT_AUDIO_SOURCES
};

// src/play-context.ts
var TTL_MS = 1e3;
var ORDER = {
  language: 100,
  premise: 110,
  cast: 120,
  assets: 130,
  craft: 140,
  memory: 150,
  tail: 200
};
var CONTEXT_ORDER = 130;
function readPlaySnapshot(dir) {
  const play = loadPlaySync(dir);
  if (!play) return EMPTY;
  const index = listAssets(dir);
  const manifest = readManifest(dir);
  const cards = readCharacterCards(dir);
  const notes = (id, charId) => charId ? { ...manifest[id], ...manifest[`${charId}/${id}`] } : manifest[id] ?? {};
  const language = play.config.scriptLanguage ? `# \u5267\u672C\u8BED\u8A00

\u6B63\u6587\u3001\u65C1\u767D\u3001\u9009\u9879\uFF0C\u4EE5\u53CA\u89D2\u8272\u5361\u4E0E\u8BB0\u5FC6\u5361\u91CC\u5199\u7684\u8BBE\u5B9A\uFF0C\u4E00\u5F8B\u7528${languageLabel(
    play.config.scriptLanguage
  )}\u5199\uFF0C**\u4E0D\u8981\u8DDF\u968F\u73A9\u5BB6\u7684\u8F93\u5165\u8BED\u8A00**\u3002\u89D2\u8272 id\u3001\u7D20\u6750 id\u3001DSL \u6807\u7B7E\u540D\u4FDD\u6301\u539F\u6837\uFF08\u82F1\u6587/\u62FC\u97F3\uFF09\u3002` : "";
  const premise = play.config ? `# \u5267\u76EE\u8BBE\u5B9A

${readText(join5(dir, "memory", "always", "premise.md")).trim() || "\uFF08\u8FD9\u4EFD\u5267\u76EE\u8FD8\u6CA1\u6709\u5199\u4E16\u754C\u89C2\u524D\u63D0\u3002\u81EA\u7531\u53D1\u6325\u5373\u53EF\u2014\u2014\u522B\u505C\u4E0B\u6765\u95EE\uFF0C\u4E5F\u522B\u5728\u5267\u672C\u91CC\u89E3\u91CA\u8FD9\u4EF6\u4E8B\u3002\uFF09"}` : "";
  const craftFile = readText(join5(dir, "memory", "always", "craft.md")).trim();
  const craft = `${renderCraftParams(resolveCraft(play.config.craft), PHASE1_CAPABILITIES)}\uFF08\u4E0A\u9762\u662F${play.config.craft ? "\u8FD9\u5EA7\u5267\u76EE `play.json` \u7684 `craft` \u6BB5" : "\u5F15\u64CE\u9ED8\u8BA4\u53E3\u5F84\uFF0C`play.json` \u7684 `craft` \u6BB5\u6CA1\u5199\u8FC7"}\uFF1B\u6539\u5B83\u7528 \`set_craft\`\u3002\uFF09${craftFile ? `

${craftFile}` : ""}`;
  return {
    language,
    premise,
    cast: renderCast(cards, index, notes),
    assets: renderAssets(index, notes),
    craft,
    memoryIndex: renderMemoryIndex(dir),
    state: renderState(dir, play.config.characters?.map((card) => card.id) ?? [])
  };
}
function registerPlayContext(agentCtx, playDir) {
  let cache = null;
  const snapshot = () => {
    const now = Date.now();
    if (cache && now - cache.at < TTL_MS) return cache.snapshot;
    const fresh = readPlaySnapshot(playDir());
    cache = { at: now, snapshot: fresh };
    return fresh;
  };
  const section = (name2, order, pick2) => agentCtx.systemPrompt.section({ name: name2, order, text: () => pick2(snapshot()) });
  const offs = [
    section("aivn:play-language", ORDER.language, (s) => s.language),
    section("aivn:play-premise", ORDER.premise, (s) => s.premise),
    section("aivn:play-cast", ORDER.cast, (s) => s.cast),
    section("aivn:play-assets", ORDER.assets, (s) => s.assets),
    section("aivn:play-craft", ORDER.craft, (s) => s.craft),
    section("aivn:play-memory-index", ORDER.memory, (s) => s.memoryIndex),
    // 静态尾段（格式契约、记忆卡规则、引入新角色、演出契约）跟着动态段一起挂：
    // 这几章只有剧作家要，而 persona 那一格装不下两段。位置紧接 A 区之后，与 AIVN 同序。
    agentCtx.systemPrompt.section({ name: "aivn:playwriter-tail", order: ORDER.tail, text: () => PLAYWRITER_TAIL }),
    agentCtx.systemPrompt.context({ name: "aivn:play-state", order: CONTEXT_ORDER, text: () => snapshot().state })
  ];
  return () => {
    for (const off of offs) off();
  };
}
var EMPTY = {
  language: "",
  premise: "",
  cast: "",
  assets: "",
  craft: "",
  memoryIndex: "",
  state: ""
};
function renderCast(cards, index, notes) {
  if (cards.length === 0) {
    return "# \u89D2\u8272\u8868\n\n\uFF08\u8FD9\u4EFD\u5267\u76EE\u8FD8\u6CA1\u6709\u89D2\u8272\u5361\u3002\u73A9\u5BB6\u626E\u6F14\u7684\u4E3B\u89D2\u56FA\u5B9A\u662F `characters/protagonist.md`\uFF0C\u5148\u628A\u5B83\u5EFA\u8D77\u6765\u3002\uFF09";
  }
  const variantsOf = (spriteDir) => (index[`sprites/${spriteDir}`] ?? []).map((file) => file.replace(/\.\w+$/, ""));
  const label = (name2, charId) => {
    const detail = describeAsset(notes(name2, charId));
    return detail ? `${name2}\uFF08${detail}\uFF09` : name2;
  };
  const bound = /* @__PURE__ */ new Set();
  const blocks = cards.map((card) => {
    const spriteDir = spriteIdOf(card.id, card);
    bound.add(spriteDir);
    const title = `${card.name ?? card.id}\uFF08id: ${card.id}\uFF0C\u5361\u7247 characters/${card.id}.md${card.id === "protagonist" ? "\uFF0C\u73A9\u5BB6\u626E\u6F14" : ""}\uFF09`;
    const variants = variantsOf(spriteDir);
    return [
      `### ${title}`,
      card.body.trim(),
      card.voice ? `\u97F3\u8272\uFF1A${card.voice}` : "",
      variants.length > 0 ? `\u7ACB\u7ED8${spriteDir === card.id ? "" : `\uFF08\u76EE\u5F55 ${spriteDir}\uFF09`}\u5DEE\u5206 variant\uFF1A${variants.map((v) => label(v, spriteDir)).join(" | ")}` : ""
    ].filter((part) => part !== "").join("\n");
  });
  const bare = Object.keys(index).filter((key) => key.startsWith("sprites/")).map((key) => key.slice("sprites/".length)).filter((spriteDir) => !bound.has(spriteDir)).sort((a, b) => a.localeCompare(b));
  const bareSection = bare.length > 0 ? `

# \u53F0\u4E0A\u5176\u5B83\u4E3B\u4F53\uFF08\u6709\u7ACB\u7ED8\uFF0C\u6CA1\u6709\u89D2\u8272\u5361\uFF09

${bare.map((spriteDir) => {
    const title = notes(spriteDir).title;
    return `- ${title ? `${spriteDir}\uFF08${title}\uFF09` : spriteDir}\uFF1Avariant ${variantsOf(spriteDir).map((v) => label(v, spriteDir)).join(" | ")}`;
  }).join("\n")}

\u5B83\u4EEC\u4E0E\u89D2\u8272\u540C\u6743\uFF1A\`<actor id="\u2026" variant="\u2026">\` \u76F4\u63A5\u4E0A\u53F0\uFF0C\u4E0D\u7528\u5EFA\u6863\u3002` : "";
  return `# \u89D2\u8272\u8868

${blocks.join("\n\n")}

\u5361\u662F frontmatter + \u6B63\u6587\u4E24\u6BB5\uFF0C\u5934\u90E8\u53EA\u5199 name / sprite / voice\uFF1B
\u5DEE\u5206\u4E0E\u53D6\u666F\u4F53\u91CF\u4E0D\u5199\u5728\u5361\u4E0A\uFF08\u5DEE\u5206\u5C31\u662F\u7ACB\u7ED8\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\u540D\uFF0C\u53D6\u666F/\u4F53\u91CF/\u540D\u724C\u843D\u5728 \`assets/manifest.json\`\uFF09\u3002${bareSection}`;
}
function renderAssets(index, notes) {
  const stems = (kind) => (index[kind] ?? []).map((file) => file.replace(/\.\w+$/, ""));
  const section = (heading, kind, tail = "") => {
    const list = stems(kind);
    if (list.length === 0) return "";
    const rows2 = list.map((id) => {
      const detail = describeAsset(notes(id));
      return `- ${detail ? `${id}\uFF08${detail}\uFF09` : id}`;
    });
    return `
# ${heading}

${rows2.join("\n")}${tail}
`;
  };
  const audio = stems("bgm").length > 0 || stems("sfx").length > 0 ? AUDIO_RULES : "";
  const body = [
    section("\u53EF\u7528\u80CC\u666F bg", "backgrounds", "\n<scene> \u7684 bg \u4F18\u5148\u53D6\u8FD9\u4E9B id\u3002"),
    section("\u53EF\u7528\u97F3\u4E50 bgm", "bgm"),
    section("\u53EF\u7528\u97F3\u6548 sfx", "sfx"),
    audio,
    section("\u5DF2\u6709\u63D2\u56FE cg", "cg")
  ].join("");
  const empty = body === "" ? "\n\uFF08\u8FD9\u5EA7\u5267\u76EE\u7684 `assets/` \u8FD8\u662F\u7A7A\u7684\u3002\uFF09\n" : "";
  return `# \u7D20\u6750\u6E05\u5355

\u7D20\u6750\u5728 \`assets/\` \u4E0B\u6309\u7C7B\u76EE\u653E\uFF1B\u6E05\u5355\u91CC\u6CA1\u6709\u7684 id \u4E0D\u8981\u5199\u2014\u2014\u5199\u4E86\u4E0D\u4F1A\u6709\u753B\u9762\uFF08\u90A3\u4E00\u884C\u7167\u5E38\u6F14\uFF0C\u53EA\u662F\u7A7A\u7740\uFF09\u3002
${body}${empty}
\u7F3A\u7D20\u6750\u5C31\u6362\u4E00\u6BB5\u80FD\u6F14\u7684\u620F\uFF0C\u7528\u65C1\u767D\u4EA4\u4EE3\uFF1B\u4E5F\u53EF\u4EE5\u8BA9\u73A9\u5BB6\u624B\u5DE5\u653E\u6587\u4EF6\u8FDB \`assets/\`\u3002`;
}
var AUDIO_RULES = `
## \u914D\u4E50\u4E0E\u97F3\u6548\uFF08\u600E\u4E48\u7528\uFF09

- **\u7F3A\u7701 = \u4FDD\u6301\u5F53\u524D**\uFF1A<scene> \u4E0D\u5199 bgm/ambient \u5C31\u7EE7\u7EED\u653E\u73B0\u5728\u8FD9\u9996\u3002\u6362\u573A\u666F\u901A\u5E38\u4E0D\u6362\u4E50\uFF0C
  \u53EA\u6709\u60C5\u7EEA\u6216\u5730\u70B9\u771F\u7684\u53D8\u4E86\u624D\u6362 id\u3002
- \u60F3\u505C\uFF1A<scene bgm="none"/>\uFF0Cambient \u540C\u7406\u3002
- \u97F3\u91CF\u81EA\u5DF1\u7ED9\uFF1A<scene bgm_volume="0.4"/>\u3001<scene ambient_volume="0.3"/>\u3001<sfx src="\u2026" volume="0.6"/>\u3002
  \u97F3\u4E50\u4E0E\u97F3\u6548\u90FD\u7ED9\u53F0\u8BCD\u8BA9\u4F4D\u2014\u2014\u62FF\u4E0D\u51C6\u5C31\u8C03\u5C0F\u3002
- \u6362\u66F2\u4E0E\u505C\u4E50\u4F1A\u81EA\u52A8\u4EA4\u53C9\u6DE1\u5165\u6DE1\u51FA\uFF0C\u4E0D\u7528\u81EA\u5DF1\u5199\u6DE1\u51FA\u3002
- ambient \u662F\u6301\u7EED\u7684\u73AF\u5883\u5E95\u566A\uFF08\u96E8\u3001\u98CE\u3001\u4EBA\u58F0\u3001\u8F66\u6D41\uFF09\uFF0C\u6BD4 bgm \u8F7B\uFF0C\u4E00\u573A\u620F\u7ED9\u4E00\u6B21\u5C31\u591F\u3002
- sfx \u653E\u5728\u52A8\u4F5C\u53D1\u751F\u7684\u90A3\u4E00\u884C\u4E4B\u524D\uFF1A\u5F00\u95E8\u3001\u8F6C\u8EAB\u3001\u7FFB\u4E66\u3001\u4E1C\u897F\u843D\u5730\uFF0C\u4E00\u4E2A\u52A8\u4F5C\u4E00\u6761\uFF0C\u522B\u8FDE\u7740\u5806\u3002
- \u53EA\u6311\u6E05\u5355\u91CC\u771F\u6709\u7684 id\uFF1B\u6CA1\u6709\u5408\u9002\u7684\u5B81\u53EF\u4E0D\u7ED9\uFF0C\u522B\u62FF\u522B\u7684\u66F2\u5B50\u9876\u4E0A\u3002`;
function renderMemoryIndex(dir) {
  const cards = collectCards(join5(dir, "memory", "index"));
  if (cards.length === 0) return "";
  const rows2 = cards.map(
    (card) => `- ${card.layer ? `[${card.layer}] ` : ""}${card.name}\uFF08${card.path}\uFF09\uFF1A${card.summary}`
  );
  return `# \u8BB0\u5FC6\u7D22\u5F15\uFF08\u6309\u9700\u67E5\u8BE6\u60C5\uFF09

${rows2.join("\n")}

\u8981\u67D0\u6761\u7684\u5B8C\u6574\u5185\u5BB9\u5C31 read \u5B83\u7684\u8DEF\u5F84\uFF1B\u5199\u8FC7\u7684\u4E1C\u897F\u8981\u80FD\u88AB\u4E0B\u4E00\u8F6E\u8BA4\u51FA\u6765\uFF0C\u5C31\u6309\u300A\u8BB0\u5FC6\u5361\u300B\u7684\u89C4\u77E9\u843D\u76D8\u3002`;
}
function collectCards(root, dir = root, layer = "") {
  if (!existsSync2(dir)) return [];
  const out = [];
  for (const entry of readdirSync2(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join5(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectCards(root, path, layer ? `${layer}/${entry.name}` : entry.name));
      continue;
    }
    if (!entry.name.endsWith(".md")) continue;
    const lines = readText(path).split("\n").map((line) => line.trim());
    const titleAt = lines.findIndex((line) => /^#\s+/.test(line));
    const name2 = (titleAt >= 0 ? /^#\s+(.+)$/.exec(lines[titleAt] ?? "")?.[1] : void 0)?.trim();
    out.push({
      layer,
      name: name2 || entry.name.replace(/\.md$/, ""),
      summary: lines.slice(titleAt + 1).find((line) => line !== "") ?? "",
      path: `memory/index/${relative(root, path).split(sep2).join("/")}`
    });
  }
  return out;
}
function renderState(dir, characterIds) {
  const stateDir = join5(dir, "memory", "always", "state");
  const scene = readText(join5(stateDir, "scene.md")).trim();
  const threads = readText(join5(stateDir, "threads.md")).trim();
  let affinity = {};
  let flags = {};
  const raw = readText(join5(stateDir, "state.json"));
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      affinity = parsed.affinity ?? {};
      flags = parsed.flags ?? {};
    } catch {
    }
  }
  const known = new Set(characterIds);
  const affinityLine = Object.entries(affinity).filter(([id]) => known.size === 0 || known.has(id)).map(([id, value]) => `${id} ${value}`).join(" | ");
  const flagLine = Object.entries(flags).map(([key, value]) => `${key}=${String(value)}`).join(" | ");
  const body = [
    scene ? `\u573A\u666F\uFF1A${scene}` : null,
    affinityLine ? `\u597D\u611F\u5EA6\uFF1A${affinityLine}` : null,
    flagLine ? `\u65D7\u6807\uFF1A${flagLine}` : null,
    threads ? `\u6D3B\u8DC3\u5267\u60C5\u7EBF\uFF1A${threads}` : null
  ].filter(Boolean).join("\n");
  if (!body) return "";
  return `\u3010\u72B6\u6001\u3011
${body}

\u72B6\u6001\u7531 update_state \u7EF4\u62A4\uFF1B\u6709\u5B9E\u8D28\u63A8\u8FDB\u5C31\u66F4\u65B0\u5B83\uFF0C\u522B\u8BA9\u5B83\u505C\u5728\u5F00\u5934\u7684\u96F6\u3002`;
}
function readCharacterCards(dir) {
  const root = join5(dir, "characters");
  if (!existsSync2(root)) return [];
  const out = [];
  for (const name2 of readdirSync2(root).sort()) {
    if (!name2.endsWith(".md")) continue;
    const text2 = readText(join5(root, name2));
    if (text2) out.push({ ...parseCharacterCard(text2), id: name2.slice(0, -3) });
  }
  return out;
}
function readText(path) {
  try {
    return readFileSync3(path, "utf8");
  } catch {
    return "";
  }
}

// src/tools/create-play.ts
import { defineTool } from "@deepseek-ai/dsh-tools";
var DESCRIPTION2 = [
  "\u628A\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55\u7ACB\u6210\u4E00\u5EA7\u65B0\u5267\u76EE\uFF1A\u5199\u4E0B play.json\uFF08\u5267\u76EE\u540D\u3001\u5F00\u5C40\u6307\u4EE4\u3001\u89D2\u8272\u5143\u6570\u636E\uFF09\u3001",
  "memory/always/premise.md\uFF08\u4E16\u754C\u89C2\u524D\u63D0\uFF09\u4E0E characters/<id>.md\uFF08\u89D2\u8272\u5361\uFF09\u3002",
  "**\u5DE5\u4F5C\u76EE\u5F55\u91CC\u8FD8\u6CA1\u6709 play.json** \u65F6\u624D\u7528\u2014\u2014\u90A3\u8BF4\u660E\u8FD9\u91CC\u8FD8\u4E0D\u662F\u4E00\u5EA7\u5267\u76EE\uFF1B",
  "\u5DF2\u7ECF\u6709 play.json \u4E86\u5C31\u522B\u8C03\u5B83\uFF08\u4F1A\u62FF\u5230\u62A5\u9519\u56DE\u6267\uFF09\uFF1A\u52A0\u4EBA\u52A0\u8BBE\u5B9A\u6539\u6587\u4EF6\u8D70 write / edit\u3002",
  "\u5DF2\u7ECF\u5B58\u5728\u7684\u6587\u4EF6\u4E00\u5F8B\u4E0D\u52A8\uFF1A\u524D\u63D0\u6216\u89D2\u8272\u5361\u5DF2\u7ECF\u5199\u597D\u4E86\uFF0C\u56DE\u6267\u91CC\u4F1A\u5217\u6210\u300C\u4FDD\u7559\u300D\u3002",
  "\u8C03\u5B8C\u628A\u5267\u76EE\u540D\u4E0E\u5199\u4E86\u54EA\u51E0\u4EFD\u6587\u4EF6\u56DE\u62A5\u7ED9\u7528\u6237\uFF0C\u522B\u5728\u5267\u672C\u91CC\u4EA4\u4EE3\u8FD9\u4EF6\u4E8B\u3002"
].join("\n");
function createPlayTool(ctx) {
  return defineTool({
    name: "create_play",
    description: DESCRIPTION2,
    parameters: {
      title: {
        type: "string",
        required: true,
        description: "\u5267\u76EE\u540D\uFF0C\u663E\u793A\u5728\u5267\u76EE\u5217\u8868\u4E0E\u821E\u53F0\u6807\u9898\u4E0A\u3002"
      },
      id: {
        type: "string",
        description: "\u5267\u76EE id\uFF08\u7D20\u6750\u5BFB\u5740\u7528\uFF09\u3002\u4E0D\u5199\u5C31\u53D6\u5DE5\u4F5C\u76EE\u5F55\u540D\uFF0C\u901A\u5E38\u4E0D\u7528\u7ED9\u3002"
      },
      premise: {
        type: "string",
        description: "\u4E16\u754C\u89C2\u524D\u63D0\uFF1A\u8FD9\u662F\u4EC0\u4E48\u4E16\u754C\u3001\u53D1\u751F\u5728\u54EA\u513F\u3001\u4E3B\u89D2\u662F\u8C01\u3001\u620F\u4ECE\u54EA\u4E00\u523B\u5F00\u59CB\u3002\u5199\u8FDB memory/always/premise.md\u3002\u4E0D\u5199\u5C31\u53EA\u7ACB\u9AA8\u67B6\uFF0C\u524D\u63D0\u7559\u7ED9\u4E4B\u540E\u518D\u5199\u3002"
      },
      opening: {
        type: "string",
        description: "\u5F00\u5C40\u6307\u4EE4\uFF1A\u73A9\u5BB6\u70B9\u300C\u5F00\u6F14\u300D\u65F6\u53D1\u7ED9\u5267\u4F5C\u5BB6\u7684\u7B2C\u4E00\u53E5\uFF08\u5982\u300C\uFF08\u6E38\u620F\u5F00\u59CB\uFF0C\u8BF7\u6F14\u51FA\u7B2C\u4E00\u8F6E\uFF09\u300D\uFF09\u3002\u4E0D\u5199\u8D70\u5F15\u64CE\u7F3A\u7701\u3002"
      },
      characters: {
        type: "array",
        description: '\u5148\u7ACB\u8D77\u6765\u7684\u51FA\u573A\u89D2\u8272\u3002\u53EA\u51FA\u58F0\u4E0D\u51FA\u56FE\u7684\u4E34\u65F6\u8DEF\u4EBA\u4E0D\u7528\u5217\u5728\u8FD9\u91CC\uFF08\u5267\u672C\u91CC\u5199 <say id="\u2026" name="\u2026"> \u5C31\u591F\u4E86\uFF09\u3002',
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            id: {
              type: "string",
              required: true,
              description: "\u4E3B\u4F53 id\uFF0C\u4E5F\u662F characters/<id>.md \u7684\u6587\u4EF6\u540D\u3002\u73A9\u5BB6\u626E\u6F14\u7684\u4E3B\u89D2\u56FA\u5B9A id \u4E3A protagonist\u3002"
            },
            name: { type: "string", description: "\u663E\u793A\u540D\uFF1B\u4E0D\u5199\u5C31\u663E\u793A id\u3002" },
            persona: { type: "string", description: "\u89D2\u8272\u5361\u6B63\u6587\uFF1A\u5E74\u9F84\u3001\u5173\u7CFB\u3001\u8BF4\u8BDD\u65B9\u5F0F\u3001\u5728\u610F\u7684\u70B9\u3002" }
          }
        }
      }
    },
    output: {
      schema: { type: "string" },
      render: (_args, text2) => [{ type: "text", text: text2 }]
    },
    async execute(args) {
      const result = await scaffoldPlay(ctx.playDir(), {
        title: args.title,
        id: args.id,
        premise: args.premise,
        opening: args.opening,
        characters: args.characters
      });
      const lines = [`\u5DF2\u628A ${result.dir} \u7ACB\u6210\u5267\u76EE\u300A${args.title.trim()}\u300B\uFF08id: ${result.id}\uFF09\u3002`];
      if (result.kept.length > 0) lines.push(`\u5DF2\u7ECF\u6709\u3001\u8FD9\u4EFD\u6CA1\u52A8\uFF1A${result.kept.join("\u3001")}`);
      lines.push(`\u65B0\u5199\u4E0B\uFF1A${result.written.join("\u3001")}`);
      lines.push("\u63A5\u4E0B\u6765\u6309\u300A\u5267\u76EE\u5728\u54EA\u300B\u53BB\u8BFB premise.md \u4E0E\u89D2\u8272\u5361\uFF0C\u7F3A\u4EC0\u4E48\u8865\u4EC0\u4E48\u3002");
      return lines.join("\n");
    }
  });
}

// src/playwriter/tools/beat-done.ts
import { defineTool as defineTool2 } from "@deepseek-ai/dsh-tools";
var DESCRIPTION3 = [
  "\u672C\u8F6E\u6F14\u51FA\u5185\u5BB9\u5199\u5B8C\u65F6\u8C03\u7528\uFF0C**\u4E0D\u4E0E\u5176\u4ED6\u5DE5\u5177\u540C\u6279\u8C03\u7528**\u3002",
  "\u8FD9\u662F\u4E00\u4E2A**\u5DE5\u5177\u8C03\u7528**\uFF1A\u5199\u5728\u6B63\u6587\u91CC\u7684 `<beat_done \u2026/>` \u6807\u7B7E\u5F15\u64CE\u8BA4\u4E0D\u51FA\uFF0C\u53EA\u4F1A\u88AB\u5F53\u6210\u4E00\u884C\u5199\u574F\u7684\u6807\u7B7E\u4E22\u6389\u3002",
  "\u8C03\u4E86 = \u8FD9\u4E00\u8F6E\u5230\u6B64\u7ED3\u675F\uFF0C\u821E\u53F0\u6309\u53C2\u6570\u6446\u51FA\u505C\u6B62\u70B9\uFF08\u6216\u81EA\u7136\u6536\u5C3E\uFF09\uFF0C\u7B49\u73A9\u5BB6\u56DE\u5E94\uFF1B",
  "\u4E0D\u8C03 = \u8FD9\u4E00\u8F6E\u4E0D\u4F1A\u6536\u675F\uFF0C\u821E\u53F0\u505C\u5728\u534A\u622A\uFF0C\u73A9\u5BB6\u6CA1\u6709\u53EF\u70B9\u7684\u4E1C\u897F\u3002",
  "\u672C\u8F6E\u505C\u5728\u54EA\u91CC\u7531\u53C2\u6570\u51B3\u5B9A\uFF1A",
  "- options = \u505C\u5728\u9009\u9879\u9762\u677F\uFF0C\u73A9\u5BB6\u70B9\u4E00\u6761\u7EE7\u7EED\uFF08\u7ED9\u51E0\u6761\u4E92\u65A5\u7684\u9009\u9879\u7167\u300A\u5199\u4F5C\u53C2\u6570\u300B\uFF09\uFF1B",
  "- \u53EA\u7ED9 placeholder = \u505C\u5728\u81EA\u7531\u8F93\u5165\u6846\uFF0Cplaceholder \u662F\u8F93\u5165\u6846\u91CC\u7684\u63D0\u793A\u8BED\uFF1B",
  "- \u4E24\u4E2A\u90FD\u4E0D\u7ED9 = \u672C\u8F6E\u81EA\u7136\u6F14\u5B8C\uFF0C\u7B49\u73A9\u5BB6\u7684\u4E0B\u4E00\u6761\u6D88\u606F\u3002",
  "\u8C03\u5B8C\u4E4B\u540E\u672C\u8F6E\u7ACB\u5373\u7ED3\u675F\uFF0C\u4E0D\u8981\u518D\u8F93\u51FA\u4EFB\u4F55\u5185\u5BB9\u3002\u7ED9\u4E86 options \u4F46\u53BB\u6389\u7A7A\u767D\u540E\u4E0D\u8DB3\u4E24\u6761\uFF0C\u4F1A\u62FF\u5230\u62A5\u9519\u56DE\u6267\u3002"
].join("\n");
var textOutput = {
  schema: { type: "string" },
  render: (_args, text2) => [{ type: "text", text: text2 }]
};
function createBeatDoneTool(ctx) {
  return defineTool2({
    name: "beat_done",
    description: DESCRIPTION3,
    parameters: {
      options: {
        type: "array",
        items: { type: "string", description: "\u4E00\u6761\u9009\u9879\u6587\u672C\uFF1A\u77ED\uFF0C\u50CF\u73A9\u5BB6\u4F1A\u8BF4\u7684\u8BDD" },
        description: "\u82E5\u5E72\u4E92\u65A5\u9009\u9879\uFF08\u53BB\u6389\u7A7A\u767D\u540E\u81F3\u5C11\u4E24\u6761\uFF09= \u8FD9\u4E00\u8F6E\u505C\u5728\u9009\u9879\u9762\u677F\uFF0C\u73A9\u5BB6\u70B9\u4E00\u6761\u7EE7\u7EED\u3002\u7ED9\u51E0\u6761\u7167\u300A\u5199\u4F5C\u53C2\u6570\u300B\u3002"
      },
      placeholder: {
        type: "string",
        description: "\u53EA\u7ED9 placeholder\uFF08\u4E0D\u7ED9 options\uFF09= \u505C\u5728\u81EA\u7531\u8F93\u5165\u6846\uFF0C\u8FD9\u662F\u8F93\u5165\u6846\u91CC\u7684\u63D0\u793A\u8BED\uFF0C\u6BD4\u5982\u300C\u60F3\u5BF9\u4ED6\u8BF4\u4EC0\u4E48\uFF1F\u300D\u3002"
      }
    },
    output: textOutput,
    async execute(args, exec) {
      const raw = args.options ?? [];
      const options = raw.map((text2) => text2.trim()).filter((text2) => text2 !== "");
      const placeholder = args.placeholder?.trim();
      if (raw.length > 0 && options.length < 2) {
        throw new Error(
          "options \u81F3\u5C11\u8981\u6709\u4E24\u6761\u975E\u7A7A\u6587\u672C\uFF08\u6574\u6761\u53EA\u6709\u7A7A\u767D\u4E0D\u7B97\uFF09\uFF1B\u6216\u8005\u53EA\u7ED9 placeholder = \u505C\u5728\u81EA\u7531\u8F93\u5165\u6846"
        );
      }
      const hasOptions = options.length >= 2;
      const hasBoth = hasOptions && Boolean(placeholder);
      if (hasOptions) ctx.hub.append(ctx.sessionId, { kind: "stop", stopType: "choice", options: options.map((text2) => ({ text: text2 })) });
      else if (placeholder) ctx.hub.append(ctx.sessionId, { kind: "stop", stopType: "free", placeholder });
      ctx.beatClosed();
      exec.concludeTurn();
      if (!hasOptions) return placeholder ? "\u5DF2\u4EA4\u51FA\u505C\u6B62\u70B9\uFF0C\u672C\u8F6E\u5230\u6B64\u7ED3\u675F\u3002" : "\u672C\u8F6E\u5230\u6B64\u7ED3\u675F\u3002";
      return hasBoth ? "\u5DF2\u4EA4\u51FA\u9009\u9879\u505C\u6B62\u70B9\uFF08\u672C\u8F6E\u540C\u65F6\u7ED9\u4E86 placeholder\uFF0C\u6309 options \u8D70\uFF0Cplaceholder \u8FD9\u8F6E\u4E0D\u751F\u6548\uFF09\u3002\u672C\u8F6E\u5230\u6B64\u7ED3\u675F\u3002" : "\u5DF2\u4EA4\u51FA\u505C\u6B62\u70B9\uFF0C\u672C\u8F6E\u5230\u6B64\u7ED3\u675F\u3002";
    }
  });
}

// src/playwriter/tools/get-readiness.ts
import { defineTool as defineTool3 } from "@deepseek-ai/dsh-tools";

// src/playwriter/readiness.ts
import { existsSync as existsSync3 } from "node:fs";
import { readdir, readFile as readFile2 } from "node:fs/promises";
import { join as join6 } from "node:path";
var IMAGE = /\.(png|jpe?g|webp)$/i;
async function readPlayReadiness(dir) {
  const play = await loadPlay(dir);
  const index = listAssets(dir);
  const characters = await countCharacters(dir);
  return {
    play: play !== null,
    premise: (await readText2(join6(dir, "memory", "always", "premise.md"))).trim() !== "",
    characters,
    sprites: await hasAnySprite(join6(dir, "assets", "sprites")),
    background: await hasAnyImage(join6(dir, "assets", "backgrounds")),
    assets: Object.values(index).reduce((total, files) => total + files.length, 0)
  };
}
function renderReadiness(r) {
  return [
    "\u5F00\u6F14\u6761\u4EF6\uFF1A\u6CA1\u6709\u786C\u95E8\u69DB\uFF0C\u7F3A\u4EC0\u4E48\u90FD\u80FD\u5F00\u6F14\u3002",
    `- \u5267\u76EE\uFF1A${r.play ? "\u2713" : "\u7F3A\uFF08play.json\uFF09\u2014\u2014\u4F1A\u8BDD\u5DE5\u4F5C\u76EE\u5F55\u91CC\u6CA1\u6709\u5B83\uFF0C\u8FD9\u8FD8\u4E0D\u662F\u4E00\u5EA7\u5267\u76EE"}`,
    `- \u6545\u4E8B\u524D\u63D0\uFF1A${r.premise ? "\u2713" : "\u7F3A\uFF08memory/always/premise.md\uFF09\u2014\u2014\u4E0D\u5199\u4E5F\u884C\uFF0C\u5267\u4F5C\u5BB6\u4F1A\u81EA\u7531\u53D1\u6325"}`,
    `- \u89D2\u8272\u5361\uFF1A${r.characters > 0 ? `${r.characters} \u5F20` : "\u7F3A\uFF08characters/<id>.md\uFF09"}\u2014\u2014\u6CA1\u6709\u5361\u7684\u89D2\u8272\u53EA\u80FD\u7528 <say name> \u51FA\u58F0`,
    `- \u7ACB\u7ED8\uFF1A${r.sprites ? "\u2713" : "\u7F3A\uFF08assets/sprites/<\u4E3B\u4F53id>/\uFF09\u2014\u2014\u6CA1\u6709\u7ACB\u7ED8\u7684\u4E3B\u4F53\u4E0D\u4E0A\u53F0\uFF0C\u6539\u7528\u65C1\u767D\u4EA4\u4EE3"}`,
    `- \u80CC\u666F\u56FE\uFF1A${r.background ? "\u2713" : "\u7F3A\uFF08assets/backgrounds/\uFF09\u2014\u2014\u6CA1\u6709\u80CC\u666F\u5C31\u843D\u6C1B\u56F4\u5E95\u8272\uFF0C\u7167\u6837\u80FD\u6F14"}`,
    `- \u7D20\u6750\u6E05\u5355\uFF1A${r.assets > 0 ? `${r.assets} \u4E2A\u6587\u4EF6` : "\u7A7A"}\u2014\u2014\u672C\u9636\u6BB5\u6CA1\u6709\u751F\u56FE\uFF0C\u7D20\u6750\u8981\u624B\u5DE5\u653E\u8FDB assets/`
  ].join("\n");
}
async function hasAnySprite(root) {
  if (!existsSync3(root)) return false;
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (entry.isDirectory() && await hasAnyImage(join6(root, entry.name))) return true;
  }
  return false;
}
async function hasAnyImage(dir) {
  if (!existsSync3(dir)) return false;
  return (await readdir(dir)).some((name2) => IMAGE.test(name2));
}
async function countCharacters(dir) {
  const root = join6(dir, "characters");
  if (!existsSync3(root)) return 0;
  return (await readdir(root)).filter((name2) => name2.endsWith(".md")).length;
}
async function readText2(path) {
  try {
    return await readFile2(path, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
}

// src/playwriter/tools/get-readiness.ts
var DESCRIPTION4 = [
  "\u68C0\u67E5\u8FD9\u5EA7\u5267\u76EE\u8FD8\u7F3A\u4EC0\u4E48\uFF08\u6545\u4E8B\u524D\u63D0 / \u89D2\u8272\u5361 / \u7ACB\u7ED8 / \u80CC\u666F\u56FE / \u7D20\u6750\u6E05\u5355\uFF09\u3002",
  "\u5F00\u5199\u524D\u3001\u6216\u73A9\u5BB6\u95EE\u300C\u80FD\u6F14\u4E86\u5417\u300D\u65F6\u8C03\u5B83\uFF1A\u62A5\u51FA\u6765\u7684\u7F3A\u9879\u51B3\u5B9A\u8FD9\u4E00\u8F6E\u600E\u4E48\u5199\u2014\u2014\u7F3A\u80CC\u666F\u5C31\u591A\u7ED9\u65C1\u767D\uFF0C",
  "\u7F3A\u7ACB\u7ED8\u7684\u4E3B\u4F53\u522B\u8BA9\u5B83\u4E0A\u53F0\u3002**\u6CA1\u6709\u786C\u95E8\u69DB**\uFF1A\u7F3A\u4EC0\u4E48\u90FD\u80FD\u5F00\u6F14\uFF0C\u8FD9\u4E2A\u5DE5\u5177\u4E0D\u62E6\u4EFB\u4F55\u4E8B\u3002"
].join("\n");
function createReadinessTool(ctx) {
  return defineTool3({
    name: "get_readiness",
    description: DESCRIPTION4,
    parameters: {},
    output: {
      schema: { type: "string" },
      render: (_args, text2) => [{ type: "text", text: text2 }]
    },
    async execute() {
      return renderReadiness(await readPlayReadiness(ctx.playDir()));
    }
  });
}

// src/playwriter/tools/list-library.ts
import { existsSync as existsSync4 } from "node:fs";
import { readdir as readdir2, readFile as readFile3 } from "node:fs/promises";
import { join as join7 } from "node:path";
import { defineTool as defineTool4 } from "@deepseek-ai/dsh-tools";
var LIST_LIMIT = 40;
var KINDS = ["backgrounds", "cg", "sprites", "characters", "bgm", "sfx"];
var DESCRIPTION5 = [
  "\u5217\u51FA\u672C\u5267\u76EE\u5DF2\u6709\u7684\u7D20\u6750\uFF08assets/ \u76EE\u5F55 + \u7D20\u6750\u63CF\u8FF0\u8868 assets/manifest.json\uFF09\u3002",
  "**\u8981\u6311\u7D20\u6750\u5148\u770B\u5B83**\uFF1A\u5E26\u63CF\u8FF0\u7684\u6761\u76EE\u5199\u7684\u662F\u753B\u9762\u5185\u5BB9\u3001\u60C5\u7EEA\u3001\u9002\u7528\u573A\u666F\u2014\u2014\u6587\u4EF6\u540D\u672A\u5FC5\u4E0E\u753B\u9762\u5BF9\u5F97\u4E0A\u3002",
  "\u672C\u9636\u6BB5\u6CA1\u6709\u8DE8\u5267\u76EE\u7684\u7D20\u6750\u8D44\u6E90\u5E93\uFF0C\u4E5F\u6CA1\u6709\u751F\u56FE\uFF1A\u8FD9\u91CC\u5217\u7684\u5C31\u662F\u8FD9\u5EA7\u5267\u76EE\u7684\u5168\u90E8\u5BB6\u5F53\uFF0C",
  "\u6E05\u5355\u91CC\u6CA1\u6709\u7684 id \u4E0D\u8981\u5199\u8FDB\u5267\u672C\uFF08\u5199\u4E86\u4E0D\u4F1A\u6709\u753B\u9762\uFF0C\u90A3\u4E00\u884C\u7167\u5E38\u6F14\uFF0C\u53EA\u662F\u7A7A\u7740\uFF09\u3002",
  "\u53EF\u7ED9 kind \u8FC7\u6EE4\u7C7B\u76EE\uFF08backgrounds / cg / sprites / characters / bgm / sfx\uFF09\uFF0C\u53EF\u7ED9 query \u6309\u5173\u952E\u8BCD\u641C id \u4E0E\u63CF\u8FF0\u3002",
  "\u6BCF\u884C\u662F\uFF1Aid | \u7C7B\u76EE | \u6807\u9898 | \u63CF\u8FF0\u3002\u7ACB\u7ED8\u884C\u7684 id \u662F <\u4E3B\u4F53id>/<\u5DEE\u5206\u540D>\uFF0C\u5C31\u662F <actor variant> \u8981\u5199\u7684\u90A3\u4E2A\u540D\u5B57\uFF1B",
  "characters \u7C7B\u76EE\u5217\u7684\u662F\u89D2\u8272\u5361\uFF08characters/<id>.md\uFF09\uFF0C\u4E0D\u662F\u7D20\u6750\u6587\u4EF6\u3002"
].join("\n");
function createListLibraryTool(ctx) {
  return defineTool4({
    name: "list_library",
    description: DESCRIPTION5,
    parameters: {
      kind: { type: "string", enum: [...KINDS], description: "\u53EA\u5217\u8FD9\u4E00\u7C7B\uFF1B\u4E0D\u7ED9\u5C31\u662F\u5168\u90E8\u3002" },
      query: { type: "string", description: "\u5173\u952E\u8BCD\uFF1A\u5339\u914D id / \u6807\u9898 / \u63CF\u8FF0 / \u6807\u7B7E\uFF0C\u5927\u5C0F\u5199\u4E0D\u654F\u611F\u3002" }
    },
    output: {
      schema: { type: "string" },
      render: (_args, text2) => [{ type: "text", text: text2 }]
    },
    async execute(args) {
      const dir = ctx.playDir();
      const rows2 = await collect(dir);
      const query = (args.query ?? "").trim().toLowerCase();
      const matched = rows2.filter(
        (row) => (!args.kind || row.kind === args.kind) && matchRow(row, query)
      );
      if (matched.length === 0) {
        return rows2.length === 0 ? "\u7D20\u6750\u6E05\u5355\u662F\u7A7A\u7684\uFF08assets/ \u4E0B\u8FD8\u6CA1\u6709\u4EFB\u4F55\u7D20\u6750\uFF09\u3002\u672C\u9636\u6BB5\u6CA1\u6709\u751F\u56FE\uFF0C\u7D20\u6750\u8981\u73A9\u5BB6\u624B\u5DE5\u653E\u8FDB assets/\u2014\u2014\u7F3A\u7D20\u6750\u5C31\u6362\u4E00\u6BB5\u80FD\u6F14\u7684\u620F\uFF0C\u7528\u65C1\u767D\u4EA4\u4EE3\u3002" : `\u6CA1\u6709\u5339\u914D\u300C${args.query ?? ""}\u300D${args.kind ? `\u4E14\u7C7B\u76EE\u4E3A ${args.kind} ` : ""}\u7684\u7D20\u6750\uFF08\u5171 ${rows2.length} \u6761\uFF0C\u6362\u4E2A\u8BCD\u6216\u53BB\u6389\u8FC7\u6EE4\u518D\u8BD5\uFF09\u3002`;
      }
      const shown = matched.slice(0, LIST_LIMIT);
      const lines = shown.map((row) => `${row.id} | ${row.kind} | ${row.title} | ${row.detail}`);
      if (matched.length > shown.length) {
        lines.push(`\uFF08\u5171 ${matched.length} \u6761\uFF0C\u8FD9\u91CC\u53EA\u5217\u4E86\u524D ${shown.length} \u6761\uFF1B\u7528 kind \u6216 query \u7F29\u5C0F\u8303\u56F4\uFF09`);
      }
      return lines.join("\n");
    }
  });
}
async function collect(dir) {
  const index = listAssets(dir);
  const manifest = readManifest(dir);
  const rows2 = [];
  for (const [key, files] of Object.entries(index)) {
    const spriteDir = key.startsWith("sprites/") ? key.slice("sprites/".length) : null;
    const kind = spriteDir === null ? key : "sprites";
    for (const file of files) {
      const stem = file.replace(/\.\w+$/, "");
      const meta = mergeMeta(manifest, stem, spriteDir);
      rows2.push({
        id: spriteDir ? `${spriteDir}/${stem}` : stem,
        kind,
        title: meta.title ?? stem,
        detail: describeAsset(meta) || "\uFF08\u6CA1\u6709\u63CF\u8FF0\uFF09"
      });
    }
  }
  rows2.push(...await collectCharacters(dir, manifest));
  return rows2;
}
function mergeMeta(manifest, stem, spriteDir) {
  if (!spriteDir) return manifest[stem] ?? {};
  return { ...manifest[stem], ...manifest[`${spriteDir}/${stem}`] };
}
async function collectCharacters(dir, manifest) {
  const root = join7(dir, "characters");
  if (!existsSync4(root)) return [];
  const rows2 = [];
  for (const name2 of (await readdir2(root)).filter((entry) => entry.endsWith(".md")).sort()) {
    const id = name2.slice(0, -3);
    const text2 = await readFile3(join7(root, name2), "utf8");
    const card = parseCharacterCard(text2);
    const sprite = card.sprite ?? id;
    const variants = Object.keys(manifest[`sprites/${sprite}`]?.variants ?? {});
    rows2.push({
      id,
      kind: "characters",
      title: card.name ?? id,
      detail: [
        id === "protagonist" ? "\u73A9\u5BB6\u626E\u6F14" : null,
        card.voice ? `\u97F3\u8272\uFF1A${card.voice}` : null,
        `\u7ACB\u7ED8\u76EE\u5F55\uFF1Aassets/sprites/${sprite}/`,
        variants.length > 0 ? `\u5DEE\u5206\uFF1A${variants.join(" ")}` : null
      ].filter(Boolean).join(" | ")
    });
  }
  return rows2;
}
function matchRow(row, query) {
  if (!query) return true;
  return `${row.id} ${row.kind} ${row.title} ${row.detail}`.toLowerCase().includes(query);
}

// src/playwriter/tools/set-craft.ts
import { readFile as readFile4, writeFile as writeFile2 } from "node:fs/promises";
import { join as join8 } from "node:path";
import { defineTool as defineTool5 } from "@deepseek-ai/dsh-tools";
var RESET = "\u7701\u7565 = \u4FDD\u6301\u73B0\u72B6\uFF1B\u7ED9 null = \u6062\u590D\u5F15\u64CE\u9ED8\u8BA4\u503C\uFF08\u8BE5\u5B57\u6BB5\u4ECE play.json \u79FB\u9664\uFF09\u3002";
var DESCRIPTION6 = [
  "\u8BBE\u7F6E\u8FD9\u4E2A\u5267\u76EE\u7684\u5199\u4F5C\u53C2\u6570\uFF08\u6BCF\u8F6E\u7BC7\u5E45\u3001\u505C\u6B62\u70B9\u9009\u9879\u6570\u3001\u7D20\u6750\u6765\u6E90\uFF09\uFF0C\u5199\u8FDB play.json \u7684 craft \u6BB5\u3002",
  "\u8C03\u4E86 = \u6587\u4EF6\u7ACB\u523B\u66F4\u65B0\uFF0C\u56DE\u6267\u91CC\u5E26\u56DE\u65B0\u7684\u751F\u6548\u503C\uFF1B\u4E0D\u8C03 = \u53C2\u6570\u7EF4\u6301\u539F\u6837\u3002",
  "**\u7528\u6237\u8981\u6C42\u6539\u3001\u6216\u4F60\u4EEC\u5546\u5B9A\u4E86\u65B0\u7684\u8282\u594F\u518D\u8C03**\u2014\u2014\u522B\u81EA\u5DF1\u987A\u624B\u6539\uFF0C\u6BCF\u4E00\u8F6E\u600E\u4E48\u5199\u662F\u6309\u5B83\u6765\u7684\u3002",
  `- ${RESET}`,
  "\u7D20\u6750\u6765\u6E90\u56DB\u7C7B\u8BB0\u7684\u662F**\u610F\u5411**\uFF1A\u672C\u9636\u6BB5\u6CA1\u6709\u751F\u56FE\u3001\u4E5F\u6CA1\u6709\u8DE8\u5267\u76EE\u7D20\u6750\u8D44\u6E90\u5E93\uFF0C\u56DB\u7C7B\u7D20\u6750\u4E00\u5F8B\u53EA\u80FD\u7528\u624B\u5DE5\u653E\u8FDB",
  "assets/ \u7684\u90A3\u4E9B\uFF1B\u8FD9\u4E9B\u503C\u5199\u4E0B\u53BB\u8981\u7B49\u5F15\u64CE\u652F\u6301\u51FA\u56FE/\u8D44\u6E90\u5E93\u624D\u771F\u7684\u6539\u53D8\u884C\u4E3A\u3002",
  "\u6587\u98CE\u3001\u7981\u5FCC\u3001\u79F0\u547C\u4E60\u60EF\u8FD9\u7C7B\u53EA\u80FD\u62FF\u8BDD\u8BF4\u7684\u53E3\u5F84\u4E0D\u5728\u8FD9\u91CC\uFF0C\u5199\u5728 memory/always/craft.md\u3002",
  "\u6539\u5B8C\u62FF\u56DE\u6267\u91CC\u7684\u751F\u6548\u503C\u8DDF\u7528\u6237\u786E\u8BA4\u3002"
].join("\n");
function createSetCraftTool(ctx) {
  return defineTool5({
    name: "set_craft",
    description: DESCRIPTION6,
    parameters: {
      beatLength: {
        oneOf: [
          {
            type: "string",
            enum: [...CRAFT_ENUMS.beatLength],
            description: "\u4E00\u8F6E\u5199\u591A\u957F\uFF1Ashort \u4E00\u4E2A\u6765\u56DE\u5C31\u6536 / medium \u6F14\u5B8C\u4E00\u5C0F\u6BB5 / long \u6F14\u5B8C\u4E00\u6574\u573A\u620F"
          },
          { type: "null" }
        ],
        description: `\u6BCF\u8F6E\u7BC7\u5E45\u3002${RESET}`
      },
      stopOptions: {
        oneOf: [
          {
            type: "string",
            enum: [...CRAFT_ENUMS.stopOptions],
            description: "\u505C\u6B62\u70B9\u7ED9\u51E0\u6761\u9009\u9879\uFF1Atwo/three/four = \u6BCF\u6B21 2/3/4 \u6761\uFF0Cfree = \u56FA\u5B9A\u505C\u5728\u81EA\u7531\u8F93\u5165\u6846"
          },
          { type: "null" }
        ],
        description: `\u505C\u6B62\u70B9\u9009\u9879\u6570\u3002${RESET}`
      },
      assets: {
        oneOf: [
          {
            type: "object",
            additionalProperties: false,
            description: "\u7D20\u6750\u6765\u6E90\u9010\u7C7B\u58F0\u660E\uFF1B\u5BF9\u8C61\u91CC\u54EA\u4E00\u9879\u7701\u7565\u5C31\u54EA\u4E00\u9879\u4E0D\u52A8",
            properties: {
              background: {
                oneOf: [
                  {
                    type: "string",
                    enum: [...CRAFT_ENUMS.background],
                    description: "library-first \u8D44\u6E90\u5E93\u4F18\u5148\u3001\u6CA1\u6709\u5408\u9002\u7684\u518D\u51FA\u56FE / library \u53EA\u7528\u5E93\u91CC\u73B0\u6210\u7684 / generate \u76F4\u63A5\u51FA\u56FE"
                  },
                  { type: "null" }
                ]
              },
              cg: {
                oneOf: [
                  {
                    type: "string",
                    enum: [...CRAFT_ENUMS.cg],
                    description: "library \u53EA\u7528\u5E93\u91CC\u73B0\u6210\u7684 / generate \u76F4\u63A5\u51FA\u56FE / off \u672C\u5267\u76EE\u4E0D\u7528\u63D2\u56FE"
                  },
                  { type: "null" }
                ]
              },
              sprite: {
                oneOf: [
                  { type: "string", enum: [...CRAFT_ENUMS.sprite], description: "generate \u51FA\u56FE / off \u4E0D\u51FA\u7ACB\u7ED8" },
                  { type: "null" }
                ]
              },
              audio: {
                oneOf: [
                  { type: "string", enum: [...CRAFT_ENUMS.audio], description: "library \u53EA\u7528\u5E93\u91CC\u73B0\u6210\u7684 / off \u4E0D\u7528\u97F3\u4E50\u97F3\u6548" },
                  { type: "null" }
                ]
              }
            }
          },
          { type: "null" }
        ],
        description: `\u7D20\u6750\u6765\u6E90\uFF08\u80CC\u666F / \u63D2\u56FE / \u7ACB\u7ED8 / \u97F3\u4E50\u97F3\u6548\uFF09\u3002${RESET}${" "}\u7ED9 null = \u56DB\u9879\u4E00\u8D77\u6062\u590D\u9ED8\u8BA4\u3002`
      }
    },
    output: {
      schema: { type: "string" },
      render: (_args, text2) => [{ type: "text", text: text2 }]
    },
    async execute(args) {
      const path = join8(ctx.playDir(), PLAY_FILE);
      let before;
      try {
        before = await readFile4(path, "utf8");
      } catch (error) {
        if (error.code === "ENOENT") {
          throw new Error(`${PLAY_FILE} \u4E0D\u5728\u8FD9\u4E2A\u4F1A\u8BDD\u7684\u5DE5\u4F5C\u76EE\u5F55\u91CC\u2014\u2014\u8FD9\u91CC\u8FD8\u4E0D\u662F\u4E00\u5EA7\u5267\u76EE\uFF0C\u5148\u8BA9\u73A9\u5BB6\u628A\u5267\u76EE\u5EFA\u8D77\u6765`);
        }
        throw error;
      }
      const patch = {};
      if (args.beatLength !== void 0) patch.beatLength = args.beatLength;
      if (args.stopOptions !== void 0) patch.stopOptions = args.stopOptions;
      if (args.assets !== void 0) patch.assets = args.assets;
      const raw = JSON.parse(before);
      const play = parsePlayConfig(raw);
      if (Object.keys(patch).length === 0) {
        return `\u8FD9\u6B21\u6CA1\u7ED9\u4EFB\u4F55\u8981\u6539\u7684\u5B57\u6BB5\uFF08\u4E09\u4E2A\u53C2\u6570\u90FD\u53EF\u9009\uFF0C\u4F46\u603B\u5F97\u7ED9\u4E00\u4E2A\uFF09\u3002\u5F53\u524D\u751F\u6548\u503C\uFF1A

${describeCraftParams(
          resolveCraft(play.craft)
        )}`;
      }
      const merged = mergeCraftParams(play.craft, patch);
      const out = { ...raw };
      if (merged) out.craft = merged;
      else delete out.craft;
      const after = `${JSON.stringify(out, null, 2)}
`;
      if (after !== before) await writeFile2(path, after, "utf8");
      return `\u5DF2\u66F4\u65B0\u5199\u4F5C\u53C2\u6570\uFF08\u53EA\u628A\u4E0E\u9ED8\u8BA4\u503C\u4E0D\u540C\u7684\u5B57\u6BB5\u5199\u8FDB ${PLAY_FILE}\uFF09\u3002\u5F53\u524D\u751F\u6548\u503C\uFF1A

${describeCraftParams(
        resolveCraft(merged)
      )}`;
    }
  });
}

// src/playwriter/tools/update-state.ts
import { existsSync as existsSync5 } from "node:fs";
import { mkdir as mkdir2, readdir as readdir3, readFile as readFile5, writeFile as writeFile3 } from "node:fs/promises";
import { join as join9 } from "node:path";
import { defineTool as defineTool6 } from "@deepseek-ai/dsh-tools";
var AFFINITY_DELTA_CAP = 5;
var AFFINITY_MAX = 100;
var STATE_DIR = join9("memory", "always", "state");
var DESCRIPTION7 = [
  "\u5199\u72B6\u6001\u6587\u4EF6\u2014\u2014\u672C\u5267\u76EE\u72B6\u6001\u5C31\u8FD9\u4E00\u4E2A\u5199\u8005\uFF08\u573A\u666F / \u6D3B\u8DC3\u5267\u60C5\u7EBF / \u597D\u611F\u5EA6 / \u65D7\u6807\uFF09\u3002",
  "\u8C03\u4E86 = \u6587\u4EF6\u7ACB\u523B\u66F4\u65B0\uFF0C\u4E4B\u540E\u4F60\u81EA\u5DF1 read \u5F97\u5230\uFF1B\u4E0D\u8C03 = \u72B6\u6001\u7EF4\u6301\u539F\u6837\uFF0C\u8DE8\u8F6E\u4E4B\u540E\u4F60\u5BF9\u5C40\u52BF\u7684\u8BB0\u5FC6\u4F1A\u6F02\u3002",
  "- scene\uFF1A\u5F53\u524D\u573A\u666F\u7684\u5730\u70B9\u3001\u5728\u573A\u7684\u4EBA\u3001\u65F6\u95F4\uFF08\u4E00\u4E24\u884C\uFF09\u2192 memory/always/state/scene.md",
  "- threads\uFF1A\u6D3B\u8DC3\u5267\u60C5\u7EBF\u4E0E\u60AC\u5FF5\uFF08\u8981\u70B9\u5217\u8868\uFF09\u2192 memory/always/state/threads.md",
  "- affinity\uFF1A\u597D\u611F\u5EA6**\u589E\u91CF**\uFF08\u5982 koharu: 2 \u8868\u793A +2\uFF0C\u5355\u6B21 |\u589E\u91CF|\u22645\uFF0C\u503C\u57DF 0~100\uFF09\uFF0C\u4E0D\u662F\u76EE\u6807\u503C\uFF1B",
  "  \u952E\u5FC5\u987B\u662F\u672C\u5267\u89D2\u8272 id\uFF08characters/<id>.md \u7684\u6587\u4EF6\u540D\uFF09\u2192 memory/always/state/state.json",
  "- flags\uFF1A\u65D7\u6807\u4F20\u76EE\u6807\u503C\uFF08\u5B57\u7B26\u4E32/\u6570\u5B57/\u5E03\u5C14\uFF09\u2192 \u540C\u4E00\u4E2A state.json",
  "\u53EA\u4F20\u8981\u6539\u7684\u90A3\u51E0\u9879\uFF0C\u4E0D\u4F20\u7684\u4E0D\u52A8\u3002\u5267\u60C5\u6709\u5B9E\u8D28\u63A8\u8FDB\u65F6\u624D\u8C03\u7528\uFF0C\u4E0D\u8981\u6BCF\u8F6E\u90FD\u8C03\u3002"
].join("\n");
function createUpdateStateTool(ctx) {
  return defineTool6({
    name: "update_state",
    description: DESCRIPTION7,
    parameters: {
      affinity: {
        type: "object",
        additionalProperties: true,
        description: "\u89D2\u8272 id \u2192 \u597D\u611F\u5EA6\u589E\u91CF\uFF08\u6574\u6570\uFF0C|\u0394|\u22645\uFF09\u3002\u53EA\u5199\u8981\u52A8\u7684\u89D2\u8272\u3002"
      },
      flags: {
        type: "object",
        additionalProperties: true,
        description: "\u65D7\u6807\u540D \u2192 \u76EE\u6807\u503C\uFF08\u5B57\u7B26\u4E32/\u6570\u5B57/\u5E03\u5C14\uFF09\u3002\u53EA\u5199\u8981\u52A8\u7684\u65D7\u6807\u3002"
      },
      scene: { type: "string", description: "\u5F53\u524D\u573A\u666F\uFF1A\u5730\u70B9\u3001\u5728\u573A\u7684\u4EBA\u3001\u65F6\u95F4\uFF08\u4E00\u4E24\u884C\uFF09\u3002\u5168\u6587\u8986\u76D6\u5199\u3002" },
      threads: { type: "string", description: "\u6D3B\u8DC3\u5267\u60C5\u7EBF\u4E0E\u60AC\u5FF5\uFF08\u8981\u70B9\u5217\u8868\uFF09\u3002\u5168\u6587\u8986\u76D6\u5199\u3002" }
    },
    output: {
      schema: { type: "string" },
      render: (_args, text2) => [{ type: "text", text: text2 }]
    },
    async execute(args) {
      const dir = ctx.playDir();
      const applied = [];
      const rejected = [];
      const characterIds = await readCharacterIds(dir);
      const state = await readState(dir);
      for (const [charId, value] of Object.entries(args.affinity ?? {})) {
        if (!characterIds.has(charId)) {
          rejected.push(`${charId} \u4E0D\u662F\u672C\u5267\u89D2\u8272\uFF08characters/<id>.md \u91CC\u6CA1\u6709\u8FD9\u4E00\u5F20\uFF09`);
          continue;
        }
        if (typeof value !== "number" || !Number.isInteger(value) || Math.abs(value) > AFFINITY_DELTA_CAP) {
          rejected.push(`${charId} \u589E\u91CF\u987B\u4E3A\u6574\u6570\u4E14 |\u0394|\u2264${AFFINITY_DELTA_CAP}\uFF08\u6536\u5230 ${JSON.stringify(value)}\uFF09`);
          continue;
        }
        const current = state.affinity[charId] ?? 0;
        const next = Math.max(0, Math.min(AFFINITY_MAX, current + value));
        state.affinity[charId] = next;
        applied.push(`${charId} ${value >= 0 ? "+" : ""}${value}\uFF08${current}\u2192${next}\uFF09`);
      }
      for (const [key, value] of Object.entries(args.flags ?? {})) {
        if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
          rejected.push(`\u65D7\u6807 ${key} \u7684\u503C\u53EA\u80FD\u662F\u5B57\u7B26\u4E32/\u6570\u5B57/\u5E03\u5C14\uFF08\u6536\u5230 ${JSON.stringify(value)}\uFF09`);
          continue;
        }
        state.flags[key] = value;
        applied.push(`\u65D7\u6807 ${key}=${String(value)}`);
      }
      const stateDir = join9(dir, STATE_DIR);
      await mkdir2(stateDir, { recursive: true });
      if (Object.keys(args.affinity ?? {}).length > 0 || Object.keys(args.flags ?? {}).length > 0) {
        await writeFile3(join9(stateDir, "state.json"), `${JSON.stringify(state, null, 2)}
`, "utf8");
      }
      for (const [key, value] of [
        ["scene", args.scene],
        ["threads", args.threads]
      ]) {
        if (value === void 0) continue;
        await writeFile3(join9(stateDir, `${key}.md`), `${value.trim()}
`, "utf8");
        applied.push(`${key}.md \u5DF2\u91CD\u5199`);
      }
      if (applied.length === 0 && rejected.length === 0) return "\u672A\u63D0\u4F9B\u4EFB\u4F55\u66F4\u65B0\u3002";
      return [
        applied.length > 0 ? `\u5DF2\u751F\u6548\uFF1A${applied.join("\uFF1B")}` : null,
        rejected.length > 0 ? `\u88AB\u62D2\u7EDD\uFF08\u8BF7\u4FEE\u6B63\u540E\u91CD\u8BD5\uFF09\uFF1A${rejected.join("\uFF1B")}` : null
      ].filter(Boolean).join("\n");
    }
  });
}
async function readState(dir) {
  try {
    const parsed = JSON.parse(await readFile5(join9(dir, STATE_DIR, "state.json"), "utf8"));
    return { affinity: parsed.affinity ?? {}, flags: parsed.flags ?? {} };
  } catch (error) {
    if (error.code === "ENOENT") return { affinity: {}, flags: {} };
    throw error;
  }
}
async function readCharacterIds(dir) {
  const root = join9(dir, "characters");
  if (!existsSync5(root)) return /* @__PURE__ */ new Set();
  const names = await readdir3(root);
  return new Set(names.filter((name2) => name2.endsWith(".md")).map((name2) => name2.slice(0, -3)));
}

// src/preset-tools.ts
var PRESETS = /* @__PURE__ */ new Set([PLAYWRITER_PRESET, STAGEHAND_PRESET]);
function installPresetTools(ctx, hub, guard) {
  const installed = /* @__PURE__ */ new WeakMap();
  const sync = (agent) => {
    const preset = sessionPreset(ctx, String(agent.id));
    const mine = preset !== void 0 && PRESETS.has(preset);
    const current = installed.get(agent);
    if (current?.preset === preset) return;
    current?.off();
    installed.delete(agent);
    if (!mine) return;
    installed.set(agent, { preset, off: install(hub, agent, preset, guard) });
  };
  const onCreated = (payload) => {
    const agent = payload.agent;
    if (agent?.ctx && agent.id !== void 0) sync(agent);
    return void 0;
  };
  const onSelected = (sessionId) => {
    const agent = ctx.agents.get(sessionId);
    if (agent?.ctx) sync(agent);
  };
  const offCreated = ctx.on("agent/created", onCreated);
  const offSelected = ctx.on("agent-preset/selected", onSelected);
  return () => {
    offCreated();
    offSelected();
  };
}
function safePlayDir(play) {
  try {
    return play.playDir();
  } catch {
    return "";
  }
}
function install(hub, agent, preset, guard) {
  const sessionId = String(agent.id);
  const play = {
    hub,
    sessionId,
    playDir() {
      const dir = agent.session?.header?.cwd;
      if (!dir) throw new Error("\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u5DE5\u4F5C\u76EE\u5F55\uFF0C\u53D6\u4E0D\u5230\u5267\u76EE\u6839");
      return dir;
    },
    beatClosed() {
      guard.close(sessionId);
    }
  };
  const tools = [createPlayTool(play)];
  if (preset === PLAYWRITER_PRESET) {
    tools.push(
      createBeatDoneTool(play),
      createUpdateStateTool(play),
      createReadinessTool(play),
      createListLibraryTool(play),
      createSetCraftTool(play)
    );
  }
  const offs = tools.map((tool) => agent.ctx.effect(() => agent.ctx.tools.register(tool), `dsh-aivn:${tool.name}`));
  if (preset === PLAYWRITER_PRESET) {
    offs.push(agent.ctx.effect(() => registerPlayContext(agent.ctx, () => safePlayDir(play)), "dsh-aivn:play-context"));
  }
  return () => {
    for (const off of offs.splice(0)) off();
  };
}

// src/routes.ts
import { readFile as readFile6 } from "node:fs/promises";
import { createUserMessage as createUserMessage2 } from "@deepseek-ai/dsh-llm";
var PREFIX = "/aivn";
var BODY_LIMIT = 8 * 1024;
function installStageRoutes(ctx, hub, injected) {
  return ctx.webServer.register({
    kind: "prefix",
    path: PREFIX,
    // **必须自己接住 rejection**：DSH 装了进程级的 `unhandledRejection` 处理，它直接
    // `process.exit(1)`。一个坏掉的 play.json、一次 EISDIR 就能把整台 DSH 连同所有会话杀掉。
    // 这里换个可读的 500 出去，坏的范围就只在用户那一座剧目里。
    handler: (req, res) => {
      handle(ctx, hub, injected, req, res).catch((error) => fail(res, error));
    }
  });
}
function fail(res, error) {
  if (res.headersSent) {
    res.destroy();
    return;
  }
  sendJson(res, 500, { error: error instanceof Error ? error.message : String(error) });
}
async function handle(ctx, hub, injected, req, res) {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (req.method === "GET" && url.pathname === `${PREFIX}/health`) {
    sendJson(res, 200, { ok: true, plugin: "dsh-aivn" });
    return;
  }
  if (req.method === "GET" && url.pathname === `${PREFIX}/play`) {
    const sessionId = url.searchParams.get("session") ?? "";
    const play = await loadPlay(sessionWorkspace(ctx, sessionId));
    sendJson(res, 200, play ? { dir: play.dir, config: play.config } : { dir: null });
    return;
  }
  if (req.method === "GET" && url.pathname === `${PREFIX}/assets`) {
    const sessionId = url.searchParams.get("session") ?? "";
    const play = await loadPlay(sessionWorkspace(ctx, sessionId));
    if (!play) {
      sendJson(res, 404, { error: "this session has no play" });
      return;
    }
    sendJson(res, 200, { index: listAssets(play.dir), manifest: readManifest(play.dir) });
    return;
  }
  if (req.method === "GET" && url.pathname === `${PREFIX}/asset`) {
    const sessionId = url.searchParams.get("session") ?? "";
    const relative2 = url.searchParams.get("path") ?? "";
    await sendAsset(ctx, res, sessionId, relative2);
    return;
  }
  if (req.method === "GET" && url.pathname === `${PREFIX}/stream`) {
    openStream(hub, url, req, res);
    return;
  }
  if (req.method === "POST" && url.pathname === `${PREFIX}/input`) {
    await acceptInput(ctx, injected, req, res);
    return;
  }
  sendJson(res, 404, { error: `no such route: ${req.method} ${url.pathname}` });
}
function openStream(hub, url, req, res) {
  const sessionId = url.searchParams.get("session") ?? "";
  if (!sessionId) {
    sendJson(res, 400, { error: "session is required" });
    return;
  }
  const unsubscribe = hub.subscribe(sessionId, res);
  const stop = () => unsubscribe();
  req.on("close", stop);
  res.on("close", stop);
}
async function sendAsset(ctx, res, sessionId, relative2) {
  const play = await loadPlay(sessionWorkspace(ctx, sessionId));
  if (!play) {
    sendJson(res, 404, { error: "this session has no play" });
    return;
  }
  const target = resolveInPlay(play.dir, relative2);
  if (!target) {
    sendJson(res, 400, { error: "path must stay inside the play" });
    return;
  }
  let body;
  try {
    body = await readFile6(target);
  } catch (error) {
    switch (error.code) {
      case "ENOENT":
        sendJson(res, 404, { error: `no such asset: ${relative2}` });
        return;
      case "EISDIR":
        sendJson(res, 400, { error: `path is a directory, not an asset: ${relative2}` });
        return;
      default:
        throw error;
    }
  }
  res.writeHead(200, { "content-type": contentTypeOf(target), "content-length": body.length });
  res.end(body);
}
async function acceptInput(ctx, injected, req, res) {
  if (!sameOrigin(req)) {
    sendJson(res, 403, { error: "cross-origin request rejected" });
    return;
  }
  if (!String(req.headers["content-type"] ?? "").startsWith("application/json")) {
    sendJson(res, 415, { error: "content-type must be application/json" });
    return;
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    const buf = chunk;
    size += buf.length;
    if (size > BODY_LIMIT) {
      sendJson(res, 413, { error: "body too large" });
      return;
    }
    chunks.push(buf);
  }
  let sessionId = "";
  let text2 = "";
  let silent = false;
  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    if (typeof parsed.session === "string") sessionId = parsed.session;
    if (typeof parsed.text === "string") text2 = parsed.text.trim();
    silent = parsed.silent === true;
  } catch {
    sendJson(res, 400, { error: "body must be JSON" });
    return;
  }
  if (!sessionId || !text2) {
    sendJson(res, 400, { error: "session and text are required" });
    return;
  }
  const agent = await resolveAgent(ctx, sessionId);
  if (!agent) {
    sendJson(res, 404, { error: `no such session: ${sessionId}` });
    return;
  }
  const message = createUserMessage2({ content: [{ type: "text", text: text2 }], source: { kind: "user" } });
  if (silent) injected.remember(message.id);
  agent.followup(message);
  sendJson(res, 200, { ok: true });
}
function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}
function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body)
  });
  res.end(body);
}

// src/stage-tap.ts
function installStageTap(ctx, hub, guard, injected) {
  const parsers = /* @__PURE__ */ new Map();
  const parserFor = (sessionId) => {
    let parser = parsers.get(sessionId);
    if (!parser) {
      parser = new StageDslParser((event) => {
        hub.append(sessionId, event);
        if (hasLines(event)) guard.noteLines(sessionId);
      });
      parsers.set(sessionId, parser);
    }
    return parser;
  };
  const isPlaywriter = (sessionId) => sessionPreset(ctx, sessionId) === PLAYWRITER_PRESET;
  const onFrame = (payload) => {
    const sessionId = payload.agent.id;
    if (!isPlaywriter(sessionId)) return;
    const { frame } = payload;
    if (frame.type === "end") {
      parserFor(sessionId).endMessage();
      return;
    }
    if (frame.type === "chunk" && frame.chunk.type === "text-delta" && frame.chunk.text) {
      parserFor(sessionId).feed(frame.chunk.text);
    }
  };
  const onStatus = (payload) => {
    const sessionId = payload.agent.id;
    if (!isPlaywriter(sessionId)) return;
    if (payload.status === "running") guard.begin(sessionId);
    hub.appendBeat(sessionId, payload.status === "running" ? "start" : "end");
  };
  const onInput = (payload) => {
    if (injected.claim(payload.message.id)) return;
    const sessionId = payload.agent.id;
    if (!isPlaywriter(sessionId)) return;
    const text2 = messageText(payload.message);
    if (text2) hub.append(sessionId, { kind: "player_input", text: text2 });
  };
  const offFrame = ctx.on("agent/assistant-stream", onFrame);
  const offStatus = ctx.on("agent/status", onStatus);
  const offInput = ctx.on("agent/inbox/inserted", onInput);
  return () => {
    offFrame();
    offStatus();
    offInput();
    parsers.clear();
  };
}
function hasLines(event) {
  if (event.kind === "say_text" || event.kind === "narrate_text" || event.kind === "thought_text") {
    return event.delta.trim() !== "";
  }
  return false;
}
function messageText(message) {
  return message.content.filter((block) => block.type === "text").map((block) => block.text).join("\n\n").trim();
}

// src/index.ts
var name = "dsh-aivn";
var inject = ["agents", "sessionController", "agentPresets", "commands", "systemPrompt"];
async function apply(ctx) {
  const hub = new StageHub();
  const guard = new BeatGuard();
  const injected = new InjectedMessages();
  const disposers = [
    installStageTap(ctx, hub, guard, injected),
    installPresetTools(ctx, hub, guard),
    installBeatGuard(ctx, guard, injected),
    installPlayCommands(ctx),
    await registerPresets(ctx)
  ];
  ctx.inject(["webServer"], (webCtx) => {
    disposers.push(installStageRoutes(webCtx, hub, injected));
    webCtx.logger.info("[dsh-aivn] stage routes mounted on /aivn");
  });
  return () => {
    for (const dispose of disposers.splice(0)) dispose();
    hub.dispose();
  };
}
export {
  PLAYWRITER_PRESET,
  STAGEHAND_PRESET,
  apply,
  inject,
  name
};
