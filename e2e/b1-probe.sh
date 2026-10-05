#!/usr/bin/env bash
# B1 回归探针：三条「曾经能杀掉整台 DSH」的读取路径。
#
# 检视 B1 认定：DSH 启动时挂了进程级 `unhandledRejection → process.exit(1)`，
# 而 `/aivn/*` 的 handler 曾经是 `void handle(...)`，异步 rejection 会被吞成未处理拒绝。
# 于是下面三条**纯读取**路径都能让整台 DSH 掉线：
#   ① play.json 坏 → JSON.parse 抛 SyntaxError
#   ② assets/manifest.json 坏 → 同样抛
#   ③ /aivn/asset?path=assets（目录）→ readFile 抛 EISDIR
#
# 用法：e2e 实例跑着、且下面 SID 对应一座真实的剧目时执行本脚本。
# 它**只借文件两秒**：改坏 → 请求 → 立刻还原（临时文件在同目录，不污染 git）。
set -u

SID="${1:?用法: b1-probe.sh <session-id>}"
BASE="${2:?用法: b1-probe.sh <session-id> <base-url>}"
ROOT="~/projects/dsh-aivn"

cd "$ROOT" || exit 1
fail=0

probe() { # 名字 期望码 说明
	local name="$1" want="$2" note="$3"
	local code
	code=$(curl -s -o /tmp/b1-body -w '%{http_code}' "$4")
	printf '%-22s HTTP %s（期望 %s）  %s\n' "$name" "$code" "$want" "$(head -c 120 /tmp/b1-body)"
	[ "$code" = "$want" ] || fail=1
	[ -n "$note" ] && printf '                       %s\n' "$note"
}

# ① play.json 坏
cp play.json /tmp/b1-play.json.bak
printf '{ "id": ' >play.json
probe 'play.json 坏' 500 '曾经：整台 DSH 退出' "$BASE/aivn/play?session=$SID"
cp /tmp/b1-play.json.bak play.json

# ② manifest.json 坏
cp assets/manifest.json /tmp/b1-manifest.json.bak
printf '{ "veranda": ' >assets/manifest.json
probe 'manifest.json 坏' 500 '曾经：整台 DSH 退出' "$BASE/aivn/assets?session=$SID"
cp /tmp/b1-manifest.json.bak assets/manifest.json

# ③ 取件给的是目录
probe 'asset 给目录' 400 '曾经：EISDIR 未处理拒绝' "$BASE/aivn/asset?session=$SID&path=assets"

# ④ 跨站写请求（S5）：Origin 与 Host 对不上就拒，免得跨站页面替玩家投一句输入
code=$(curl -s -o /tmp/b1-body -w '%{http_code}' -X POST \
	-H 'content-type: application/json' -H 'origin: http://evil.example' \
	-d '{"session":"x","text":"y"}' "$BASE/aivn/input")
printf '%-22s HTTP %s（期望 403）  %s\n' '跨站 POST' "$code" "$(head -c 120 /tmp/b1-body)"
[ "$code" = 403 ] || fail=1

# ⑤ 没有 content-type 的写请求（N9）
code=$(curl -s -o /tmp/b1-body -w '%{http_code}' -X POST -d '{"session":"x","text":"y"}' "$BASE/aivn/input")
printf '%-22s HTTP %s（期望 415）  %s\n' '无 content-type' "$code" "$(head -c 120 /tmp/b1-body)"
[ "$code" = 415 ] || fail=1

# ⑥ 进程还活着吗
if curl -s -f "$BASE/aivn/health" >/dev/null; then
	echo 'health                实例仍在（进程没被杀）'
else
	echo 'health                实例已死'; fail=1
fi

[ "$fail" = 0 ] && echo '全部通过' || echo '有不符合预期的项'
exit "$fail"
