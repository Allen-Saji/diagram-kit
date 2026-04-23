#!/usr/bin/env bash
# Render a Remotion <Still> to PNG.
#
# Usage:
#   scripts/render-png.sh <composition-id> [preset] [output-path]
#
# Presets:
#   blog     render at composition's native dims (default)
#   hd       render at 2x density (retina-ready)
#   ultra    render at 3x density (print/hero)
#
# Note: presets only control render DPI/scale. The output aspect ratio
# always matches the composition's <Still width/height>. If you need a
# different aspect ratio (e.g. square for Twitter), define a separate
# composition at that size.

set -euo pipefail

COMP="${1:-}"
PRESET="${2:-blog}"
OUT="${3:-}"

if [ -z "$COMP" ]; then
  echo "usage: $0 <composition-id> [preset] [output-path]" >&2
  exit 1
fi

case "$PRESET" in
  blog)  SCALE=1 ;;
  hd)    SCALE=2 ;;
  ultra) SCALE=3 ;;
  *)     echo "unknown preset: $PRESET" >&2; exit 1 ;;
esac

if [ -z "$OUT" ]; then
  OUT="out/${COMP}-${PRESET}.png"
fi

mkdir -p "$(dirname "$OUT")"

cd "$(dirname "$0")/.."

echo "rendering ${COMP} at scale=${SCALE}x → ${OUT}"
npx remotion still "$COMP" "$OUT" \
  --scale="$SCALE" \
  --image-format=png
