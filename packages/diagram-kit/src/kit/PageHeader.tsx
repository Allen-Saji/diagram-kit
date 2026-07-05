import React from "react";
import { useInk } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type PageHeaderProps = {
  /**
   * Main headline. For the two-tone BBG treatment wrap part of it:
   * `<>Build With <span style={{color: "#C8431F"}}>Claude Code</span></>`.
   */
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  width: number;
  titleSize?: number;
  subtitleSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Page-format headline band: big title + muted subtitle, centered by
 * default. Use `Title` for diagram headlines with the accent bar; use
 * this for pamphlet / one-pager / poster pages.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  align = "center",
  width,
  titleSize = 52,
  subtitleSize = 21,
  style,
  debugId,
}) => {
  const ink = useInk();
  return (
    <DebugOverlay id={debugId} kind="page-header">
      <div
        style={{
          width,
          fontFamily: fonts.sans,
          textAlign: align,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          ...style,
        }}
      >
        <div
          style={{
            fontSize: titleSize,
            fontWeight: 800,
            color: ink.heading,
            letterSpacing: -1.2,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        {subtitle != null ? (
          <div
            style={{
              fontSize: subtitleSize,
              fontWeight: 500,
              color: ink.muted,
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </DebugOverlay>
  );
};
