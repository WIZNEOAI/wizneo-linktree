
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
      icon: "phone",
      title: "Agenda tu llamada gratuita",
      description: "Diagnóstico 1:1 para construir un sistema inteligente adaptado a tu negocio.",
      url: "https://calendly.com/gnosixio/automation"
    },
    {
      icon: "tech",
      title: "Explora mis sistemas inteligentes",
      description: "Aprende a crear sistemas ganadores para tu negocio impulsados por inteligencia artificial",
      url: "https://wizneo.gumroad.com/"
    },
    {
      icon: "brain",
      title: "30 días para dominar la inteligencia artificial",
      description: "Un plan gratuito y personalizado para emprendedores que no quieren quedarse atrás.",
      url: "https://reto.wizneo.org/"
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
                src="/lovable-uploads/wizneo-profile.png"
                alt="WIZNEO - Mentor en transformación personal y experto en inteligencia artificial"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
            
            {/* Brand Name */}
            <div className="space-y-2 sm:space-y-3">
              <h1 id="profile-heading" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold 
                            text-matrix-green matrix-text-glow font-matrix tracking-wider
                            transform transition-all duration-300 hover:scale-105">
                WIZNEO
              </h1>
              <div className="h-px w-16 sm:w-24 lg:w-32 mx-auto bg-gradient-to-r 
                             from-transparent via-matrix-green to-transparent"></div>
            </div>
            
            {/* Tagline */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-matrix 
                          leading-relaxed px-2 sm:px-4 lg:px-6 hover:text-matrix-green 
                          transition-colors duration-500 text-center">
              Transforma tu realidad, reprograma tu mente.
            </p>
          </section>

          {/* Links Section */}
          <section className="space-y-3 sm:space-y-4 w-full" aria-label="Enlaces principales">
            {links.map((link, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-300 
                          hover:scale-[1.02] active:scale-[0.98]"
              >
                <LinkCard {...link} />
              </div>
            ))}
          </section>

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
                url="https://www.youtube.com/@wiz-neo" 
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
              © 2025 WIZNEO
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default Index;
