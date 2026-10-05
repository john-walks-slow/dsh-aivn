# dsh-aivn

<p align="center">
  <a href="./README.en.md"><strong>English</strong></a> ·
  <a href="./README.md"><strong>简体中文</strong></a>
</p>

AIVN's stage engine, inside DSH.

**One workspace is one play**: open a session in it, pick the **playwright (the script-writing agent role)** preset, and the conversation page gains a **Stage** tab where the Stage DSL the playwright writes is performed live — backgrounds, sprites, dialogue bar, stop-point options, all of it. The player clicks an option; that line goes back to the playwright, and it writes on.

![Stage tab: background, sprites, dialogue bar; the voice toggle and "replay this line" sit in the bottom right](screenshots/screenshot-1.png)

## Install

The package is a DSH bundle (`package.json` declares `dsh.bundle.patch`):

```bash
dsh plugin --profile web add dsh-aivn
```

Installing straight from GitHub works too — `lib/` is a **tracked build artifact**, so no build
script runs and pnpm's `allowBuilds` check never comes up:

```bash
dsh plugin --profile web add github:john-walks-slow/dsh-aivn
```

- **By hand**: add a line to your profile's `cordis.patch.yml`:

```yaml
- insert:
    - id: dsh-aivn
      name: dsh-aivn
      config: {}
```

- **The client half** (the Stage tab) mounts on the `conversation.view` slot and needs
  `dsh-web-app`. It is declared under `dsh.client{platform:"web"}` in `package.json` and
  does not go through the Loader.

Voice is the only configurable piece (leave it out and you simply have no voice; everything
else works as usual):

```yaml
- id: aivn
  name: dsh-aivn
  config:
    tts:
      keys: ["<your-fish-audio-key>"]   # several keys rotate, spreading the free quota
      baseUrl: https://api.fish.audio    # default; usually you don't need to set it
      model: s2.1-pro-free               # default
      concurrency: 2                     # cap on concurrent synthesis
```

If you'd rather not put keys in a config file, leave that empty and use the
`DSH_AIVN_TTS_KEYS` environment variable instead (comma-separated). Neither one present = the
stage doesn't even show the voice toggle. The two presets, six tools, one `/new-play` command,
and the `/aivn` routes are fixed and not configurable.

> During development `@aivn/core` and `@aivn/stage` are `file:` dependencies (pointing at the stage-ai repo). Release builds switch to version numbers.

## Usage

1. Start a new session and pick **playwright** on the seat chip (the one that preps material is
   the **stage-hand assistant**). The preset is fixed **when the session starts** and cannot be
   changed midway — start a new session to change it.
2. The session's working directory root needs a `play.json`. Without one, the stage says outright
   "this session's working directory has no play.json, so it isn't a play yet" — stand one up
   first, see below.
3. Say something, or switch to the **Stage** tab and hit **Start**. Everything after that happens
   on stage.

The Stage tab is the fourth tab in the session header (Chat / Trajectory / Stage).

### Starting a new play

No `play.json` in the workspace means "this isn't a play yet". Two entry points, and both write
exactly the same thing:

- **Human**: type `/new-play 雨中的旧校舍` in the input box. Without a play name, the working
  directory name is used.
- **Agent**: the `create_play` tool, which both presets ship.

Both **only write files that don't exist**: if `play.json` is already there, it errors out (this
is already a play — start a new one in an empty directory); if `memory/always/premise.md` and the
character cards are already written, they are skipped and listed as "kept" in the receipt. The
skeleton it leaves behind is the first few rows of the directory table above — fill in whatever
is missing as you go.

## Anatomy of a play

The working directory root is the play root:

```
play.json                          play config (the only required file)
memory/always/premise.md           world premise
memory/always/craft.md             prose style and taboos (prose — only sayable in words)
memory/always/state/scene.md       current scene (the playwright writes it)
memory/always/state/threads.md     open threads (the playwright writes it)
characters/<id>.md                 character card
assets/backgrounds/…               backgrounds
assets/cg/…                        CGs
assets/sprites/<id>/…              sprites: one directory per subject
assets/sfx/…  assets/bgm/…         sound effects and music
assets/manifest.json               asset description table: asset id → one-line visual
```

