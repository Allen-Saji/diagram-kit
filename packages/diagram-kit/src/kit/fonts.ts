import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadPatrickHand } from "@remotion/google-fonts/PatrickHand";

const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const interItalic = loadInter("italic", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

const mono = loadJetBrains("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

const hand = loadPatrickHand("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

/** Raw loaded families, no indirection. */
export const fontFamilies = {
  sans: inter.fontFamily,
  sansItalic: interItalic.fontFamily,
  mono: mono.fontFamily,
  hand: hand.fontFamily,
};

/**
 * Font tokens used by every primitive. Each resolves through a CSS
 * variable so a theme can swap families at the Canvas root without
 * touching any primitive: the sketch theme sets `--dk-font-sans` (and
 * the italic variant) to the hand-drawn font; every other theme falls
 * through to the loaded defaults.
 */
export const fonts = {
  sans: `var(--dk-font-sans, ${inter.fontFamily})`,
  sansItalic: `var(--dk-font-sans-italic, ${interItalic.fontFamily})`,
  mono: `var(--dk-font-mono, ${mono.fontFamily})`,
  hand: hand.fontFamily,
};
