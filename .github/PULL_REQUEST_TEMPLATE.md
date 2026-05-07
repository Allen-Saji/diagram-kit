## Summary

<!-- One or two sentences on what this PR changes and why. -->

## Type

- [ ] New primitive / animation
- [ ] New fidelity example
- [ ] Bug fix
- [ ] Render pipeline / scripts
- [ ] Docs

## Checklist

- [ ] `pnpm lint` passes locally
- [ ] `pnpm test:check` passes locally
- [ ] If adding a primitive: a fidelity probe covers it under
      `apps/playground/src/examples/fidelity/`
- [ ] If adding a primitive: it accepts an optional `debugId` and emits
      a BBOX event (see `Card.tsx` / `Panel.tsx` for the pattern)
- [ ] No CSS animations (use `Appear` / `ScaleIn` / `DrawArrow` helpers)
- [ ] Conventional commit title (`feat:`, `fix:`, `docs:`, `chore:`,
      `refactor:`, `perf:`, `test:`)

## Screenshots / output

<!-- Paste rendered PNG samples or a short MP4 clip if visual changes,
or the `out/check/<comp>.json` summary if changing the checker. -->
