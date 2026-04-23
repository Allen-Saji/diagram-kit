import React from "react";
import { annotation } from "./palette";
import { fonts } from "./fonts";

type AnnotationProps = {
  tone?: "red" | "gray";
  size?: number;
  weight?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/** Italic side-note in red (highlighted walkthroughs) or gray (ambient notes). */
export const Annotation: React.FC<AnnotationProps> = ({
  tone = "red",
  size = 15,
  weight = 500,
  style,
  children,
}) => {
  return (
    <div
      style={{
        fontFamily: fonts.sansItalic,
        fontStyle: "italic",
        fontSize: size,
        fontWeight: weight,
        color: tone === "red" ? annotation.red : annotation.gray,
        lineHeight: 1.3,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
