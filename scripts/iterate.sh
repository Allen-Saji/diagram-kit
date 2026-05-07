#!/usr/bin/env bash
# Fast iteration render for the self-correction loop.
#
# Usage:
#   scripts/iterate.sh <composition-id> [--debug] [--full]
#
# Flags:
#   --debug    Render the debug variant (same layout with red bbox outlines
#              and labels on every kit element). Looks for a composition
#              named "<composition-id>Debug" in apps/playground/src/Root.tsx.
#   --full     Render at full resolution instead of 0.5x (slower; use when
#              you want a final-ish preview without switching to render-png).
#
# Output: out/iter/<composition-id>[.debug].png  (relative to repo root)

set -euo pipefail

COMP="${1:-}"
if [ -z "$COMP" ]; then
  echo "usage: $0 <composition-id> [--debug] [--full]" >&2
  exit 1
fi
shift

DEBUG=0
SCALE=0.5
for arg in "$@"; do
  case "$arg" in
    --debug) DEBUG=1 ;;
    --full)  SCALE=1 ;;
    *) echo "unknown flag: $arg" >&2; exit 1 ;;
  esac
done

# Repo root = this script's parent dir's parent.
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$REPO_ROOT/apps/playground"

mkdir -p "$REPO_ROOT/out/iter"

TARGET="$COMP"
SUFFIX=""
if [ "$DEBUG" -eq 1 ]; then
  TARGET="${COMP}Debug"
  SUFFIX=".debug"
fi

OUT="$REPO_ROOT/out/iter/${COMP}${SUFFIX}.png"

echo "iterating ${TARGET} at scale=${SCALE} → ${OUT}"
(cd "$APP_DIR" && npx remotion still "$TARGET" "$OUT" --scale="$SCALE" --image-format=png)

echo "✓ ${OUT}"
