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
    
    // Secondary  
    secondary: '#f1f2f6', // equivalente a oklch(0.95 0.0058 264.53)
    secondaryForeground: '#030213',
    
    // Muted
    mutedBackground: '#ececf0',
    mutedText: '#717182',
    
    // Accent
    accentBackground: '#e9ebef',
    accentText: '#030213',
    
    // Destructive/Error
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
    
    // Transparencias
    overlay: 'rgba(0, 0, 0, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.25)',
  },
  
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },
  
  borderRadii: {
    none: 0,
    xs: 4,
    s: 6,
    m: 10, // equivalente a --radius: 0.625rem (10px)
    l: 16,
    xl: 20,
    full: 9999,
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