### play.json

Only two fields are required:

```json
{ "id": "my-play", "title": "我的剧目" }
```

The remaining fields (all optional):

| Field | Purpose |
| --- | --- |
| `opening` | Body of the opening user message. This is what **Start** and **Continue** on the stage send to the playwright. Defaults to `（游戏开始，请演出第一轮）` |
| `characters` | `[{ id, name }]`. **Only used to put names on the dialogue bar**: sprite binding lives in the character card's frontmatter |
| `craft` | Writing parameters, see below |
| `initialState` / `initialScene` | The play's starting state and starting scene |
| `scriptLanguage` | Script language (ISO 639-1). Defaults to following whatever language the player speaks |
| `voiceLanguage` / `defaultVoiceId` / `cover` | Voice and cover: they belong to the AIVN app; this plugin doesn't read them yet |
| `image` / `agents` | Image generation and agent runtime settings: they belong to the AIVN app; this plugin doesn't read them yet |

### characters/&lt;id&gt;.md

A character card is a Markdown file with optional frontmatter:

```markdown
---
name: 林
sprite: lin
voice: 短句，少用形容词
---

十七岁，话少，习惯先看窗外再看人。
```

- `name` — the name on the dialogue bar.
- `sprite` — which sprite directory to bind to (`assets/sprites/<sprite>/`). Omit it and the
  character's own id is used. Sprites are **their own thing**: a `characters/` entry can have no
  sprite, and a `sprites/` entry can have no card.
- `body` — the persona body.

### assets/manifest.json

The playwright sees ids, not pictures, and relies on these descriptions:

```json
{
  "veranda": { "description": "黄昏时分的走廊，木地板反着暖光" },
  "lin/normal": { "description": "林，常服，平静的神色" }
}
```

**The key is the asset id, not a path** — no directory prefix, no extension. Writing
`backgrounds/veranda.png` won't error; it just never matches, and the playwright will think that
asset has no description. Three key shapes:

| Asset | Key |
| --- | --- |
| Background / CG / SFX / music | File name without the extension (`veranda`) |
| Sprite (whole subject) | Sprite directory name (`lin`) |
| Sprite (single variant) | `<sprite dir>/<variant>` (`lin/normal`) |

Besides `description`, a value can carry `tags`, `title`, `framing`, `stature`, and `anchor`
(sprite placement); music can also carry `mood`, `scene`, `durationSec`, `loop`, and `volume`.

Backgrounds, CGs, SFX, and music are collected by extension whitelist
(png/jpg/jpeg/webp/mp3/ogg/wav/m4a); sprites are grouped by directory under
`sprites/<subject id>/`, and the first file in each directory is the fallback when the requested
variant isn't found.

### craft: writing parameters

The `craft` section of `play.json`; none of the fields has to be written (unwritten = engine
default):

| Field | Values | Default |
| --- | --- | --- |
| `beatLength` | `short` / `medium` / `long` | `medium` |
| `stopOptions` | `two` / `three` / `four` / `free` | `three` |
| `assets.background` | `library-first` / `library` / `generate` | `library-first` |
| `assets.cg` | `library` / `generate` / `off` | `generate` |
| `assets.sprite` | `generate` / `off` | `generate` |
| `assets.audio` | `library` / `off` | `library` |

`free` = always stop at the free-text input, with no option panel.

**The four asset-source categories are intent only for now**: at this stage there is no image
generation and no cross-play asset library, so all four asset kinds can only come from what you
put into `assets/` by hand. Rules that can only be stated in words — prose style, taboos, how
characters address each other — go in `memory/always/craft.md`, not in `play.json`.

The playwright rewrites this section with the `set_craft` tool (it touches only the `craft` key,
and not one byte of the rest of the file).

