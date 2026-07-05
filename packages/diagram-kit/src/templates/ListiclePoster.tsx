import React from "react";
import { Canvas, At } from "../kit/Canvas";
import { Title } from "../kit/Title";
import { Panel } from "../kit/Panel";
import { PillTitle } from "../kit/PillTitle";
import { PaletteColor } from "../kit/palette";
import { type Theme } from "../kit/theme";

export type ListiclePanel = {
  title: React.ReactNode;
  /** Panel number for the pill ("1", "2", ...). Auto-assigned when omitted. */
  number?: number | string;
  /** Pill tone. Default `"ink"` (black pill, BBG canon). */
  tone?: "ink" | PaletteColor;
  /**
   * Panel body. Pass a function to receive the panel's inner box
   * `{w, h}` and position content inside it with `At` (the box is a
   * positioned container, so `At` coords are panel-local).
   */
  content: React.ReactNode | ((box: { w: number; h: number }) => React.ReactNode);
};

type ListiclePosterProps = {
  title: React.ReactNode;
  accentColor?: PaletteColor;
  /** Brand slot on the title row. */
  rightSlot?: React.ReactNode;
  panels: ListiclePanel[];
  /** Grid columns. Default 2. */
  cols?: number;
  w: number;
  h: number;
  theme?: Theme;
  debug?: boolean;
  margin?: number;
  gap?: number;
};

/**
 * BBG listicle poster — "Top N Anti-Patterns" style. A page title,
 * then a grid of dashed panels, each crowned by a numbered pill that
 * straddles the panel's top border, each holding one self-contained
 * mini-diagram.
 *
 * Panels intentionally carry no debugId (kit convention: semantic
 * containers stay untracked); give the *content* debugIds so
 * check.mjs covers it.
 */
export const ListiclePoster: React.FC<ListiclePosterProps> = ({
  title,
  accentColor = "mint",
  rightSlot,
  panels,
  cols = 2,
  w,
  h,
  theme = "light",
  debug = false,
  margin = 48,
  gap = 56,
}) => {
  const headerH = 120;
  const rows = Math.ceil(panels.length / cols);
  const panelW = (w - margin * 2 - gap * (cols - 1)) / cols;
  const panelH = (h - headerH - margin - gap * (rows - 1) - margin) / rows;
  const pad = 20;
  return (
    <Canvas w={w} h={h} debug={debug} theme={theme}>
      <At x={margin} y={margin}>
        <div style={{ width: w - margin * 2 }}>
          <Title accentColor={accentColor} rightSlot={rightSlot}>
            {title}
          </Title>
        </div>
      </At>
      {panels.map((panel, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = margin + col * (panelW + gap);
        const y = headerH + margin + row * (panelH + gap);
        const box = { w: panelW - pad * 2, h: panelH - pad * 2 };
        return (
          <React.Fragment key={i}>
            <At x={x} y={y}>
              <Panel
                variant="dashed"
                style={{ width: panelW, height: panelH, boxSizing: "border-box", padding: pad }}
              >
                <div style={{ position: "relative", width: box.w, height: box.h }}>
                  {typeof panel.content === "function" ? panel.content(box) : panel.content}
                </div>
              </Panel>
            </At>
            <At x={x + panelW / 2} y={y} anchor="center">
              <PillTitle
                number={panel.number ?? i + 1}
                tone={panel.tone ?? "ink"}
                size={20}
                debugId={`listicle-pill-${i}`}
              >
                {panel.title}
              </PillTitle>
            </At>
          </React.Fragment>
        );
      })}
    </Canvas>
  );
};
