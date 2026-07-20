# BLACKBOOK catalog route implementation plan

> **For Hermes:** Use the coding-agent lane to implement this plan task by task.

**Goal:** Add a local, production-ready `/blackbook` catalog route to the WIZNEO link hub without publishing or inventing Gumroad URLs.

**Architecture:** Keep the current Vite/React Router/Tailwind stack. Store product metadata in a typed local module. Build one static editorial route with real WIZNEO BLACKBOOK assets. Gumroad CTAs read build-time environment variables and render an accessible unavailable state when the URLs are absent.

**Tech stack:** React 18, TypeScript, React Router 6, Tailwind 3, Vitest, Testing Library.

---

## Constraints

- Preserve current homepage behavior and 1:1 priority.
- Add BLACKBOOK as the second home card, linking to `/blackbook` with a real anchor.
- No new dependencies.
- No push, deploy, Vercel env mutation, Gumroad action or newsletter send.
- Do not touch the pre-existing `.gitignore` change in the main worktree.
- Use the canonical WIZNEO black/green visual lane.
- Do not present hardcover mockups as available products.
- Each digital edition costs USD 49 and is sold separately.
- When a Gumroad URL is absent, show a disabled checkout state instead of a fake link.

## Task 1: Add catalog assets and typed data

**Files:**

- Create: `public/blackbook/blackbook-01-ai-engineer.png`
- Create: `public/blackbook/blackbook-02-agentic-coding.png`
- Create: `public/blackbook/blackbook-03-infraestructura-agentes.png`
- Create: `src/data/blackbookCatalog.ts`

**Steps:**

1. Copy the three verified 1280 × 720 commerce covers from `/root/wizneo-blackbook/sales/gumroad/assets/*/01-cover-1280x720.png`.
2. Define the three products with title, short fit statement, page count, pack count, price, image path and optional Gumroad URL from `import.meta.env`.
3. Keep all external URLs `undefined` when the corresponding environment variable is absent.
4. Add a unit test for counts, price and absent-URL behavior.

## Task 2: Build `/blackbook`

**Files:**

- Create: `src/pages/Blackbook.tsx`
- Modify: `src/App.tsx`
- Test: `src/test/Blackbook.test.tsx`

**Steps:**

1. Add a lazy-loaded route before the catch-all.
2. Build an asymmetric editorial page with one product row per book; alternate image/text placement on desktop and collapse to one column on mobile.
3. Use real headings, visible USD 49 price, PDF/Markdown/pack facts and a short choose-your-book guide.
4. Render a normal `<a>` when a Gumroad URL exists. Render a labelled disabled element when it does not.
5. Add a back link to `/`.
6. Set the document title and description while mounted and restore them on unmount.
7. Test headings, three products, three prices and disabled checkout state.

## Task 3: Add the home-card entry

**Files:**

- Modify: `src/pages/Index.tsx`
- Test: update or add a focused homepage test.

**Steps:**

1. Add BLACKBOOK immediately after the current 1:1 card.
2. Link to `/blackbook` with a real anchor.
3. Use concrete copy: `Tres guías para entender, construir y operar agentes.`
4. Do not change the current Consultoría, Reto or newsletter destinations.

## Task 4: Update public discovery files

**Files:**

- Modify: `public/sitemap.xml`
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`

**Steps:**

1. Add the `/blackbook` route and concise factual product description.
2. Keep Gumroad URLs out until the products exist.
3. Preserve existing WIZNEO funnel references.

## Task 5: Verify and commit locally

**Commands:**

```bash
npm run test:run
npm run lint
npm run build
git diff --check
gitleaks dir . --no-banner --redact
```

**Browser QA:**

- Run local preview.
- Verify `/blackbook` at desktop and 375px mobile.
- Confirm no horizontal overflow.
- Confirm all three covers preserve aspect ratio.
- Confirm checkout states are disabled without env URLs.
- Confirm home BLACKBOOK card routes to `/blackbook`.

**Commit:**

```bash
git add public/blackbook src/data/blackbookCatalog.ts src/pages/Blackbook.tsx src/App.tsx src/pages/Index.tsx src/test public/sitemap.xml public/llms.txt public/llms-full.txt docs/plans/2026-07-19-blackbook-catalog-route.md
git commit -m "feat: add local BLACKBOOK catalog route"
```
