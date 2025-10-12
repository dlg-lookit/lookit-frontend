import React from 'react';
import { Alert } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeProvider';
import LoginScreen from './src/features/auth/screens/LoginScreen';

function MainApp() {
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
    Alert.alert(
      'Registro', 
      'Función de registro próximamente...',
      [{ text: 'OK' }]
    );
  };

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
