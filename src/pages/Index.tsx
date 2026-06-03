
import React, { useEffect } from 'react';
import MatrixRain from '@/components/MatrixRain';
import LinkCard from '@/components/LinkCard';
import FloatingParticles from '@/components/FloatingParticles';
import NewsletterCapture from '@/components/NewsletterCapture';
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
      title: "WIZNEO AI Builder Sprint — 500 USD",
      description: "2 horas 1:1 para montar agentes, terminal, VPS, repos y tu workflow builder.",
      url: "https://consultoria.wizneo.org/?utm_source=linktree&utm_medium=hub&utm_campaign=wizneo_ai_builder_sprint",
      featured: true
    },
    {
      icon: "brain",
      title: "Plan de IA 2026 (gratis)",
      description: "Tu ruta personalizada para entrar al mundo IA en 2 minutos.",
      url: "https://reto.wizneo.org/?utm_source=linktree&utm_medium=organic&utm_campaign=lead_magnet"
    },
    {
      icon: "newsletter",
      title: "Newsletter WIZNEO",
      description: "Cada lunes: lo importante de IA, sin humo y con una acción concreta.",
      url: "https://newsletter.wizneo.org/?utm_source=linktree&utm_medium=organic&utm_campaign=bio"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-matrix relative overflow-hidden" role="main">
      {/* Background Effects - Behind everything */}
      <MatrixRain />
      <FloatingParticles />
      
      {/* Main Content - Above background effects */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center 
                      px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Profile Section */}
          <section className="text-center space-y-4 sm:space-y-6" aria-labelledby="profile-heading">
            {/* Profile Picture */}
            <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 
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
            <div className="space-y-3 sm:space-y-4">
              <h1
                id="profile-heading"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold
                           text-matrix-green matrix-text-glow font-matrix tracking-tight
                           leading-[1.05] px-2 sm:px-4 lg:px-6
                           transform transition-all duration-300 hover:scale-[1.02]"
              >
                Te preparo para el nuevo mundo de la IA.
              </h1>
              <div className="h-px w-16 sm:w-24 lg:w-32 mx-auto bg-gradient-to-r
                             from-transparent via-matrix-green to-transparent"></div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-matrix
                            leading-relaxed px-2 sm:px-4 lg:px-6 max-w-prose mx-auto">
                Educación práctica de IA — sin jerga, sin teoría, sin perder meses.
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

          {/* Newsletter Inline Capture */}
          <NewsletterCapture />

          {/* Social Media Icons */}
          <section className="text-center pt-8 sm:pt-12 pb-6 sm:pb-8" aria-label="Redes sociales">
            <nav className="flex justify-center items-center space-x-6 sm:space-x-8 mb-6 sm:mb-8" aria-label="Enlaces de redes sociales">
              <SocialIcon 
                url="https://www.instagram.com/wizneo.io/" 
                style={{ height: 48, width: 48 }}
                bgColor="#00FF41"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300 
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
              <SocialIcon
                url="https://x.com/Wizneoio"
                style={{ height: 48, width: 48 }}
                bgColor="#00FF41"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300 
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
              <SocialIcon 
                url="https://www.tiktok.com/@wizneo.io" 
                style={{ height: 48, width: 48 }}
                bgColor="#00FF41"
                fgColor="#000000"
                className="hover-matrix-glow cursor-pointer transition-all duration-300 
                          transform hover:translate-y-[-2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]
                          rounded-full border border-matrix-green/30"
              />
              <SocialIcon 
                url="https://github.com/WIZNEOAI" 
                style={{ height: 48, width: 48 }}
                bgColor="#00FF41"
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
