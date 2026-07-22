import type React from "react";

export type GlyphColors = {
  accent: string;
  light: string;
  ink: string;
  paper: string;
};

export type GlyphRender = (colors: GlyphColors) => React.ReactElement;
