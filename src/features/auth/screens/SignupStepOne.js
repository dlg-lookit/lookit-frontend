import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, useTheme } from '../../../theme';
import { useThemeMode } from '../../../theme/ThemeProvider';
import { 
  Input, 
  Label, 
  Button, 
  Checkbox, 
  RadioGroup 
} from '../../../components';
import { LucideArrowLeft, LucideEye, LucideEyeOff } from '../../../components/LucideIcons';
import { useAuth } from '../../../hooks/useAuth';

// Componente Logo de Lookit (estilo SignupStepOne referencia)
const LookitLogo = () => {
  const theme = useTheme();
  
  return (
    <Box alignItems="center" marginBottom="xl">
      {/* Logo principal inspirado en la referencia */}
      <Box flexDirection="row" alignItems="center" marginBottom="sm">
        {/* L */}
        <Text 
          style={{ 
            fontSize: 38, 
            fontWeight: '300',
            letterSpacing: -1,
            color: theme.colors.foreground
          }}
        >
          L
        </Text>
        
        {/* OO como lentes minimalistas */}
        <Box flexDirection="row" alignItems="center" marginHorizontal="sm">
          {/* Lente izquierdo */}
          <Box
            width={20}
            height={20}
            borderRadius="full"
            borderWidth={2}
            borderColor="rose400"
            backgroundColor="transparent"
            position="relative"
          >
            <Box
              width={8}
              height={8}
              borderRadius="full"
              backgroundColor="rose100"
              position="absolute"
              top={6}
              left={6}
            />
          </Box>
          
          {/* Puente */}
          <Box
            width={4}
            height={2}
            backgroundColor="rose400"
            marginHorizontal="xs"
          />
          
          {/* Lente derecho */}
          <Box
            width={20}
            height={20}
            borderRadius="full"
            borderWidth={2}
            borderColor="rose400"
            backgroundColor="transparent"
            position="relative"
          >
            <Box
              width={8}
              height={8}
              borderRadius="full"
              backgroundColor="rose100"
              position="absolute"
              top={6}
              left={6}
            />
          </Box>
        </Box>
        
        {/* kit */}
        <Text 
          style={{ 
            fontSize: 38, 
            fontWeight: '300',
            letterSpacing: -1,
            color: theme.colors.foreground
          }}
        >
          kit
        </Text>
      </Box>
      
      {/* Title and Step indicator */}
      <Text 
        style={{ 
          fontSize: 20, 
          color: theme.colors.foreground,
          marginBottom: 4,
          fontWeight: '400'
        }}
      >
        Create your account
      </Text>
      <Text variant="caption" color="muted">
        Step 1 of 2 · Essential information
      </Text>
    </Box>
  );
};

