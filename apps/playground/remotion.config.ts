/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import path from "node:path";
import fs from "node:fs";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

// Repo layout (monorepo):
//   <repo-root>/
//     apps/playground/         <- this app
//     packages/diagram-kit/    <- the published library
//     private/                 <- optional Allen-only assets + comps
//
// Use process.cwd() rather than __dirname: Remotion's CLI evaluates this
// config from inside its own dist directory under pnpm, which makes
// __dirname point at @remotion/cli/dist instead of apps/playground.
// Every entrypoint (`pnpm dev`, `pnpm build`, scripts/check.mjs,
// scripts/render-via-api.mjs) sets cwd to apps/playground first.
const APP_ROOT = process.cwd();
const REPO_ROOT = path.resolve(APP_ROOT, "..", "..");
const PRIVATE_DIR = path.join(REPO_ROOT, "private");
const PRIVATE_INDEX = path.join(PRIVATE_DIR, "index.tsx");
const PRIVATE_PUBLIC = path.join(PRIVATE_DIR, "public");

// Resolve `@private/comps` to the optional private composition registry
// when it exists, or the stub at `src/private-stub.ts` otherwise.
const PRIVATE_ALIAS_TARGET = fs.existsSync(PRIVATE_INDEX)
  ? PRIVATE_INDEX
  : path.join(APP_ROOT, "src", "private-stub.ts");

// Resolve `@allen-saji/diagram-kit` to the kit's source so webpack picks
// it up regardless of where the importing file lives. Without this,
// imports from outside `apps/playground/` (e.g. `private/projects/`)
// can't walk up to the linked workspace package.
const KIT_ALIAS_TARGET = path.join(
  REPO_ROOT,
  "packages",
  "diagram-kit",
  "src",
  "index.ts",
);

// Use Allen's private/public/ as Remotion's `staticFile` root when it
// exists (so audio + image refs in private comps still resolve). When
// the folder is absent, leave Remotion on its default and the app has
// no public assets — fine for OSS contributors.
if (fs.existsSync(PRIVATE_PUBLIC)) {
  Config.setPublicDir(PRIVATE_PUBLIC);
}

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig((config) => {
  const withTailwind = enableTailwind(config);
  return {
    ...withTailwind,
    resolve: {
      ...(withTailwind.resolve ?? {}),
      alias: {
        ...((withTailwind.resolve ?? {}).alias ?? {}),
        "@private/comps": PRIVATE_ALIAS_TARGET,
        "@allen-saji/diagram-kit": KIT_ALIAS_TARGET,
      },
    },
  };
});