## The two presets

| id | Name | What it does |
| --- | --- | --- |
| `aivn-playwriter` | playwright | The one that writes Stage DSL live; its output is piped into the stage |
| `aivn-stagehand` | stage-hand assistant | Preps material: premise, character cards, creative guidelines (image tools come in the next stage) |

Both presets have the same set of entries: instruction-file discovery (`AGENTS.md`) + persona
(that prompt file) + file tools + file search. **Neither ships a shell**: the playwright writes
and reads files and has nothing to do with a shell; the stage-hand assistant keeps the entry but
marks it `disabled` (off by default — turn it on in the preset if you want to give it one).
**Neither preset lists a `dsh-aivn` entry** — the host already loads the plugin, and another
entry would install the routes and event subscriptions twice.

Only sessions on the playwright preset enter the stage pipeline. Nothing the stage-hand assistant
says goes on stage.

## Context injection

The playwright's system prompt is assembled from two parts with **per-beat play context**
injected in between — the playwright doesn't need to `ls` + `read` its way around to know the
play's setting, who's in it, what assets exist, and where it currently stands:

| Section | Content | Source |
| --- | --- | --- |
| Static prefix | Identity, how to work, where the play is | the `prefix` of `persona` |
| "Script language" | Which language the prose is written in | `scriptLanguage` in `play.json` |
| "Play setting" | World premise | `memory/always/premise.md` |
| "Cast" | Each card's body + voice + sprite variants; subjects with sprites but no card get their own section | `characters/*.md` |
| "Asset list" | ids + descriptions for backgrounds / music / SFX / CGs; cue rules appended when there is music or SFX | `assets/` + `assets/manifest.json` |
| "Writing parameters" | How long each beat is, how many options, asset sources, plus the creative-guidelines prose | `craft` in `play.json` + `memory/always/craft.md` |
| "Memory index" | One line per setting card (category / title / path / summary) | `memory/index/**` |
| Static suffix | Script format, how to write memory cards, introducing new characters, the performance contract | the trailing block the plugin registers |
| [State] | Scene, affinity, flags, active threads (a user-role snapshot that changes every beat) | `memory/always/state/*` |

These sections **mount only for playwright sessions** (registered on the Agent scope), so the
stage-hand assistant never sees the performance contract. Snapshots are cached with a
second-scale TTL: several steps in one turn read the same copy, and a new beat re-reads
naturally. Change a file and there is nothing else to do — it takes effect on the next beat.

## Agent tools

