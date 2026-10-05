// src/hub.ts
var KEEPALIVE_MS = 15e3;
var BUFFER_LIMIT = 4e3;
var StageHub = class {
  buffers = /* @__PURE__ */ new Map();
  seqs = /* @__PURE__ */ new Map();
  clients = /* @__PURE__ */ new Map();
  /** 收下一帧事件：标号、入缓冲、广播。 */
  append(sessionId, event) {
    const seq = (this.seqs.get(sessionId) ?? 0) + 1;
    this.seqs.set(sessionId, seq);
    const frame = { seq, event };
    const buffer = this.buffers.get(sessionId) ?? [];
    buffer.push(frame);
    if (buffer.length > BUFFER_LIMIT) buffer.splice(0, buffer.length - BUFFER_LIMIT);
    this.buffers.set(sessionId, buffer);
    for (const client of this.clients.get(sessionId) ?? []) writeEvent(client, frame);
    return frame;
  }
  /** 会话已播出的事件（补推用）。 */
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
    clients.add(res);
    this.clients.set(sessionId, clients);
    const keepalive = setInterval(() => res.write(": keepalive\n\n"), KEEPALIVE_MS);
    return () => {
      clearInterval(keepalive);
      clients.delete(res);
      if (clients.size === 0) this.clients.delete(sessionId);
    };
  }
};
function writeEvent(res, frame) {
  res.write(`event: ir
data: ${JSON.stringify(frame)}

`);
}

// src/routes.ts
import { createUserMessage } from "@deepseek-ai/dsh-llm";

// src/play.ts
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
function parseAttrs(source) {
  const attrs = /* @__PURE__ */ new Map();
  let rest = source;
  while (rest.trim() !== "") {
    const match = ATTR_RE.exec(rest);
    if (!match)
      return null;
    const key = match[1];
    const value = match[2] ?? match[3] ?? "";
    attrs.set(key, value);
    rest = rest.slice(match[0].length);
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
  emitText(text) {
    if (text === "")
      return;
    if (this.commentParse)
      return;
    if (this.openWrap) {
      const { tag } = this.openWrap;
      if (tag === "say")
        this.emit({ kind: "say_text", delta: text });
      else if (tag === "narrate")
        this.emit({ kind: "narrate_text", delta: text });
      else
        this.emit({ kind: "thought_text", delta: text });
      return;
    }
    if (text.trim() !== "")
      this.warn("orphan_text", `\u6807\u7B7E\u5916\u88F8\u6587\u672C\u4E22\u5F03: ${preview(text)}`);
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
function pick(attrs, keys) {
  const out = {};
  for (const key of keys) {
    const value = attrs.get(key);
    if (value !== void 0)
      out[key] = value;
  }
  return out;
}
function preview(text) {
  const trimmed = text.trim();
  return trimmed.length > WARN_DETAIL_LIMIT ? `${trimmed.slice(0, WARN_DETAIL_LIMIT)}\u2026` : trimmed;
}

// ../stage-ai/packages/core/dist/play/config.js
var CRAFT_BEAT_LENGTHS = ["short", "medium", "long"];
var CRAFT_STOP_OPTIONS = ["two", "three", "four", "free"];
var CRAFT_BACKGROUND_SOURCES = ["library-first", "library", "generate"];
var CRAFT_CG_SOURCES = ["library", "generate", "off"];
var CRAFT_SPRITE_SOURCES = ["generate", "off"];
var CRAFT_AUDIO_SOURCES = ["library", "off"];
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
  return { dir, config: parsePlayConfig(JSON.parse(raw)) };
}

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
  return attachedAgent(ctx, sessionId)?.session?.header?.agentPreset;
}
async function resolveAgent(ctx, sessionId) {
  const attached = attachedAgent(ctx, sessionId);
  if (attached) return attached;
  const found = await ctx.sessionController.resolveAgent(sessionId);
  return "error" in found ? void 0 : found.agent;
}

// src/routes.ts
var PREFIX = "/aivn";
var BODY_LIMIT = 8 * 1024;
function installStageRoutes(ctx, hub) {
  return ctx.webServer.register({
    kind: "prefix",
    path: PREFIX,
    handler: (req, res) => void handle(ctx, hub, req, res)
  });
}
async function handle(ctx, hub, req, res) {
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
  if (req.method === "GET" && url.pathname === `${PREFIX}/stream`) {
    openStream(hub, url, req, res);
    return;
  }
  if (req.method === "POST" && url.pathname === `${PREFIX}/input`) {
    await acceptInput(ctx, hub, req, res);
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
async function acceptInput(ctx, hub, req, res) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > BODY_LIMIT) {
      sendJson(res, 413, { error: "body too large" });
      return;
    }
  }
  let sessionId = "";
  let text = "";
  try {
    const parsed = JSON.parse(raw || "{}");
    if (typeof parsed.session === "string") sessionId = parsed.session;
    if (typeof parsed.text === "string") text = parsed.text.trim();
  } catch {
    sendJson(res, 400, { error: "body must be JSON" });
    return;
  }
  if (!sessionId || !text) {
    sendJson(res, 400, { error: "session and text are required" });
    return;
  }
  const agent = await resolveAgent(ctx, sessionId);
  if (!agent) {
    sendJson(res, 404, { error: `no such session: ${sessionId}` });
    return;
  }
  hub.append(sessionId, { kind: "player_input", text });
  agent.followup(createUserMessage({ content: [{ type: "text", text }], source: { kind: "user" } }));
  sendJson(res, 200, { ok: true });
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
function installStageTap(ctx, hub) {
  const parsers = /* @__PURE__ */ new Map();
  const parserFor = (sessionId) => {
    let parser = parsers.get(sessionId);
    if (!parser) {
      parser = new StageDslParser((event) => hub.append(sessionId, event));
      parsers.set(sessionId, parser);
    }
    return parser;
  };
  const onFrame = (payload) => {
    const sessionId = payload.agent.id;
    if (sessionPreset(ctx, sessionId) !== PLAYWRITER_PRESET) return;
    const { frame } = payload;
    if (frame.type === "end") {
      parserFor(sessionId).endMessage();
      return;
    }
    if (frame.type === "chunk" && frame.chunk.type === "text-delta" && frame.chunk.text) {
      parserFor(sessionId).feed(frame.chunk.text);
    }
  };
  const dispose = ctx.on("agent/assistant-stream", onFrame);
  return () => {
    dispose();
    parsers.clear();
  };
}

// src/index.ts
var name = "dsh-aivn";
var inject = ["agents", "sessions", "sessionController"];
function apply(ctx) {
  const hub = new StageHub();
  const disposers = [installStageTap(ctx, hub)];
  ctx.inject(["webServer"], (webCtx) => {
    disposers.push(installStageRoutes(webCtx, hub));
    webCtx.logger.info("[dsh-aivn] stage routes mounted on /aivn");
  });
  return () => {
    for (const dispose of disposers.splice(0)) dispose();
  };
}
export {
  PLAYWRITER_PRESET,
  STAGEHAND_PRESET,
  apply,
  inject,
  name
};
