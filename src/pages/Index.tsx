import React from 'react';
import MatrixRain from '@/components/MatrixRain';
import LinkCard from '@/components/LinkCard';
import FloatingParticles from '@/components/FloatingParticles';

const Index = () => {
  const links = [
    {
      icon: "📺",
      title: "YouTube – Tutoriales IA",
      description: "Aprende a como generar productos digitales sin ser un experto en programación",
      url: "https://www.youtube.com/@wiz-neo"
    },
    {
      icon: "📸",
      title: "Instagram – Herramientas IA",
      description: "Consejos y tips para sacarle el mayor provecho a la inteligencia artificial",
      url: "https://www.instagram.com/wizneo.io/"
    },
    {
      icon: "🎥",
      title: "TikTok – Filosofía y espiritualidad consciente",
      description: "Como es arriba es abajo, como es adentro es afuera.",
      url: "https://www.tiktok.com/@wizneo.io"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-matrix relative overflow-hidden">
      {/* Background Effects - Behind everything */}
      <MatrixRain />
      <FloatingParticles />
      
      {/* Main Content - Above background effects */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center 
                      px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Profile Section */}
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Profile Picture */}
            <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 
                           rounded-full overflow-hidden matrix-border-glow hover:matrix-glow 
                           transition-all duration-300 transform hover:scale-105">
              <img 
                src="/lovable-uploads/b1450d9f-9322-41fe-a4d5-07d8c6b9e0c8.png"
                alt="WIZNEO Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Brand Name */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold 
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
          </div>

          {/* Links Section */}
          <div className="space-y-3 sm:space-y-4 w-full">
            {links.map((link, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-300 
                          hover:scale-[1.02] active:scale-[0.98]"
              >
                <LinkCard {...link} />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center pt-6 sm:pt-8 space-y-2">
            <div className="text-matrix-green/60 text-sm sm:text-base font-matrix 
                           tracking-wider hover:text-matrix-green transition-colors duration-300">
              [ TECHWIZ ACTIVATED ]
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-matrix tracking-wide">
              © 2025 WIZNEO — Tecnología Espiritual
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Index;
