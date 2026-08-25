#!/usr/bin/env bash
# Shared helpers for the repo's git hooks.
# This file is *sourced* by .githooks/pre-commit and .githooks/pre-push,
# not executed directly.
#
# Goal: run the same commands CI runs, so failures surface locally instead
# of on Cloudflare. CI=true makes pnpm strict (ignored dependency build
# scripts become a hard error), which is exactly the failure we want to catch.

# Mirror CI's dependency install and fail on the "ignored build scripts" case.
run_install_check() {
  echo "▶ pnpm install --frozen-lockfile   (mirroring CI)"
  local log
  log="$(mktemp)"

  # pipefail so the pnpm exit code (not tee's) decides success.
  if ! CI=true pnpm install --frozen-lockfile 2>&1 | tee "$log"; then
    rm -f "$log"
    echo "✖ pnpm install failed. Fix the above before committing/pushing."
    return 1
  fi

  # Belt-and-suspenders: some pnpm versions only *warn* on ignored builds.
  # Treat it as an error regardless, because CI does.
  if grep -q "Ignored build scripts" "$log"; then
    rm -f "$log"
    echo ""
    echo "✖ pnpm ignored dependency build scripts."
    echo "  Allow them in pnpm-workspace.yaml, e.g.:"
    echo ""
    echo "      allowBuilds:"
    echo "        esbuild: true"
    echo "        sharp: true"
    echo ""
    echo "  then run 'pnpm install' and commit the change."
    return 1
  fi

  rm -f "$log"
}

# Mirror CI's build step (node build.mjs → builds site + funnels into deploy/).
run_build_check() {
  echo "▶ pnpm build   (mirroring CI)"
  CI=true pnpm build
}
