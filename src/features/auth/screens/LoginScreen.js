import React, { useState } from 'react';
import { ScrollView, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, useTheme } from '../../../theme';
import { useThemeMode } from '../../../theme/ThemeProvider';
import { Button, Input, Label } from '../../../components';
import { EyeIcon, EyeOffIcon } from '../../../components/Icons';

// Componente Logo de Lookit
const LookitLogo = () => {
  const theme = useTheme();
  
  return (
    <Box alignItems="center" marginBottom="xxxl">
      {/* Logo usando imagen o texto estilizado */}
      <Box flexDirection="row" alignItems="center" marginBottom="s">
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
        
        {/* OO como lentes minimalistas */}
        <Box flexDirection="row" alignItems="center" marginHorizontal="s">
          <Box
            width={26}
            height={26}
            borderRadius="full"
            borderWidth={2.5}
            borderColor="primary"
            backgroundColor="transparent"
            marginRight="xs"
          />
          <Box
            width={26}
            height={26}
            borderRadius="full"
            borderWidth={2.5}
            borderColor="primary"
            backgroundColor="transparent"
            marginLeft="xs"
          />
        </Box>
        
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
      
      <Text variant="muted" textAlign="center">
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
      
      {/* Elementos decorativos de fondo */}
      <Box 
        position="absolute"
        top={40}
        right={40}
        width={128}
        height={128}
        borderRadius="full"
        backgroundColor="primary"
        opacity={0.05}
      />
      <Box 
        position="absolute"
        bottom={80}
        left={40}
        width={160}
        height={160}
        borderRadius="full"
        backgroundColor="error"
        opacity={0.05}
      />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Box 
          flex={1}
          justifyContent="center"
          paddingHorizontal="l"
          paddingVertical="xxxl"
        >
          <Box maxWidth={400} alignSelf="center" width="100%">
            {/* Logo */}
            <LookitLogo />

            {/* Formulario de Login */}
            <Box>
              {/* Email */}
              <Box marginBottom="m">
                <Label required>Email</Label>
                <Input
                  placeholder="your@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Box>

              {/* Password */}
              <Box marginBottom="s">
                <Label required>Password</Label>
                <Input
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  rightIcon={
                    showPassword ? (
                      <EyeOffIcon color={theme.colors.mutedText} />
                    ) : (
                      <EyeIcon color={theme.colors.mutedText} />
                    )
                  }
                  onRightIconPress={() => setShowPassword(!showPassword)}
                />
              </Box>

              {/* Forgot Password */}
              <Box alignItems="flex-end" marginBottom="l">
                <Button 
                  variant="ghost" 
                  onPress={handleForgotPassword}
                  style={{ paddingHorizontal: 0, paddingVertical: 4 }}
                >
                  <Text variant="caption" color="mutedText">
                    Forgot password?
                  </Text>
                </Button>
              </Box>

              {/* Login Button */}
              <Button
                variant="primary"
                onPress={handleSubmit}
                fullWidth
                style={{ marginBottom: theme.spacing.l }}
              >
                Login
              </Button>
            </Box>

            {/* Sign up link */}
            <Box alignItems="center" marginTop="l">
              <Box flexDirection="row" alignItems="center">
                <Text variant="muted">
                  Don't have an account?{' '}
                </Text>
                <Button 
                  variant="ghost" 
                  onPress={handleSignup}
                  style={{ paddingHorizontal: 4, paddingVertical: 0 }}
                >
                  <Text variant="body" color="primary" fontWeight="500">
                    Sign up
                  </Text>
                </Button>
              </Box>
            </Box>

            {/* Demo hint */}
            <Box 
              marginTop="xxxl"
              backgroundColor="mutedBackground"
              borderRadius="m"
              padding="m"
              opacity={0.8}
            >
              <Text variant="caption" textAlign="center" color="mutedText">
                Demo: Enter any email and password to continue
              </Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default LoginScreen;