Tools are installed and removed with the preset. A playwright session ships these six; the
stage-hand assistant ships only `create_play` (the other five are for writing on stage, and the
stage-hand assistant doesn't go on stage):

| Tool | Who has it | What it does |
| --- | --- | --- |
| `create_play` | both presets | Stands the workspace up as a new play: writes `play.json` (`id`/`title`/`opening`/`characters`), `memory/always/premise.md`, and `characters/<id>.md`. Errors out if `play.json` already exists |
| `beat_done` | playwright | Hands over this beat's stop point: pass `options` for an option panel, `placeholder` for a free-text input, neither for no stop point this beat. Calling it means "this beat ends here" |
| `update_state` | playwright | Changes the play's runtime state: `affinity` (per-character affinity delta, an integer, `\|Δ\|≤5`), `flags`, `scene`, `threads`. Writes into `memory/always/state/` |
| `get_readiness` | playwright | Self-check before starting: `play.json`, story premise, character card count, sprites, backgrounds, asset count. **No hard gate** — you can start with anything missing |
| `list_library` | playwright | Lists **this play's** assets (`assets/` + `manifest.json`, plus character cards in `characters/`), filterable by kind and keyword. At this stage there is no cross-play library and no image generation |
| `set_craft` | playwright | Rewrites the `craft` section of `play.json`, see above |

## Slash command

| Command | What it does |
| --- | --- |
| `/new-play [play name]` | Stands the current working directory up as a play. Same implementation as the `create_play` tool, with no LLM round trip |

The command is visible to every session (DSH commands are not preset-scoped), and it lands in the
working directory of whichever session you type it in. It **only creates, never overwrites**: an
existing `play.json` is an error, and any other skeleton file that already exists is skipped and
listed in the receipt.

## Host HTTP surface

The browser half talks to just these endpoints, all scoped by session:

| Route | Description |
| --- | --- |
| `GET /aivn/health` | `{ ok: true, plugin: "dsh-aivn" }` |
| `GET /aivn/play?session=` | This session's play: `{ dir, config, voice }`; `{ dir: null, voice: false }` if it isn't a play. `voice` says whether the host has TTS configured, and the client uses it to decide whether to show the voice toggle |
| `GET /aivn/assets?session=` | `{ index, manifest }`; 404 if it isn't a play |
| `GET /aivn/asset?session=&path=` | One asset inside the play. `path` is **relative to the play root** (e.g. `assets/backgrounds/x.png`); 400 if it escapes |
| `GET /aivn/audio?session=&file=` | Synthesized audio for one line. The file name is `sha1(model + voice id + text)` and content-addressed, so it can be cached for a long time |
| `GET /aivn/stream?session=` | SSE, `event: frame`, with the data being one `StageFrame` JSON. On connect it replays frames already performed, then a keepalive every 15 seconds |
| `POST /aivn/input { session, text, silent? }` | One player input, delivered to the playwright. `silent: true` means it doesn't count as something the player said (the stage's **Continue** takes this path); it is still inserted as a user message |
| `POST /aivn/voice { session, enabled?, paused? }` | The master voice switch and client backpressure. `enabled: false` stops the server from synthesizing sentence by sentence (saves quota); `paused` is temporary backpressure when the playback layer falls behind |

`StageFrame` comes in three kinds:

```ts
{ seq, kind: 'ir',   event: StageEvent }   // IR parsed out of the DSL
{ seq, kind: 'beat', state: 'start' | 'end' }  // playwright picks up / puts down the pen
{ seq, kind: 'voice', lineSeq, phrase, state: 'started' | 'ready', url? }  // voice
```

**Voice follows the playback head**: a line's audio takes 2–5 seconds to come back (measured on
Fish's free model), while the stage advances by hand — linger on a line long enough and you hear
it; click past it too fast and that line's audio is dropped (this is the engine's design: no
retroactive audio for a line already turned, so it doesn't overlap the next one). The playback
layer's "replay this line" is the remedy for that.

Synthesized audio lands in the play's own `media-cache/tts/`: the file name is
`sha1(model + voice id + text)`, content-addressed, so reconnect replays, rewinds, and replays all
hit the same file and never hit the upstream a second time. This cache **only grows** (swapping
the model or changing one character makes a new file), and you can delete the whole directory at
any time — the next performance synthesizes it again.

A `voice` frame's `lineSeq` is **the seq of that line's `say_start` frame** (not the seq of this
frame) — that's how the audio attaches back to the line. `started` lights up the speaker (still
synthesizing); `ready` carries a playable URL. Lines and audio come out in parallel: text hits the
screen first, the voice joins when it's ready, and if it doesn't, the performance finishes in
silence (a failed synthesis logs one warning line and doesn't block the performance).

**Player input is not written into this stream by the route**: `/aivn/input` only delivers, and
there is exactly one place it lands — the host listens on `agent/inbox/inserted`, so DSH's native
input box and the stage's option cards take the same path: never two writes, never a dropped one.
What the engine injects itself (the internal nudge to close out a beat, the empty `silent` advance)
also takes this path and is fished out by `message.id`, so it never turns into a player line.

`/aivn/*` is a prefix route the plugin registers itself, **outside DSH's browser trust fence**
(that fence only covers `/api`): `POST /aivn/input` accepts same-origin requests only (a mismatched
`Origin` and `Host` gets a 403) and requires `content-type: application/json`, so a cross-site page
can't submit an input on the player's behalf.

## Permissions and compatibility

- **Network**: goes out only when a TTS key is configured, and it goes to Fish Audio
  (`api.fish.audio` or your `baseUrl`). With no key, not a single request is sent and the whole
  voice chain is off. Everything else is local.
- **Files**: reads and writes stay inside the session's working directory (that is, the play's
  directory). Tools and `/new-play` only create play files in the directory you point them at;
  voice cache is written to `<play>/media-cache/tts/` (content-addressed, deletable as a whole at
  any time). Paths outside the working directory are never touched.
