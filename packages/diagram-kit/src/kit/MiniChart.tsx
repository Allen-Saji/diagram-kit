import React from "react";
import { PaletteColor } from "./palette";
import { useTheme, useInk } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

export type LineSeries = {
  label?: string;
  color: PaletteColor;
  /** Raw values, any scale; the chart normalizes to the global max. */
  points: number[];
};

export type BarDatum = {
  label?: React.ReactNode;
  value: number;
  color?: PaletteColor;
};

type MiniChartProps = {
  variant?: "line" | "bar";
  w: number;
  h: number;
  /** Line variant data. */
  series?: LineSeries[];
  /** Bar variant data. */
  bars?: BarDatum[];
  /** Axis-end labels, e.g. ["Early", "Mature"]. */
  xLabels?: [React.ReactNode, React.ReactNode];
  /**
   * Dashed vertical marker (line variant): `at` is a 0..1 fraction of
   * the x range; `label` renders as a pill at the top of the line, and
   * a dot marks where the line crosses each series.
   */
  marker?: { at: number; label: React.ReactNode; color?: PaletteColor };
  /** Bar variant: print each value above its bar. Default true. */
  showValues?: boolean;
  /** Line variant: series legend. Default on when >1 labeled series. */
  legend?: boolean;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Small annotated chart — the "cost to change vs what we know" curve
 * panels in BBG listicle posters. Deliberately minimal: no ticks, no
 * gridlines, two end labels, smooth ease curves, an optional dashed
 * "split here" marker. For real data visualization reach for a real
 * charting tool; this is for *narrative* charts inside diagrams.
 */
export const MiniChart: React.FC<MiniChartProps> = ({
  variant = "line",
  w,
  h,
  series = [],
  bars = [],
  xLabels,
  marker,
  showValues = true,
  legend,
  style,
  debugId,
}) => {
  const { palette } = useTheme();
  const ink = useInk();

  const hasBarLabels = variant === "bar" && bars.some((b) => b.label != null);
  const bottomStrip = xLabels || hasBarLabels ? 28 : 6;
  const padL = 8;
  const padR = 8;
  const padT = 8;
  const plotBottom = h - bottomStrip - 4;
  const plotLeft = padL + 2;
  const plotW = w - padL - padR - 4;
  const plotH = plotBottom - padT;

  const showLegend =
    legend ?? (variant === "line" && series.filter((s) => s.label).length > 1);

  // --- line geometry -------------------------------------------------
  const maxVal =
    variant === "line"
      ? Math.max(1e-9, ...series.flatMap((s) => s.points))
      : Math.max(1e-9, ...bars.map((b) => b.value));

  const lineX = (i: number, n: number) =>
    plotLeft + 14 + ((plotW - 28) * i) / Math.max(1, n - 1);
  const lineY = (v: number) => plotBottom - 8 - (plotH - 34) * (v / maxVal) * 0.92;

  const smoothPath = (points: number[]): string => {
    const n = points.length;
    if (n === 0) return "";
    let d = `M ${lineX(0, n)} ${lineY(points[0])}`;
    for (let i = 1; i < n; i++) {
      const x0 = lineX(i - 1, n);
      const x1 = lineX(i, n);
      const xm = (x0 + x1) / 2;
      d += ` C ${xm} ${lineY(points[i - 1])}, ${xm} ${lineY(points[i])}, ${x1} ${lineY(points[i])}`;
    }
    return d;
  };

  const valueAt = (points: number[], at: number): number => {
    const n = points.length;
    if (n === 0) return 0;
    const t = at * (n - 1);
    const lo = Math.floor(t);
    const hi = Math.min(n - 1, lo + 1);
    return points[lo] + (points[hi] - points[lo]) * (t - lo);
  };

  const markerX = marker ? plotLeft + 14 + (plotW - 28) * marker.at : 0;
  const markerSwatch = palette[marker?.color ?? "mint"];

  // --- bar geometry ---------------------------------------------------
  const nBars = bars.length;
  const slot = nBars > 0 ? plotW / nBars : 0;
  const barW = Math.min(64, slot * 0.55);
  const barX = (i: number) => plotLeft + slot * (i + 0.5) - barW / 2;
  const barH = (v: number) => (plotH - 40) * (v / maxVal);

  return (
    <DebugOverlay id={debugId} kind={`mini-chart:${variant}`}>
      <div
        style={{
          position: "relative",
          width: w,
          height: h,
          fontFamily: fonts.sans,
          ...style,
        }}
      >
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
          {/* axes */}
          <path
            d={`M ${plotLeft} ${padT} L ${plotLeft} ${plotBottom} L ${plotLeft + plotW} ${plotBottom}`}
            fill="none"
            stroke={ink.body}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {variant === "line"
            ? series.map((s, i) => (
                <path
                  key={i}
                  d={smoothPath(s.points)}
                  fill="none"
                  stroke={palette[s.color].border}
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              ))
            : null}

          {variant === "line" && marker ? (
            <>
              <line
                x1={markerX}
                y1={padT + 34}
                x2={markerX}
                y2={plotBottom}
                stroke={ink.body}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              {series.map((s, i) => (
                <circle
                  key={i}
                  cx={markerX}
                  cy={lineY(valueAt(s.points, marker.at))}
                  r={4.5}
                  fill={palette[s.color].border}
                  stroke={ink.heading}
                  strokeWidth={1.5}
                />
              ))}
            </>
          ) : null}

          {variant === "bar"
            ? bars.map((b, i) => (
                <rect
                  key={i}
                  x={barX(i)}
                  y={plotBottom - barH(b.value)}
                  width={barW}
                  height={barH(b.value)}
                  rx={4}
                  fill={palette[b.color ?? "mint"].border}
                  stroke={ink.heading}
                  strokeWidth={2}
                />
              ))
            : null}
        </svg>

        {/* marker pill */}
        {variant === "line" && marker ? (
          <span
            style={{
              position: "absolute",
              left: markerX,
              top: padT,
              transform: "translateX(-50%)",
              background: markerSwatch.bg,
              border: `2px solid ${markerSwatch.border}`,
              color: markerSwatch.text,
              fontSize: 13,
              fontWeight: 700,
              lineHeight: 1,
              padding: "5px 11px",
              borderRadius: 999,
              whiteSpace: "nowrap",
            }}
          >
            {marker.label}
          </span>
        ) : null}

        {/* legend */}
        {showLegend ? (
          <div
            style={{
              position: "absolute",
              right: 6,
              top: padT + 2,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {series
              .filter((s) => s.label)
              .map((s, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 24,
                      height: 3.5,
                      borderRadius: 2,
                      background: palette[s.color].border,
                    }}
                  />
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: palette[s.color].text }}>
                    {s.label}
                  </span>
                </span>
              ))}
          </div>
        ) : null}

        {/* bar value labels */}
        {variant === "bar" && showValues
          ? bars.map((b, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: barX(i) + barW / 2,
                  top: plotBottom - barH(b.value) - 22,
                  transform: "translateX(-50%)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: ink.heading,
                  whiteSpace: "nowrap",
                }}
              >
                {b.value}
              </span>
            ))
          : null}

        {/* bottom labels */}
        {xLabels ? (
          <>
            <span
              style={{
                position: "absolute",
                left: plotLeft,
                bottom: 2,
                fontSize: 14.5,
                fontWeight: 700,
                color: ink.heading,
              }}
            >
              {xLabels[0]}
            </span>
            <span
              style={{
                position: "absolute",
                right: padR,
                bottom: 2,
                fontSize: 14.5,
                fontWeight: 700,
                color: ink.heading,
              }}
            >
              {xLabels[1]}
            </span>
          </>
        ) : null}
        {hasBarLabels
          ? bars.map((b, i) =>
              b.label != null ? (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: barX(i) + barW / 2,
                    bottom: 2,
                    transform: "translateX(-50%)",
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: ink.body,
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.label}
                </span>
              ) : null,
            )
          : null}
      </div>
    </DebugOverlay>
  );
};
