import React from "react";
import {
  Canvas,
  At,
  Title,
  Annotation,
  Card,
  FlowBox,
  Glyph,
  PillTitle,
  GlyphName,
  PaletteColor,
} from "@allen-saji/diagram-kit";

export type SketchThemeProbeProps = {
  debug?: boolean;
};

/**
 * `theme="sketch"` probe — graph-paper page background, hand-drawn
 * font swapped in via the --dk-font-* CSS variables, and wobbly
 * asymmetric border radius on Card / FlowBox / Panel. Same primitives
 * as every other theme; only the skin changes. Anatomy borrowed from
 * the "Latency vs Throughput vs Bandwidth" sketch-style poster.
 */

const COLUMNS: Array<{
  title: string;
  color: PaletteColor;
  metric: string;
  metricSub: string;
  glyph: GlyphName;
}> = [
  {
    title: "Latency",
    color: "mint",
    metric: "End-to-end delay",
    metricSub: "40 ms",
    glyph: "clock",
  },
  {
    title: "Throughput",
    color: "blue",
    metric: "Delivered rate",
    metricSub: "62 Mbps",
    glyph: "doc",
  },
  {
    title: "Bandwidth",
    color: "lavender",
    metric: "Link capacity",
    metricSub: "100 Mbps",
    glyph: "chain",
  },
];

export const SketchThemeProbe: React.FC<SketchThemeProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={860} debug={debug} theme="sketch">
      <At x={60} y={44}>
        <div style={{ width: 1480 }}>
          <Title accentColor="mint" rightSlot="diagram-kit · sketch">
            Latency vs Throughput vs Bandwidth
          </Title>
        </div>
      </At>

      {COLUMNS.map((col, i) => {
        const cx = 280 + i * 520;
        return (
          <React.Fragment key={col.title}>
            <At x={cx} y={130} anchor="top-center">
              <PillTitle tone={col.color} size={22} debugId={`sk-pill-${i}`}>
                {col.title}
              </PillTitle>
            </At>
            <At x={cx} y={210} anchor="top-center">
              <Glyph name="server" color={col.color} size={72} label="Sender" debugId={`sk-sender-${i}`} />
            </At>
            <At x={cx} y={350} anchor="top-center">
              <Glyph name={col.glyph} color={col.color} size={64} debugId={`sk-mid-${i}`} />
            </At>
            <At x={cx} y={470} anchor="top-center">
              <Card
                debugId={`sk-metric-${i}`}
                color={col.color}
                title={col.metric}
                subtitle={col.metricSub}
              />
            </At>
            <At x={cx} y={600} anchor="top-center">
              <FlowBox
                debugId={`sk-recv-${i}`}
                color={col.color}
                title="Receiver"
                width={190}
                height={70}
              />
            </At>
          </React.Fragment>
        );
      })}

      <At x={60} y={780}>
        <Annotation tone="gray" debugId="sk-note">
          theme="sketch" — graph paper, hand font, wobbly borders. Same primitives as every other theme.
        </Annotation>
      </At>
    </Canvas>
  );
};
