
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { getIcon } from '@/utils/iconMapping';
import { useAnalytics } from '@/hooks/useAnalytics';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  url: string;
  featured?: boolean;
}

const LinkCard: React.FC<LinkCardProps> = ({ icon, title, description, url, featured = false }) => {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    try {
      // Track the click event
      trackEvent({
        action: 'click',
        category: 'external_link',
        label: title,
        value: 1
      });

      if (url.startsWith('http')) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        console.log(`Link clicked: ${url}`);
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  // Función para renderizar el icono usando el nuevo sistema
  const renderIcon = () => {
    const IconComponent = getIcon(icon);
    return <IconComponent className="text-matrix-green" size={24} />;
  };

  return (
    <div 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${title} - ${description}`}
      className={`w-full p-4 sm:p-6 backdrop-blur-sm border rounded-lg hover-matrix-glow cursor-pointer transition-all duration-300 
                 group transform active:translate-y-0
                 focus:outline-none focus:ring-2 focus:ring-matrix-green focus:ring-opacity-50
                 ${featured 
                   ? 'bg-matrix-green/10 border-matrix-green border-2 hover:bg-matrix-green/20 active:bg-matrix-green/25 hover:translate-y-[-4px] shadow-[0_0_30px_rgba(0,255,65,0.3)] hover:shadow-[0_0_40px_rgba(0,255,65,0.5)]' 
                   : 'bg-black/80 border-matrix-green/30 hover:bg-matrix-green/5 active:bg-matrix-green/10 hover:translate-y-[-2px]'
                 }`}
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className={`flex-shrink-0 group-hover:scale-110 
                       transition-transform duration-300 group-active:scale-105 
                       ${featured ? 'scale-110' : ''}`}>
          {renderIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <h3 className={`font-matrix font-semibold 
                          transition-colors duration-300 leading-tight
                          ${featured 
                            ? 'text-matrix-green text-lg sm:text-xl lg:text-2xl group-hover:text-white drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]' 
                            : 'text-matrix-green text-base sm:text-lg lg:text-xl group-hover:text-white'
                          }`}>
              {title}
            </h3>
            <ExternalLink 
              size={14} 
              className="text-matrix-green/60 group-hover:text-matrix-green 
                        transition-colors duration-300 flex-shrink-0 sm:size-4" 
            />
          </div>
          <p className="text-gray-300 font-matrix text-sm sm:text-base leading-relaxed 
                       group-hover:text-gray-100 transition-colors duration-300
                       line-clamp-2 sm:line-clamp-none">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
