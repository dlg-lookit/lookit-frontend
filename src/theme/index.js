import { createText, createBox } from '@shopify/restyle';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

// Exportar temas
export { lightTheme, darkTheme };

// Crear componentes base con el tema
export const Box = createBox();
export const Text = createText();

// Hook para acceder al tema actual
export { useTheme } from '@shopify/restyle';