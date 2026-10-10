#!/usr/bin/env bash
# 本插件没有独立 dev server：DSH 直接加载 lib/，验证走 dsh-e2e（端口与实例都由它管）。
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
dsh-e2e start --wait-ready
