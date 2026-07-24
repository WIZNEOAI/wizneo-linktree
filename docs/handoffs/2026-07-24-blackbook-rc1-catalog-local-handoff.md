# BLACKBOOK RC.1 catalog local handoff

## State

The local `/blackbook` route on `feat/blackbook-catalog-local` is prepared for the verified RC.1 catalog. It remains unpublished and checkout remains fail-closed.

## Catalog facts

- AI ENGINEER — 68 pages, 17 pack files, USD 49.
- AGENTIC CODING — 71 pages, 34 pack files, USD 49.
- INFRAESTRUCTURA DE AGENTES — 72 pages, 22 pack files, USD 49.
- BLACKBOOK COMPLETE SYSTEM — all three digital books, 211 pages, 73 pack files, 90-day roadmap, USD 129.

## Checkout guard

The only checkout inputs are the four optional `VITE_GUMROAD_BLACKBOOK_*_URL` variables in `.env.example`. Empty or absent values must keep `gumroadUrl` undefined and render `Compra no disponible`; do not add fallback URLs.

## Asset guard

The copied individual covers are the RC.1 founder-approved source set from `assets/covers/` in `/root/.worktrees/blackbook-v2-pilot`; the bundle image is copied from `sales/gumroad/assets/prelaunch/blackbook-complete-system-hardcover-bundle.png`. Keep the assets byte-identical unless a later founder-approved source supersedes them.

The bundle image filename contains `hardcover`, but catalog copy and accessible text must continue to describe digital products only.

## Publishing boundary

Do not commit, push, deploy, change Vercel, create Gumroad products, configure production environment variables, or publish the local route without separate approval.

## Remaining release prerequisites

1. Obtain real Gumroad product URLs only after products are created and approved.
2. Add each URL through the appropriate deployment environment after approval.
3. Re-run regression, lint, build, and local browser QA before any release request.

## Verification — 2026-07-24

- `npm run test:run`: PASS — 4 files, 12 tests.
- `npm run lint`: PASS — 0 errors; 7 inherited `react-refresh/only-export-components` warnings outside this change.
- `npm run build`: PASS.
- `git diff --check`: PASS.
- `gitleaks dir . --redact`: PASS — no leaks found.
- Desktop DOM QA at 1280 px: four products, four disabled checkout states, zero checkout anchors, exact page metadata, all four images loaded, no horizontal overflow.
- Mobile visual QA at 375 × 812: intentional responsive layout, readable hierarchy and contrast, no critical/major clipping observed.
- All four catalog images are byte-identical to the founder-approved RC.1 source files listed above.

Evidence:

- `docs/handoffs/evidence/blackbook-desktop-1280x900.png`
- `docs/handoffs/evidence/blackbook-mobile-375x812.png`
