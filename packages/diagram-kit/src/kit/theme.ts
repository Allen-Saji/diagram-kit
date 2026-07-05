import { createContext, useContext } from "react";
import {
  paletteLight,
  paletteDark,
  paletteLegacy,
  frameLight,
  frameDark,
  frameLegacy,
  frameSketch,
  inkLight,
  inkDark,
  annotationLight,
  annotationDark,
  type PaletteColor,
  type Swatch,
  type Frame,
  type Ink,
  type AnnotationPalette,
} from "./palette";

export type Theme = "light" | "dark" | "legacy" | "sketch";

export type ThemeBundle = {
  theme: Theme;
  palette: Record<PaletteColor, Swatch>;
  frame: Frame;
  ink: Ink;
  annotation: AnnotationPalette;
};

const lightBundle: ThemeBundle = {
  theme: "light",
  palette: paletteLight,
  frame: frameLight,
  ink: inkLight,
  annotation: annotationLight,
};

const darkBundle: ThemeBundle = {
  theme: "dark",
  palette: paletteDark,
  frame: frameDark,
  ink: inkDark,
  annotation: annotationDark,
};

const legacyBundle: ThemeBundle = {
  theme: "legacy",
  palette: paletteLegacy,
  frame: frameLegacy,
  ink: inkLight,
  annotation: annotationLight,
};

const sketchBundle: ThemeBundle = {
  theme: "sketch",
  palette: paletteLight,
  frame: frameSketch,
  ink: inkLight,
  annotation: annotationLight,
};

export const themeBundles: Record<Theme, ThemeBundle> = {
  light: lightBundle,
  dark: darkBundle,
  legacy: legacyBundle,
  sketch: sketchBundle,
};

/**
 * Hand-drawn border radius used by box primitives when the sketch
 * theme is active — asymmetric corners fake the wobble of a marker
 * stroke. Returns undefined for non-sketch themes so callers keep
 * their own radius.
 */
export const sketchRadius = (theme: Theme): string | undefined =>
  theme === "sketch" ? "55px 18px 45px 20px / 20px 45px 18px 55px" : undefined;

const ThemeContext = createContext<ThemeBundle>(lightBundle);

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = (): ThemeBundle => useContext(ThemeContext);
export const useSwatch = (color: PaletteColor): Swatch =>
  useContext(ThemeContext).palette[color];
export const useFrame = (): Frame => useContext(ThemeContext).frame;
export const useInk = (): Ink => useContext(ThemeContext).ink;
export const useAnnotation = (): AnnotationPalette =>
  useContext(ThemeContext).annotation;
