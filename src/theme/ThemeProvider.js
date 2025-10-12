import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import { lightTheme, darkTheme } from './index';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children, initialMode = 'system' }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(initialMode);
  
  // Determinar si el tema actual debe ser oscuro
  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');
  
  // Seleccionar el tema actual
  const currentTheme = isDark ? darkTheme : lightTheme;
  
  const contextValue = {
    themeMode,
    setThemeMode,
    currentTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <RestyleThemeProvider theme={currentTheme}>
        {children}
      </RestyleThemeProvider>
    </ThemeContext.Provider>
  );
}

// Hook para usar el contexto del tema
export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
}

// Hook simplificado para obtener solo el tema actual
export function useCurrentTheme() {
  const { currentTheme } = useThemeMode();
  return currentTheme;
}