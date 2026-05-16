import React, { useEffect } from 'react';
import MatrixRain from '@/components/MatrixRain';
import FloatingParticles from '@/components/FloatingParticles';
import { SocialIcon } from 'react-social-icons';
import { useAnalytics } from '@/hooks/useAnalytics';

const CAL_URL =
  'https://cal.com/gnosixio/consultoria-express?utm_source=wizneo_landing&utm_medium=web&utm_campaign=consultoria_express';

const Consultoria = () => {
  const { trackPageView, trackEvent } = useAnalytics();

  useEffect(() => {
    document.title = 'Consultoría Express IA — $500 USD | WIZNEO';
    trackPageView('Consultoria');
  }, [trackPageView]);

  const handleCtaClick = (placement: string) => {
    trackEvent('cta_consultoria_click', { placement });
  };

  const resolvemos = [
    'Stack IA que no termina de cerrar — agentes, RAG, automatizaciones que no convierten.',
    'Decisión entre Claude, Cursor, n8n, Supabase y treinta tools más sin saber cuál mover primero.',
    'Pipeline manual que te come 10+ horas semanales y no sabés por dónde empezar a automatizar.',
    'Agente custom (Pi, LangChain, AI SDK) que probaste pero no escala más allá del demo.',
    'Stack listo pero sin plan de implementación a 90 días con orden de impacto/esfuerzo.',
    'Producto SaaS con IA donde no sabés si tu arquitectura aguanta la próxima fase.',
  ];

  const agenda = [
    { min: '0–5', bloque: 'Check-in', que: 'Confirma tu intake, ajusta foco si cambió' },
    { min: '5–35', bloque: 'Diagnóstico (30 min)', que: 'Revisa stack actual, herramientas, flujo, lo que está trabado' },
    { min: '35–95', bloque: 'Plan (60 min)', que: 'Co-diseña roadmap. Excalidraw share screen. Prioriza por impacto/esfuerzo' },
    { min: '95–120', bloque: 'Q&A + close (25 min)', que: 'Q&A libre, 3 next actions a 7 días, confirma deliverable post-sesión' },
  ];

  const incluye = [
    'Diagnóstico directo de tu stack actual — herramientas, dónde está trabado, qué no estás aprovechando, qué riesgos hay.',
    'Plan de implementación priorizado — qué construir primero, segundo, tercero. Orden de impacto/esfuerzo.',
    'Recomendación de agentes / automatización / herramientas — stack concreto con razón de elección.',
    'Acceso a frameworks Ulises — harness, MCPs, skills, subagent patterns. Qué replicar, qué adaptar.',
    '3 next actions concretas para los próximos 7 días — no más, no menos.',
    'Email post-sesión dentro de 48hr — resumen ejecutivo, roadmap escrito, links a recursos específicos de tu stack.',
  ];

  const noIncluye = [
    'Implementación. Diagnostico y planeo. No ejecuto código durante la sesión más allá de demos breves.',
    'Soporte continuo post-sesión. La sesión cierra con deliverable + email. No hay follow-up indefinido.',
    'Reembolso. Política Cal.com + Stripe es sin reembolsos.',
    'Reagendar last-minute. Menos de 24hr de aviso = no-show + autocharge.',
    'Descuentos ni paquetes. 1 sesión = $500.',
    'Onboarding a un curso o comunidad. Esta es una sesión 1-a-1, no una membresía.',
  ];

  return (
    <div
      className="min-h-screen bg-black text-white font-matrix relative overflow-hidden"
      role="main"
    >
      <MatrixRain />
      <FloatingParticles />

      <div className="relative z-20 min-h-screen px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <article className="w-full max-w-2xl mx-auto space-y-14 sm:space-y-16">
          {/* 1 — Hero */}
          <header className="text-center space-y-6">
            <p className="text-xs sm:text-sm font-matrix tracking-[0.3em] uppercase text-matrix-green/70">
              WIZNEO · Ulises Arellano
            </p>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-matrix-green
                         matrix-text-glow font-matrix tracking-tight leading-[1.1]"
            >
              Consultoría Express IA
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-prose mx-auto leading-relaxed">
              2 horas 1-a-1 conmigo donde juntos montamos tu infraestructura IA para no quedarte
              atrás, ser el mejor en tu nicho, y poder automatizar lo que hoy te quita tiempo.
              Salís con plan ejecutable y 3 acciones concretas para los próximos 7 días.
            </p>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-matrix-green to-transparent" />
            <div className="pt-2">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCtaClick('hero')}
                className="inline-block px-8 py-4 bg-matrix-green text-black font-matrix
                           font-bold tracking-wide uppercase text-sm sm:text-base
                           border border-matrix-green hover:bg-black hover:text-matrix-green
                           hover:matrix-glow transition-all duration-300
                           transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Agendar 120 min — $500 USD
              </a>
              <p className="text-xs text-gray-500 mt-3 font-matrix">
                Pago vía Stripe al agendar · 2 horas video call · español
              </p>
            </div>
          </header>

          {/* 2 — Quien soy */}
          <section className="space-y-5" aria-labelledby="quien-soy">
            <h2
              id="quien-soy"
              className="text-xl sm:text-2xl font-bold text-matrix-green font-matrix
                         border-l-2 border-matrix-green/50 pl-4"
            >
              Quién soy
            </h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div
                className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden
                           matrix-border-glow"
              >
                <img
                  src="/uploads/wizneo-profile.png"
                  alt="Ulises Arellano"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-1 space-y-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                <p>
                  Soy Ulises Arellano. Construyo arquitecturas IA, agentes autónomos y sistemas
                  operativos para trabajo a velocidad-máquina. AI engineer LATAM, CDMX.
                </p>
                <p>
                  Mi día a día es harness con Claude Code, Codex, Cursor, n8n, Supabase, Convex,
                  ElevenLabs, Firecrawl. Lo que probás en demo, yo lo corro en producción.
                </p>
              </div>
            </div>
          </section>

          {/* 3 — Qué resolvemos */}
          <section className="space-y-5" aria-labelledby="que-resolvemos">
            <h2
              id="que-resolvemos"
              className="text-xl sm:text-2xl font-bold text-matrix-green font-matrix
                         border-l-2 border-matrix-green/50 pl-4"
            >
              Qué resolvemos
            </h2>
            <ul className="space-y-3 text-sm sm:text-base text-gray-300 leading-relaxed">
              {resolvemos.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-matrix-green shrink-0 font-bold" aria-hidden>
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4 — Cómo funciona */}
          <section className="space-y-5" aria-labelledby="como-funciona">
            <h2
              id="como-funciona"
              className="text-xl sm:text-2xl font-bold text-matrix-green font-matrix
                         border-l-2 border-matrix-green/50 pl-4"
            >
              Cómo funciona la sesión
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Agenda de 120 minutos en 4 bloques. Vos llegás con tu stack y problema concreto.
            </p>
            <div className="border border-matrix-green/30 divide-y divide-matrix-green/20">
              {agenda.map((row) => (
                <div
                  key={row.min}
                  className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_180px_1fr] gap-3 sm:gap-4 p-3 sm:p-4"
                >
                  <div className="text-matrix-green font-matrix font-bold text-xs sm:text-sm">
                    {row.min}
                  </div>
                  <div className="hidden sm:block text-white font-matrix font-bold text-xs sm:text-sm">
                    {row.bloque}
                  </div>
                  <div className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    <span className="sm:hidden block text-white font-bold mb-1">{row.bloque}</span>
                    {row.que}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5 — Qué incluye */}
          <section className="space-y-5" aria-labelledby="que-incluye">
            <h2
              id="que-incluye"
              className="text-xl sm:text-2xl font-bold text-matrix-green font-matrix
                         border-l-2 border-matrix-green/50 pl-4"
            >
              Qué incluye
            </h2>
            <ul className="space-y-3 text-sm sm:text-base text-gray-300 leading-relaxed">
              {incluye.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-matrix-green shrink-0 font-bold" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6 — Pricing & policy */}
          <section className="space-y-5" aria-labelledby="pricing">
            <h2
              id="pricing"
              className="text-xl sm:text-2xl font-bold text-matrix-green font-matrix
                         border-l-2 border-matrix-green/50 pl-4"
            >
              Precio y política
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm sm:text-base">
              <div className="flex justify-between border-b border-matrix-green/20 py-2">
                <dt className="text-gray-400">Precio</dt>
                <dd className="text-matrix-green font-bold">$500 USD</dd>
              </div>
              <div className="flex justify-between border-b border-matrix-green/20 py-2">
                <dt className="text-gray-400">Duración</dt>
                <dd className="text-white">120 minutos</dd>
              </div>
              <div className="flex justify-between border-b border-matrix-green/20 py-2">
                <dt className="text-gray-400">Modalidad</dt>
                <dd className="text-white">Video call 1-a-1</dd>
              </div>
              <div className="flex justify-between border-b border-matrix-green/20 py-2">
                <dt className="text-gray-400">Idioma</dt>
                <dd className="text-white">Español</dd>
              </div>
              <div className="flex justify-between border-b border-matrix-green/20 py-2">
                <dt className="text-gray-400">Cobro</dt>
                <dd className="text-white">Stripe al agendar</dd>
              </div>
              <div className="flex justify-between border-b border-matrix-green/20 py-2">
                <dt className="text-gray-400">Reembolso</dt>
                <dd className="text-white">No</dd>
              </div>
              <div className="flex justify-between border-b border-matrix-green/20 py-2">
                <dt className="text-gray-400">Reagendar</dt>
                <dd className="text-white">Sí, &gt;24hr antes</dd>
              </div>
              <div className="flex justify-between border-b border-matrix-green/20 py-2">
                <dt className="text-gray-400">Grabación</dt>
                <dd className="text-white">Sí, queda con vos</dd>
              </div>
            </dl>
          </section>

          {/* 7 — Anti-pitch */}
          <section className="space-y-5" aria-labelledby="no-incluye">
            <h2
              id="no-incluye"
              className="text-xl sm:text-2xl font-bold text-matrix-green font-matrix
                         border-l-2 border-matrix-green/50 pl-4"
            >
              Qué NO es esta sesión
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Para que llegues con expectativas claras y no pierdas tu plata.
            </p>
            <ul className="space-y-3 text-sm sm:text-base text-gray-400 leading-relaxed">
              {noIncluye.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-matrix-green/60 shrink-0 font-bold" aria-hidden>
                    ✗
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 8 — CTA repetido + footer */}
          <section className="text-center space-y-6 pt-4">
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-matrix-green to-transparent" />
            <h2 className="text-xl sm:text-2xl font-bold text-matrix-green font-matrix">
              ¿Montamos tu infraestructura IA en 2 horas?
            </h2>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCtaClick('footer')}
              className="inline-block px-8 py-4 bg-matrix-green text-black font-matrix
                         font-bold tracking-wide uppercase text-sm sm:text-base
                         border border-matrix-green hover:bg-black hover:text-matrix-green
                         hover:matrix-glow transition-all duration-300
                         transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Agendar — $500 USD
            </a>
            <p className="text-xs text-gray-500 font-matrix">
              Cancelás reagendando con +24hr de anticipación. Sin no-show fee si avisás a tiempo.
            </p>
          </section>

          {/* Footer */}
          <footer className="text-center pt-12 pb-6 space-y-6">
            <nav
              className="flex justify-center items-center space-x-6"
              aria-label="Redes sociales"
            >
              <SocialIcon
                url="https://www.instagram.com/wizneo.io/"
                style={{ height: 40, width: 40 }}
                bgColor="#00FF41"
                fgColor="#000000"
                className="rounded-full border border-matrix-green/30"
              />
              <SocialIcon
                url="https://x.com/Wizneoio"
                style={{ height: 40, width: 40 }}
                bgColor="#00FF41"
                fgColor="#000000"
                className="rounded-full border border-matrix-green/30"
              />
              <SocialIcon
                url="https://www.tiktok.com/@wizneo.io"
                style={{ height: 40, width: 40 }}
                bgColor="#00FF41"
                fgColor="#000000"
                className="rounded-full border border-matrix-green/30"
              />
              <SocialIcon
                url="https://github.com/WIZNEOAI"
                style={{ height: 40, width: 40 }}
                bgColor="#00FF41"
                fgColor="#000000"
                className="rounded-full border border-matrix-green/30"
              />
            </nav>
            <div className="text-xs text-gray-500 font-matrix tracking-wide space-y-1">
              <p>© 2026 WIZNEO · Ulises Arellano</p>
              <p>
                <a
                  href="https://wizneo.org"
                  className="hover:text-matrix-green transition-colors"
                >
                  wizneo.org
                </a>
                {' · '}
                <a
                  href="https://reto.wizneo.org"
                  className="hover:text-matrix-green transition-colors"
                >
                  reto.wizneo.org
                </a>
              </p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default Consultoria;
