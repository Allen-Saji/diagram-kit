import React from "react";
import { PaletteColor } from "./palette";
import { useSwatch, useInk } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type AccentShape = "bar" | "square";

type TitleProps = {
  children: React.ReactNode;
  /** Small colored accent next to the title (ByteByteGo style) */
  accentColor?: PaletteColor;
  /**
   * Accent geometry. `"bar"` (default, BBG canon) is a thin vertical bar,
   * `"square"` is the original kit accent.
   */
  accentShape?: AccentShape;
  /** Right-side brand badge/logo slot */
  rightSlot?: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

export const Title: React.FC<TitleProps> = ({
  children,
  accentColor = "mint",
  accentShape = "bar",
  rightSlot,
  size = 44,
  style,
  debugId,
}) => {
  const p = useSwatch(accentColor);
  const ink = useInk();
  const autoId =
    debugId ??
    (typeof children === "string"
      ? `title:${children.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}`
      : "title:root");
  const accent =
    accentShape === "bar"
      ? {
          width: Math.max(5, Math.round(size * 0.12)),
          height: Math.round(size * 0.95),
          background: p.border,
          border: "none" as const,
          borderRadius: 2,
        }
      : {
          width: size * 0.55,
          height: size * 0.55,
          background: p.bg,
          border: `2px solid ${p.border}`,
          borderRadius: 8,
        };
  return (
    <DebugOverlay id={autoId} kind="title">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        fontFamily: fonts.sans,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            ...accent,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontSize: size,
            fontWeight: 800,
            color: ink.heading,
            letterSpacing: -1,
            lineHeight: 1,
          }}
        >
          {children}
        </div>
      </div>
      {rightSlot ? (
        <div
          data-dk-skip="title-rightslot"
          style={{
            fontSize: size * 0.45,
            fontWeight: 700,
            color: ink.heading,
            opacity: 0.85,
          }}
        >
          {rightSlot}
        </div>
      ) : null}
    </div>
    </DebugOverlay>
  );
};
