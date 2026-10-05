// src/script.ts
function phaseZeroScript() {
  const frames = [];
  const say = (delay, ...events) => {
    for (const event of events) frames.push({ delay, event });
  };
  say(120, { kind: "scene", bg: "classroom-sunset", transition: "fade" });
  say(700, { kind: "narrate_start" });
  for (const delta of chunk("\u653E\u5B66\u540E\u7684\u6559\u5BA4\uFF0C\u5915\u9633\u628A\u684C\u6905\u67D3\u6210\u6A59\u8272\u3002")) {
    say(45, { kind: "narrate_text", delta });
  }
  say(420, { kind: "narrate_end" });
  say(300, { kind: "actor", id: "mio", pos: "center", variant: "neutral", shot: "normal" });
  say(420, { kind: "say_start", id: "mio", name: "\u6FAA" });
  for (const delta of chunk("\u4F60\u7EC8\u4E8E\u6765\u4E86\u3002\u6211\u8FD8\u4EE5\u4E3A\uFF0C\u4ECA\u5929\u53C8\u8981\u4E00\u4E2A\u4EBA\u7B49\u5230\u5929\u9ED1\u3002")) {
    say(55, { kind: "say_text", delta });
  }
  say(380, { kind: "say_end" });
  say(260, { kind: "actor", id: "yuki", pos: "left", variant: "smile", shot: "close", action: "nod" });
  say(400, { kind: "say_start", id: "yuki", name: "\u96EA" });
  for (const delta of chunk("\u8BF6\u2014\u2014\u90A3\u6211\u662F\u4E0D\u662F\u6765\u5F97\u4E0D\u662F\u65F6\u5019\uFF1F")) {
    say(55, { kind: "say_text", delta });
  }
  say(360, { kind: "say_end" });
  say(500, {
    kind: "stop",
    stopType: "choice",
    options: [
      { text: "\u300C\u6CA1\u6709\uFF0C\u6B63\u597D\u3002\u300D" },
      { text: "\u300C\u4F60\u4EEC\u4E24\u4E2A\uFF0C\u90FD\u5750\u5427\u3002\u300D" },
      { text: "\u6C89\u9ED8\u7740\u770B\u5411\u7A97\u5916\u3002" }
    ]
  });
  return frames;
}
function chunk(text) {
  const out = [];
  for (let i = 0; i < text.length; i += 2) out.push(text.slice(i, i + 2));
  return out;
}

// src/routes.ts
var PREFIX = "/aivn";
var KEEPALIVE_MS = 15e3;
var BODY_MAX_BYTES = 8 * 1024;
function installStageRoutes(ctx) {
  return ctx.webServer.register({
    kind: "prefix",
    path: PREFIX,
    handler: handle
  });
}
async function handle(req, res) {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (req.method === "GET" && url.pathname === `${PREFIX}/health`) {
    sendJson(res, 200, { ok: true, plugin: "dsh-aivn" });
    return;
  }
  if (req.method === "GET" && url.pathname === `${PREFIX}/stream`) {
    openStream(req, res);
    return;
  }
  if (req.method === "POST" && url.pathname === `${PREFIX}/input`) {
    await acceptInput(req, res);
    return;
  }
  sendJson(res, 404, { error: `no such route: ${req.method} ${url.pathname}` });
}
function openStream(req, res) {
  res.writeHead(200, {
    "content-type": "text/event-stream; charset=utf-8",
    "cache-control": "no-cache, no-transform",
    connection: "keep-alive",
    "x-accel-buffering": "no"
  });
  res.write(": open\n\n");
  const frames = phaseZeroScript();
  let closed = false;
  let index = 0;
  let seq = 0;
  let timer;
  const keepalive = setInterval(() => {
    if (!closed) res.write(": keepalive\n\n");
  }, KEEPALIVE_MS);
  const stop = () => {
    if (closed) return;
    closed = true;
    clearInterval(keepalive);
    if (timer) clearTimeout(timer);
  };
  const step = () => {
    if (closed) return;
    if (index >= frames.length) {
      index = 0;
      seq = 0;
    }
    const frame = frames[index++];
    seq += 1;
    res.write(`event: ir
data: ${JSON.stringify({ seq, event: frame.event })}

`);
    timer = setTimeout(step, frame.delay);
  };
  req.on("close", stop);
  res.on("close", stop);
  step();
}
async function acceptInput(req, res) {
  let raw = "";
  for await (const chunk2 of req) {
    raw += chunk2;
    if (raw.length > BODY_MAX_BYTES) {
      sendJson(res, 413, { error: "body too large" });
      return;
    }
  }
  let text = "";
  try {
    const parsed = JSON.parse(raw || "{}");
    if (typeof parsed.text === "string") text = parsed.text.slice(0, 500);
  } catch {
    sendJson(res, 400, { error: "body must be JSON" });
    return;
  }
  if (!text.trim()) {
    sendJson(res, 400, { error: "text is required" });
    return;
  }
  sendJson(res, 200, { ok: true, text, echo: `\uFF08Phase 0 \u56DE\u6267\uFF09${text}` });
}
function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body)
  });
  res.end(body);
}

// src/index.ts
var name = "dsh-aivn";
var inject = [];
function apply(ctx) {
  const disposers = [];
  ctx.inject(["webServer"], (webCtx) => {
    disposers.push(installStageRoutes(webCtx));
    webCtx.logger.info("[dsh-aivn] stage routes mounted on /aivn");
  });
  return () => {
    for (const dispose of disposers.splice(0)) dispose();
  };
}
export {
  apply,
  inject,
  name
};
