import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeProvider';
import LoginScreen from './src/features/auth/screens/LoginScreen';
import SignupStepOne from './src/features/auth/screens/SignupStepOne';
import SignupStepTwo from './src/features/auth/screens/SignupStepTwo';
import HomeScreen from './src/features/home/screens/HomeScreen';
import OutfitSuggestionsScreen from './src/features/outfit/screens/OutfitSuggestionsScreen';
import PersonalStatsScreen from './src/features/stats/screens/PersonalStatsScreen';
import WardrobeScreen from './src/features/wardrobe/screens/WardrobeScreen';
import StyleProfileScreen from './src/features/profile/screens/StyleProfileScreen';

function MainApp() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'signup-step-1' | 'signup-step-2' | 'home' | 'suggestions' | 'wardrobe' | 'stats' | 'profile'
  const [signupData, setSignupData] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = (email, password) => {
    // Demo: simular login exitoso
    const userData = {
      name: email.split('@')[0],
      email: email,
      temperature: 22,
      location: 'Ciudad de México',
    };
    
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleSignup = () => {
    setCurrentScreen('signup-step-1');
  };

  const handleSignupStepOne = (formData) => {
    setSignupData(formData);
    setCurrentScreen('signup-step-2');
  };

  const handleSignupStepTwo = (personalizeData) => {
    const completeSignupData = {
      ...signupData,
      ...personalizeData
    };
    
    // Demo: crear usuario y ir a home
    const userData = {
      name: completeSignupData.firstName,
      email: completeSignupData.email,
      temperature: 22,
      location: 'Ciudad de México',
      preferences: completeSignupData.preferredStyles,
      sizes: {
        shirt: completeSignupData.shirtSize,
        pants: completeSignupData.pantsSize,
        shoes: completeSignupData.shoeSize,
      }
    };
    
    setUser(userData);
    setCurrentScreen('home');
    setSignupData(null);
  };

  const handleSkipPersonalization = () => {
    // Demo: registro básico sin personalización
    const userData = {
      name: signupData.firstName,
      email: signupData.email,
      temperature: 22,
      location: 'Ciudad de México',
    };
    
    setUser(userData);
    setCurrentScreen('home');
    setSignupData(null);
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
    setSignupData(null);
  };

  const handleBackToStepOne = () => {
    setCurrentScreen('signup-step-1');
  };

  const handleHomeNavigation = (destination) => {
    // Navegar a diferentes pantallas
    if (destination === 'home' || destination === 'suggestions' || destination === 'wardrobe' || destination === 'stats' || destination === 'profile') {
      setCurrentScreen(destination);
    } else {
      // Para otras navegaciones, mostrar demo
      Alert.alert(
        'Navegación', 
        `Navegar a: ${destination}`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

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
