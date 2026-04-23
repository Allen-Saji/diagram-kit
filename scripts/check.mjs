#!/usr/bin/env node
/**
 * Collision checker for diagram-kit compositions.
 *
 * Bundles the Remotion project, renders the requested composition with
 * debug props on, captures BBOX:: console logs from DebugOverlay, and
 * runs a pairwise overlap check. Writes a JSON report and a terminal
 * summary. Exits 1 if any overlap exceeds the area threshold.
 *
 * Usage:
 *   node scripts/check.mjs <composition-id>
 *   node scripts/check.mjs <composition-id> --min-area=16
 *   node scripts/check.mjs <composition-id> --no-json
 */

import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const COMP = process.argv[2];
if (!COMP) {
  console.error("usage: node scripts/check.mjs <composition-id> [--min-area=N] [--no-json]");
  process.exit(1);
}

let minArea = 16;
let writeJson = true;
for (const arg of process.argv.slice(3)) {
  if (arg.startsWith("--min-area=")) {
    minArea = parseInt(arg.split("=")[1], 10);
  } else if (arg === "--no-json") {
    writeJson = false;
  }
}

const DIM = "\x1b[2m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

async function main() {
  console.log(`${DIM}bundling project…${RESET}`);
  const serveUrl = await bundle({
    entryPoint: path.join(projectRoot, "src/index.ts"),
    webpackOverride: (config) => config,
  });

  console.log(`${DIM}selecting composition ${COMP}…${RESET}`);
  const composition = await selectComposition({
    serveUrl,
    id: COMP,
    inputProps: { debug: true },
  });

  const bboxes = [];
  let logCount = 0;

  console.log(`${DIM}rendering frame…${RESET}`);
  await renderStill({
    composition,
    serveUrl,
    output: path.join(projectRoot, `out/iter/${COMP}.check.png`),
    inputProps: { debug: true },
    onBrowserLog: (log) => {
      logCount++;
      if (log.text.startsWith("BBOX::")) {
        try {
          bboxes.push(JSON.parse(log.text.slice(6)));
        } catch {
          // ignore malformed
        }
      }
    },
  });

  console.log(
    `${DIM}captured ${bboxes.length} bboxes from ${logCount} browser logs${RESET}\n`,
  );

  // Pairwise overlap check.
  const overlaps = [];
  for (let i = 0; i < bboxes.length; i++) {
    for (let j = i + 1; j < bboxes.length; j++) {
      const a = bboxes[i];
      const b = bboxes[j];
      const area = overlapArea(a.rect, b.rect);
      if (area >= minArea) {
        overlaps.push({
          a: `${a.kind}·${a.id}`,
          b: `${b.kind}·${b.id}`,
          area,
          rects: { a: a.rect, b: b.rect },
        });
      }
    }
  }
  overlaps.sort((x, y) => y.area - x.area);

  // Terminal report.
  const header = `${COMP}: ${bboxes.length} elements, ${overlaps.length} collision${overlaps.length === 1 ? "" : "s"}`;
  if (overlaps.length === 0) {
    console.log(`${GREEN}✓ ${header}${RESET}`);
  } else {
    console.log(`${RED}✗ ${header}${RESET}`);
    for (const o of overlaps) {
      const overlapPct = (
        (o.area * 100) /
        Math.max(
          o.rects.a.w * o.rects.a.h,
          o.rects.b.w * o.rects.b.h,
          1,
        )
      ).toFixed(0);
      console.log(
        `  ${YELLOW}${o.a}${RESET} ↔ ${YELLOW}${o.b}${RESET}  ${DIM}${o.area}px² (${overlapPct}% of smaller)${RESET}`,
      );
    }
  }

  // JSON report.
  if (writeJson) {
    const reportPath = path.join(projectRoot, `out/iter/${COMP}.report.json`);
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    const report = {
      composition: COMP,
      totalElements: bboxes.length,
      minAreaThreshold: minArea,
      collisions: overlaps,
      elements: bboxes,
    };
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`${DIM}report → ${path.relative(process.cwd(), reportPath)}${RESET}`);
  }

  process.exit(overlaps.length > 0 ? 1 : 0);
}

function overlapArea(a, b) {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.w, b.x + b.w);
  const y2 = Math.min(a.y + a.h, b.y + b.h);
  return Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
