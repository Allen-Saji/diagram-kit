import React from "react";
import { useInk } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type LabelProps = {
  children: React.ReactNode;
  /** Font size in px. Default 15. */
  size?: number;
  /** CSS font-weight. Default 700. */
  weight?: number;
  color?: string;
  /** letterSpacing in px. */
  tracking?: number;
  /** Uppercase via CSS text-transform. Default false. */
  uppercase?: boolean;
  /** text-align. Default "left". */
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
  /**
   * Required so Label participates in the collision checker.
   * Section headers like "RULE PIPELINE" should have an explicit id
   * so arrows can't silently cross them.
   */
  debugId: string;
};

/**
 * Non-italic section header / standalone label. Use for things like
 * "RULE PIPELINE · ALL MUST PASS" that don't fit Annotation (italic)
 * or Title (top-of-page heading). Always tracked as an obstacle for
 * arrow-vs-card intersection.
 */
export const Label: React.FC<LabelProps> = ({
  children,
  size = 15,
  weight = 700,
  color,
  tracking = 0.2,
  uppercase = false,
  align = "left",
  style,
  debugId,
}) => {
  const ink = useInk();
  const resolvedColor = color ?? ink.heading;
  return (
    <DebugOverlay id={debugId} kind="label">
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: size,
          fontWeight: weight,
          color: resolvedColor,
          letterSpacing: tracking,
          textTransform: uppercase ? "uppercase" : "none",
          textAlign: align,
          lineHeight: 1.2,
          ...style,
        }}
      >
        {children}
      </div>
    </DebugOverlay>
  );
};
