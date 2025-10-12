import React from 'react';
import { 
  Home, 
  Shirt, 
  Sparkles, 
  BarChart3, 
  User,
  ArrowLeft,
  ArrowRight,
  Search,
  Settings,
  Eye,
  EyeOff,
  Heart,
  Zap,
  Target,
  TrendingUp,
  Cloud,
  Sun,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
  Minus,
  X,
  Check,
  Camera,
  Filter,
  Edit3,
  Palette,
  Star,
  LogOut,
  Wind,
  Glasses,
  Briefcase,
  PartyPopper
} from 'lucide-react-native';

// Iconos principales de navegación (exactamente como en la referencia)
export const LucideHome = ({ size = 20, color = '#666' }) => (
  <Home size={size} color={color} strokeWidth={2} />
);

export const LucideShirt = ({ size = 20, color = '#666' }) => (
  <Shirt size={size} color={color} strokeWidth={2} />
);

export const LucideSparkles = ({ size = 20, color = '#666' }) => (
  <Sparkles size={size} color={color} strokeWidth={2} />
);

export const LucideBarChart3 = ({ size = 20, color = '#666' }) => (
  <BarChart3 size={size} color={color} strokeWidth={2} />
);

export const LucideUser = ({ size = 20, color = '#666' }) => (
  <User size={size} color={color} strokeWidth={2} />
);

// Iconos de navegación y UI
export const LucideArrowLeft = ({ size = 20, color = '#666' }) => (
  <ArrowLeft size={size} color={color} strokeWidth={2} />
);

export const LucideArrowRight = ({ size = 20, color = '#666' }) => (
  <ArrowRight size={size} color={color} strokeWidth={2} />
);

export const LucideSearch = ({ size = 20, color = '#666' }) => (
  <Search size={size} color={color} strokeWidth={2} />
);

export const LucideSettings = ({ size = 20, color = '#666' }) => (
  <Settings size={size} color={color} strokeWidth={2} />
);

// Iconos de formularios y autenticación
export const LucideEye = ({ size = 20, color = '#666' }) => (
  <Eye size={size} color={color} strokeWidth={2} />
);

export const LucideEyeOff = ({ size = 20, color = '#666' }) => (
  <EyeOff size={size} color={color} strokeWidth={2} />
);

// Iconos de acciones
export const LucideHeart = ({ size = 20, color = '#666' }) => (
  <Heart size={size} color={color} strokeWidth={2} />
);

export const LucideZap = ({ size = 20, color = '#666' }) => (
  <Zap size={size} color={color} strokeWidth={2} />
);

export const LucideTarget = ({ size = 20, color = '#666' }) => (
  <Target size={size} color={color} strokeWidth={2} />
);

export const LucideTrendingUp = ({ size = 20, color = '#666' }) => (
  <TrendingUp size={size} color={color} strokeWidth={2} />
);

export const LucideCloud = ({ size = 20, color = '#666' }) => (
  <Cloud size={size} color={color} strokeWidth={2} />
);

export const LucideSun = ({ size = 20, color = '#666' }) => (
  <Sun size={size} color={color} strokeWidth={2} />
);

// Iconos de interfaz
export const LucideBookmark = ({ size = 20, color = '#666', filled = false }) => (
  <Bookmark size={size} color={color} strokeWidth={2} fill={filled ? color : 'none'} />
);

export const LucideChevronDown = ({ size = 20, color = '#666' }) => (
  <ChevronDown size={size} color={color} strokeWidth={2} />
);

export const LucideChevronLeft = ({ size = 20, color = '#666' }) => (
  <ChevronLeft size={size} color={color} strokeWidth={2} />
);

export const LucideChevronRight = ({ size = 20, color = '#666' }) => (
  <ChevronRight size={size} color={color} strokeWidth={2} />
);

export const LucideChevronUp = ({ size = 20, color = '#666' }) => (
  <ChevronUp size={size} color={color} strokeWidth={2} />
);

// Iconos de acciones básicas
export const LucidePlus = ({ size = 20, color = '#666' }) => (
  <Plus size={size} color={color} strokeWidth={2} />
);

export const LucideMinus = ({ size = 20, color = '#666' }) => (
  <Minus size={size} color={color} strokeWidth={2} />
);

export const LucideX = ({ size = 20, color = '#666' }) => (
  <X size={size} color={color} strokeWidth={2} />
);

export const LucideCheck = ({ size = 20, color = '#666' }) => (
  <Check size={size} color={color} strokeWidth={2} />
);

// Iconos específicos de la app
export const LucideCamera = ({ size = 20, color = '#666' }) => (
  <Camera size={size} color={color} strokeWidth={2} />
);

export const LucideFilter = ({ size = 20, color = '#666' }) => (
  <Filter size={size} color={color} strokeWidth={2} />
);

export const LucideEdit3 = ({ size = 20, color = '#666' }) => (
  <Edit3 size={size} color={color} strokeWidth={2} />
);

export const LucidePalette = ({ size = 20, color = '#666' }) => (
  <Palette size={size} color={color} strokeWidth={2} />
);

export const LucideStar = ({ size = 20, color = '#666', filled = false }) => (
  <Star size={size} color={color} strokeWidth={2} fill={filled ? color : 'none'} />
);

export const LucideLogOut = ({ size = 20, color = '#666' }) => (
  <LogOut size={size} color={color} strokeWidth={2} />
);

// Iconos adicionales para SignupStepTwo
export const LucideWind = ({ size = 20, color = '#666' }) => (
  <Wind size={size} color={color} strokeWidth={2} />
);

export const LucideGlasses = ({ size = 20, color = '#666' }) => (
  <Glasses size={size} color={color} strokeWidth={2} />
);

export const LucideBriefcase = ({ size = 20, color = '#666' }) => (
  <Briefcase size={size} color={color} strokeWidth={2} />
);

export const LucidePartyPopper = ({ size = 20, color = '#666' }) => (
  <PartyPopper size={size} color={color} strokeWidth={2} />
);

// Exportar los iconos principales para fácil migración
export {
  LucideHome as Home,
  LucideShirt as Shirt,
  LucideSparkles as Sparkles,
  LucideBarChart3 as BarChart3,
  LucideUser as User,
  LucideArrowLeft as ArrowLeft,
  LucideArrowRight as ArrowRight,
  LucideSearch as Search,
  LucideSettings as Settings,
  LucideEye as EyeIcon,
  LucideEyeOff as EyeOffIcon,
  LucideHeart as Heart,
  LucideZap as Zap,
  LucideTarget as Target,
  LucideTrendingUp as TrendingUp,
  LucideCloud as Cloud,
  LucideSun as Sun,
  LucideBookmark as Bookmark,
  LucideChevronDown as ChevronDown,
  LucideChevronLeft as ChevronLeft,
  LucideChevronRight as ChevronRight,
  LucideChevronUp as ChevronUp,
  LucidePlus as Plus,
  LucideMinus as Minus,
  LucideX as X,
  LucideCheck as Check,
  LucideCamera as Camera,
  LucideFilter as Filter,
  LucideEdit3 as Edit3,
  LucidePalette as Palette,
  LucideStar as Star,
  LucideLogOut as LogOut,
  LucideWind as Wind,
  LucideGlasses as Glasses,
  LucideBriefcase as Briefcase,
  LucidePartyPopper as PartyPopper
};