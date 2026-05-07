import React from "react";
import { useSwatch, useInk, useFrame } from "./theme";
import { fonts } from "./fonts";
import { PaletteColor } from "./palette";
import { DebugOverlay } from "./Debug";

type RelationshipNodeProps = {
  /** Label text (sentence case typically: "has", "owns", "writes to"). */
  children: string;
  /**
   * Visual treatment.
   *
   * - `neutral` (default) — uses the theme's frame border for a subdued
   *   look, BBG canon for ER relationship pills.
   * - `accent` — uses the supplied palette color for a more prominent
   *   pill, useful when the relationship is the focal point.
   */
  tone?: "accent" | "neutral";
  /** Palette color used when `tone="accent"`. Default `gray`. */
  color?: PaletteColor;
  /** Font size in px. Default 14. */
  size?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Small oval label connecting two ER entities. Sentence case,
 * sans-serif — visually distinct from `TagChip` (uppercase mono CRUD
 * verbs). Drop on a connector line between two `Card`s to read like
 * "User --has--> Order".
 */
export const RelationshipNode: React.FC<RelationshipNodeProps> = ({
  children,
  tone = "neutral",
  color = "gray",
  size = 14,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  const frame = useFrame();
  const ink = useInk();
  const isAccent = tone === "accent";
  return (
    <DebugOverlay id={debugId} kind="relationship">
      <span
        style={{
          display: "inline-block",
          padding: "3px 14px",
          background: isAccent ? p.bg : frame.bg,
          border: `1.5px solid ${isAccent ? p.border : frame.border}`,
          borderRadius: 999,
          color: isAccent ? p.text : ink.body,
          fontFamily: fonts.sans,
          fontSize: size,
          fontWeight: 500,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          ...style,
        }}
      >
        {children}
      </span>
    </DebugOverlay>
  );
};
