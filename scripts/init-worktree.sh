#!/usr/bin/env bash
# 依赖同步。worktree 与主检出同层（都在仓库父目录下），所以 @aivn/core、@aivn/stage 的
# file:../stage-ai 相对路径天然解析得到，不必再补软链——这也是本仓库的 worktree 不放
# .worktrees/ 的原因：多两层会改变 esbuild 写进 lib/ 的源码路径注释，撞上 build.mjs --check 硬判。
set -euo pipefail
cd "$(dirname "$0")/.."
npm install
