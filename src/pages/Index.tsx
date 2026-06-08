
import React, { useEffect } from 'react';
import MatrixRain from '@/components/MatrixRain';
import LinkCard from '@/components/LinkCard';
import FloatingParticles from '@/components/FloatingParticles';
import { SocialIcon } from 'react-social-icons';
import { useAnalytics } from '@/hooks/useAnalytics';

const Index = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('Homepage');
  }, [trackPageView]);

  const links = [
    {
      icon: "agent",
      title: "WIZNEO AI Builder Sprint — founder $500",
      description: 'Valor $1,500. En 2 horas con Ulises montas tu base de IA: compu + cel, agentes/herramientas, contexto, repos/terminal y primer flujo real.',
      url: "https://reto.wizneo.org/sprint?utm_source=linktree&utm_medium=hub&utm_campaign=wizneo_ai_builder_sprint",
      featured: true
    },
    {
      icon: "brain",
      title: "Reto WIZNEO 30 días (gratis)",
      description: "Si todavía no sabes qué montar, recibe una ruta para ubicar tu primer sistema útil antes del Sprint.",
      url: "https://reto.wizneo.org/?utm_source=linktree&utm_medium=organic&utm_campaign=lead_magnet"
    },
    {
      icon: "newsletter",
      title: "Newsletter WIZNEO",
      description: "Opcional si aún estás calentando: señales semanales de IA aplicada, sin pitch eterno ni gurú barato.",
      url: "https://newsletter.wizneo.org/?utm_source=linktree&utm_medium=organic&utm_campaign=bio"
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
                Ya no hay excusas. Construye.
              </h1>
              <div className="h-px w-14 sm:w-20 lg:w-24 mx-auto bg-gradient-to-r
                             from-transparent via-matrix-green to-transparent"></div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-matrix
                            leading-relaxed px-2 sm:px-4 lg:px-6 max-w-prose mx-auto">
                Sprint founder, reto gratis y señales de IA aplicada para builders que sí van a mover las manos.
              </p>
            </div>
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
