# Lookit Frontend - App de Moda Personal

Una aplicación móvil React Native con Expo que sugiere outfits basados en el clima y las preferencias del usuario.

## 🚀 Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v16 o superior)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Just](https://github.com/casey/just) (task runner) - Opcional pero recomendado

### Instalación y Ejecución

```bash
# Clonar el repositorio
git clone git@github.com:dlg-lookit/lookit-frontend.git
cd lookit-frontend

# Setup automático (instala dependencias y verifica herramientas)
./setup.sh

# Con Just (recomendado)
just install  # Instalar dependencias
just run      # Iniciar la aplicación

# Sin Just (comandos tradicionales)
npm install
npx expo start
```

## 📱 Comandos Disponibles (Just)

Usamos [Just](https://github.com/casey/just) como task runner para simplificar los comandos:

```bash
# Comandos principales
just run        # Iniciar en modo desarrollo
just android    # Ejecutar en Android
just ios        # Ejecutar en iOS (solo macOS)
just web        # Ejecutar en navegador web

# Desarrollo
just clean      # Limpiar cache y ejecutar
just dev        # Setup completo (instalar + limpiar + ejecutar)
just qr         # Generar QR para Expo Go
just tunnel     # Ejecutar en modo túnel

# Mantenimiento
just install    # Instalar dependencias
just update     # Actualizar dependencias
just check      # Verificar estado del proyecto

# Ver todos los comandos
just --list
just help

# Aliases cortos (opcional)
just s          # = just run (start)
just a          # = just android
just i          # = just ios
just w          # = just web
just c          # = just clean
just d          # = just dev
```

## 🏗️ Arquitectura

Este proyecto utiliza **Feature-Based Architecture** (Arquitectura basada en características), donde el código se organiza por dominios de negocio en lugar de por tipos de archivos.

### 📁 Estructura del Proyecto

```
lookit-frontend/
├── app/                     # Expo Router - Navegación principal
│   ├── _layout.js           # Stack / Tab navigation layout
│   ├── index.js             # Home screen (clima + botón "Dress Me")
│   └── onboarding/          # Screens para onboarding inicial
│
├── src/
│   ├── features/            # Características organizadas por dominio
│   │   ├── auth/            # 🔐 Login, registro, recuperación
│   │   │   ├── components/  # Componentes específicos de auth
│   │   │   ├── screens/     # Pantallas de autenticación
│   │   │   ├── hooks/       # Hooks personalizados de auth
│   │   │   ├── services/    # APIs y lógica de negocio
│   │   │   └── index.js     # Exports del feature
│   │   │
│   │   ├── wardrobe/        # 👗 "Mi armario", gestión de prendas
│   │   ├── outfit/          # ✨ Generación y sugerencia de outfits
│   │   ├── profile/         # 👤 Preferencias, tallas, estilos
│   │   └── weather/         # 🌤️ Clima actual, API weather
│   │
│   ├── shared/              # 🔄 Código reutilizable
│   │   ├── components/      # Botones, inputs, loaders, modales
│   │   ├── hooks/           # Hooks genéricos (useFetch, useTheme)
│   │   ├── utils/           # Funciones comunes (formateo, validación)
│   │   ├── constants/       # Colores, estilos, endpoints
│   │   └── assets/          # Imágenes, íconos, fuentes
│   │
│   ├── navigation/          # 🧭 Navegación global (stack, tabs)
│   └── store/               # 📦 Estado global (Zustand)
│
├── assets/                  # Assets de Expo (íconos, splash)
├── package.json
├── app.json                 # Configuración de Expo
├── App.js                   # Punto de entrada principal
└── README.md               # Este archivo
```

## 🎯 Principios de Arquitectura

### ✅ Feature-Based Organization
- **Cada feature es independiente**: auth, wardrobe, outfit, profile, weather
- **Encapsulación**: Todo lo relacionado a una característica está en su carpeta
- **Reutilización**: El código shared es accesible desde cualquier feature
- **Escalabilidad**: Fácil agregar nuevas características sin afectar las existentes

### ✅ Separación de Responsabilidades
- **components/**: Componentes UI específicos del feature
- **screens/**: Pantallas completas del feature
- **hooks/**: Lógica de estado y efectos reutilizables
- **services/**: Comunicación con APIs y lógica de negocio
- **index.js**: Punto de entrada que expone la API pública del feature

### ✅ Imports Limpios
```javascript
// ✅ Bueno - Import desde el feature
import { LoginScreen, useAuth } from '@features/auth';

// ✅ Bueno - Import de shared
import { Button, COLORS } from '@shared';

// ❌ Evitar - Import directo de archivos internos
import LoginScreen from '@features/auth/screens/LoginScreen';
```

## 🚀 Tecnologías

- **React Native**: Framework para aplicaciones móviles
- **Expo 54**: Plataforma de desarrollo
- **Expo Router**: Navegación basada en archivos
- **Zustand**: Gestión de estado global
- **JavaScript**: Lenguaje principal (sin TypeScript para simplicidad)

## 📱 Características Principales

1. **🏠 Home**: Pantalla principal con clima y botón "Dress Me"
2. **🔐 Autenticación**: Login, registro y recuperación de contraseña
3. **👗 Mi Armario**: Gestión de prendas de vestir del usuario
4. **✨ Outfits**: Generación inteligente de conjuntos basados en clima
5. **👤 Perfil**: Configuración de preferencias, tallas y estilos
6. **🌤️ Clima**: Integración con API de clima para sugerencias contextuales

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npx expo start

# Ejecutar en dispositivo Android
npx expo start --android

# Ejecutar en dispositivo iOS
npx expo start --ios

# Ejecutar en web
npx expo start --web
```

## 📋 Estado del Proyecto

- ✅ Estructura base creada
- ✅ Configuración de Expo Router
- ✅ Organización por features
- ✅ Estado global con Zustand
- ⏳ Implementación de features individuales
- ⏳ Integración con APIs
- ⏳ Testing y optimización

## 🎨 Guía de Estilos

Los colores y constantes están centralizados en `src/shared/constants/`:
- **colors.js**: Paleta de colores de la app
- **api.js**: URLs y endpoints de APIs
- **app.js**: Constantes generales de la aplicación

## 🤝 Contribuir

1. Cada feature debe ser independiente
2. Usar el sistema de exports de index.js
3. Mantener la separación de responsabilidades
4. Documentar nuevas características
5. Seguir la estructura establecida

---

**Lookit** - Tu asistente de moda personal 👗✨