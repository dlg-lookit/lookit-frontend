import { createTheme } from '@shopify/restyle';

// Light theme basado en los tokens CSS de Lookit
const lightTheme = createTheme({
  colors: {
    // Colores principales
    background: '#ffffff',
    foreground: '#2a2a2a', // equivalente a oklch(0.145 0 0)
    
    // Primary
    primary: '#030213',
    primaryForeground: '#ffffff',
    primaryMuted: '#f0f0f5',
    
    // Secondary  
    secondary: '#f1f2f6', // equivalente a oklch(0.95 0.0058 264.53)
    secondaryForeground: '#030213',
    
    // Muted
    muted: '#717182',
    mutedBackground: '#ececf0',
    mutedText: '#717182',
    
    // Card
    card: '#ffffff',
    cardForeground: '#2a2a2a',
    
    // Border
    border: '#e5e7eb',
    
    // Destructive/Error
    destructive: '#d4183d',
    destructiveForeground: '#ffffff',
    error: '#d4183d',
    errorText: '#ffffff',
    
    // Estados y utilidades
    transparent: 'transparent',
    success: '#10b981',
    successText: '#ffffff',
    warning: '#f59e0b',
    warningText: '#ffffff',
    
    // Grises para diferentes elementos
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    
    // Colores amber para contenido patrocinado
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
    
    // Colores para gráficos y estadísticas
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
    overlay: 'rgba(0, 0, 0, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.25)',
  },
  
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
    // Mantener compatibilidad con nombres anteriores
    s: 8,
    m: 16,
    l: 24,
  },
  
  borderRadii: {
    none: 0,
    xs: 4,
    sm: 6,
    md: 10, // equivalente a --radius: 0.625rem (10px)
    lg: 16,
    xl: 20,
    full: 9999,
    // Mantener compatibilidad con nombres anteriores
    s: 6,
    m: 10,
    l: 16,
  },
  
  // Tipografía
  textVariants: {
    defaults: {
      fontSize: 16,
      fontWeight: 'normal',
      color: 'foreground',
      lineHeight: 20,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'foreground',
      lineHeight: 32,
    },
    subheader: {
      fontSize: 20,
      fontWeight: '600',
      color: 'foreground',
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal',
      color: 'foreground',
      lineHeight: 20,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: 'normal',
      color: 'foreground',
      lineHeight: 18,
    },
    muted: {
      fontSize: 14,
      fontWeight: 'normal',
      color: 'mutedText',
      lineHeight: 18,
    },
    accent: {
      fontSize: 16,
      fontWeight: '500',
      color: 'accentText',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      color: 'mutedText',
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      color: 'primaryForeground',
      lineHeight: 20,
    },
  },
  
  // Variantes de botones
  buttonVariants: {
    primary: {
      backgroundColor: 'primary',
      borderRadius: 'm',
      paddingVertical: 'm',
      paddingHorizontal: 'l',
    },
    secondary: {
      backgroundColor: 'secondary',
      borderRadius: 'm',
      paddingVertical: 'm',
      paddingHorizontal: 'l',
      borderWidth: 1,
      borderColor: 'gray300',
    },
    destructive: {
      backgroundColor: 'error',
      borderRadius: 'm',
      paddingVertical: 'm',
      paddingHorizontal: 'l',
    },
    ghost: {
      backgroundColor: 'transparent',
      borderRadius: 'm',
      paddingVertical: 'm',
      paddingHorizontal: 'l',
    },
  },
  
  // Variantes de contenedores
  cardVariants: {
    regular: {
      backgroundColor: 'background',
      borderRadius: 'l',
      padding: 'l',
      shadowColor: 'gray900',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    elevated: {
      backgroundColor: 'background',
      borderRadius: 'l',
      padding: 'l',
      shadowColor: 'gray900',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
  },
});

export default lightTheme;