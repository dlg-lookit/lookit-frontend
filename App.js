import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeProvider';
import LoginScreen from './src/features/auth/screens/LoginScreen';
import SignupStepOne from './src/features/auth/screens/SignupStepOne';
import SignupStepTwo from './src/features/auth/screens/SignupStepTwo';
import HomeScreen from './src/features/home/screens/HomeScreen';
import OutfitSuggestionsScreen from './src/features/outfit/screens/OutfitSuggestionsScreen';
import TryOnScreen from './src/features/outfit/screens/TryOnScreen';
import PersonalStatsScreen from './src/features/stats/screens/PersonalStatsScreen';
import WardrobeScreen from './src/features/wardrobe/screens/WardrobeScreen';
import StyleProfileScreen from './src/features/profile/screens/StyleProfileScreen';
import authService from './src/services/authService';

function MainApp() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'signup-step-1' | 'signup-step-2' | 'home' | 'suggestions' | 'wardrobe' | 'stats' | 'profile'
  const [signupData, setSignupData] = useState(null);
  const [user, setUser] = useState(null);

  // Función para verificar autenticación antes de navegar
  const requireAuth = (callback) => {
    if (!user) {
      console.warn('🚫 Attempted navigation without user, redirecting to login');
      setCurrentScreen('login');
      Alert.alert('Sesión requerida', 'Debes iniciar sesión para acceder a esta función.');
      return false;
    }

    // Si el usuario existe pero no tiene token, permitir acceso con advertencia
    if (!user.token) {
      console.warn('⚠️ User exists but no token - allowing access with limited functionality');
      // Mostrar advertencia solo una vez por sesión
      if (!user.warnedAboutToken) {
        setUser({...user, warnedAboutToken: true});
        Alert.alert(
          'Sesión no verificada',
          'Tu cuenta fue creada pero la sesión no está completamente verificada. Algunas funciones avanzadas pueden requerir que inicies sesión nuevamente.',
          [{ text: 'Entendido' }]
        );
      }
    }

    return callback();
  };

  const handleLogin = async (email, password) => {
    try {
      console.log('🔐 Attempting login for:', email);

      // Llamar a la API real de autenticación
      const response = await authService.login({ email, password });

      if (response.success && response.data) {
        // Extraer datos del usuario desde la respuesta de la API
        const userData = {
          id: response.data.user?.id,
          name: response.data.user?.name || response.data.user?.username || email.split('@')[0],
          email: response.data.user?.email || email,
          token: response.data.token,
          temperature: 22, // TODO: Obtener desde API o ubicación
          location: 'Ciudad de México', // TODO: Obtener desde API o ubicación
        };

        console.log('✅ Login successful for user:', userData.name);
        setUser(userData);
        setCurrentScreen('home');
      } else {
        throw new Error('Login response was not successful');
      }
    } catch (error) {
      console.error('❌ Login failed:', error.message);

      // Mostrar mensaje de error específico
      let errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';

      if (error.message.includes('Invalid credentials')) {
        errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.';
      } else if (error.message.includes('User not found')) {
        errorMessage = 'Usuario no encontrado. ¿Quieres registrarte?';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      }

      Alert.alert('Error de inicio de sesión', errorMessage);
    }
  };

  const handleSignup = () => {
    setCurrentScreen('signup-step-1');
  };

  const handleSignupStepOne = (formData) => {
    setSignupData(formData);
    setCurrentScreen('signup-step-2');
  };

  const handleSignupStepTwo = (userData) => {
    if (userData) {
      // Usuario registrado (con o sin token)
      setUser(userData);
      setCurrentScreen('home');
      setSignupData(null);
    } else {
      // No hay usuario - mantener en login
      setCurrentScreen('login');
      setSignupData(null);
    }
  };

  const handleSkipPersonalization = (userData) => {
    if (userData) {
      // Usuario registrado (con o sin token)
      setUser(userData);
      setCurrentScreen('home');
      setSignupData(null);
    } else {
      // No hay usuario - mantener en login
      setCurrentScreen('login');
      setSignupData(null);
    }
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
    setSignupData(null);
  };

  const handleBackToStepOne = () => {
    setCurrentScreen('signup-step-1');
  };

  // Función general para navegación hacia atrás
  const handleGoBack = () => {
    switch (currentScreen) {
      case 'signup-step-1':
        setCurrentScreen('login');
        setSignupData(null);
        break;
      case 'signup-step-2':
        setCurrentScreen('signup-step-1');
        break;
      case 'suggestions':
      case 'wardrobe':
      case 'stats':
      case 'profile':
      case 'try-on':
        setCurrentScreen('home');
        break;
      default:
        setCurrentScreen('home'); // fallback
        break;
    }
  };

  const handleHomeNavigation = (destination) => {
    // Verificar autenticación antes de navegar
    requireAuth(() => {
      // Navegar a diferentes pantallas
      if (destination === 'home' || destination === 'suggestions' || destination === 'wardrobe' || destination === 'stats' || destination === 'profile' || destination === 'try-on') {
        setCurrentScreen(destination);
      } else {
        // Para otras navegaciones, mostrar demo
        Alert.alert(
          'Navegación',
          `Navegar a: ${destination}`,
          [{ text: 'OK' }]
        );
      }
    });
  };

  const handleLogout = async () => {
    try {
      // TODO: Llamar a la API de logout si es necesario
      // await authService.logout();

      console.log('👋 User logged out');
      setUser(null);
      setCurrentScreen('login');
      setSignupData(null);

      Alert.alert('Sesión cerrada', 'Has cerrado sesión exitosamente.');
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Aun si hay error, limpiar el estado local
      setUser(null);
      setCurrentScreen('login');
      setSignupData(null);
    }
  };

  // Verificar autenticación al renderizar
  useEffect(() => {
    const protectedScreens = ['home', 'suggestions', 'wardrobe', 'stats', 'profile', 'try-on'];
    if (protectedScreens.includes(currentScreen) && !user) {
      console.warn('🚫 Attempted to access protected screen without authentication, redirecting to login');
      setCurrentScreen('login');
    }
  }, [currentScreen, user]);

  // Renderizar pantalla según el estado actual
  if (currentScreen === 'home' && user) {
    return (
      <HomeScreen 
        user={user}
        onNavigate={handleHomeNavigation}
        onLogout={handleLogout}
      />
    );
  }

  if (currentScreen === 'suggestions' && user) {
    return (
      <OutfitSuggestionsScreen 
        user={user}
        onNavigate={handleHomeNavigation}
      />
    );
  }

  if (currentScreen === 'wardrobe' && user) {
    return (
      <WardrobeScreen 
        user={user}
        onNavigate={handleHomeNavigation}
      />
    );
  }

  if (currentScreen === 'stats' && user) {
    return (
      <PersonalStatsScreen 
        user={user}
        onNavigate={handleHomeNavigation}
      />
    );
  }

  if (currentScreen === 'profile' && user) {
    return (
      <StyleProfileScreen 
        user={user}
        onNavigate={handleHomeNavigation}
        onLogout={handleLogout}
      />
    );
  }

  if (currentScreen === 'try-on' && user) {
    return (
      <TryOnScreen 
        onNavigate={handleHomeNavigation}
      />
    );
  }

  if (currentScreen === 'signup-step-1') {
    return (
      <SignupStepOne 
        onBack={handleBackToLogin}
        onNext={handleSignupStepOne}
      />
    );
  }

  if (currentScreen === 'signup-step-2') {
    return (
      <SignupStepTwo 
        signupData={signupData}
        onBack={handleBackToStepOne}
        onComplete={handleSignupStepTwo}
        onSkip={handleSkipPersonalization}
      />
    );
  }

  return (
    <LoginScreen 
      onLogin={handleLogin}
      onSignup={handleSignup}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider initialMode="system">
      <MainApp />
    </ThemeProvider>
  );
}
