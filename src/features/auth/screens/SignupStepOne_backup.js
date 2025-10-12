import React, { useState } from 'react';
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

  // Opciones para el género (siguiendo la referencia)
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  // Función de validación
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
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
  };

  // Función para manejar el envío
  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
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

            {/* Next Button (estilo referencia) */}
            <Button
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
                Next
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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.gender) {
      newErrors.gender = 'Selecciona tu género';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'Debes aceptar la política de privacidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      onNext && onNext(formData);
    }
  };

  return (
    <Box flex={1} backgroundColor="background">
      {/* Header con botón de regreso */}
      <Box 
        flexDirection="row" 
        alignItems="center" 
        paddingHorizontal="lg" 
        paddingTop="xl"
        paddingBottom="md"
      >
        <TouchableOpacity onPress={onBack}>
          <ArrowLeft size={24} color={theme.colors.foreground} />
        </TouchableOpacity>
        <Text variant="header" marginLeft="md">
          Crear cuenta
        </Text>
      </Box>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Título y descripción */}
        <Box marginBottom="xl">
          <Text variant="subheader" marginBottom="xs">
            ¡Bienvenido a Lookit!
          </Text>
          <Text variant="body" color="muted">
            Completa tu información para crear tu cuenta
          </Text>
        </Box>

        {/* Formulario */}
        <Box gap="lg">
          {/* Nombre */}
          <Box>
            <Label text="Nombre *" />
            <Input
              placeholder="Ingresa tu nombre"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              error={errors.firstName}
            />
          </Box>

          {/* Apellido */}
          <Box>
            <Label text="Apellido *" />
            <Input
              placeholder="Ingresa tu apellido"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              error={errors.lastName}
            />
          </Box>

          {/* Email */}
          <Box>
            <Label text="Email *" />
            <Input
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
          </Box>

          {/* Contraseña */}
          <Box>
            <Label text="Contraseña *" />
            <Input
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
              error={errors.password}
            />
          </Box>

          {/* Género */}
          <Box>
            <Label text="Género *" />
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleInputChange('gender', value)}
              options={genderOptions}
            />
            {errors.gender && (
              <Text variant="caption" color="destructive" marginTop="xs">
                {errors.gender}
              </Text>
            )}
          </Box>

          {/* Términos y condiciones */}
          <Box>
            <Box flexDirection="row" alignItems="flex-start" marginBottom="sm">
              <Checkbox
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
              />
              <Text variant="body" marginLeft="sm" flex={1}>
                Acepto los{' '}
                <Text variant="body" color="primary">
                  términos y condiciones
                </Text>
              </Text>
            </Box>
            {errors.acceptTerms && (
              <Text variant="caption" color="destructive">
                {errors.acceptTerms}
              </Text>
            )}
          </Box>

          {/* Política de privacidad */}
          <Box>
            <Box flexDirection="row" alignItems="flex-start" marginBottom="sm">
              <Checkbox
                checked={formData.acceptPrivacy}
                onCheckedChange={(checked) => handleInputChange('acceptPrivacy', checked)}
              />
              <Text variant="body" marginLeft="sm" flex={1}>
                Acepto la{' '}
                <Text variant="body" color="primary">
                  política de privacidad
                </Text>
              </Text>
            </Box>
            {errors.acceptPrivacy && (
              <Text variant="caption" color="destructive">
                {errors.acceptPrivacy}
              </Text>
            )}
          </Box>
        </Box>

        {/* Botón de continuar */}
        <Box marginTop="xl">
          <Button
            variant="primary"
            onPress={handleSubmit}
            disabled={Object.keys(formData).some(key => 
              key === 'acceptTerms' || key === 'acceptPrivacy' 
                ? !formData[key] 
                : !formData[key].toString().trim()
            )}
          >
            <Text variant="button">Crear cuenta</Text>
          </Button>
        </Box>

        {/* Link para iniciar sesión */}
        <Box alignItems="center" marginTop="lg">
          <Text variant="body" color="muted">
            ¿Ya tienes cuenta?{' '}
          </Text>
          <TouchableOpacity onPress={onBack}>
            <Text variant="body" color="primary">
              Inicia sesión
            </Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SignupStepOne;