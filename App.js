import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeProvider';
import LoginScreen from './src/features/auth/screens/LoginScreen';
import SignupStepOne from './src/features/auth/screens/SignupStepOne';
import SignupStepTwo from './src/features/auth/screens/SignupStepTwo';

function MainApp() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'signup-step-1' | 'signup-step-2'
  const [signupData, setSignupData] = useState(null);

  const handleLogin = (email, password) => {
    // Demo: mostrar alert con credenciales
    Alert.alert(
      '¡Login Exitoso!', 
      `Email: ${email}\nPassword: ${password.replace(/./g, '•')}`,
      [
        { text: 'OK' }
      ]
    );
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
    
    // Demo: mostrar alert con datos completos del registro
    Alert.alert(
      '¡Bienvenido a Lookit!', 
      `Cuenta creada para ${completeSignupData.firstName} ${completeSignupData.lastName}!\n\nEstilos: ${completeSignupData.preferredStyles.join(', ')}\nTallas: ${completeSignupData.shirtSize}, ${completeSignupData.pantsSize}, ${completeSignupData.shoeSize}`,
      [
        { 
          text: 'Genial!', 
          onPress: () => {
            setCurrentScreen('login');
            setSignupData(null);
          }
        }
      ]
    );
  };

  const handleSkipPersonalization = () => {
    // Demo: registro básico sin personalización
    Alert.alert(
      '¡Bienvenido a Lookit!', 
      `Cuenta creada para ${signupData.firstName} ${signupData.lastName}!\n\nPuedes personalizar tu experiencia más tarde en configuración.`,
      [
        { 
          text: 'Entendido', 
          onPress: () => {
            setCurrentScreen('login');
            setSignupData(null);
          }
        }
      ]
    );
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
    setSignupData(null);
  };

  const handleBackToStepOne = () => {
    setCurrentScreen('signup-step-1');
  };

  // Renderizar pantalla según el estado actual
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
