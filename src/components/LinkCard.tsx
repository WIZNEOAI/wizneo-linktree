
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
  offer?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ icon, title, description, url, featured = false, offer }) => {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent({
      action: 'click',
      category: 'external_link',
      label: title,
      value: 1
    });
  };

  // Función para renderizar el icono usando el nuevo sistema
  const renderIcon = () => {
    const IconComponent = getIcon(icon);
    return <IconComponent className="text-matrix-green" size={24} />;
  };

  return (
    <a
      href={url}
      target={url.startsWith('http') ? '_blank' : undefined}
      rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      aria-label={`${title} - ${description}`}
      className={`w-full p-4 sm:p-6 backdrop-blur-sm border rounded-lg hover-matrix-glow cursor-pointer transition-all duration-300 
                 group transform active:translate-y-0
                 focus:outline-none focus:ring-2 focus:ring-matrix-green focus:ring-opacity-50
                 block no-underline
                 ${featured 
                   ? 'bg-matrix-green/10 border-matrix-green border-2 hover:bg-matrix-green/20 active:bg-matrix-green/25 hover:translate-y-[-4px] shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:shadow-[0_0_40px_rgba(0,255,136,0.5)]'
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
                            ? 'text-matrix-green text-lg sm:text-xl lg:text-2xl group-hover:text-white drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]'
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
          {offer && (
            <div className="mt-3 rounded-lg border border-matrix-green/30 bg-matrix-green/[0.07] px-3 py-2">
              <p className="text-[10px] sm:text-[11px] font-matrix uppercase tracking-[0.18em] text-matrix-green mb-1">
                Solo tomo pocas sesiones al mes
              </p>
              <p className="text-xs sm:text-sm font-matrix text-gray-200 leading-relaxed">
                {offer}
              </p>
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default LinkCard;
