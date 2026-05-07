// Stub for the optional `private/` workspace.
//
// When `private/index.tsx` exists at repo root, `remotion.config.ts`
// rewrites the `@private/comps` import to point there. Otherwise this
// stub is used and the playground only registers the public examples.
import type { Folder } from "remotion";

export type PrivateRegistration = {
  /** Folder name in the Remotion sidebar. */
  folder: string;
  /** Composition definitions to register inside that folder. */
  registrations: React.ReactNode[];
};

export const privateRegistrations: PrivateRegistration[] = [];
