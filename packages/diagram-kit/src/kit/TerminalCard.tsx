import React from "react";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type TerminalCardProps = {
  /** Terminal contents. Newlines preserved. */
  children: string;
  /** Optional title shown next to the macOS dots. */
  title?: string;
  /** Monospace size for the body. Default 15. */
  size?: number;
  /** Fixed width. Otherwise sizes to content. */
  width?: number;
  height?: number;
  padding?: string | number;
  radius?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Black terminal-window card with macOS-style traffic-light dots and a
 * monospace body. Used in BBG's MCP-vs-Skills, Deepfake, and Prompt
 * Injection diagrams to show CLI output / shell sessions.
 */
export const TerminalCard: React.FC<TerminalCardProps> = ({
  children,
  title,
  size = 15,
  width,
  height,
  padding = "14px 18px",
  radius = 10,
  style,
  debugId,
}) => {
  const headerH = 28;
  return (
    <DebugOverlay id={debugId} kind="terminal">
      <div
        style={{
          background: "#0E1117",
          border: "1px solid #1F2632",
          borderRadius: radius,
          width,
          height,
          color: "#E5E7EB",
          fontFamily: fonts.mono,
          fontSize: size,
          lineHeight: 1.45,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          ...style,
        }}
      >
        <div
          style={{
            height: headerH,
            background: "#1A1F2A",
            borderBottom: "1px solid #1F2632",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <Dot color="#FF5F56" />
            <Dot color="#FFBD2E" />
            <Dot color="#27C93F" />
          </div>
          {title ? (
            <div
              data-dk-skip="terminal-title"
              style={{
                fontFamily: fonts.sans,
                fontSize: 12,
                color: "#8B98B0",
                fontWeight: 600,
              }}
            >
              {title}
            </div>
          ) : null}
        </div>
        <div
          style={{
            padding,
            whiteSpace: "pre",
            flex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </DebugOverlay>
  );
};

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <span
    style={{
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: color,
      display: "inline-block",
    }}
  />
);
