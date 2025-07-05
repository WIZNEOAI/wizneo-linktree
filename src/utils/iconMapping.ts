import { 
  ExternalLink, 
  DollarSign, 
  Bot, 
  Zap,
  Star,
  Crown,
  Gem,
  LucideIcon
} from 'lucide-react';

// Mapeo de iconos por plataforma
export const iconMap: Record<string, LucideIcon> = {
  youtube: DollarSign,
  instagram: Bot,
  tiktok: Zap, // Representa energía/poder espiritual
  // Fallbacks adicionales
  default: Star,
  external: ExternalLink,
  // Alternativas espirituales
  spiritual: Star,
  energy: Zap,
  crown: Crown,
  gem: Gem,
};

// Función para obtener el icono correcto con fallback
export const getIcon = (iconKey: string): LucideIcon => {
  return iconMap[iconKey] || iconMap.default;
};

// Validar si un icono existe
export const iconExists = (iconKey: string): boolean => {
  return iconKey in iconMap;
};
