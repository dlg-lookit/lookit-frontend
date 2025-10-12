import React, { useState } from 'react';
import { ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, useTheme } from '../../../theme';
import { useThemeMode } from '../../../theme/ThemeProvider';
import { Button, Input, Label } from '../../../components';
import { LucideEye, LucideEyeOff } from '../../../components/LucideIcons';

// Componente Logo de Lookit (estilo referencia)
const LookitLogo = () => {
  const theme = useTheme();
  
  return (
    <Box alignItems="center" marginBottom="xxxl">
      {/* Logo principal inspirado en la referencia */}
      <Box flexDirection="row" alignItems="center" marginBottom="sm">
        {/* L */}
        <Text 
          style={{ 
            fontSize: 48, 
            fontWeight: '300',
            letterSpacing: -1,
            color: theme.colors.foreground
          }}
        >
          L
        </Text>
        
        {/* OO como lentes minimalistas (estilo referencia) */}
        <Box flexDirection="row" alignItems="center" marginHorizontal="sm">
          {/* Lente izquierdo */}
          <Box
            width={26}
            height={26}
            borderRadius="full"
            borderWidth={2.5}
            borderColor="rose400"
            backgroundColor="transparent"
            position="relative"
          >
            <Box
              width={10}
              height={10}
              borderRadius="full"
              backgroundColor="rose100"
              position="absolute"
              top={8}
              left={8}
            />
          </Box>
          
          {/* Puente */}
          <Box
            width={4}
            height={2.5}
            backgroundColor="rose400"
            marginHorizontal="xs"
          />
          
          {/* Lente derecho */}
          <Box
            width={26}
            height={26}
            borderRadius="full"
            borderWidth={2.5}
            borderColor="rose400"
            backgroundColor="transparent"
            position="relative"
          >
            <Box
              width={10}
              height={10}
              borderRadius="full"
              backgroundColor="rose100"
              position="absolute"
              top={8}
              left={8}
            />
          </Box>
        </Box>
        
        {/* kit */}
        <Text 
          style={{ 
            fontSize: 48, 
            fontWeight: '300',
            letterSpacing: -1,
            color: theme.colors.foreground
          }}
        >
          kit
        </Text>
      </Box>
      
      {/* Subtitle */}
      <Text variant="caption" color="muted">
        Your personal style companion
      </Text>
    </Box>
  );
};

const LoginScreen = ({ onLogin, onSignup }) => {
  const { isDark } = useThemeMode();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (email && password) {
      onLogin(email, password);
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar contraseña', 'Función no implementada aún');
  };

  const handleSignup = () => {
    if (onSignup) {
      onSignup();
    } else {
      Alert.alert('Registro', 'Función de registro no implementada aún');
    }
  };

  return (
    <Box flex={1} backgroundColor="background">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Elementos decorativos de fondo (estilo referencia) */}
      <Box 
        position="absolute"
        top={40}
        right={40}
        width={128}
        height={128}
        borderRadius="full"
        backgroundColor="rose100"
        opacity={0.3}
        style={{
          shadowColor: theme.colors.rose100,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 40,
          elevation: 0,
        }}
      />
      <Box 
        position="absolute"
        bottom={80}
        left={40}
        width={160}
        height={160}
        borderRadius="full"
        backgroundColor="blue100"
        opacity={0.3}
        style={{
          shadowColor: theme.colors.blue100,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 40,
          elevation: 0,
        }}
      />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Box 
          flex={1}
          justifyContent="center"
          paddingHorizontal="xl"
          paddingVertical="xxxl"
        >
          <Box maxWidth={400} alignSelf="center" width="100%">
            {/* Logo */}
            <LookitLogo />

            {/* Formulario de Login (estilo referencia) */}
            <Box>
              {/* Email */}
              <Box marginBottom="lg">
                <Label 
                  style={{ 
                    marginBottom: 8, 
                    fontSize: 14, 
                    color: theme.colors.foreground 
                  }}
                >
                  Email
                </Label>
                <Input
                  placeholder="your@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    height: 48,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                    borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    fontSize: 16,
                  }}
                />
              </Box>

              {/* Password */}
              <Box marginBottom="sm">
                <Label 
                  style={{ 
                    marginBottom: 8, 
                    fontSize: 14, 
                    color: theme.colors.foreground 
                  }}
                >
                  Password
                </Label>
                <Box position="relative">
                  <Input
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={{
                      height: 48,
                      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                      borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingRight: 48,
                      fontSize: 16,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: 12,
                      padding: 4,
                    }}
                  >
                    {showPassword ? (
                      <LucideEyeOff size={20} color={theme.colors.muted} />
                    ) : (
                      <LucideEye size={20} color={theme.colors.muted} />
                    )}
                  </TouchableOpacity>
                </Box>
              </Box>

              {/* Forgot Password */}
              <Box alignItems="flex-end" marginBottom="lg">
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text 
                    variant="caption" 
                    color="muted"
                    style={{ fontSize: 12 }}
                  >
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </Box>

              {/* Login Button (estilo referencia) */}
              <Button
                variant="primary"
                onPress={handleSubmit}
                style={{
                  height: 48,
                  backgroundColor: theme.colors.rose400,
                  borderRadius: 12,
                  shadowColor: theme.colors.rose400,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                  marginTop: 8,
                }}
              >
                <Text 
                  style={{ 
                    color: 'white', 
                    fontSize: 16, 
                    fontWeight: '500' 
                  }}
                >
                  Login
                </Text>
              </Button>
            </Box>

            {/* Sign up link */}
            <Box alignItems="center" marginTop="xl">
              <Box flexDirection="row" alignItems="center">
                <Text variant="body" color="muted" style={{ fontSize: 14 }}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={handleSignup}>
                  <Text 
                    style={{ 
                      fontSize: 14, 
                      color: theme.colors.foreground,
                      fontWeight: '500' 
                    }}
                  >
                    Sign up
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>

            {/* Demo hint (estilo referencia) */}
            <Box 
              marginTop="xl"
              backgroundColor={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)'}
              borderRadius="lg"
              padding="md"
              style={{
                borderWidth: 1,
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
              }}
            >
              <Text 
                variant="caption" 
                textAlign="center" 
                color="muted"
                style={{ fontSize: 12 }}
              >
                Demo: Enter any email and password to login, or click "Sign up" to explore the registration flow
              </Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default LoginScreen;