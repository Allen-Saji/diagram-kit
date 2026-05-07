import React from "react";
import {
  Canvas,
  At,
  Title,
  Annotation,
  Label,
  LogoChip,
  AvatarChip,
} from "@allen-saji/diagram-kit";

export type PersonaProbeProps = {
  debug?: boolean;
};

/**
 * Probe for `LogoChip` + `AvatarChip`. Both are persona / brand chips,
 * grouped here so one comp covers the trio of states each supports
 * (with caption / without; with image / fallback initial).
 *
 * The LogoChip images are inlined as `data:` URLs so the probe stays
 * self-contained — no bundled assets, no network fetch. Real diagrams
 * should pass `staticFile()` paths instead.
 */
export const PersonaProbe: React.FC<PersonaProbeProps> = ({
  debug = false,
}) => {
  // Tiny solid-color SVGs so the probe needs no external assets.
  const blueLogo = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'><circle cx='30' cy='30' r='26' fill='%2393C5FD'/><text x='50%' y='55%' text-anchor='middle' font-family='Inter' font-size='22' font-weight='700' fill='white'>A</text></svg>`;
  const peachLogo = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'><rect x='8' y='8' width='44' height='44' rx='8' fill='%23FED7AA'/><text x='50%' y='58%' text-anchor='middle' font-family='Inter' font-size='22' font-weight='700' fill='%2392400e'>B</text></svg>`;
  const mintLogo = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'><polygon points='30,6 54,52 6,52' fill='%23A7F3D0'/><text x='50%' y='72%' text-anchor='middle' font-family='Inter' font-size='18' font-weight='700' fill='%23064e3b'>C</text></svg>`;
  return (
    <Canvas w={1600} h={780} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="peach" rightSlot="diagram-kit · personas">
            Persona + Brand Chips
          </Title>
        </div>
      </At>

      {/* LogoChip row */}
      <At x={60} y={170}>
        <Label debugId="logo-row-label" size={15}>
          LogoChip — brand + caption
        </Label>
      </At>
      <At x={60} y={210}>
        <Annotation tone="gray" debugId="logo-row-note">
          Image + optional caption inside a soft frame. data: URLs used here so
          the probe is self-contained.
        </Annotation>
      </At>
      <At x={60} y={270}>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
          <LogoChip debugId="logo-a" src={blueLogo} caption="Anvil" width={80} />
          <LogoChip
            debugId="logo-b"
            src={peachLogo}
            caption="Builder"
            width={80}
          />
          <LogoChip
            debugId="logo-c"
            src={mintLogo}
            caption="Compiler"
            width={80}
          />
          <LogoChip
            debugId="logo-bare"
            src={blueLogo}
            width={64}
            framed={false}
          />
        </div>
      </At>

      {/* AvatarChip row */}
      <At x={60} y={500}>
        <Label debugId="avatar-row-label" size={15}>
          AvatarChip — persona head + name + optional subtitle
        </Label>
      </At>
      <At x={60} y={540}>
        <Annotation tone="gray" debugId="avatar-row-note">
          With src + alt: round image. Without src: colored circle with the
          name's initial. Use on sequence diagrams as actor headers.
        </Annotation>
      </At>
      <At x={60} y={610}>
        <div style={{ display: "flex", gap: 36, alignItems: "flex-end" }}>
          <AvatarChip
            debugId="avatar-sarah"
            name="Sarah"
            subtitle="writer A"
            src={blueLogo}
          />
          <AvatarChip
            debugId="avatar-alex"
            name="Alex"
            subtitle="writer B"
            color="peach"
          />
          <AvatarChip
            debugId="avatar-db"
            name="Database"
            subtitle="row v=1"
            color="mint"
            size={72}
          />
        </div>
      </At>
    </Canvas>
  );
};
