import 'dotenv/config';

export default {
  expo: {
    name: "lookit-frontend",
    slug: "lookit-frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      // Variables de entorno para la API
      EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080',
      EXPO_PUBLIC_API_TIMEOUT: process.env.EXPO_PUBLIC_API_TIMEOUT || '10000',
      EXPO_PUBLIC_NODE_ENV: process.env.EXPO_PUBLIC_NODE_ENV || 'development',
      EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME || 'Lookit',
      EXPO_PUBLIC_APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
      // Backend Atenea (generación de outfits)
      EXPO_PUBLIC_BASE_URL_ATENEA: process.env.EXPO_PUBLIC_BASE_URL_ATENEA || 'http://127.0.0.1:3001',
    }
  },
};