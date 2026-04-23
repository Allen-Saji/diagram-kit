import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { Arrow } from "../kit/Arrow";

const smooth = Easing.bezier(0.16, 1, 0.3, 1); // gentle ease-out
const snappy = Easing.bezier(0.34, 1.56, 0.64, 1); // mild overshoot

type TimingProps = {
  /** Start time in seconds from composition start. */
  at: number;
  /** Duration in seconds. Default 0.5s. */
  duration?: number;
};

export const useTiming = (at: number, duration = 0.5) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = at * fps;
  const endFrame = startFrame + duration * fps;
  const local = frame - startFrame;
  const t = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: smooth,
  });
  return { frame, local, t, startFrame, endFrame, fps };
};

type AppearProps = TimingProps & {
  children: React.ReactNode;
  /** Pixels to slide up from. Default 16. */
  slideY?: number;
  /** Pixels to slide from the left. Default 0. */
  slideX?: number;
  style?: React.CSSProperties;
};

/** Fade + slight slide in. Keeps layout stable — does not affect absolute position. */
export const Appear: React.FC<AppearProps> = ({
  at,
  duration = 0.45,
  slideY = 16,
  slideX = 0,
  children,
  style,
}) => {
  const { t } = useTiming(at, duration);
  const opacity = t;
  const dy = (1 - t) * slideY;
  const dx = (1 - t) * slideX;
  return (
    <div
      style={{
        opacity,
        transform: `translate(${dx}px, ${dy}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type ScaleInProps = TimingProps & {
  children: React.ReactNode;
  from?: number;
  style?: React.CSSProperties;
};

/** Scale in with gentle overshoot for small pop-in emphasis. */
export const ScaleIn: React.FC<ScaleInProps> = ({
  at,
  duration = 0.5,
  children,
  from = 0.85,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = at * fps;
  const endFrame = startFrame + duration * fps;
  const scale = interpolate(frame, [startFrame, endFrame], [from, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: snappy,
  });
  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: smooth,
  });
  return (
    <div style={{ opacity, transform: `scale(${scale})`, ...style }}>
      {children}
    </div>
  );
};

type DrawArrowProps = TimingProps &
  Omit<React.ComponentProps<typeof Arrow>, "progress">;

/** Arrow whose stroke animates in between `at` and `at + duration`. */
export const DrawArrow: React.FC<DrawArrowProps> = ({
  at,
  duration = 0.5,
  ...rest
}) => {
  const { t } = useTiming(at, duration);
  return <Arrow {...rest} progress={t} />;
};

type PulseProps = TimingProps & {
  /** How many pulses. Default 1. */
  pulses?: number;
  /** Scale peak. Default 1.08. */
  peak?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/** Brief scale pulse to draw attention. */
export const Pulse: React.FC<PulseProps> = ({
  at,
  duration = 0.6,
  pulses = 1,
  peak = 1.08,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = at * fps;
  const totalFrames = duration * fps;
  const local = Math.max(0, frame - startFrame);
  let scale = 1;
  if (local < totalFrames) {
    const progress = (local / totalFrames) * pulses * Math.PI * 2;
    scale = 1 + (peak - 1) * Math.max(0, Math.sin(progress));
  }
  return (
    <div style={{ transform: `scale(${scale})`, ...style }}>{children}</div>
  );
};

type HoldProps = {
  /** Show child only after `from` seconds. */
  from?: number;
  /** Hide child after `until` seconds. */
  until?: number;
  children: React.ReactNode;
};

/** Show a child only within a time window. */
export const Hold: React.FC<HoldProps> = ({ from = 0, until, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const show =
    frame >= from * fps && (until === undefined ? true : frame < until * fps);
  if (!show) return null;
  return <>{children}</>;
};

type TypewriterProps = TimingProps & {
  text: string;
  style?: React.CSSProperties;
  /** Characters per second. Default 30. */
  cps?: number;
  /** Cursor character, if any. */
  cursor?: string;
};

/** Reveal text character by character. */
export const Typewriter: React.FC<TypewriterProps> = ({
  at,
  text,
  style,
  cps = 30,
  cursor,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = at * fps;
  const totalChars = text.length;
  const charsPerFrame = cps / fps;
  const effectiveDuration = duration ?? totalChars / cps;
  const local = Math.max(0, frame - startFrame);
  const shown = Math.min(totalChars, Math.floor(local * charsPerFrame));
  const done = local >= effectiveDuration * fps;
  return (
    <span style={style}>
      {text.slice(0, shown)}
      {cursor && !done ? cursor : ""}
    </span>
  );
};
