// Sampled from ByteByteGo reference diagrams — pastel card colors.
// Each entry is bg / border / text intended to be used together.

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

export const palette: Record<PaletteColor, Swatch> = {
  mint:     { bg: "#C8EAD2", border: "#2D8F58", text: "#13633C" },
  peach:    { bg: "#F8C8B6", border: "#D64E2D", text: "#8B2D12" },
  blue:     { bg: "#C8E1F4", border: "#3A7FBF", text: "#1F4E7A" },
  yellow:   { bg: "#FFF2C8", border: "#D4A72C", text: "#7A5F0A" },
  pink:     { bg: "#FAC8C8", border: "#D64C4C", text: "#7F1D1D" },
  purple:   { bg: "#E0D0F0", border: "#9870C5", text: "#4C2A7A" },
  lavender: { bg: "#E8E4F7", border: "#6B5BB5", text: "#3D2F8F" },
  gray:     { bg: "#F1F3F5", border: "#6B7280", text: "#374151" },
};

export const frame = {
  border: "#0A0A0A",
  bg: "#FFFFFF",
  pageBg: "#FFFFFF",
};

export const annotation = {
  red: "#C4341B",
  gray: "#6B7280",
  redMuted: "#E87862",
};

export const ink = {
  heading: "#0A0A0A",
  body: "#1F2937",
  muted: "#6B7280",
  arrow: "#1F2937",
};
