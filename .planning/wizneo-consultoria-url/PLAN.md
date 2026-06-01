# Plan — wizneo-consultoria-url

## Status
ready

## Objetivo
Publicar `wizneo.org/consultoria` como sales page pública de la oferta "Consultoría Express IA — $500 USD / 120 min", con CTA primario a Cal.com y form de lead capture pre-Cal opcional, para poder enviar campaigns con URL limpia en lugar de link crudo de Cal.

## Estrategia
1. Agregar ruta `/consultoria` al BrowserRouter de `wizneo-linktree` (ya deployado en wizneo.org) — mínimo cambio de routing.
2. Construir componente `Consultoria.tsx` con 8 secciones usando los brand tokens ya presentes (matrix-green, font-matrix, bg-black). Todo copy viene de `consulting-express-500.md` y `offers.md` — sin inventar copy.
3. Agregar form pre-Cal (email + nombre) que escribe a Supabase `lead_plans` (brand=wizneo, wants_consulting=true) y redirige a Cal con query param `email=` pre-rellenado. Esto requiere una Vercel Edge Function `/api/consulting-lead.ts` en este repo.
4. Agregar `@vercel/analytics` + `<Analytics />` para tracking de pageviews sin PostHog.
5. Validar vercel.json para confirmar que el rewrite SPA ya existe — si no, agregarlo.
6. Branch `feat/wizneo-consultoria-page` → PR → review → merge → Vercel auto-deploy.

## Tasks

### T1 — Routing + página shell (MVP sin form, con CTA directo)
- **Archivos**:
  - `src/pages/Consultoria.tsx` (nuevo)
  - `src/App.tsx` (modificar: agregar `<Route path="/consultoria" element={<Consultoria />} />`)
- **Cambio**:
  Crear `Consultoria.tsx` con las 8 secciones de la estructura propuesta. CTA primario = `<a href="https://cal.com/gnosixio/consultoria-express?utm_source=wizneo_landing&utm_medium=web&utm_campaign=consultoria_express" target="_blank" rel="noopener noreferrer">`. Todos los textos extraídos literalmente de `consulting-express-500.md` y `offers.md`. Background: `bg-black`, acento: `text-matrix-green`. Layout: columna centrada max-w-2xl. Secciones:
  1. Hero — pitch canónico + CTA primario
  2. Quien soy — 2-3 líneas + foto opcional (wizneo-profile.png) + links redes
  3. Qué resolvemos — lista de 5-6 bloqueos del ICP (extraídos del doc)
  4. Cómo funciona — tabla agenda 120min (0-5, 5-35, 35-95, 95-120)
  5. Qué incluye — 5 bullets de deliverables
  6. Pricing & policy — $500, refund no, reagendar sí (>24hr), recording sí
  7. Anti-pitch — qué NO ES (5 bullets del doc, sección "Qué NO incluye")
  8. CTA repetido + footer minimal (© WIZNEO, links: wizneo.org, reto.wizneo.org)
  En App.tsx: importar lazy `Consultoria` + agregar Route. `useEffect(() => { document.title = "Consultoría Express IA — $500 USD | WIZNEO" }, [])` en Consultoria.tsx.
- **Test**: navegar a `localhost:8080/consultoria` — renderiza sin crash, CTA link apunta a cal.com con UTMs, no aparece la palabra "Gnosix" en ninguna parte del DOM.
- **Sandbox needed**: no (no instala deps nuevas en T1)
- **Estimación**: 90-150 min

### T2 — Vercel Analytics en la ruta /consultoria
- **Archivos**:
  - `package.json` (agregar `@vercel/analytics`)
  - `src/main.tsx` o `src/pages/Consultoria.tsx` (agregar `<Analytics />`)
  - `vercel.json` — verificar rewrite SPA; si no existe `{"source": "/(.*)", "destination": "/index.html"}`, agregarlo
