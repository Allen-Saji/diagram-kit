import React from "react";
import { palette, PaletteColor } from "./palette";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type CardProps = {
  color: PaletteColor;
  /** Top/primary text (bold) */
  title?: React.ReactNode;
  /** Secondary / subtitle text */
  subtitle?: React.ReactNode;
  /** Override content entirely */
  children?: React.ReactNode;
  /** Outline only — no bg fill */
  outline?: boolean;
  radius?: number;
  padding?: string | number;
  align?: "center" | "left";
  titleSize?: number;
  subtitleSize?: number;
  style?: React.CSSProperties;
  /** Identifier surfaced by the debug overlay and collision checker. */
  debugId?: string;
};

export const Card: React.FC<CardProps> = ({
  color,
  title,
  subtitle,
  children,
  outline = false,
  radius = 12,
  padding = "10px 18px",
  align = "center",
  titleSize = 22,
  subtitleSize = 16,
  style,
  debugId,
}) => {
  const p = palette[color];
  return (
    <DebugOverlay id={debugId} kind="card">
      <div
        style={{
          background: outline ? "transparent" : p.bg,
          border: `2px solid ${p.border}`,
          borderRadius: radius,
          padding,
          color: p.text,
          fontFamily: fonts.sans,
          textAlign: align,
          display: "inline-flex",
          flexDirection: "column",
          alignItems: align === "center" ? "center" : "flex-start",
          justifyContent: "center",
          lineHeight: 1.2,
          ...style,
        }}
      >
        {children ?? (
          <>
            {title != null ? (
              <div style={{ fontSize: titleSize, fontWeight: 700 }}>
                {title}
              </div>
            ) : null}
            {subtitle != null ? (
              <div
                style={{
                  fontSize: subtitleSize,
                  fontWeight: 400,
                  marginTop: title != null ? 2 : 0,
                  color: p.text,
                  opacity: 0.85,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </>
        )}
      </div>
    </DebugOverlay>
  );
};
