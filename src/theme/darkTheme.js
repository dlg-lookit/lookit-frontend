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
    
    // Colores amber para contenido patrocinado (mismos que light theme)
    amber50: '#fffbeb',
    amber100: '#fef3c7',
    amber200: '#fde68a',
    amber300: '#fcd34d',
    amber400: '#fbbf24',
    amber500: '#f59e0b',
    amber600: '#d97706',
    amber700: '#b45309',
    amber800: '#92400e',
    amber900: '#78350f',
    
    // Colores para gráficos y estadísticas (mantenemos los mismos para consistencia)
    orange50: '#fff7ed',
    orange100: '#ffedd5',
    orange200: '#fed7aa',
    orange300: '#fdba74',
    orange400: '#fb923c',
    orange500: '#f97316',
    orange600: '#ea580c',
    orange700: '#c2410c',
    orange800: '#9a3412',
    orange900: '#7c2d12',
    
    yellow50: '#fefce8',
    yellow100: '#fef3c7',
    yellow200: '#fde68a',
    yellow300: '#fcd34d',
    yellow400: '#fbbf24',
    yellow500: '#f59e0b',
    yellow600: '#d97706',
    yellow700: '#a16207',
    yellow800: '#854d0e',
    yellow900: '#713f12',
    
    indigo50: '#eef2ff',
    indigo100: '#e0e7ff',
    indigo200: '#c7d2fe',
    indigo300: '#a5b4fc',
    indigo400: '#818cf8',
    indigo500: '#6366f1',
    indigo600: '#4f46e5',
    indigo700: '#4338ca',
    indigo800: '#3730a3',
    indigo900: '#312e81',
    
    purple50: '#faf5ff',
    purple100: '#f3e8ff',
    purple200: '#e9d5ff',
    purple300: '#d8b4fe',
    purple350: '#8B5CF6', // Color para gráficos por defecto
    purple400: '#c084fc',
    purple500: '#a855f7',
    purple600: '#9333ea',
    purple700: '#7c3aed',
    purple800: '#6b21a8',
    purple900: '#581c87',
    
    green50: '#f0fdf4',
    green100: '#dcfce7',
    green200: '#bbf7d0',
    green300: '#86efac',
    green400: '#4ade80',
    green500: '#22c55e',
    green600: '#16a34a',
    green700: '#15803d',
    green800: '#166534',
    green900: '#14532d',
    
    red50: '#fef2f2',
    red100: '#fee2e2',
    red200: '#fecaca',
    red300: '#fca5a5',
    red400: '#f87171',
    red500: '#ef4444',
    red600: '#dc2626',
    red700: '#b91c1c',
    red800: '#991b1b',
    red900: '#7f1d1d',
    
    // Colores rose para elementos de la referencia
    rose50: '#fff1f2',
    rose100: '#ffe4e6',
    rose200: '#fecdd3',
    rose300: '#fda4af',
    rose400: '#fb7185',
    rose500: '#f43f5e',
    rose600: '#e11d48',
    rose700: '#be123c',
    rose800: '#9f1239',
    rose900: '#881337',
    
    // Colores blue para elementos decorativos
    blue50: '#eff6ff',
    blue100: '#dbeafe',
    blue200: '#bfdbfe',
    blue300: '#93c5fd',
    blue400: '#60a5fa',
    blue500: '#3b82f6',
    blue600: '#2563eb',
    blue700: '#1d4ed8',
    blue800: '#1e40af',
    blue900: '#1e3a8a',
    
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