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
const APP_ROOT = __dirname;
const REPO_ROOT = path.resolve(APP_ROOT, "..", "..");
const PRIVATE_DIR = path.join(REPO_ROOT, "private");
const PRIVATE_INDEX = path.join(PRIVATE_DIR, "index.tsx");
const PRIVATE_PUBLIC = path.join(PRIVATE_DIR, "public");

// Resolve `@private/comps` to the optional private composition registry
// when it exists, or the stub at `src/private-stub.ts` otherwise.
const PRIVATE_ALIAS_TARGET = fs.existsSync(PRIVATE_INDEX)
  ? PRIVATE_INDEX
  : path.join(APP_ROOT, "src", "private-stub.ts");

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
      },
    },
  };
});
