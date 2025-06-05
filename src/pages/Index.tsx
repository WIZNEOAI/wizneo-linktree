
import React from 'react';
import MatrixRain from '@/components/MatrixRain';
import LinkCard from '@/components/LinkCard';
import FloatingParticles from '@/components/FloatingParticles';

const Index = () => {
  const links = [
    {
      icon: "🔮",
      title: "Mentoría 1:1 de Transformación",
      description: "Desbloquea. Reprograma. Despierta.",
      url: "https://calendly.com/wizneo"
    },
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
      url: "https://instagram.com/wizneo"
    },
    {
      icon: "🎥",
      title: "TikTok – Filosofía y espiritualidad consciente",
      description: "Como es arriba es abajo, como es adentro es afuera.",
      url: "https://tiktok.com/@wizneo"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-matrix relative overflow-hidden">
      {/* Background Effects - Behind everything */}
      <MatrixRain />
      <FloatingParticles />
      
      {/* Main Content - Above background effects */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto space-y-8">
          
          {/* Profile Section */}
          <div className="text-center space-y-6">
            {/* Profile Picture */}
            <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden 
                           matrix-border-glow hover:matrix-glow transition-all duration-300">
              <img 
                src="/lovable-uploads/b1450d9f-9322-41fe-a4d5-07d8c6b9e0c8.png"
                alt="WIZNEO Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-matrix-green/10 hover:bg-matrix-green/20 transition-all duration-300"></div>
            </div>
            
            {/* Brand Name */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-matrix-green matrix-text-glow 
                            font-matrix tracking-wider">
                WIZNEO
              </h1>
              <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent 
                             via-matrix-green to-transparent pulse-green"></div>
            </div>
            
            {/* Tagline */}
            <p className="text-lg text-gray-300 font-matrix leading-relaxed px-4 
                          hover:text-matrix-green transition-colors duration-500">
              Transforma tu realidad, reprograma tu mente.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4 w-full">
            {links.map((link, index) => (
              <div 
                key={index} 
                className="animate-pulse-green"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <LinkCard {...link} />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center pt-8">
            <div className="text-matrix-green/60 text-sm font-matrix">
              [ MATRIX LOADING... ]
            </div>
            <div className="mt-2 text-xs text-gray-500 font-matrix">
              © 2024 WIZNEO - Spiritual Technology
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Index;
