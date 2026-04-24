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
  const arrows = [];
  let canvasOrigin = { x: 0, y: 0 };
  let logCount = 0;

  // For animated compositions, render the final frame so all Appear /
  // ScaleIn transforms have settled. Otherwise in-flight translates
  // shift bbox positions and cause spurious arrow-vs-card collisions.
  const targetFrame =
    composition.durationInFrames > 1 ? composition.durationInFrames - 1 : 0;
  console.log(
    `${DIM}rendering frame ${targetFrame}/${composition.durationInFrames}…${RESET}`,
  );
  await renderStill({
    composition,
    serveUrl,
    frame: targetFrame,
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
      } else if (log.text.startsWith("ARROW::")) {
        try {
          arrows.push(JSON.parse(log.text.slice(7)));
        } catch {
          // ignore malformed
        }
      } else if (log.text.startsWith("CANVAS::")) {
        try {
          canvasOrigin = JSON.parse(log.text.slice(8));
        } catch {
          // ignore malformed
        }
      }
    },
  });

  console.log(
    `${DIM}captured ${bboxes.length} bboxes + ${arrows.length} arrows from ${logCount} browser logs${RESET}\n`,
  );

  // Pairwise card/panel overlap check.
  const overlaps = [];
  for (let i = 0; i < bboxes.length; i++) {
    for (let j = i + 1; j < bboxes.length; j++) {
      const a = bboxes[i];
      const b = bboxes[j];
      const area = overlapArea(a.rect, b.rect);
      if (area >= minArea) {
        overlaps.push({
          type: "bbox",
          a: `${a.kind}·${a.id}`,
          b: `${b.kind}·${b.id}`,
          area,
          rects: { a: a.rect, b: b.rect },
        });
      }
    }
  }

  // Arrow-vs-card intersection check. bboxes come from
  // getBoundingClientRect (viewport coords — Remotion's iframe may place
  // the composition far below zero). Arrow segments use canvas-local
  // coords. Translate bboxes into canvas space using the CANVAS::
  // marker emitted by the Canvas root.
  //
  // Shrink rects by 5px so arrow endpoints touching card edges don't
  // register as collisions. Any arrow crossing more than 5px into a
  // card's interior is flagged.
  const ARROW_MARGIN = 5;
  for (const arrow of arrows) {
    for (const bbox of bboxes) {
      const r = {
        x: bbox.rect.x - canvasOrigin.x + ARROW_MARGIN,
        y: bbox.rect.y - canvasOrigin.y + ARROW_MARGIN,
        w: bbox.rect.w - ARROW_MARGIN * 2,
        h: bbox.rect.h - ARROW_MARGIN * 2,
      };
      if (r.w <= 0 || r.h <= 0) continue;
      for (const seg of arrow.segments) {
        if (segmentIntersectsRect(seg.from, seg.to, r)) {
          overlaps.push({
            type: "arrow",
            a: `arrow·${arrow.id}`,
            b: `${bbox.kind}·${bbox.id}`,
            area: 0,
            segment: seg,
            rect: bbox.rect,
          });
          break; // one collision per arrow-card pair
        }
      }
    }
  }

  overlaps.sort((x, y) => (y.area || 0) - (x.area || 0));

  // Terminal report.
  const header = `${COMP}: ${bboxes.length} elements + ${arrows.length} arrows, ${overlaps.length} collision${overlaps.length === 1 ? "" : "s"}`;
  if (overlaps.length === 0) {
    console.log(`${GREEN}✓ ${header}${RESET}`);
  } else {
    console.log(`${RED}✗ ${header}${RESET}`);
    for (const o of overlaps) {
      if (o.type === "arrow") {
        console.log(
          `  ${YELLOW}${o.a}${RESET} ↦ ${YELLOW}${o.b}${RESET}  ${DIM}segment (${o.segment.from.x},${o.segment.from.y})→(${o.segment.to.x},${o.segment.to.y}) crosses card interior${RESET}`,
        );
      } else {
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
  }

  // JSON report.
  if (writeJson) {
    const reportPath = path.join(projectRoot, `out/iter/${COMP}.report.json`);
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    const report = {
      composition: COMP,
      totalElements: bboxes.length,
      totalArrows: arrows.length,
      minAreaThreshold: minArea,
      collisions: overlaps,
      elements: bboxes,
      arrows,
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

// Liang-Barsky segment-vs-axis-aligned-rect intersection. Returns true
// when any portion of the segment lies strictly inside the rect interior.
function segmentIntersectsRect(p1, p2, rect) {
  let t0 = 0;
  let t1 = 1;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const p = [-dx, dx, -dy, dy];
  const q = [
    p1.x - rect.x,
    rect.x + rect.w - p1.x,
    p1.y - rect.y,
    rect.y + rect.h - p1.y,
  ];
  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) {
      if (q[i] < 0) return false;
    } else {
      const t = q[i] / p[i];
      if (p[i] < 0) {
        if (t > t1) return false;
        if (t > t0) t0 = t;
      } else {
        if (t < t0) return false;
        if (t < t1) t1 = t;
      }
    }
  }
  return t0 < t1;
}


main().catch((err) => {
  console.error(err);
  process.exit(2);
});
