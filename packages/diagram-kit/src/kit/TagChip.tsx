import React from "react";
import { useSwatch } from "./theme";
import { fonts } from "./fonts";
import { PaletteColor } from "./palette";
import { DebugOverlay } from "./Debug";

type TagChipProps = {
  /** Label text — typically a short uppercase verb (CREATE, READ, ...). */
  children: string;
  color: PaletteColor;
  /** Font size in px. Default 13. */
  size?: number;
  /** Default true; render as-is when false. */
  uppercase?: boolean;
  /** Letter spacing in px. Default 0.6 (tight tracking suits short caps). */
  letterSpacing?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Tight monospace pill for short verb-like labels: HTTP methods,
 * CRUD verbs, role markers (CREATE / READ / UPDATE / DELETE,
 * GET / POST / PUT / DELETE, ADMIN / VIEWER). Reads as a category
 * marker on a `Card` or `Panel`, not as primary content.
 *
 * Use `RelationshipNode` instead for ER-style "has" / "owns" labels
 * connecting two entities — those are sentence-case sans-serif by
 * convention, while TagChip is uppercase mono.
 */
export const TagChip: React.FC<TagChipProps> = ({
  children,
  color,
  size = 13,
  uppercase = true,
  letterSpacing = 0.6,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  return (
    <DebugOverlay id={debugId} kind="tag">
      <span
        style={{
          display: "inline-block",
          padding: "4px 10px",
          background: p.bg,
          border: `1.5px solid ${p.border}`,
          borderRadius: 999,
          color: p.text,
          fontFamily: fonts.mono,
          fontSize: size,
          fontWeight: 700,
          letterSpacing,
          lineHeight: 1,
          textTransform: uppercase ? "uppercase" : "none",
          whiteSpace: "nowrap",
          ...style,
        }}
      >
        {children}
      </span>
    </DebugOverlay>
  );
};
