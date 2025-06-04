
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
      className="w-full p-6 bg-black border border-matrix-green/30 rounded-lg 
                 hover-matrix-glow cursor-pointer transition-all duration-300 
                 hover:bg-matrix-green/5 group"
    >
      <div className="flex items-start space-x-4">
        <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-matrix-green font-matrix font-semibold text-lg 
                          group-hover:text-white transition-colors duration-300">
              {title}
            </h3>
            <ExternalLink 
              size={16} 
              className="text-matrix-green/60 group-hover:text-matrix-green 
                        transition-colors duration-300 flex-shrink-0" 
            />
          </div>
          <p className="text-gray-300 font-matrix text-sm leading-relaxed 
                       group-hover:text-gray-100 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
