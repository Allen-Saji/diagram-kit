import React from "react";
import { PaletteColor } from "./palette";
import { useFrame, useTheme, sketchRadius } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";
import { PillTitle } from "./PillTitle";
import { BulletList } from "./BulletList";

type FeatureCardProps = {
  /** Pill headline text. */
  title: React.ReactNode;
  /** Optional pill number prefix. */
  number?: number | string;
  /** Pill + bullet accent. Default `mint`. */
  color?: PaletteColor;
  /** Pill tone override; defaults to `color`. Pass `"ink"` for black pills. */
  pillTone?: "ink" | PaletteColor;
  /** Bullet lines under the title. */
  bullets?: React.ReactNode[];
  /** Free-form body instead of / after bullets. */
  children?: React.ReactNode;
  /**
   * Media slot — a thumbnail, mini-diagram, or nested composition
   * (wrap a scaled-down comp in a fixed-size div). Rendered to the
   * right of the copy by default.
   */
  media?: React.ReactNode;
  mediaPosition?: "right" | "bottom";
  /** Width of the media column when `mediaPosition="right"`. Default 45% of card width. */
  mediaWidth?: number;
  width: number;
  height?: number;
  padding?: number;
  bulletSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Product one-pager feature card — pill title, bullet copy, and an
 * optional media thumbnail, on a white surface with a soft border.
 * The card anatomy of BBG's course-promo posters. Six of these in a
 * 2x3 grid plus `PageHeader`/`PageFooter` is a complete promo page.
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  number,
  color = "mint",
  pillTone,
  bullets,
  children,
  media,
  mediaPosition = "right",
  mediaWidth,
  width,
  height,
  padding = 22,
  bulletSize = 16,
  style,
  debugId,
}) => {
  const f = useFrame();
  const { theme } = useTheme();
  const borderAlpha = theme === "dark" ? "2E" : "1F";
  const resolvedMediaWidth = mediaWidth ?? Math.round(width * 0.45);
  const horizontal = media != null && mediaPosition === "right";
  return (
    <DebugOverlay id={debugId} kind="feature-card">
      <div
        style={{
          width,
          height,
          background: f.surface,
          border: `1.5px solid ${f.border}${borderAlpha}`,
          borderRadius: sketchRadius(theme) ?? 18,
          padding,
          fontFamily: fonts.sans,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxSizing: "border-box",
          ...style,
        }}
      >
        <div>
          <PillTitle number={number} tone={pillTone ?? color} size={17}>
            {title}
          </PillTitle>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: horizontal ? "row" : "column",
            gap: 18,
            flex: 1,
            minHeight: 0,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {bullets ? (
              <BulletList items={bullets} color={color} size={bulletSize} gap={9} />
            ) : null}
            {children}
          </div>
          {media != null ? (
            <div
              style={{
                width: horizontal ? resolvedMediaWidth : "100%",
                flexShrink: 0,
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {media}
            </div>
          ) : null}
        </div>
      </div>
    </DebugOverlay>
  );
};
