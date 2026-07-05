import React from "react";
import { PaletteColor } from "./palette";
import { useSwatch, useInk, useFrame, useTheme } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

export type Band = {
  /** Left-rail label ("System of engagement"). Omit for no rail row. */
  rail?: React.ReactNode;
  /** Bold band headline inside the panel. */
  title?: React.ReactNode;
  /** Band body — text, IconGrid, chips, anything. */
  content?: React.ReactNode;
  /**
   * Tint. With a palette color the band fills with that swatch's bg;
   * without, it sits on a white surface with a soft border.
   */
  color?: PaletteColor;
  /** Fixed band height; omit to size to content. */
  height?: number;
};

type BandStackProps = {
  bands: Band[];
  width: number;
  /** Width reserved for the left label rail. 0 hides the rail. Default 220. */
  railWidth?: number;
  gap?: number;
  bandPadding?: number;
  railSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

const BandPanel: React.FC<{
  band: Band;
  padding: number;
}> = ({ band, padding }) => {
  const swatch = useSwatch(band.color ?? "gray");
  const f = useFrame();
  const ink = useInk();
  const { theme } = useTheme();
  const tinted = band.color != null;
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        background: tinted ? swatch.bg : f.surface,
        border: tinted
          ? `2px solid ${swatch.border}`
          : `1.5px solid ${f.border}${theme === "dark" ? "2E" : "1F"}`,
        borderRadius: 14,
        padding,
        height: band.height,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
      }}
    >
      {band.title != null ? (
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: tinted ? swatch.text : ink.heading,
            lineHeight: 1.1,
          }}
        >
          {band.title}
        </div>
      ) : null}
      {band.content != null ? <div style={{ color: ink.body }}>{band.content}</div> : null}
    </div>
  );
};

/**
 * Horizontal layer bands with an optional left label rail and leader
 * lines — the "System of engagement / agency / work / context" layout
 * of enterprise architecture slides. Single-hue palettes (all bands
 * one color family) give the corporate look; mixed palettes read more
 * BBG.
 */
export const BandStack: React.FC<BandStackProps> = ({
  bands,
  width,
  railWidth = 220,
  gap = 18,
  bandPadding = 18,
  railSize = 19,
  style,
  debugId,
}) => {
  const ink = useInk();
  const hasRail = railWidth > 0 && bands.some((b) => b.rail != null);
  return (
    <DebugOverlay id={debugId} kind="band-stack">
      <div
        style={{
          width,
          display: "flex",
          flexDirection: "column",
          gap,
          fontFamily: fonts.sans,
          ...style,
        }}
      >
        {bands.map((band, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {hasRail ? (
              <div
                style={{
                  width: railWidth,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  paddingRight: 14,
                  boxSizing: "border-box",
                }}
              >
                {band.rail != null ? (
                  <>
                    <span
                      style={{
                        fontSize: railSize,
                        fontWeight: 700,
                        color: ink.heading,
                        lineHeight: 1.2,
                        flexShrink: 0,
                      }}
                    >
                      {band.rail}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        height: 2,
                        background: ink.body,
                        opacity: 0.75,
                        position: "relative",
                        minWidth: 18,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          right: -2,
                          top: -3,
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: ink.body,
                        }}
                      />
                    </span>
                  </>
                ) : null}
              </div>
            ) : null}
            <BandPanel band={band} padding={bandPadding} />
          </div>
        ))}
      </div>
    </DebugOverlay>
  );
};
