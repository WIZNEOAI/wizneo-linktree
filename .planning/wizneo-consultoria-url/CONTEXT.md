# Contexto — wizneo-consultoria-url: Sales page wizneo.org/consultoria

## Issue
Sin número Linear asignado aún (solicitud directa 2026-05-15) · size M · type feat · prioridad Urgent (locked decision sección 9 #6 de CRM_DEFINITIVO_v1.md)

## Descripción
Hoy no existe ninguna URL pública para la oferta core WIZNEO "Consultoría Express IA — $500 USD / 120 min 1-a-1 con Ulises". El único acceso es Cal.com directo, lo cual bloquea el envío de campaigns con CTA pulido, ya que el link crudo a Cal no tiene contexto de oferta, proof ni anti-pitch. Este PR crea wizneo.org/consultoria como sales page pública que cubre la brecha entre awareness y booking.

## Stack / área del código
- Repo: `/root/wizneo-linktree` (Vite + React + react-router-dom + shadcn/ui + Tailwind + Vercel)
- Módulos afectados:
  - `src/App.tsx` — agregar Route `/consultoria`
  - `src/pages/Consultoria.tsx` — página nueva (componente principal)
  - `src/components/ConsultoriaLeadForm.tsx` — form pre-Cal opcional (email + nombre → lead_plans + redirect Cal)
  - `vercel.json` — agregar rewrite SPA para /consultoria (si no está cubierto por wildcard)
  - `index.html` — no modificar (meta OG se maneja por ruta en Consultoria.tsx via document.title)
- Patrones del proyecto:
  - Todas las páginas son componentes React lazy-loaded desde `src/pages/`
  - Brand tokens: `matrix-green` (#00FF41), `font-matrix` (Source Code Pro), `bg-black`, border `matrix-green/30`
  - No hay router-level meta tags — document.title se setea con useEffect
  - Analytics: `useAnalytics` hook (trackEvent + trackPageView) — hook ya presente
  - No hay server-side: todo es SPA estático, la parte de backend del form va a `reto-wizneo` API o a una Vercel Edge Function nueva en este repo (ver T3)
- Dependencias que se tocan:
  - `@vercel/analytics` — agregar (no está en package.json de wizneo-linktree, sí en reto-wizneo)
  - `@supabase/supabase-js` — agregar (para el form lead capture T3; ya existe en reto-wizneo)
  - Las demás deps están (lucide-react, shadcn button, react-router-dom, tailwind)

## Decisiones previas relevantes (de Engram / docs)
- `consulting-express-500.md` L251: "Página dedicada wizneo.org/consultoria con detalle expandido + testimonios (pendiente cuando haya 3+ testimonios)" — la versión sin testimonios es válida ahora mismo (se lanza sin ellos, se agregan post 3 primeras sesiones).
- `CRM_DEFINITIVO_v1.md` sección 3.3: tabla `wizneo_consulting_sessions` a crear — el webhook Cal→Supabase NO es scope de este PR, se deja para Fase F1 del CRM. El PR solo shippe la sales page.
- `offers.md` tabla final: utm_campaign canónico = `consultoria_express`.
- `wizneo.impeccable.md`: font-matrix actual en tailwind es Source Code Pro (no JetBrains Mono como en brand doc) — usar lo que ya está deployado para no crear split en el design system. JetBrains Mono se puede importar en refactor futuro del CSS global.
- Brand rule: Vercel Analytics OK, PostHog NO (regla WIZNEO Brand & Frontend §3).

## Restricciones
- No modificar componentes compartidos existentes (MatrixRain, FloatingParticles, LinkCard, NewsletterCapture) — solo agregar nuevos.
- No tocar rutas ni componentes existentes (/, /404).
- No instalar deps sin pasar por Daytona sandbox review. Las 2 deps nuevas (@vercel/analytics, @supabase/supabase-js) son bien conocidas y sin riesgo de supply-chain, pero el executor debe confirmar con Ulises antes de `npm install` en host — o hacerlo en Daytona.
- `wizneo_consulting_sessions` tabla: solo dryrun SQL en specs, no aplicar en este PR.
- No hay CODEOWNERS en este repo, pero App.tsx y vercel.json son archivos críticos — agregar nota en PR.
- Cal.com embed iframe: NO usar. Booking-link directo con UTMs.
- Gnosix NO debe aparecer en ningún copy de esta página.

## Preguntas abiertas / Resueltas

**RESUELTAS (2026-05-15 post-planner)**:
- ✓ **Foto de Ulises**: usar `/public/uploads/wizneo-profile.png` (existe, confirmado).
- ✓ **vercel.json SPA rewrite**: el archivo `vercel.json` **NO EXISTE** en el repo. T2 lo crea desde cero (no es "verificar y modificar", es "crear"). Contenido mínimo:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
  Sin esto, `/consultoria` con hard refresh devuelve 404. T2 ahora es BLOQUEANTE para shippeo (no opcional).
- ✓ **Deps confirmadas faltantes**: `@vercel/analytics` y `@supabase/supabase-js` NO están en package.json — instalar en Daytona sandbox y commit lockfile.

**ABIERTAS (non-bloqueantes)**:
- Testimonios de sesiones anteriores: NO DISPONIBLES aún → omitir sección V1, agregar post 3 sesiones.
- Número de issue Linear: SIN ASIGNAR — Ulises decide si trackear como GNO-XXX.
