import React from "react";
import { PaletteColor } from "./palette";
import { useSwatch } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

/**
 * Flow-style rounded pill/box used for sequenced steps
 * (e.g. Write → WAL → Memtable in the LSM write path).
 */
type FlowBoxProps = {
  color: PaletteColor;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  width?: number;
  height?: number;
  radius?: number;
  titleSize?: number;
  subtitleSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

export const FlowBox: React.FC<FlowBoxProps> = ({
  color,
  title,
  subtitle,
  width = 160,
  height = 80,
  radius = 12,
  titleSize = 22,
  subtitleSize = 14,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  return (
    <DebugOverlay id={debugId} kind="flow">
      <div
        style={{
          background: p.bg,
          border: `2px solid ${p.border}`,
          borderRadius: radius,
          width,
          height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: p.text,
          fontFamily: fonts.sans,
          textAlign: "center",
          padding: "8px 12px",
          lineHeight: 1.15,
          ...style,
        }}
      >
        <div style={{ fontSize: titleSize, fontWeight: 700 }}>{title}</div>
        {subtitle != null ? (
          <div
            style={{
              fontSize: subtitleSize,
              fontWeight: 400,
              marginTop: 3,
              opacity: 0.9,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </DebugOverlay>
  );
};
