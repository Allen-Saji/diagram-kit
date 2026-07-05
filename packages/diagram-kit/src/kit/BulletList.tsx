import React from "react";
import { PaletteColor } from "./palette";
import { useSwatch, useInk } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type BulletListProps = {
  items: React.ReactNode[];
  /** Marker accent color. Default `mint`. */
  color?: PaletteColor;
  /** Marker shape. Default `dot`. */
  marker?: "dot" | "dash" | "check";
  /** Body font size. Default 16. */
  size?: number;
  /** Vertical gap between items. Default 10. */
  gap?: number;
  /** Fixed width; omit to size to content. */
  width?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Feature-card bullet list — short benefit lines with a small colored
 * marker, the body copy of BBG's product one-pagers. Keep items to one
 * line each where possible; the list wraps but pamphlet copy reads
 * best terse.
 */
export const BulletList: React.FC<BulletListProps> = ({
  items,
  color = "mint",
  marker = "dot",
  size = 16,
  gap = 10,
  width,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  const ink = useInk();
  const markerNode = (): React.ReactNode => {
    if (marker === "check") {
      return (
        <svg width={size * 0.85} height={size * 0.85} viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M 2.5 8.5 L 6.5 12.5 L 13.5 3.5"
            fill="none"
            stroke={p.border}
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    if (marker === "dash") {
      return (
        <span
          style={{
            width: size * 0.6,
            height: Math.max(3, Math.round(size * 0.16)),
            borderRadius: 2,
            background: p.border,
            display: "inline-block",
          }}
        />
      );
    }
    return (
      <span
        style={{
          width: Math.round(size * 0.42),
          height: Math.round(size * 0.42),
          borderRadius: "50%",
          background: p.border,
          display: "inline-block",
        }}
      />
    );
  };
  return (
    <DebugOverlay id={debugId} kind="bullet-list">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap,
          width,
          fontFamily: fonts.sans,
          ...style,
        }}
      >
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: Math.round(size * 0.6) }}>
            <span
              style={{
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                height: Math.round(size * 1.45),
              }}
            >
              {markerNode()}
            </span>
            <span
              style={{
                fontSize: size,
                fontWeight: 500,
                color: ink.body,
                lineHeight: 1.45,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </DebugOverlay>
  );
};
