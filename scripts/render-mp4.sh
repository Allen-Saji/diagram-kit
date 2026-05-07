#!/usr/bin/env bash
# Render a Remotion <Composition> to MP4 at a named preset.
#
# Usage:
#   scripts/render-mp4.sh <composition-id> [preset] [output-path]
#
# Presets (Twitter/X 2026 specs):
#   tweet-16x9   1920x1080  H.264/AAC  8 Mbps  (landscape — default)
#   tweet-sq     1080x1080  H.264/AAC  8 Mbps  (square)
#   tweet-9x16   1080x1920  H.264/AAC 12 Mbps  (vertical)
#   blog         1280x720   H.264/AAC  4 Mbps  (lighter, embedded blog)
#
# Twitter non-premium upload limits: ≤140s, ≤512MB, mp4/H.264/AAC.
# Composition's fps/durationInFrames are honored as defined.

set -euo pipefail

COMP="${1:-}"
PRESET="${2:-tweet-16x9}"
OUT="${3:-}"

if [ -z "$COMP" ]; then
  echo "usage: $0 <composition-id> [preset] [output-path]" >&2
  exit 1
fi

case "$PRESET" in
  tweet-16x9) W=1920; H=1080; BITRATE="8M" ;;
  tweet-sq)   W=1080; H=1080; BITRATE="8M" ;;
  tweet-9x16) W=1080; H=1920; BITRATE="12M" ;;
  blog)       W=1280; H=720;  BITRATE="4M" ;;
  *)          echo "unknown preset: $PRESET" >&2; exit 1 ;;
esac

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$REPO_ROOT/apps/playground"

# Auto-route output by detected theme (matches render-png.sh convention).
if [ -z "$OUT" ]; then
  COMP_FILE=$(find "$APP_DIR/src/examples" "$REPO_ROOT/private/projects" -name "${COMP}.tsx" -type f 2>/dev/null | head -1)
  THEME="light"
  if [ -n "$COMP_FILE" ]; then
    DETECTED=$(grep -oE 'theme="(legacy|light|dark)"' "$COMP_FILE" | head -1 | sed -E 's/theme="(.*)"/\1/' || true)
    if [ -n "$DETECTED" ]; then
      THEME="$DETECTED"
    fi
  fi
  OUT="$REPO_ROOT/out/${THEME}/${COMP}-${PRESET}.mp4"
fi

mkdir -p "$(dirname "$OUT")"

echo "rendering ${COMP} → ${OUT} (${W}x${H} @ ${BITRATE})"
(cd "$APP_DIR" && npx remotion render "$COMP" "$OUT" \
  --width="$W" \
  --height="$H" \
  --codec=h264 \
  --video-bitrate="$BITRATE" \
  --pixel-format=yuv420p)

# Print the file size so we can check against Twitter's 512MB non-premium limit.
if [ -f "$OUT" ]; then
  SIZE=$(stat -c '%s' "$OUT" 2>/dev/null || stat -f '%z' "$OUT")
  MB=$(awk "BEGIN { printf \"%.1f\", $SIZE / 1024 / 1024 }")
  echo "✓ ${OUT}  (${MB} MB)"
fi
