import React from "react";
import { useInk, useFrame, useTheme } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type PageFooterProps = {
  /** Brand slot — logo + name, usually. */
  left?: React.ReactNode;
  /** CTA slot — URL, handle, date. */
  right?: React.ReactNode;
  width: number;
  size?: number;
  /** Draw a hairline above the band. Default true. */
  divider?: boolean;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Page-format footer band: brand on the left, call-to-action on the
 * right, with an optional hairline divider. The closing strip of BBG
 * promo pages ("ByteByteAI ... Check it out at: bytebyteai.com").
 */
export const PageFooter: React.FC<PageFooterProps> = ({
  left,
  right,
  width,
  size = 19,
  divider = true,
  style,
  debugId,
}) => {
  const ink = useInk();
  const f = useFrame();
  const { theme } = useTheme();
  const hairline = `${f.border}${theme === "dark" ? "33" : "22"}`;
  return (
    <DebugOverlay id={debugId} kind="page-footer">
      <div
        style={{
          width,
          fontFamily: fonts.sans,
          borderTop: divider ? `1.5px solid ${hairline}` : "none",
          paddingTop: divider ? 18 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: size,
          fontWeight: 700,
          color: ink.heading,
          ...style,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{left}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{right}</div>
      </div>
    </DebugOverlay>
  );
};