- **HTTP**: registers `/aivn/*` on DSH's web server (play read/write, assets, the SSE event
  stream, audio). All four write endpoints pass four gates: same-origin +
  `content-type: application/json` + a byte cap + JSON; `/aivn/audio` accepts only a bare file name
  inside the directory (`basename` check plus an `.mp3` whitelist) and no path at all.
- **Secrets**: TTS keys are read only from config or environment variables, never into logs, URLs,
  or git; error text carries at most the first 200 characters returned by the upstream.
- **Compatibility**: the host half targets `dsh` `0.1.7-rc.2`, the client half targets
  `0.1.1-rc.2`. The Stage tab needs `dsh-web-app` (it mounts on the `conversation.view` slot).

## Development

**Prerequisites**: `@aivn/core` and `@aivn/stage` are `file:` dependencies for now, pointing at
the sibling repo `stage-ai` (which needs `packages/stage` inside `.worktrees/dsh-vn-stage`):

```
~/projects/
├── dsh-aivn/            ← this repo
└── stage-ai/
    ├── packages/core/                  (@aivn/core)
    └── .worktrees/dsh-vn-stage/packages/stage/   (@aivn/stage)
```

Those two packages are **build-time only**: esbuild bundles them into `lib/`, and nothing depends
on them at runtime. So **people installing the plugin don't need them** (`npm i` installs only
`dependencies`); you need them only to rebuild from source.

```bash
npm install         # the two sibling directories above must be in place
npm run build       # lib/index.js (host half) + lib/client.js (browser half)
npm run typecheck
```

`lib/` is a **tracked build artifact**: DSH loads it directly, so after changing `src/` you must
rebuild before committing. `npm publish` runs `prepublishOnly` (rebuild + typecheck), so what goes
out matches the source.

### e2e

```bash
dsh-e2e start --wait-ready     # start a minimal instance (dsh-base + dsh-web-app + this worktree)
npm run e2e:stage              # run the "stage" suite
dsh-e2e stop
```

The instance home is `<worktree>/.dsh-e2e-home` and is not tracked by git. Two local prerequisites
(both live in that home, not in the repo):

- **A working LLM provider is required**: the home's `settings.yaml` is imported and renamed on
  first start, so later cold starts have no provider. Add the profile's `llm-*` entry to
  `.dsh-e2e-home/profiles/web/cordis.patch.yml`.
- **Pick a default model your machine can actually reach**: a
  region-restricted model gives you a flat `User location is not supported`. Use something
  like `medium`.

Suites:

- `stage` (`npm run e2e:stage`) — drops a temporary play fixture at the workspace root → starts a
  session on the playwright preset → sends one line → asserts that the Stage tab mounts, the
  director bar does not render, lines type onto the screen, the stop point appears, clicking an
  option delivers the original text to the playwright and lands as a receipt line on the timeline,
  and the playwright finishes writing a second beat.
- `voice` (`dsh-e2e run e2e/verify-voice.mjs`) — hits Fish Audio for real: asserts that voice
  frames arrive, the audio can be fetched and is a real MP3, **the browser decodes it to PCM and a
  source actually starts** (hooks are installed on `AudioContext` / `decodeAudioData` /
  `AudioBufferSourceNode.start` inside the page rather than guessing from frames), and that the
  master voice switch really reaches the host. Export `DSH_AIVN_TTS_KEYS` before running it.

Screenshots land in `e2e-artifacts/` (not tracked by git).
