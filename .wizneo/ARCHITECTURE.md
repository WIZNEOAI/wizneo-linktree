# Architecture

## Current Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui plus Radix UI
- Vitest for tests
- ESLint for linting

## Runtime Model

- Local development via `npm run dev`
- Production build via `npm run build`
- Static frontend output under `dist/`

## Key Modules

- `src/pages/Index.tsx`: main landing and link presentation
- `src/components/*`: Matrix visuals, cards, and UI primitives
- `src/hooks/useAnalytics.ts`: local analytics helper logic
- `src/index.css`: global theme and animation styling

## Open Risks

- Dual lockfiles make dependency ownership ambiguous.
- Dependency graph currently reports 16 vulnerabilities after install.
- Production build warns that `baseline-browser-mapping` data is stale.
- No repo-local operating note currently explains whether `npm` or `bun` is canonical.
