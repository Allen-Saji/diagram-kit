#!/usr/bin/env node
/**
 * Render a Still via Remotion's Node API instead of the CLI. Use this
 * when `npx remotion still` fails to pick up `remotion.config.ts` under
 * pnpm's hoisting layout (the CLI workaround). Replicates the same
 * Tailwind + `@private/comps` alias wiring as scripts/check.mjs.
 *
 * Usage:
 *   node scripts/render-via-api.mjs <composition-id> <out-path> [scale]
 *
 * Examples:
 *   node scripts/render-via-api.mjs BTreeVsBPlus out/light/btree.png 2
 *   node scripts/render-via-api.mjs DarkModeProbe out/dark/probe.png 1
 */

import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const playgroundRoot = path.join(projectRoot, "apps", "playground");

const COMP = process.argv[2];
const OUT = process.argv[3];
const SCALE = Number(process.argv[4] ?? 1);

if (!COMP || !OUT) {
  console.error("usage: node scripts/render-via-api.mjs <composition-id> <out-path> [scale]");
  process.exit(1);
}

async function main() {
  process.chdir(playgroundRoot);
  const { enableTailwind } = await import("@remotion/tailwind-v4");
  const privateIndex = path.join(projectRoot, "private", "index.tsx");
  const privateAliasTarget = await fs
    .stat(privateIndex)
    .then(() => privateIndex)
    .catch(() => path.join(playgroundRoot, "src", "private-stub.ts"));
  const privatePublicDir = path.join(projectRoot, "private", "public");
  const hasPrivatePublicDir = await fs
    .stat(privatePublicDir)
    .then(() => true)
    .catch(() => false);
  const kitAliasTarget = path.join(
    projectRoot,
    "packages",
    "diagram-kit",
    "src",
    "index.ts",
  );

  const bundleOpts = {
    entryPoint: path.join(playgroundRoot, "src/index.ts"),
    webpackOverride: (config) => {
      const withTailwind = enableTailwind(config);
      return {
        ...withTailwind,
        resolve: {
          ...(withTailwind.resolve ?? {}),
          alias: {
            ...((withTailwind.resolve ?? {}).alias ?? {}),
            "@private/comps": privateAliasTarget,
            "@allen-saji/diagram-kit": kitAliasTarget,
          },
        },
      };
    },
  };
  if (hasPrivatePublicDir) {
    bundleOpts.publicDir = privatePublicDir;
  }
  console.log(`bundling…`);
  const serveUrl = await bundle(bundleOpts);

  console.log(`selecting ${COMP}…`);
  const composition = await selectComposition({ serveUrl, id: COMP });

  const absOut = path.isAbsolute(OUT) ? OUT : path.resolve(process.cwd(), OUT);
  await fs.mkdir(path.dirname(absOut), { recursive: true });

  console.log(`rendering ${COMP} -> ${absOut} at scale=${SCALE}x`);
  await renderStill({
    composition,
    serveUrl,
    output: absOut,
    imageFormat: "png",
    scale: SCALE,
  });
  console.log(`done: ${absOut}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
