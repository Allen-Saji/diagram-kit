import { CLIENT_GLYPHS } from "./clients";
import { CONFIGURATION_GLYPHS } from "./configuration";
import { DATA_GLYPHS } from "./data";
import { INTEGRATION_GLYPHS } from "./integration";
import { NETWORK_GLYPHS } from "./network";
import { OBSERVABILITY_GLYPHS } from "./observability";
import { RUNTIME_GLYPHS } from "./runtime";
import { WORKFLOW_GLYPHS } from "./workflow";

export const SOFTWARE_GLYPHS = {
  ...CLIENT_GLYPHS,
  ...RUNTIME_GLYPHS,
  ...DATA_GLYPHS,
  ...INTEGRATION_GLYPHS,
  ...NETWORK_GLYPHS,
  ...WORKFLOW_GLYPHS,
  ...OBSERVABILITY_GLYPHS,
  ...CONFIGURATION_GLYPHS,
};

export type SoftwareGlyphName = keyof typeof SOFTWARE_GLYPHS;

export type { GlyphColors, GlyphRender } from "./types";
