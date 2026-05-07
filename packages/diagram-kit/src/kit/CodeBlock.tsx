import React from "react";
import { PaletteColor } from "./palette";
import { useSwatch } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type CodeBlockProps = {
  /** Code content. Newlines preserved. */
  children: string;
  /** Palette tint for bg + border. Default `gray`. */
  color?: PaletteColor;
  /** Optional language tag rendered in the top-right corner. */
  lang?: string;
  /** Optional monospace size. Default 16. */
  size?: number;
  /** Optional fixed width. Otherwise sizes to content. */
  width?: number;
  padding?: string | number;
  radius?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Monospace code snippet on a tinted pastel background with matching border.
 * Use for SQL, shell, addresses, or any short code reference inside a diagram.
 * For full terminal chrome (macOS dots, black bg) use `TerminalCard` instead.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  color = "gray",
  lang,
  size = 16,
  width,
  padding = "12px 16px",
  radius = 10,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  return (
    <DebugOverlay id={debugId} kind="code">
      <div
        style={{
          background: p.bg,
          border: `2px solid ${p.border}`,
          borderRadius: radius,
          padding,
          width,
          color: p.text,
          fontFamily: fonts.mono,
          fontSize: size,
          lineHeight: 1.45,
          whiteSpace: "pre",
          position: "relative",
          ...style,
        }}
      >
        {lang ? (
          <div
            data-dk-skip="code-lang"
            style={{
              position: "absolute",
              top: 6,
              right: 10,
              fontFamily: fonts.sans,
              fontSize: Math.max(10, size - 4),
              fontWeight: 700,
              opacity: 0.55,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {lang}
          </div>
        ) : null}
        {children}
      </div>
    </DebugOverlay>
  );
};
