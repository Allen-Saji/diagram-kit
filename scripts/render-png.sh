#!/usr/bin/env bash
# Render a Remotion <Still> to PNG at a named preset.
#
# Usage:
#   scripts/render-png.sh <composition-id> [preset] [output-path]
#
# Presets:
#   blog         1600x900   (default, 16:9 for blog embeds)
#   tweet-sq     1080x1080  (Twitter/X square card)
#   tweet-tall   1200x1800  (Twitter/X tall card, max 2:3)
#   ultra        3200x1800  (2x of blog — for retina/high-density reads)
#
# Preset is applied via --width/--height override; the composition
# itself should be defined at the "blog" size (1600x900) and scaled.
#
# Notes:
#   - Output PNG is 8-bit, sRGB. For retina use --scale=2 (default here).
#   - Use "blog-2x" preset for a 2x density PNG at blog size (3200x1800).

set -euo pipefail

COMP="${1:-}"
PRESET="${2:-blog}"
OUT="${3:-}"

if [ -z "$COMP" ]; then
  echo "usage: $0 <composition-id> [preset] [output-path]" >&2
  exit 1
fi

case "$PRESET" in
  blog)       W=1600; H=900;   SCALE=1 ;;
  blog-2x)    W=1600; H=900;   SCALE=2 ;;
  tweet-sq)   W=1080; H=1080;  SCALE=1 ;;
  tweet-tall) W=1200; H=1800;  SCALE=1 ;;
  ultra)      W=3200; H=1800;  SCALE=1 ;;
  *)          echo "unknown preset: $PRESET" >&2; exit 1 ;;
esac

if [ -z "$OUT" ]; then
  OUT="out/${COMP}-${PRESET}.png"
fi

mkdir -p "$(dirname "$OUT")"

cd "$(dirname "$0")/.."

echo "rendering ${COMP} at ${W}x${H} (scale=${SCALE}) → ${OUT}"
npx remotion still "$COMP" "$OUT" \
  --width="$W" \
  --height="$H" \
  --scale="$SCALE" \
  --image-format=png
