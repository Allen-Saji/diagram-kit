import React from "react";
import { useSwatch, useInk } from "./theme";
import { PaletteColor } from "./palette";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type AvatarChipProps = {
  /** Display name shown below the avatar. */
  name: string;
  /**
   * Image source for the round avatar. When omitted, the chip falls
   * back to a colored circle showing the first letter of `name`.
   */
  src?: string;
  /** Color used for the fallback circle (and image border). Default mint. */
  color?: PaletteColor;
  /** Avatar diameter in px. Default 64. */
  size?: number;
  /** Optional subtitle below the name (e.g. role, region). */
  subtitle?: string;
  /** Alt text for the avatar image. Defaults to `name`. */
  alt?: string;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Round persona head with a name label below — sequence-diagram
 * actor, ER-diagram user, "team member" reference card. Falls back
 * gracefully without a `src` so probes and quick mockups don't need
 * real avatar assets.
 */
export const AvatarChip: React.FC<AvatarChipProps> = ({
  name,
  src,
  color = "mint",
  size = 64,
  subtitle,
  alt,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  const ink = useInk();
  const initial = name.trim().slice(0, 1).toUpperCase();
  return (
    <DebugOverlay id={debugId} kind="avatar">
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          fontFamily: fonts.sans,
          ...style,
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt ?? name}
            width={size}
            height={size}
            style={{
              width: size,
              height: size,
              borderRadius: "50%",
              objectFit: "cover",
              border: `2px solid ${p.border}`,
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: "50%",
              background: p.bg,
              border: `2px solid ${p.border}`,
              color: p.text,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: Math.round(size * 0.42),
              lineHeight: 1,
            }}
          >
            {initial}
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: 1.2,
          }}
        >
          <span
            style={{ fontSize: 14, fontWeight: 700, color: ink.heading }}
          >
            {name}
          </span>
          {subtitle ? (
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: ink.muted,
                marginTop: 2,
              }}
            >
              {subtitle}
            </span>
          ) : null}
        </div>
      </div>
    </DebugOverlay>
  );
};
