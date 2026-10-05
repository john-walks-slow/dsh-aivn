# dsh-aivn —— 项目级指引

把 AIVN 的舞台引擎做成一个 DSH 插件。仓库根就是插件包根。

## 结构

| 路径 | 是什么 |
| --- | --- |
| `src/` | 宿主半边（Cordis 插件）：中枢、DSL 管线、路由、剧目脚手架、追收束 |
| `src/playwriter/` | 剧作家预设、提示词与它专属的五个工具 |
| `src/tools/` | 两个预设共用的工具（`create_play`） |
| `src/client/` | 浏览器半边（React），挂在 `conversation.view` 槽 |
| `lib/` | **跟踪的构建产物**（`lib/index.js` / `lib/client.js`）——DSH 直接加载它 |
| `e2e/` | dsh-e2e 套件 |
| `docs/` | 开发侧记录（用户手册在 `README.md`） |

## 动手前必须知道的四件事

1. **`lib/` 是构建产物，改完 `src/` 必须 `npm run build` 再提交。** DSH 加载的是 `lib/`：
   提交了过期的 `lib/` 等于这次改动没发出去；漏掉 `lib/client.js` 会让 web 端
   `Failed to load plugins`。
2. **`inject` 必须写全直接访问的 ctx 服务**（见 `src/index.ts`）。漏一个，运行时抛
   `cannot get property X without inject`，`apply` 根本不跑、插件静默死掉。
3. **「当前是什么预设」只认活的组合**：`ctx.agentPresets.composedPreset(agent.ctx)` 是权威，
   `session.header.agentPreset` 只在创建那一刻为真。新会话界面是「先建会话、再选预设」，
   那条路只记事件、不改头——只读头会把整条舞台管线丢空。见 `src/session.ts` 的 `sessionPreset`。
4. **剧作家漏调 `beat_done` 是常态，不是异常。** 快模型时不时把它写成正文里的一行
   `<beat_done …/>`。`src/beat-guard.ts` 在 `agent/turn-stopping` 上追一句把停止点要回来——
   删掉它，舞台会在半句台词之后停住、玩家没有可点的东西（追收束那一句还要在 `stage-tap`
   里按正文从玩家输入中摘出去，否则它会变成玩家台词条上的一行）。

## 开发

```bash
npm run build       # 重建 lib/（宿主半边 + 浏览器半边）
npm run typecheck
```

本项目**没有单元测试**：宿主半边几乎全是接线，真正会坏的地方在 DSH 运行时里（事件时序、
预设解析、turn 边界），单元测试够不着；可信的验证是 e2e。

### e2e

```bash
dsh-e2e start --wait-ready     # 起最小实例（dsh-base + dsh-web-app + 本插件）
npm run e2e:stage              # 跑舞台套件「stage」
dsh-e2e stop
```

- **必须先 `dsh-e2e start`**：`dsh-e2e run` 自己不起实例，实例不在时套件会以
  `missing DSH_E2E_PORT` 直接失败。
- **改过 `lib/` 之后要 `dsh-e2e stop` 再 `start`**，否则跑的还是旧模块。
- 两个本地前提在 `.dsh-e2e-home/` 里（不在仓库里）：profile 的 `cordis.patch.yml` 要有可用的
  provider 行（`settings.yaml` 首次启动被 import 后改名，冷启就没 provider 了），
  默认模型挑一个这台机器出得去的（地区受限的条目会直接报
  `User location is not supported`）。细节见 README 的「开发」一节。

## 文档

- `README.md` —— **用户手册**。凡是用户碰得到的配置面都必须在这里：`play.json` 字段、
  `craft` 取值、剧目目录约定、预设、工具、斜杠命令、HTTP 路由。发布前逐项核对。
- `docs/features/yymmdd-{feature}/` —— 开发侧记录；跨仓库的需求记录在主仓库
  `stage-ai/docs/features/` 下。
