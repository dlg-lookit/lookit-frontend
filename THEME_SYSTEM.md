# 🎨 Lookit - Sistema de Temas Profesional

Sistema de temas completo para React Native con Expo SDK 54 usando `@shopify/restyle`.

## 📁 Estructura de Archivos Creada

```
src/
├── 🎨 theme/
│   ├── lightTheme.js       # Tema claro con tokens CSS
│   ├── darkTheme.js        # Tema oscuro
│   ├── ThemeProvider.js    # Provider y hooks
│   └── index.js            # Exports unificados
│
├── 🧩 components/
│   ├── Box.js              # Contenedor genérico
│   ├── Text.js             # Texto con variantes
│   ├── Button.js           # Botón con variantes
│   └── index.js            # Exports de componentes
│
└── App.js                  # Ejemplo funcional completo
```

## 🛠️ Instalación Completada

```bash
npm install @shopify/restyle
```

## 🎯 Tokens de Diseño

### Mapeo CSS → Restyle

| Token CSS | Restyle | Uso |
|-----------|---------|-----|
| `--background` | `background` | Fondo principal |
| `--foreground` | `foreground` | Texto principal |
| `--primary` | `primary` | Color primario |
| `--primary-foreground` | `primaryForeground` | Texto sobre primario |
| `--secondary` | `secondary` | Color secundario |
| `--muted` | `mutedBackground` | Fondos apagados |
| `--muted-foreground` | `mutedText` | Texto apagado |
| `--accent` | `accentBackground` | Fondos de acento |
| `--accent-foreground` | `accentText` | Texto de acento |
| `--destructive` | `error` | Color de error |
| `--destructive-foreground` | `errorText` | Texto de error |
| `--radius` | `borderRadii.m` | Radio base (10px) |

## 🌗 Soporte de Temas

### Modos Disponibles
- **`light`** - Tema claro
- **`dark`** - Tema oscuro  
- **`system`** - Sigue el sistema del dispositivo

### Hook useThemeMode()
```javascript
import { useThemeMode } from './src/theme/ThemeProvider';

function MyComponent() {
  const { themeMode, setThemeMode, isDark, currentTheme } = useThemeMode();
  
  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };
  
  return (
    <Button onPress={toggleTheme}>
      Cambiar a {isDark ? 'claro' : 'oscuro'}
    </Button>
  );
}
```

## 🧩 Componentes Base

### Box - Contenedor Universal
```javascript
import { Box } from './src/components';

<Box 
  backgroundColor="primary"
  borderRadius="m"
  padding="l"
  margin="m"
>
  <Text>Contenido</Text>
</Box>
```

### Text - Tipografía con Variantes
```javascript
import { HeaderText, BodyText, MutedText } from './src/components';

<HeaderText>Título Principal</HeaderText>
<BodyText>Texto normal</BodyText>
<MutedText>Texto secundario</MutedText>
```

**Variantes disponibles:**
- `header` - Títulos principales
- `subheader` - Subtítulos
- `body` - Texto normal
- `bodySmall` - Texto pequeño
- `muted` - Texto secundario
- `accent` - Texto destacado
- `caption` - Texto muy pequeño

### Button - Botones con Variantes
```javascript
import { PrimaryButton, SecondaryButton } from './src/components';

<PrimaryButton onPress={handlePress}>
  Acción Principal
</PrimaryButton>

<SecondaryButton onPress={handlePress} loading={isLoading}>
  Acción Secundaria
</SecondaryButton>
```

**Variantes disponibles:**
- `primary` - Botón principal
- `secondary` - Botón secundario
- `destructive` - Botón de eliminar/peligro
- `ghost` - Botón transparente

**Props especiales:**
- `loading` - Muestra spinner
- `disabled` - Deshabilita el botón
- `fullWidth` - Ocupa todo el ancho
- `size` - `small`, `medium`, `large`

## 🎨 Paleta de Colores

### Modo Claro
- **Background:** `#ffffff`
- **Foreground:** `#2a2a2a`
- **Primary:** `#030213`
- **Secondary:** `#f1f2f6`
- **Error:** `#d4183d`

### Modo Oscuro
- **Background:** `#2a2a2a`
- **Foreground:** `#f8f9fa`
- **Primary:** `#f8f9fa`
- **Secondary:** `#404040`
- **Error:** `#dc2626`

## 🚀 Uso en App.js

```javascript
import React from 'react';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { Box, HeaderText, PrimaryButton } from './src/components';

function MyApp() {
  return (
    <Box flex={1} backgroundColor="background" padding="l">
      <HeaderText>¡Hola Mundo! 👋</HeaderText>
      <PrimaryButton onPress={() => alert('¡Funciona!')}>
        Presionar
      </PrimaryButton>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider initialMode="system">
      <MyApp />
    </ThemeProvider>
  );
}
```

## ✨ Características Profesionales

✅ **Temas dinámicos** - Cambio automático según sistema  
✅ **Tokens consistentes** - Basados en variables CSS  
✅ **Componentes reutilizables** - Box, Text, Button  
✅ **TypeScript ready** - Fácil migración a TS  
✅ **Performance optimizada** - Usando @shopify/restyle  
✅ **Arquitectura escalable** - Feature-based  
✅ **Accesibilidad** - StatusBar automática  
✅ **Responsive** - Espaciado consistente  

## 🎯 Próximos Pasos

1. **Implementar más componentes** (Input, Modal, Card)
2. **Agregar animaciones** con Reanimated
3. **Configurar fuentes personalizadas**
4. **Agregar más variantes de color**
5. **Implementar tema de alto contraste**

¡Tu app Lookit ahora tiene un sistema de temas profesional y escalable! 🎨✨