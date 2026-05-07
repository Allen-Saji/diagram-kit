import React from "react";
import { useFrame, useInk } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type LogoChipProps = {
  /**
   * Image source. Pass a `staticFile()` path for assets in `public/`,
   * a `data:` URL for inlined SVG, or a remote URL. For headless
   * Remotion renders the image must be reachable when the frame
   * renders; `staticFile()` is the safest choice.
   */
  src: string;
  /** Optional caption rendered below the image. */
  caption?: string;
  /** Image width in px. Default 80. */
  width?: number;
  /**
   * Image height in px. Defaults to `width` (square box). Set lower
   * for wide horizontal logos.
   */
  height?: number;
  /** Soft frame around the chip. Default true. */
  framed?: boolean;
  /** Caption font size. Default 12. */
  captionSize?: number;
  /** Alt text. Defaults to `caption` when present, else empty string. */
  alt?: string;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Branded logo card — image + optional caption inside a soft frame.
 * BBG uses these on tech-stack reference posts ("our logging stack",
 * "open-source vector DBs"). Pair with a `Title` for a hero block.
 *
 * Uses a plain `<img>` rather than Remotion's `<Img>` so the kit
 * stays runtime-agnostic. For static-file assets Remotion preloads
 * automatically; for remote URLs ensure the image is cached or use
 * Remotion's `<Img>` separately above this primitive.
 */
export const LogoChip: React.FC<LogoChipProps> = ({
  src,
  caption,
  width = 80,
  height,
  framed = true,
  captionSize = 12,
  alt,
  style,
  debugId,
}) => {
  const frame = useFrame();
  const ink = useInk();
  const imgHeight = height ?? width;
  return (
    <DebugOverlay id={debugId} kind="logo">
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          padding: framed ? 10 : 0,
          background: framed ? frame.bg : "transparent",
          border: framed ? `1.5px solid ${frame.border}` : undefined,
          borderRadius: 14,
          fontFamily: fonts.sans,
          ...style,
        }}
      >
        <img
          src={src}
          alt={alt ?? caption ?? ""}
          width={width}
          height={imgHeight}
          style={{
            width,
            height: imgHeight,
            objectFit: "contain",
            display: "block",
          }}
        />
        {caption ? (
          <span
            style={{
              fontSize: captionSize,
              color: ink.muted,
              fontWeight: 500,
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {caption}
          </span>
        ) : null}
      </div>
    </DebugOverlay>
  );
};
