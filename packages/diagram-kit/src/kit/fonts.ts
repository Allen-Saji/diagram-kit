import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

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

export const fonts = {
  sans: inter.fontFamily,
  sansItalic: interItalic.fontFamily,
  mono: mono.fontFamily,
};
