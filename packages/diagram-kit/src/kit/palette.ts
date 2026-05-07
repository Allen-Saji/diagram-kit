// Palettes sampled from ByteByteGo reference diagrams.
// `paletteLight` is the recalibrated default (deeper saturation, matches BBG).
// `paletteDark` covers ~25% of recent BBG output (Polling-vs-Webhooks,
//  Load Balancer, API Concepts, Claude-vs-OpenClaw).
// `paletteLegacy` preserves the original kit hex values for back-compat;
//  existing compositions opt in via `<Canvas theme="legacy" />`.

export type PaletteColor =
  | "mint"
  | "peach"
  | "blue"
  | "yellow"
  | "pink"
  | "purple"
  | "lavender"
  | "gray";

export type Swatch = { bg: string; border: string; text: string };

export const paletteLegacy: Record<PaletteColor, Swatch> = {
  mint:     { bg: "#C8EAD2", border: "#2D8F58", text: "#13633C" },
  peach:    { bg: "#F8C8B6", border: "#D64E2D", text: "#8B2D12" },
  blue:     { bg: "#C8E1F4", border: "#3A7FBF", text: "#1F4E7A" },
  yellow:   { bg: "#FFF2C8", border: "#D4A72C", text: "#7A5F0A" },
  pink:     { bg: "#FAC8C8", border: "#D64C4C", text: "#7F1D1D" },
  purple:   { bg: "#E0D0F0", border: "#9870C5", text: "#4C2A7A" },
  lavender: { bg: "#E8E4F7", border: "#6B5BB5", text: "#3D2F8F" },
  gray:     { bg: "#F1F3F5", border: "#6B7280", text: "#374151" },
};

export const paletteLight: Record<PaletteColor, Swatch> = {
  mint:     { bg: "#B8E5CD", border: "#3A8E5C", text: "#0F5132" },
  peach:    { bg: "#FBC7B5", border: "#C8431F", text: "#7A2410" },
  blue:     { bg: "#B8DCEF", border: "#2E78BC", text: "#173E66" },
  yellow:   { bg: "#FFEC9C", border: "#C8961F", text: "#6B5108" },
  pink:     { bg: "#F4B5BD", border: "#D6517A", text: "#7A1A2E" },
  purple:   { bg: "#D6CDF0", border: "#8B6FC4", text: "#3E2070" },
  lavender: { bg: "#DCD5F2", border: "#5F4FA8", text: "#322483" },
  gray:     { bg: "#E5E8EC", border: "#5C6470", text: "#2C3340" },
};

export const paletteDark: Record<PaletteColor, Swatch> = {
  mint:     { bg: "transparent", border: "#22D17A", text: "#22D17A" },
  peach:    { bg: "transparent", border: "#FF9F4A", text: "#FF9F4A" },
  blue:     { bg: "transparent", border: "#5BC0FF", text: "#5BC0FF" },
  yellow:   { bg: "transparent", border: "#FFD24A", text: "#FFD24A" },
  pink:     { bg: "transparent", border: "#FF6BB5", text: "#FF6BB5" },
  purple:   { bg: "transparent", border: "#B488FF", text: "#B488FF" },
  lavender: { bg: "transparent", border: "#9B8BFF", text: "#9B8BFF" },
  gray:     { bg: "transparent", border: "#8B98B0", text: "#C7CFDD" },
};

/** Default palette alias — points at light. Imports of `palette` keep working. */
export const palette = paletteLight;

export type Frame = {
  border: string;
  bg: string;
  /**
   * Slightly raised surface — used for arrow-label pills and other small
   * floating chips that need to contrast with the page background. In
   * light themes this is the same as `bg`; in dark mode it's a touch
   * lighter than `pageBg` so labels don't blend into the canvas.
   */
  surface: string;
  pageBg: string;
};

export const frameLight: Frame = {
  border: "#0A0A0A",
  bg: "#FFFFFF",
  surface: "#FFFFFF",
  pageBg: "#E8F0EC",
};

export const frameLegacy: Frame = {
  border: "#0A0A0A",
  bg: "#FFFFFF",
  surface: "#FFFFFF",
  pageBg: "#FFFFFF",
};

export const frameDark: Frame = {
  border: "#FFFFFF",
  bg: "#0E1428",
  surface: "#1B2540",
  pageBg: "#0E1428",
};

/** Default frame alias — light. Existing imports of `frame` keep working. */
export const frame = frameLight;

export type AnnotationPalette = {
  red: string;
  gray: string;
  redMuted: string;
};

export const annotationLight: AnnotationPalette = {
  red: "#C4341B",
  gray: "#6B7280",
  redMuted: "#E87862",
};

export const annotationDark: AnnotationPalette = {
  red: "#FF6B5C",
  gray: "#8B98B0",
  redMuted: "#FFA399",
};

export const annotation = annotationLight;

export type Ink = {
  heading: string;
  body: string;
  muted: string;
  arrow: string;
};

export const inkLight: Ink = {
  heading: "#0A0A0A",
  body: "#1F2937",
  muted: "#6B7280",
  arrow: "#1F2937",
};

export const inkDark: Ink = {
  heading: "#FFFFFF",
  body: "#E5E7EB",
  muted: "#8B98B0",
  arrow: "#E5E7EB",
};

export const ink = inkLight;