- **Cambio**:
  `npm install @vercel/analytics` en sandbox/Daytona. Importar `{ Analytics }` de `@vercel/analytics/react` y renderizarlo una vez en `main.tsx` (afecta todo el sitio, no solo /consultoria — es correcto). Verificar `vercel.json`: si ya tiene catch-all rewrite para SPA, no tocar nada. Si no, agregar el rewrite mínimo para que `/consultoria` devuelva `index.html` en Vercel.
- **Test**: `npm run build` sin errores de TypeScript. En Vercel preview: ir a `/consultoria` con URL directa (hard refresh) — debe devolver 200, no 404.
- **Sandbox needed**: yes — para el `npm install @vercel/analytics`. Ejecutar en Daytona sandbox, luego copiar lockfile actualizado.
- **Estimación**: 30-60 min

### T3 — Form pre-Cal + Edge Function /api/consulting-lead (opcional, no bloquea launch)
- **Archivos**:
  - `src/components/ConsultoriaLeadForm.tsx` (nuevo)
  - `api/consulting-lead.ts` (nuevo — Vercel Edge Function)
  - `package.json` (agregar `@supabase/supabase-js` si no está)
  - `.env.example` (documentar `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — valores reales van a Vercel env vars, nunca en .env commiteado)
  - `vercel.json` (agregar entrada `api/consulting-lead.ts` si el auto-detect de Vercel no la toma)
- **Cambio**:
  El form captura email + nombre (opcional). Al submit:
  1. POST a `/api/consulting-lead` con `{ email, first_name }`.
  2. Edge Function inserta en `lead_plans` (Supabase project `dkzviwsdvyxhzblhwrka`): `{ email, first_name, brand: 'wizneo', source: 'consultoria_landing', wants_consulting: true, status: 'lead' }`. Usar service role key server-side (nunca en cliente).
  3. On success: redirect client-side a `https://cal.com/gnosixio/consultoria-express?email=${encodeURIComponent(email)}&name=${encodeURIComponent(first_name)}&utm_source=wizneo_landing&utm_medium=web&utm_campaign=consultoria_express`.
  4. On error: mostrar mensaje de error, CTA fallback directo a Cal sin pre-fill.
  El form se coloca en Sección 7 (CTA repetido). Tiene honeypot field (como en NewsletterCapture). Tiene validación de email regex client-side.

  Dryrun SQL (NO aplicar — para referencia Fase F1 CRM):
  ```sql
  -- Schema delta: columna wants_consulting en lead_plans
  -- (verificar primero si ya existe antes de aplicar)
  ALTER TABLE public.lead_plans
    ADD COLUMN IF NOT EXISTS wants_consulting boolean NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS source text;
  -- RLS: lead_plans ya tiene RLS habilitado, insert via service role no requiere cambio.
  -- Index:
  CREATE INDEX IF NOT EXISTS idx_lead_plans_wants_consulting
    ON public.lead_plans (wants_consulting)
    WHERE wants_consulting = true;
  ```

  IMPORTANTE: El campo `source` en `lead_plans` puede no existir — verificar schema actual con `\d lead_plans` o Supabase MCP `list_tables` antes de ejecutar la migración. Si ya existe schema diferente, ajustar el INSERT para usar solo columnas existentes (mínimo: email, brand, wants_consulting).

- **Test**:
  - Submit con email válido → respuesta 200, row insertado en `lead_plans` con `wants_consulting=true` y `brand='wizneo'` → redirect a Cal con `?email=` pre-rellenado.
  - Submit con email inválido (client-side) → no hace fetch, muestra error inline.
  - Submit con email válido pero Supabase down → respuesta 500, UI muestra error + CTA fallback.
  - Verificar: `SUPABASE_SERVICE_ROLE_KEY` no aparece en bundle del cliente (`npm run build && grep -r "service_role" dist/`).
- **Sandbox needed**: yes — `npm install @supabase/supabase-js`
- **Estimación**: 90-120 min

### T4 — PR + review
- **Archivos**: `.github/pull_request_template.md` si existe, sino PR description manual.
- **Cambio**: Abrir PR `feat/wizneo-consultoria-page` → `main`. Title: `feat(consultoria): add wizneo.org/consultoria sales page`. Body incluye: qué hace, cómo probar (local + Vercel preview), risks (vercel.json rewrite, deps nuevas).
- **Test**: CI verde (lint + build). Vercel preview genera URL de preview con `/consultoria` accesible. Reviewer score 4+ (o Ulises aprueba directamente por ser WIZNEO non-prelaunch).
- **Sandbox needed**: no
- **Estimación**: 15-30 min

## Criterios de done
- [ ] `wizneo.org/consultoria` (o Vercel preview URL) renderiza la página completa con brand WIZNEO correcto
- [ ] CTA primario linkea a `cal.com/gnosixio/consultoria-express` con UTMs `utm_source=wizneo_landing&utm_medium=web&utm_campaign=consultoria_express`
- [ ] La palabra "Gnosix" NO aparece en ninguna parte del DOM ni del copy
- [ ] `npm run build` sin errores TypeScript ni ESLint
- [ ] URL directa `/consultoria` en Vercel preview devuelve 200 (no 404 — SPA rewrite OK)
- [ ] (T3) Submit del form inserta row en `lead_plans` con `wants_consulting=true, brand='wizneo'`
- [ ] (T3) `grep -r "service_role" dist/` devuelve vacío

## Riesgos
- **vercel.json SPA rewrite faltante**: Si `wizneo.org` no tiene catch-all rewrite configurado, `/consultoria` con hard refresh devuelve 404 en Vercel. Mitigación: executor verifica `vercel.json` primero; si falta, agregar en T2 antes de abrir PR.
- **Schema lead_plans**: columnas `wants_consulting` y `source` pueden no existir. Mitigación: executor verifica con Supabase MCP `list_tables` antes de ejecutar INSERT; si faltan, corre la migración dryrun SQL de T3 con `apply_migration` MCP (NO con `execute_sql` directo).
- **deps nuevas (@vercel/analytics, @supabase/supabase-js)**: supply-chain risk bajo (ambas son first-party de sus respectivos servicios). Igual: instalar en Daytona sandbox primero, revisar lockfile diff antes de commitear.
- **SUPABASE_SERVICE_ROLE_KEY en Vercel env**: si ya está seteada para otro uso en este proyecto — verificar antes. Si no está, agregarla vía Vercel MCP o Vercel dashboard (nunca en .env commiteado).
- **Cal.com pre-fill de email**: el query param `?email=` en Cal.com funciona para pre-llenar el campo email del formulario de booking. Verificar en staging que funcione con el event 4944098. Si Cal no lo soporta en ese event type, el redirect va a Cal sin pre-fill (degradación graceful).
- **Source Code Pro vs JetBrains Mono**: el brand doc dice JetBrains Mono pero el repo actual usa Source Code Pro. No cambiar en este PR — la discrepancia es pre-existente y un cambio de tipografía global está fuera de scope.

## Out of scope
- Webhook Cal.com → Supabase `wizneo_consulting_sessions` (Fase F1 del CRM — otro PR, otro repo)
- Testimonios (ninguno disponible aún — se agrega post 3 sesiones)
- Cal.com iframe embed (no aporta vs. link directo; requiere dep extra)
- Cambio de tipografía global (Source Code Pro → JetBrains Mono)
- Modificar la página raíz `/` (linktree)
- Crear issue Linear (no hay número asignado — Ulises lo crea si quiere trackear)
- Stripe integration directa (el pago va vía Cal.com built-in — no requiere nada nuevo)
- PostHog, GA4 setup completo (solo Vercel Analytics light)

## Delta spec
not needed — no cambia contrato público de APIs existentes. El dryrun SQL de T3 es interno y va en PLAN.md como referencia.
