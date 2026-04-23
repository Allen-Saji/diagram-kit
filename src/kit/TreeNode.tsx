import React from "react";
import { palette, PaletteColor } from "./palette";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

/**
 * B-Tree / B+ Tree node:
 *   - Big, bold keys line (e.g. "25 | 50")
 *   - Optional small subtext below (e.g. "5, 8, 10, 15, 20")
 */
type TreeNodeProps = {
  color?: PaletteColor;
  keys: string;
  subtext?: React.ReactNode;
  width?: number | string;
  padding?: string | number;
  radius?: number;
  keysSize?: number;
  subtextSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

export const TreeNode: React.FC<TreeNodeProps> = ({
  color = "blue",
  keys,
  subtext,
  width,
  padding = "10px 16px",
  radius = 12,
  keysSize = 22,
  subtextSize = 15,
  style,
  debugId,
}) => {
  const p = palette[color];
  return (
    <DebugOverlay id={debugId} kind="tree">
      <div
        style={{
          background: p.bg,
          border: `2px solid ${p.border}`,
          borderRadius: radius,
          padding,
          color: p.text,
          fontFamily: fonts.sans,
          textAlign: "center",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width,
          lineHeight: 1.25,
          ...style,
        }}
      >
        <div
          style={{ fontSize: keysSize, fontWeight: 700, letterSpacing: -0.3 }}
        >
          {keys}
        </div>
        {subtext != null ? (
          <div
            style={{
              fontSize: subtextSize,
              fontWeight: 400,
              marginTop: 2,
              opacity: 0.85,
            }}
          >
            {subtext}
          </div>
        ) : null}
      </div>
    </DebugOverlay>
  );
};
