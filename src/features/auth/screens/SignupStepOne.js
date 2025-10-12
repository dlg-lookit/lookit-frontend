import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { 
  Input, 
  Label, 
  Button, 
  Checkbox, 
  RadioGroup 
} from '../../../components';
import { ArrowLeft } from '../../../components/Icons';

const SignupStepOne = ({ onBack, onNext }) => {
  const theme = useTheme();
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });

  // Estados de validación
  const [errors, setErrors] = useState({});

  // Opciones para el RadioGroup de género
  const genderOptions = [
    { label: 'Masculino', value: 'male' },
    { label: 'Femenino', value: 'female' },
    { label: 'Otro', value: 'other' },
  ];

  // Función de validación
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
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