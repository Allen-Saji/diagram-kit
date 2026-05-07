#!/usr/bin/env bash
# Render a Remotion <Still> to PNG.
#
# Usage:
#   scripts/render-png.sh <composition-id> [preset] [output-path]
#
# Presets:
#   blog     render at composition's native dims (default)
#   hd       render at 2x density (retina-ready; 4K UHD when canvas is 1920px wide)
#   4k       auto-scale to guarantee >=3840px wide (UHD) regardless of canvas
#   ultra    render at 3x density (print/hero)
#   8k       auto-scale to guarantee >=7680px wide
#
# Output routing:
#   The script greps the composition's source file for `theme="..."` and
#   routes output to out/<theme>/<comp>-<preset>.png. Falls back to
#   out/light/ if no theme is found. Pass an explicit output-path to
#   override.
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

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="$REPO_ROOT/apps/playground"
ROOT_TSX="$APP_DIR/src/Root.tsx"

# Resolve native canvas width from Root.tsx so 4k/8k presets can compute
# the multiplier needed to hit a target output width. Width may live in
# the playground Root or in a private registry — check both.
NATIVE_W=$(grep -A 5 "id=\"${COMP}\"" "$ROOT_TSX" 2>/dev/null | grep -oE 'width=\{[0-9]+\}' | head -1 | grep -oE '[0-9]+' || true)
if [ -z "$NATIVE_W" ] && [ -f "$REPO_ROOT/private/index.tsx" ]; then
  NATIVE_W=$(grep -A 5 "id=\"${COMP}\"" "$REPO_ROOT/private/index.tsx" 2>/dev/null | grep -oE 'width=\{[0-9]+\}' | head -1 | grep -oE '[0-9]+' || true)
fi

case "$PRESET" in
  blog)  SCALE=1 ;;
  hd)    SCALE=2 ;;
  ultra) SCALE=3 ;;
  4k)
    if [ -z "$NATIVE_W" ]; then
      echo "4k preset: could not detect native width for ${COMP}" >&2
      exit 1
    fi
    SCALE=$(awk -v w="$NATIVE_W" 'BEGIN { s = 3840 / w; if (s < 1) s = 1; printf "%.3f", s }')
    ;;
  8k)
    if [ -z "$NATIVE_W" ]; then
      echo "8k preset: could not detect native width for ${COMP}" >&2
      exit 1
    fi
    SCALE=$(awk -v w="$NATIVE_W" 'BEGIN { s = 7680 / w; if (s < 1) s = 1; printf "%.3f", s }')
    ;;
  *)     echo "unknown preset: $PRESET" >&2; exit 1 ;;
esac

# Auto-detect theme from the composition source file. Convention: the
# component file is named <COMP>.tsx under apps/playground/src/examples/
# (public) or private/projects/ (Allen-only).
if [ -z "$OUT" ]; then
  COMP_FILE=$(find "$APP_DIR/src/examples" "$REPO_ROOT/private/projects" -name "${COMP}.tsx" -type f 2>/dev/null | head -1)
  THEME="light"
  if [ -n "$COMP_FILE" ]; then
    DETECTED=$(grep -oE 'theme="(legacy|light|dark)"' "$COMP_FILE" | head -1 | sed -E 's/theme="(.*)"/\1/' || true)
    if [ -n "$DETECTED" ]; then
      THEME="$DETECTED"
    fi
  fi
  OUT="$REPO_ROOT/out/${THEME}/${COMP}-${PRESET}.png"
fi

mkdir -p "$(dirname "$OUT")"

echo "rendering ${COMP} at scale=${SCALE}x → ${OUT}"
(cd "$APP_DIR" && npx remotion still "$COMP" "$OUT" \
  --scale="$SCALE" \
  --image-format=png)
