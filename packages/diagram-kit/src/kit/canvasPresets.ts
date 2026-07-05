/**
 * Named canvas dimensions tuned for ByteByteGo-style diagram delivery.
 * Pass directly to `<Canvas>` via spread:
 *
 * ```tsx
 * import { canvasPresets, Canvas } from "@allen-saji/diagram-kit";
 *
 * <Canvas {...canvasPresets.bbgBlogInline} debug={debug}>
 *   ...
 * </Canvas>
 * ```
 *
 * The presets cover three publishing surfaces:
 *
 * - `bbgBlogInline` (1456 x 819) — 16:9 hero asset for inline blog
 *   placement. Width matches BBG's standard inline image. Pair with
 *   `render-png.sh <Comp> hd` for retina output.
 * - `bbgTallPoster` (2484 x 3002) — tall poster format for vertical
 *   comparison posts and decision-tree diagrams. Pair with
 *   `render-png.sh <Comp> blog` since the canvas is already large.
 * - `bbgLandscapeArch` (2472 x 1912) — wide architecture diagram
 *   format for stacked-region layouts (load balancer + JVM + storage).
 *   Pair with `render-png.sh <Comp> blog`.
 *
 * For Twitter/X video presets see `render-mp4.sh` directly — those
 * are render-time concerns, not canvas-dimension presets.
 */
export const canvasPresets = {
  bbgBlogInline: { w: 1456, h: 819 },
  bbgTallPoster: { w: 2484, h: 3002 },
  bbgLandscapeArch: { w: 2472, h: 1912 },
  /** Listicle / layered-arch poster — tall page, panels stacked in a grid. */
  poster: { w: 1600, h: 2000 },
  /** 16:9 presentation slide / video-frame page. */
  slide: { w: 1920, h: 1080 },
  /** LinkedIn / X carousel card (4:5 portrait). */
  carousel: { w: 1080, h: 1350 },
  /** A4 portrait at 150dpi — render with `hd` (2x) for print-ready 300dpi. */
  a4: { w: 1240, h: 1754 },
} as const;

export type CanvasPresetName = keyof typeof canvasPresets;
export type CanvasPreset = (typeof canvasPresets)[CanvasPresetName];
