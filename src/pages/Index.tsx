
import React from 'react';
import MatrixRain from '@/components/MatrixRain';
import LinkCard from '@/components/LinkCard';

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
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto space-y-8">
          
          {/* Profile Section */}
          <div className="text-center space-y-6">
            {/* Profile Picture */}
            <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden 
                           matrix-border-glow hover:matrix-glow transition-all duration-300">
              <div className="w-full h-full bg-gradient-to-br from-matrix-green/20 to-matrix-dark/20 
                             flex items-center justify-center text-4xl">
                🧠
              </div>
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

      {/* Enhanced floating particles effect - More visible and distributed */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top section particles */}
        <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-matrix-green rounded-full 
                       animate-ping opacity-60"></div>
        <div className="absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-matrix-green rounded-full 
                       animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[30%] left-[80%] w-1 h-1 bg-matrix-green rounded-full 
                       animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
        
        {/* Middle section particles */}
        <div className="absolute top-[45%] left-[10%] w-1.5 h-1.5 bg-matrix-green rounded-full 
                       animate-ping opacity-50" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[55%] right-[15%] w-2 h-2 bg-matrix-green rounded-full 
                       animate-ping opacity-45" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[65%] left-[75%] w-1 h-1 bg-matrix-green rounded-full 
                       animate-ping opacity-35" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Bottom section particles */}
        <div className="absolute top-[75%] left-[25%] w-1.5 h-1.5 bg-matrix-green rounded-full 
                       animate-ping opacity-55" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[85%] right-[30%] w-1 h-1 bg-matrix-green rounded-full 
                       animate-ping opacity-40" style={{ animationDelay: '3.5s' }}></div>
        <div className="absolute top-[90%] left-[60%] w-2 h-2 bg-matrix-green rounded-full 
                       animate-ping opacity-50" style={{ animationDelay: '4s' }}></div>
        
        {/* Additional scattered particles */}
        <div className="absolute top-[35%] left-[5%] w-1 h-1 bg-matrix-green rounded-full 
                       animate-ping opacity-30" style={{ animationDelay: '4.5s' }}></div>
        <div className="absolute top-[70%] right-[10%] w-1.5 h-1.5 bg-matrix-green rounded-full 
                       animate-ping opacity-45" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-[40%] right-[5%] w-1 h-1 bg-matrix-green rounded-full 
                       animate-ping opacity-35" style={{ animationDelay: '5.5s' }}></div>
        <div className="absolute top-[80%] left-[40%] w-1.5 h-1.5 bg-matrix-green rounded-full 
                       animate-ping opacity-40" style={{ animationDelay: '6s' }}></div>
        
        {/* Mobile optimized particles */}
        <div className="absolute top-[25%] left-[50%] w-1 h-1 bg-matrix-green rounded-full 
                       animate-ping opacity-35 md:hidden" style={{ animationDelay: '6.5s' }}></div>
        <div className="absolute top-[60%] left-[30%] w-1 h-1 bg-matrix-green rounded-full 
                       animate-ping opacity-30 md:hidden" style={{ animationDelay: '7s' }}></div>
      </div>
    </div>
  );
};

export default Index;
