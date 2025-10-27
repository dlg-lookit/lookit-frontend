import { useState, useCallback } from 'react';
import authService from '../services/authService';

/**
 * Hook personalizado para manejar autenticación
 * @returns {Object} Estado y funciones de autenticación
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Registrar nuevo usuario
   */
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      
      // Si el registro es exitoso, retornar los datos
      return {
        success: true,
        data: response.data,
        message: 'Account created successfully!',
      };
      
    } catch (err) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
      
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Iniciar sesión
   */
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      
      // Aquí podrías guardar el token en AsyncStorage
      // await AsyncStorage.setItem('authToken', response.data.token);
      
      return {
        success: true,
        data: response.data,
        message: 'Login successful!',
      };
      
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
      
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Limpiar errores
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Validar email
   */
  const validateEmail = useCallback((email) => {
    return authService.isValidEmail(email);
  }, []);

  /**
   * Validar contraseña
   */
  const validatePassword = useCallback((password) => {
    return authService.validatePassword(password);
  }, []);

  return {
    // Estados
    loading,
    error,
    
    // Funciones
    register,
    login,
    clearError,
    validateEmail,
    validatePassword,
  };
};