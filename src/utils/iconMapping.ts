
import { 
  ExternalLink, 
  DollarSign, 
  Bot, 
  Sparkles,
  Star,
  Zap,
  Crown,
  Gem,
  LucideIcon
} from 'lucide-react';

// Mapeo de iconos por plataforma
export const iconMap: Record<string, LucideIcon> = {
  youtube: DollarSign,
  instagram: Bot,
  tiktok: Sparkles, // Representa magia/espiritualidad
  // Fallbacks adicionales
  default: Star,
  external: ExternalLink,
  // Alternativas espirituales para TikTok
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
