import lightTheme from './lightTheme';

// Dark theme basado en los tokens CSS de Lookit (modo oscuro)
const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    
    // Colores principales invertidos para modo oscuro
    background: '#2a2a2a', // equivalente a oklch(0.145 0 0)
    foreground: '#f8f9fa', // equivalente a oklch(0.985 0 0)
    
    // Primary
    primary: '#f8f9fa', // equivalente a oklch(0.985 0 0)
    primaryForeground: '#2a2a2a',
    primaryMuted: '#404040',
    
    // Secondary
    secondary: '#404040', // equivalente a oklch(0.269 0 0)
    secondaryForeground: '#f8f9fa',
    
    // Muted
    muted: '#a1a1aa',
    mutedBackground: '#404040', // equivalente a oklch(0.269 0 0)
    mutedText: '#a1a1aa',
    
    // Card
    card: '#1f1f1f',
    cardForeground: '#f8f9fa',
    
    // Border
    border: '#404040',
    
    // Destructive/Error
    destructive: '#dc2626', // equivalente a oklch(0.396 0.141 25.723)
    destructiveForeground: '#ffffff',
    error: '#dc2626', // equivalente a oklch(0.396 0.141 25.723)
    errorText: '#ffffff',
    
    // Estados y utilidades (adaptados para modo oscuro)
    transparent: 'transparent',
    success: '#059669',
    successText: '#ffffff',
    warning: '#d97706',
    warningText: '#ffffff',
    
    // Grises invertidos para modo oscuro
    gray50: '#1f2937',
    gray100: '#374151',
    gray200: '#4b5563',
    gray300: '#6b7280',
    gray400: '#9ca3af',
    gray500: '#d1d5db',
    gray600: '#e5e7eb',
    gray700: '#f3f4f6',
    gray800: '#f9fafb',
    gray900: '#ffffff',
    
    // Transparencias
    overlay: 'rgba(0, 0, 0, 0.7)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Variantes de texto adaptadas para modo oscuro
  textVariants: {
    ...lightTheme.textVariants,
    defaults: {
      ...lightTheme.textVariants.defaults,
      color: 'foreground',
    },
    header: {
      ...lightTheme.textVariants.header,
      color: 'foreground',
    },
    subheader: {
      ...lightTheme.textVariants.subheader,
      color: 'foreground',
    },
    body: {
      ...lightTheme.textVariants.body,
      color: 'foreground',
    },
    bodySmall: {
      ...lightTheme.textVariants.bodySmall,
      color: 'foreground',
    },
    muted: {
      ...lightTheme.textVariants.muted,
      color: 'mutedText',
    },
    accent: {
      ...lightTheme.textVariants.accent,
      color: 'accentText',
    },
    caption: {
      ...lightTheme.textVariants.caption,
      color: 'mutedText',
    },
  },
  
  // Variantes de tarjetas adaptadas para modo oscuro
  cardVariants: {
    regular: {
      ...lightTheme.cardVariants.regular,
      backgroundColor: 'secondary',
      shadowColor: 'gray900',
    },
    elevated: {
      ...lightTheme.cardVariants.elevated,
      backgroundColor: 'secondary',
      shadowColor: 'gray900',
    },
  },
};

export default darkTheme;