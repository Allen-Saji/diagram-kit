import React from "react";
import { palette, PaletteColor, ink } from "./palette";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type TitleProps = {
  children: React.ReactNode;
  /** Small colored square accent next to the title (ByteByteGo style) */
  accentColor?: PaletteColor;
  /** Right-side brand badge/logo slot */
  rightSlot?: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

export const Title: React.FC<TitleProps> = ({
  children,
  accentColor = "mint",
  rightSlot,
  size = 44,
  style,
  debugId,
}) => {
  const p = palette[accentColor];
  // Auto-id so the title headline is tracked as an obstacle.
  const autoId =
    debugId ??
    (typeof children === "string"
      ? `title:${children.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}`
      : "title:root");
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
            width: size * 0.55,
            height: size * 0.55,
            background: p.bg,
            border: `2px solid ${p.border}`,
            borderRadius: 8,
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
