import React from "react";
import { DebugOverlay } from "./Debug";

export type StatusKind = "ok" | "fail" | "warn";

type StatusIconProps = {
  status: StatusKind;
  /**
   * Override the default status color. Defaults preserve the canonical
   * green check / red X / orange exclamation across themes since these
   * carry strong semantic meaning.
   */
  color?: string;
  /** Diameter in px. Default 20. */
  size?: number;
  /** Stroke width relative to the 24-unit viewbox. Default 3. */
  strokeWidth?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

const DEFAULT_COLORS: Record<StatusKind, string> = {
  ok: "#16A34A",
  fail: "#DC2626",
  warn: "#D97706",
};

/**
 * Inline status marker — green check, red X, or orange exclamation.
 * Intended to sit next to a label or `Card` title to call out a
 * pass/fail/warn state. Stays color-consistent across themes by
 * default; pass `color` to override.
 */
export const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  color,
  size = 20,
  strokeWidth = 3,
  style,
  debugId,
}) => {
  const stroke = color ?? DEFAULT_COLORS[status];
  return (
    <DebugOverlay id={debugId} kind="status">
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          color: stroke,
          ...style,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          {status === "ok" ? (
            <path
              d="M5 12 L10 17 L19 7"
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ) : status === "fail" ? (
            <>
              <path
                d="M6 6 L18 18"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              <path
                d="M18 6 L6 18"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <path
                d="M12 4 L12 14"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              <circle cx="12" cy="19" r="1.6" fill={stroke} />
            </>
          )}
        </svg>
      </span>
    </DebugOverlay>
  );
};
