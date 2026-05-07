# Contributing

Thanks for your interest in `diagram-kit`. This is a small monorepo: the
publishable library lives in `packages/diagram-kit/`, and the Remotion
studio playground lives in `apps/playground/`.

## Setup

Requirements: Node 18.18+ and `pnpm` 10.x.

```bash
git clone https://github.com/Allen-Saji/diagram-kit.git
cd diagram-kit
pnpm install
```

## Dev loop

```bash
pnpm dev          # opens the Remotion studio at http://localhost:3000
pnpm build        # builds the library + bundles the playground
pnpm lint         # type-checks every workspace
pnpm test:check   # runs the collision checker against every fidelity example
```

You can also work on a single workspace:

```bash
pnpm --filter @allen-saji/diagram-kit dev   # tsup --watch on the library
pnpm --filter diagram-kit-playground dev    # studio only
```

## Adding an example

1. Drop a new `.tsx` file in `apps/playground/src/examples/`.
2. Import primitives from `@allen-saji/diagram-kit`. Compose with
   `Canvas` + `At` and give every placed primitive a unique `debugId`.
3. Register it in `apps/playground/src/Root.tsx` — once in the
   `fidelity` (or your own) folder, and once in the `debug` folder
   with `defaultProps={{ debug: true }}` so the debug variant works.
4. Iterate with the debug overlay:

   ```bash
   bash scripts/iterate.sh <YourExample> --debug
   ```

5. Run the collision checker before committing:

   ```bash
   node scripts/check.mjs <YourExample>
   ```

   The checker exits non-zero on any overlap. CI runs the same script
   against every fidelity example on every PR.

6. Final renders:

   ```bash
   bash scripts/render-png.sh <YourExample> hd
   bash scripts/render-mp4.sh <YourAnimatedExample> tweet-16x9
   ```

## PR guidelines

- Keep PRs focused — one example, one fix, or one primitive at a time.
- Run `pnpm lint` and `pnpm test:check` locally first.
- If you add a new kit primitive, add a fidelity probe under
  `apps/playground/src/examples/fidelity/` that exercises it.
- New primitives need a `debugId` prop and should emit BBOX events
  (look at `Card.tsx` / `Panel.tsx` for the pattern).
- Avoid CSS animations — use the `Appear` / `ScaleIn` / `DrawArrow`
  helpers from the library, which are driven by `useCurrentFrame()`.
- Conventional Commits in messages (`feat:`, `fix:`, `docs:`, etc.).

## The `private/` folder

`private/` is gitignored. It exists so the maintainer can keep
project-specific compositions (with personal branding, audio, etc.)
in the same checkout without polluting the OSS repo. Contributors
don't need it.
