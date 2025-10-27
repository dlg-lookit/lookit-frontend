import Constants from 'expo-constants';

// Función para obtener variables de entorno de forma segura
const getEnvVar = (key, defaultValue = null) => {
  // En Expo, las variables deben empezar con EXPO_PUBLIC_
  const value = Constants.expoConfig?.extra?.[key] || process.env[key];
  
  if (!value && defaultValue === null) {
    console.warn(`⚠️ Environment variable ${key} is not defined`);
  }
  
  return value || defaultValue;
};

// Configuración de la API para el microservicio de autenticación
const API_CONFIG = {
  // URL base del microservicio Janus Auth (desde variable de entorno)
  BASE_URL: getEnvVar('EXPO_PUBLIC_API_BASE_URL', 'http://localhost:8080'),
  
  // Endpoints disponibles
  ENDPOINTS: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Timeouts (desde variable de entorno)
  TIMEOUT: parseInt(getEnvVar('EXPO_PUBLIC_API_TIMEOUT', '10000')),
  
  // Environment info
  NODE_ENV: getEnvVar('EXPO_PUBLIC_NODE_ENV', 'development'),
  APP_NAME: getEnvVar('EXPO_PUBLIC_APP_NAME', 'Lookit'),
  APP_VERSION: getEnvVar('EXPO_PUBLIC_APP_VERSION', '1.0.0'),
};

// Log de configuración en desarrollo
if (API_CONFIG.NODE_ENV === 'development') {
  console.log('🔧 API Configuration:', {
    baseUrl: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    nodeEnv: API_CONFIG.NODE_ENV,
  });
}

export default API_CONFIG;