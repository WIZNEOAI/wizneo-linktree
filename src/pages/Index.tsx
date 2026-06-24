
import React, { useEffect, useState } from 'react';
import MatrixRain from '@/components/MatrixRain';
import LinkCard from '@/components/LinkCard';
import FloatingParticles from '@/components/FloatingParticles';
import { SocialIcon } from 'react-social-icons';
import { useAnalytics } from '@/hooks/useAnalytics';

const founderDeadline = new Date('2026-08-01T05:59:59.000Z');

function getFounderCountdown(now = Date.now()) {
  const totalMs = Math.max(0, founderDeadline.getTime() - now);
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds - days * 60 * 60 * 24) / (60 * 60));
  const minutes = Math.floor((totalSeconds - days * 60 * 60 * 24 - hours * 60 * 60) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, totalMs, isOpen: totalMs > 0 };
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

const Index = () => {
  const { trackPageView } = useAnalytics();
  const [countdown, setCountdown] = useState(() => getFounderCountdown());

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getFounderCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    trackPageView('Homepage');
  }, [trackPageView]);

  const offerLink = {
    icon: "agent",
    title: "WIZNEO AI Builder Session — 2h con Ulises",
    description: 'Acceso directo a Ulises por 2 horas para ordenar tus herramientas, dudas, contexto, compu/cel y siguiente ruta. Founder $500 hasta el 31 de julio.',
    url: "https://cal.com/gnosixio/consultoria-express?utm_source=wizneo_linkhub&utm_medium=primary_cta&utm_campaign=wizneo_1a1_founder",
    featured: true
  };

  const links = [
    ...(countdown.isOpen ? [offerLink] : []),
    {
      icon: "brain",
      title: "Domina la inteligencia artificial en 30 días",
      description: "Recibe gratis un plan personalizado para entender IA, herramientas actuales y qué hacer día por día.",
      url: "https://reto.wizneo.org/?utm_source=linktree&utm_medium=organic&utm_campaign=lead_magnet",
      featured: false
    },
    {
      icon: "newsletter",
      title: "Boletín semanal WIZNEO",
      description: "Noticias, herramientas y oportunidades de IA explicadas sin humo y aterrizadas a la vida real.",
      url: "https://newsletter.wizneo.org/?utm_source=linktree&utm_medium=organic&utm_campaign=bio",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-matrix relative overflow-hidden" role="main">
      {/* Background Effects - Behind everything */}
      <MatrixRain />
      <FloatingParticles />
      
      {/* Main Content - Above background effects */}
      <div className="relative z-20 min-h-[100dvh] flex flex-col items-center justify-start sm:justify-center
                      px-4 sm:px-6 lg:px-8 pt-8 pb-6 sm:py-10">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto space-y-4 sm:space-y-5">

          {/* Profile Section */}
          <section className="text-center space-y-3 sm:space-y-4" aria-labelledby="profile-heading">
            {/* Profile Picture */}
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28
                           rounded-full overflow-hidden matrix-border-glow hover:matrix-glow
                           transition-all duration-300 transform hover:scale-105">
              <img
                src="/uploads/wizneo-profile.png"
                alt="WIZNEO — Educación práctica de IA para el nuevo mundo"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
            
            {/* Brand label (microcopy) */}
            <p className="text-xs sm:text-sm font-matrix tracking-[0.3em] uppercase text-matrix-green/70">
              WIZNEO · Ulises Arellano
            </p>

            {/* Tagline as primary heading */}
            <div className="space-y-2 sm:space-y-3">
              <h1
                id="profile-heading"
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold
                           text-matrix-green matrix-text-glow font-matrix tracking-tight
                           leading-[1.04] px-2 sm:px-4 lg:px-6
                           transform transition-all duration-300 hover:scale-[1.02]"
              >
                Prepárate para trabajar con inteligencia artificial.
              </h1>
              <div className="h-px w-14 sm:w-20 lg:w-24 mx-auto bg-gradient-to-r
                             from-transparent via-matrix-green to-transparent"></div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-matrix
                            leading-relaxed px-2 sm:px-4 lg:px-6 max-w-prose mx-auto">
                Aprende cómo uso IA en la vida real: herramientas, workflows, agentes y criterio para no quedarte viendo tutoriales eternos.
              </p>
            </div>
          </section>

          {/* Founder urgency */}
          <section className="rounded-2xl border border-matrix-green/30 bg-black/70 p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(0,255,136,0.12)]" aria-label="Ventana founder WIZNEO">
            <div className="flex items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-[10px] sm:text-xs font-matrix tracking-[0.24em] uppercase text-matrix-green/70">
                  founder $500 hasta 31 julio
                </p>
                <p className="mt-1 text-sm sm:text-base text-gray-200 font-matrix leading-relaxed">
                  {countdown.isOpen
                    ? 'Acceso directo a Ulises por 2 horas. Sin clase genérica de prompts.'
                    : 'La ventana founder cerró. Puedes entrar al reto gratis o a la newsletter.'}
                </p>
              </div>
              <div className="text-right font-matrix text-matrix-green" aria-live="polite">
                <div className="text-lg sm:text-2xl font-bold leading-none tabular-nums">
                  {`${pad(countdown.days)}d ${pad(countdown.hours)}h ${pad(countdown.minutes)}m ${pad(countdown.seconds)}s`}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  {countdown.isOpen ? 'para cierre' : 'cerrado'}
                </div>
              </div>
            </div>
            {countdown.isOpen && (
              <p className="mt-3 text-xs text-gray-500 font-matrix leading-relaxed">
                La IA no va a esperar a que te pongas al día. Si quieres que lo aterricemos juntos, agenda antes de que llegue a cero.
              </p>
            )}
          </section>

          {/* Links Section */}
          <section className="space-y-3 sm:space-y-4 w-full" aria-label="Enlaces principales">
            {links.map((link, index) => (
              <div
                key={index}
                className={`transform transition-all duration-300
                          ${link.featured ? 'hover:scale-[1.03] active:scale-[0.97]' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
              >
                <LinkCard {...link} />
              </div>
            ))}
          </section>

          {/* Social Media Icons */}
          <section className="text-center pt-5 sm:pt-6 pb-4 sm:pb-5" aria-label="Redes sociales">
            <nav className="flex justify-center items-center space-x-6 sm:space-x-8 mb-6 sm:mb-8" aria-label="Enlaces de redes sociales">
              <SocialIcon 
                url="https://www.instagram.com/wizneo.io/" 
                style={{ height: 48, width: 48 }}
                bgColor="#00FF88"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300 
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
              <SocialIcon
                url="https://x.com/Wizneoio"
                style={{ height: 48, width: 48 }}
                bgColor="#00FF88"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300 
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
              <SocialIcon 
                url="https://www.tiktok.com/@wizneo.io" 
                style={{ height: 48, width: 48 }}
                bgColor="#00FF88"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300 
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
              <SocialIcon 
                url="https://github.com/WIZNEOAI" 
                style={{ height: 48, width: 48 }}
                bgColor="#00FF88"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300 
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
            </nav>
            
            {/* Copyright */}
            <div className="text-xs sm:text-sm text-gray-500 font-matrix tracking-wide">
              © 2026 WIZNEO
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default Index;
