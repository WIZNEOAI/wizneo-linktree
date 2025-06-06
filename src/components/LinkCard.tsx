
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  url: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ icon, title, description, url }) => {
  const handleClick = () => {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.log(`Link clicked: ${url}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full p-4 sm:p-6 bg-black/80 backdrop-blur-sm border border-matrix-green/30 
                 rounded-lg hover-matrix-glow cursor-pointer transition-all duration-300 
                 hover:bg-matrix-green/5 group active:bg-matrix-green/10
                 transform hover:translate-y-[-2px] active:translate-y-0"
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="text-xl sm:text-2xl flex-shrink-0 group-hover:scale-110 
                       transition-transform duration-300 group-active:scale-105">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <h3 className="text-matrix-green font-matrix font-semibold 
                          text-base sm:text-lg lg:text-xl group-hover:text-white 
                          transition-colors duration-300 leading-tight">
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
