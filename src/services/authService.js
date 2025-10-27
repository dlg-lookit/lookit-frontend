import API_CONFIG from '../config/api.js';

class AuthService {
  /**
   * Realizar petición HTTP con configuración base
   */
  async request(endpoint, options = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    const config = {
      method: 'GET',
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`🌐 API Request: ${config.method} ${url}`);
      console.log(`📍 Network Info: Connecting to ${API_CONFIG.BASE_URL}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      console.log(`📡 API Response: ${response.status} ${response.statusText}`);
      
      // Parsear respuesta JSON
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      return {
        success: true,
        data,
        status: response.status,
      };
      
    } catch (error) {
      console.error(`❌ API Error: ${error.message}`);
      console.error(`🔍 Connection Details:`, {
        url,
        baseUrl: API_CONFIG.BASE_URL,
        endpoint,
        method: config.method,
        timeout: API_CONFIG.TIMEOUT,
      });
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - Please check your connection and server status');
      }
      
      if (error.message.includes('Network request failed')) {
        throw new Error(`Cannot connect to server at ${API_CONFIG.BASE_URL}. Please check:\n• Server is running\n• Network connection\n• Firewall settings`);
      }
      
      throw new Error(error.message || 'Network error occurred');
    }
  }

  /**
   * Registrar nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.email - Email del usuario
   * @param {string} userData.password - Contraseña del usuario
   * @param {string} userData.username - Nombre de usuario
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async register(userData) {
    try {
      // Validar datos requeridos
      const { email, password, username } = userData;
      
      if (!email || !password || !username) {
        throw new Error('Email, password, and username are required');
      }
      
      // Validaciones básicas
      if (!this.isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
      }
      
      console.log('🔐 Registering user:', { email, username });
      
      const response = await this.request(API_CONFIG.ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          username: username.trim().toLowerCase(),
        }),
      });
      
      console.log('✅ Registration successful:', response.data);
      
      return response;
      
    } catch (error) {
      console.error('❌ Registration failed:', error.message);
      throw error;
    }
  }

  /**
   * Iniciar sesión
   * @param {Object} credentials - Credenciales de login
   * @param {string} credentials.email - Email del usuario
   * @param {string} credentials.password - Contraseña del usuario
   * @returns {Promise<Object>} Respuesta del servidor con token
   */
  async login(credentials) {
    try {
      const { email, password } = credentials;
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      console.log('🔑 Logging in user:', { email });
      
      const response = await this.request(API_CONFIG.ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });
      
      console.log('✅ Login successful');
      
      return response;
      
    } catch (error) {
      console.error('❌ Login failed:', error.message);
      throw error;
    }
  }

  /**
   * Validar formato de email
   * @param {string} email - Email a validar
   * @returns {boolean} True si es válido
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validar fortaleza de contraseña
   * @param {string} password - Contraseña a validar
   * @returns {Object} Resultado de validación
   */
  validatePassword(password) {
    const checks = {
      length: password.length >= 6,
      hasLower: /[a-z]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    
    let strength = 'weak';
    if (score >= 4) strength = 'strong';
    else if (score >= 3) strength = 'medium';
    
    return {
      isValid: checks.length,
      strength,
      score,
      checks,
    };
  }
}

// Instancia singleton del servicio
const authService = new AuthService();

export default authService;