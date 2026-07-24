# BLACKBOOK catalog route — RC.1 local update

**Status:** Implemented locally; not published
**Branch:** `feat/blackbook-catalog-local`
**Scope:** `/blackbook` catalog only; no Gumroad, Vercel, or external-service action.

## Verified RC.1 catalog

| Product | Pages | Pack files | Price | Additional inclusion |
| --- | ---: | ---: | ---: | --- |
| BLACKBOOK 01 · AI ENGINEER | 68 | 17 | USD 49 | PDF + Markdown |
| BLACKBOOK 02 · AGENTIC CODING | 71 | 34 | USD 49 | PDF + Markdown |
| BLACKBOOK 03 · INFRAESTRUCTURA DE AGENTES | 72 | 22 | USD 49 | PDF + Markdown |
| BLACKBOOK COMPLETE SYSTEM | 211 | 73 | USD 129 | All three digital books + 90-day roadmap |

All products are digital. No copy or alt text presents a physical product.

## Local implementation

- `src/data/blackbookCatalog.ts` is the typed catalog source of truth for four products.
- Checkout URLs are optional build-time inputs. Without a URL, each CTA renders the accessible, non-link state `Compra no disponible`.
- `.env.example` declares the four optional Gumroad variables, including `VITE_GUMROAD_BLACKBOOK_COMPLETE_SYSTEM_URL`; every example value is intentionally blank.
- The homepage retains Consultoría 1:1 first and BLACKBOOK second.
- `public/llms.txt` and `public/llms-full.txt` mirror the catalog facts. `public/sitemap.xml` already contains `/blackbook`, so its route list does not require a change.

## Asset provenance

The expected `content/ebook*/assets/cover.png` paths are not present in the RC.1 source worktree. The exact approved individual sources are therefore the RC.1 canonical files documented in `review/BLACKBOOK-COVER-FOUNDER-APPROVAL-2026-07-24.md`:

- `assets/covers/blackbook-01-ai-engineer.png` — SHA-256 `9f99fe1f8d7a0c3c1c67279cfe4099f58359f44c9c664ba87194ea05651c1b07`
- `assets/covers/blackbook-02-agentic-coding.png` — SHA-256 `af753ed6398f9c9adf74d449936accbde358ab5db88f64d2b580fa8ff1d89d11`
- `assets/covers/blackbook-03-infraestructura-agentes.png` — SHA-256 `e0b368de389ec4a76a797057c617f5a0215e545f023f26dc8467d55c1b4c8988`
- Bundle visual: `sales/gumroad/assets/prelaunch/blackbook-complete-system-hardcover-bundle.png` — SHA-256 `67ecc82a2316a280ff81125eb9eea0d8f375a1f159609becbf5d326f135133d3`

They are copied into `public/blackbook/` without transformation.

## Regression coverage

- Catalog test locks four products, RC.1 page and pack counts, USD 49/USD 129 prices, bundle roadmap, asset path, and undefined checkout URLs without environment input.
- Route test locks four headings, four disabled checkout states with no environment URLs, product facts, prices, and metadata.
- Homepage test locks Consultoría 1:1 first and BLACKBOOK second.

## Verification

Run from this worktree:

```bash
npm run test:run
npm run lint
npm run build
git diff --check
```

Do not commit, push, deploy, mutate Vercel, create Gumroad products, or configure checkout URLs as part of this local-preparation lane.
