# PR Draft — feat(consultoria): add wizneo.org/consultoria sales page

**Branch**: `feat/wizneo-consultoria-page` → `main`
**Commits**: 2 (`b30f977`, `b65a382`)
**Status**: ready for review · NO push hasta tu approval

## Title
`feat(consultoria): add wizneo.org/consultoria sales page`

## Body

### Summary
- Add `/consultoria` lazy-loaded route con página de venta Matrix-styled de 8 secciones para Consultoría Express IA WIZNEO ($500 USD, 120 min 1-a-1 con Ulises).
- CTA primario apunta a `cal.com/gnosixio/consultoria-express` con UTMs `utm_source=wizneo_landing&utm_medium=web&utm_campaign=consultoria_express`.
- Copy extraído literal de `wizneo-os/06_SALES_ENGINE/consulting-express-500.md` (pitch canónico, anti-pitch, agenda 120min, policy refund/reagendar/grabación).
- `vercel.json` nuevo con catch-all rewrite SPA — sin esto `/consultoria` retorna 404 en hard refresh Vercel (no había `vercel.json` antes).
- Brand isolation: cero "Gnosix" capitalizado en copy/DOM bundleado, palette WIZNEO Matrix (`#00FF41`, font-matrix Source Code Pro, bg-black).

### Sections (per consulting-express-500.md)
1. Hero — pitch canónico + CTA primario
2. Quién soy — Ulises bio + foto + 4 redes
3. Qué resolvemos — 6 bloqueos del ICP (devs/founders/operadores con presupuesto $500)
4. Cómo funciona — tabla agenda 120 min (4 bloques: check-in, diagnóstico, plan, Q&A close)
5. Qué incluye — 6 deliverables (diagnóstico + plan priorizado + recomendación stack + frameworks Ulises + 3 next actions + email post-sesión)
6. Pricing & policy — $500, no refund, reagendar >24hr, grabación queda con vos
7. Qué NO es — 6 anti-pitches (no implementación, no soporte indef, no descuentos, no curso)
8. CTA repetido + footer con 4 redes + © 2026 WIZNEO + links wizneo.org/reto.wizneo.org

### Test plan
- [x] `npm run build` verde — Consultoria chunk 12.83 kB gzipped 3.65 kB
- [x] `npx eslint src/pages/Consultoria.tsx` — 0 errors / 0 warnings
- [x] `grep -c "Gnosix" dist/assets/Consultoria-*.js` → 0 (solo dominio `gnosixio` minúscula en Cal URL, OK)
- [x] Cal URL bundleado con UTMs completos: `cal.com/gnosixio/consultoria-express?utm_source=wizneo_landing&utm_medium=web&utm_campaign=consultoria_express`
- [x] gitleaks pre-commit pass (2 commits firmados, no leaks)
- [x] `vercel.json` JSON válido (jq)
- [ ] (post-merge) Vercel preview `/consultoria` hard refresh → 200, no 404
- [ ] (post-merge) Visual sanity check Matrix branding en deploy real
- [ ] (post-merge) Submit booking en Cal → confirmar Stripe charge $500 real

### Riesgos
- **`vercel.json` SPA rewrite** afecta TODO el sitio, no solo `/consultoria`. Pero es el comportamiento que el repo necesita (es SPA con react-router) — sin esto cualquier ruta directa rompe. Bajo riesgo.
- **Email del Cal pre-fill**: NO se implementó el form pre-Cal (T3 dejado para V2). Lead llega a Cal sin pre-fill — degradación graceful, no bloquea.
- **Visual deploy real puede revelar gaps**: testing local con `npm run build` no captura issues de runtime SPA. Post-merge ver preview Vercel antes de promover.

### Out of scope (V2 PR separado)
- `@vercel/analytics` integration (requiere `pnpm add` en Daytona sandbox)
- Form pre-Cal con Edge Function `/api/consulting-lead` + Supabase `lead_plans` insert + Resend welcome
- Cal.com webhook → Supabase `wizneo_consulting_sessions` (Fase F1 del CRM Definitivo)
- Testimonios (cuando haya 3+ sesiones reales)

### Source
- Plan locked: `/root/wizneo-linktree/.planning/wizneo-consultoria-url/PLAN.md`
- Context: `/root/wizneo-linktree/.planning/wizneo-consultoria-url/CONTEXT.md`
- Canon copy: `/root/wizneo-os/06_SALES_ENGINE/consulting-express-500.md`
- Master architecture: `/root/gnosix-crm/docs/CRM_DEFINITIVO_v1.md` §9 #6 (locked decision)

## Commands to merge (cuando Ulises de luz verde)

```bash
cd /root/wizneo-linktree/.worktrees/wizneo-consultoria-page
git push -u origin feat/wizneo-consultoria-page
gh pr create --base main --head feat/wizneo-consultoria-page \
  --title "feat(consultoria): add wizneo.org/consultoria sales page" \
  --body-file /root/wizneo-linktree/.planning/wizneo-consultoria-url/PR_DRAFT.md
# Después de Vercel preview + Ulises approval:
gh pr merge --squash --delete-branch
# Cleanup worktree:
cd /root/wizneo-linktree
git worktree remove .worktrees/wizneo-consultoria-page
```