const SignupStepOne = ({ onBack, onNext }) => {
  const { isDark } = useThemeMode();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  
  // Hook de autenticación
  const { register, loading, error, clearError, validateEmail, validatePassword } = useAuth();
  
  // Estados del formulario (siguiendo la referencia)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    displayName: '',
    gender: '',
    acceptedTerms: false,
  });

  // Estados de validación
  const [errors, setErrors] = useState({});

  // Limpiar errores de la API cuando el usuario empiece a escribir
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // Opciones para el género (siguiendo la referencia)
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  // Función de validación mejorada
  const validateForm = () => {
    const newErrors = {};

    // Validar email con el servicio
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validar contraseña con el servicio
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = 'Password must be at least 6 characters long';
      }
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para manejar cambios en el formulario
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Limpiar errores de la API
    if (error) {
      clearError();
    }
  };

  // Función para manejar el envío con registro en API
  const handleSubmit = async () => {
    // Primero validar el formulario
    if (!validateForm()) {
      return;
    }

    try {
      // Intentar registrar el usuario en la API
      const result = await register({
        email: formData.email,
        password: formData.password,
        username: formData.username,
      });

      if (result.success) {
        // Si el registro es exitoso, mostrar mensaje y continuar al siguiente paso
        Alert.alert(
          'Success!',
          result.message || 'Account created successfully!',
          [
            {
              text: 'Continue',
              onPress: () => {
                // Pasar todos los datos del formulario al siguiente paso
                onNext({
                  ...formData,
                  apiData: result.data, // Incluir datos de la API
                });
              }
            }
          ]
        );
      } else {
        // Mostrar error específico de la API
        Alert.alert(
          'Registration Failed',
          result.error || 'Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (err) {
      // Error inesperado
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again.',
        [{ text: 'OK' }]
      );
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

      {/* Header con botón de regreso */}
      <Box 
        paddingTop="xl" 
        paddingHorizontal="lg" 
        marginBottom="md"
      >
        <TouchableOpacity
          onPress={onBack}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <LucideArrowLeft size={20} color={theme.colors.muted} />
          <Text 
            variant="caption" 
            color="muted" 
            style={{ marginLeft: 8, fontSize: 14 }}
          >
            Back to login
          </Text>
        </TouchableOpacity>
      </Box>
      
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          flexGrow: 1,
          paddingHorizontal: 32,
          paddingBottom: 32,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Box maxWidth={400} alignSelf="center" width="100%">
          {/* Logo */}
          <LookitLogo />

          {/* Formulario de Signup (estilo referencia) */}
          <Box>
            {/* Email */}
            <Box marginBottom="md">
              <Label 
                style={{ 
                  marginBottom: 8, 
                  fontSize: 14, 
                  color: theme.colors.foreground 
                }}
              >
                Email *
              </Label>
              <Input
                placeholder="your@email.com"
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  height: 44,
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                  borderColor: errors.email ? theme.colors.red400 : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'),
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  borderWidth: 1,
                }}
              />
              {errors.email && (
                <Text variant="caption" color="red500" style={{ marginTop: 4, fontSize: 12 }}>
                  {errors.email}
                </Text>
              )}
            </Box>

            {/* Password */}
            <Box marginBottom="md">
              <Label 
                style={{ 
                  marginBottom: 8, 
                  fontSize: 14, 
                  color: theme.colors.foreground 
                }}
              >
                Password *
              </Label>
              <Box position="relative">
                <Input
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChangeText={(value) => handleChange('password', value)}
                  secureTextEntry={!showPassword}
                  style={{
                    height: 44,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                    borderColor: errors.password ? theme.colors.red400 : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'),
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingRight: 48,
                    fontSize: 16,
                    borderWidth: 1,
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
              {errors.password && (
                <Text variant="caption" color="red500" style={{ marginTop: 4, fontSize: 12 }}>
                  {errors.password}
                </Text>
              )}
            </Box>

            {/* Username */}
            <Box marginBottom="md">
              <Label 
                style={{ 
                  marginBottom: 8, 
                  fontSize: 14, 
                  color: theme.colors.foreground 
                }}
              >
                Username *
              </Label>
              <Input
                placeholder="@yourusername"
                value={formData.username}
                onChangeText={(value) => handleChange('username', value.toLowerCase().replace(/\s/g, ''))}
                autoCapitalize="none"
                style={{
                  height: 44,
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                  borderColor: errors.username ? theme.colors.red400 : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'),
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  borderWidth: 1,
                }}
              />
              {errors.username && (
                <Text variant="caption" color="red500" style={{ marginTop: 4, fontSize: 12 }}>
                  {errors.username}
                </Text>
              )}
            </Box>

            {/* Display Name */}
            <Box marginBottom="md">
              <Label 
                style={{ 
                  marginBottom: 8, 
                  fontSize: 14, 
                  color: theme.colors.foreground 
                }}
              >
                Display name *
              </Label>
              <Input
                placeholder="Your name or nickname"
                value={formData.displayName}
                onChangeText={(value) => handleChange('displayName', value)}
                style={{
                  height: 44,
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                  borderColor: errors.displayName ? theme.colors.red400 : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'),
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  borderWidth: 1,
                }}
              />
              {errors.displayName && (
                <Text variant="caption" color="red500" style={{ marginTop: 4, fontSize: 12 }}>
                  {errors.displayName}
                </Text>
              )}
            </Box>

            {/* Gender */}
            <Box marginBottom="md">
              <Label 
                style={{ 
                  marginBottom: 8, 
                  fontSize: 14, 
                  color: theme.colors.foreground 
                }}
              >
                Gender * <Text variant="caption" color="muted" style={{ fontSize: 12 }}>(for personalized suggestions)</Text>
              </Label>
              <Box flexDirection="row" justifyContent="space-between" marginTop="sm">
                {genderOptions.map((option) => {
                  const isSelected = formData.gender === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleChange('gender', option.value)}
                      style={{
                        flex: 1,
                        marginHorizontal: 4,
                        height: 44,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: isSelected ? theme.colors.rose300 : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'),
                        backgroundColor: isSelected ? theme.colors.rose50 : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)'),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text 
                        style={{ 
                          fontSize: 14,
                          color: isSelected ? theme.colors.rose700 : theme.colors.muted,
                          fontWeight: isSelected ? '500' : '400'
                        }}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </Box>
              {errors.gender && (
                <Text variant="caption" color="red500" style={{ marginTop: 4, fontSize: 12 }}>
                  {errors.gender}
                </Text>
              )}
            </Box>

            {/* Terms and Conditions */}
            <Box flexDirection="row" alignItems="flex-start" marginBottom="lg" marginTop="sm">
              <TouchableOpacity
                onPress={() => handleChange('acceptedTerms', !formData.acceptedTerms)}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: errors.acceptedTerms ? theme.colors.red400 : theme.colors.border,
                  backgroundColor: formData.acceptedTerms ? theme.colors.rose400 : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 2,
                  marginRight: 12,
                }}
              >
                {formData.acceptedTerms && (
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>✓</Text>
                )}
              </TouchableOpacity>
              <Box flex={1}>
                <Text variant="caption" color="muted" style={{ fontSize: 14, lineHeight: 20 }}>
                  I accept the{' '}
                  <Text style={{ color: theme.colors.foreground, fontWeight: '500' }}>terms and conditions</Text>
                  {' '}and{' '}
                  <Text style={{ color: theme.colors.foreground, fontWeight: '500' }}>privacy policy</Text>
                </Text>
                {errors.acceptedTerms && (
                  <Text variant="caption" color="red500" style={{ marginTop: 4, fontSize: 12 }}>
                    {errors.acceptedTerms}
                  </Text>
                )}
              </Box>
            </Box>

            {/* Error de la API */}
            {error && (
              <Box 
                backgroundColor="red50"
                borderColor="red200"
                borderWidth={1}
                borderRadius="lg"
                padding="md"
                marginTop="md"
              >
                <Text 
                  style={{ 
                    color: theme.colors.red600,
                    fontSize: 14,
                    textAlign: 'center'
                  }}
                >
                  {error}
                </Text>
              </Box>
            )}

            {/* Next Button (estilo referencia) */}
            <Button
              onPress={handleSubmit}
              disabled={loading}
              style={{
                height: 48,
                backgroundColor: loading ? theme.colors.gray400 : theme.colors.rose400,
                borderRadius: 12,
                shadowColor: loading ? 'transparent' : theme.colors.rose400,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: loading ? 0 : 0.3,
                shadowRadius: 8,
                elevation: loading ? 0 : 8,
                marginTop: 16,
                opacity: loading ? 0.7 : 1,
              }}
            >
              <Text 
                style={{ 
                  color: 'white', 
                  fontSize: 16, 
                  fontWeight: '500' 
                }}
              >
                {loading ? 'Creating Account...' : 'Next'}
              </Text>
            </Button>
          </Box>

          {/* Already have account link */}
          <Box alignItems="center" marginTop="lg">
            <Box flexDirection="row" alignItems="center">
              <Text variant="body" color="muted" style={{ fontSize: 14 }}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={onBack}>
                <Text 
                  style={{ 
                    fontSize: 14, 
                    color: theme.colors.foreground,
                    fontWeight: '500' 
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SignupStepOne;