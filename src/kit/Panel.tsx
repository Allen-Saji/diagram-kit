import React from "react";
import { frame, ink } from "./palette";
import { fonts } from "./fonts";

type PanelProps = {
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  /** padding inside the panel; default 32 */
  padding?: number;
  /** border radius of the frame; default 20 */
  radius?: number;
  /** override border color; default near-black */
  borderColor?: string;
};

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  style,
  padding = 32,
  radius = 20,
  borderColor = frame.border,
}) => {
  return (
    <div
      style={{
        position: "relative",
        background: frame.bg,
        border: `2px solid ${borderColor}`,
        borderRadius: radius,
        padding,
        paddingTop: title ? padding + 16 : padding,
        fontFamily: fonts.sans,
        color: ink.body,
        ...style,
      }}
    >
      {title ? (
        <div
          style={{
            position: "absolute",
            top: -18,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: frame.bg,
              border: `2px solid ${borderColor}`,
              borderRadius: 999,
              padding: "4px 24px",
              fontSize: 22,
              fontWeight: 700,
              color: ink.heading,
              letterSpacing: -0.1,
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
};
