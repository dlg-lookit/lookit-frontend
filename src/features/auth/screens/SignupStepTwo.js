import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, useTheme } from '../../../theme';
import { useThemeMode } from '../../../theme/ThemeProvider';
import { 
  Input, 
  Label, 
  Button,
  Card 
} from '../../../components';
import { 
  LucideArrowLeft,
  LucideShirt,
  LucideWind,
  LucideGlasses,
  LucideSparkles,
  LucideBriefcase,
  LucidePartyPopper
} from '../../../components/LucideIcons';
import authService from '../../../services/authService';

// Componente Logo de Lookit (estilo SignupStepTwo referencia con tema púrpura)
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
        
        {/* OO como lentes minimalistas con tema púrpura */}
        <Box flexDirection="row" alignItems="center" marginHorizontal="sm">
          {/* Lente izquierdo */}
          <Box
            width={20}
            height={20}
            borderRadius="full"
            borderWidth={2}
            borderColor="purple400"
            backgroundColor="transparent"
            position="relative"
          >
            <Box
              width={8}
              height={8}
              borderRadius="full"
              backgroundColor="purple100"
              position="absolute"
              top={6}
              left={6}
            />
          </Box>
          
          {/* Puente */}
          <Box
            width={4}
            height={2}
            backgroundColor="purple400"
            marginHorizontal="xs"
          />
          
          {/* Lente derecho */}
          <Box
            width={20}
            height={20}
            borderRadius="full"
            borderWidth={2}
            borderColor="purple400"
            backgroundColor="transparent"
            position="relative"
          >
            <Box
              width={8}
              height={8}
              borderRadius="full"
              backgroundColor="purple100"
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
        Personalize your experience
      </Text>
      <Text variant="caption" color="muted">
        Step 2 of 2 · Optional preferences
      </Text>
    </Box>
  );
};

const SignupStepTwo = ({ onBack, onComplete, onSkip, signupData }) => {
  const { isDark } = useThemeMode();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados del formulario (siguiendo la referencia)
  const [formData, setFormData] = useState({
    preferredStyles: [],
    shirtSize: '',
    pantsSize: '',
    shoeSize: '',
    birthday: '',
    biometricEnabled: false,
  });

  // Opciones de estilos con iconos (siguiendo la referencia)
  const styleOptions = [
    { id: 'casual', label: 'Casual', icon: LucideShirt, color: 'blue400' },
    { id: 'streetwear', label: 'Streetwear', icon: LucideWind, color: 'purple400' },
    { id: 'formal', label: 'Formal', icon: LucideBriefcase, color: 'gray600' },
    { id: 'minimal', label: 'Minimal', icon: LucideSparkles, color: 'rose400' },
    { id: 'bohemian', label: 'Bohemian', icon: LucidePartyPopper, color: 'orange400' },
    { id: 'classic', label: 'Classic', icon: LucideGlasses, color: 'green400' },
  ];

  // Alternar selección de estilo
  const handleStyleToggle = (styleId) => {
    setFormData(prev => ({
      ...prev,
      preferredStyles: prev.preferredStyles.includes(styleId)
        ? prev.preferredStyles.filter(s => s !== styleId)
        : [...prev.preferredStyles, styleId]
    }));
  };

  // Actualizar campo del formulario
  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Manejar completar registro
  const handleComplete = async () => {
    if (!signupData || !signupData.email || !signupData.password) {
      Alert.alert('Error', 'Faltan datos de registro. Regresa al paso anterior.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('📝 Attempting registration for:', signupData.email);
      console.log('📝 Signup data:', { email: signupData.email, passwordLength: signupData.password.length, firstName: signupData.firstName });

      // Intentar registro primero
      let response;
      try {
        response = await authService.register({
          email: signupData.email,
          password: signupData.password,
          username: signupData.firstName, // Usar firstName como username
        });
      } catch (registerError) {
        console.log('📝 Registration failed, checking if user already exists:', registerError.message);

        // Si el registro falla porque el usuario ya existe, intentar login directamente
        if (registerError.message.includes('User already exists') ||
            registerError.message.includes('already exists') ||
            registerError.message.includes('409')) {

          console.log('🔄 User already exists, attempting direct login...');

          const loginResponse = await authService.login({
            email: signupData.email,
            password: signupData.password,
          });

          if (loginResponse.success && loginResponse.data) {
            console.log('✅ Direct login successful for existing user');

            // Crear datos del usuario desde la respuesta de login
            const userData = {
              id: loginResponse.data.user?.id,
              name: loginResponse.data.user?.name || loginResponse.data.user?.username || signupData.firstName,
              email: loginResponse.data.user?.email || signupData.email,
              token: loginResponse.data.token,
              temperature: 22, // TODO: Obtener desde API o ubicación
              location: 'Ciudad de México', // TODO: Obtener desde API o ubicación
              preferences: formData.preferredStyles,
              sizes: {
                shirt: formData.shirtSize,
                pants: formData.pantsSize,
                shoes: formData.shoeSize,
              }
            };

            console.log('✅ Login successful for existing user:', userData.name);
            onComplete && onComplete(userData);

            Alert.alert('¡Bienvenido de vuelta!', 'Has iniciado sesión exitosamente.');
            setIsLoading(false);
            return;
          } else {
            throw new Error('User exists but login failed. Please check your password.');
          }
        } else {
          // Si es otro tipo de error, relanzarlo
          throw registerError;
        }
      }

      if (response.success && response.data) {
        console.log('✅ Registration successful, response:', response.data);

        // El registro fue exitoso, ahora hacer login automático
        console.log('✅ Registration successful, attempting auto-login...');

        const loginResponse = await authService.login({
          email: signupData.email,
          password: signupData.password,
        });

        if (loginResponse.success && loginResponse.data) {
          console.log('✅ Auto-login successful, response:', loginResponse.data);

          // Crear datos del usuario desde la respuesta de login
          const userData = {
            id: loginResponse.data.user?.id || response.data.user_id, // Usar user_id del registro si no viene en login
            name: loginResponse.data.user?.name || loginResponse.data.user?.username || signupData.firstName,
            email: loginResponse.data.user?.email || signupData.email,
            token: loginResponse.data.token,
            temperature: 22, // TODO: Obtener desde API o ubicación
            location: 'Ciudad de México', // TODO: Obtener desde API o ubicación
            preferences: formData.preferredStyles,
            sizes: {
              shirt: formData.shirtSize,
              pants: formData.pantsSize,
              shoes: formData.shoeSize,
            }
          };

          console.log('✅ Auto-login successful for new user:', userData.name);
          onComplete && onComplete(userData);

          Alert.alert('¡Bienvenido!', 'Tu cuenta ha sido creada exitosamente.');
        } else {
          console.error('❌ Auto-login failed, response:', loginResponse);

          // Fallback: Crear usuario con datos básicos del registro si el login falla
          console.log('🔄 Auto-login failed, creating user with registration data as fallback...');

          const userData = {
            id: response.data.user_id, // Usar el user_id del registro
            name: signupData.firstName,
            email: signupData.email,
            token: null, // No hay token porque login falló
            warnedAboutToken: false, // Bandera para mostrar advertencia solo una vez
            temperature: 22,
            location: 'Ciudad de México',
            preferences: formData.preferredStyles,
            sizes: {
              shirt: formData.shirtSize,
              pants: formData.pantsSize,
              shoes: formData.shoeSize,
            }
          };

          console.log('✅ User created with fallback data:', userData.name);
          onComplete && onComplete(userData);

          Alert.alert(
            'Cuenta creada',
            'Tu cuenta ha sido creada exitosamente. Podrás acceder a las funciones básicas, pero algunas características avanzadas requieren verificación de sesión.',
            [{ text: 'Entendido' }]
          );
        }
      } else {
        console.error('❌ Registration failed, response:', response);
        throw new Error('Registration response was not successful');
      }
    } catch (error) {
      console.error('❌ Registration/Login process failed:', error.message);

      // Mostrar mensaje de error específico
      let errorMessage = 'Error al crear la cuenta. Inténtalo de nuevo.';

      if (error.message.includes('User already exists') || error.message.includes('already exists')) {
        errorMessage = 'Ya existe una cuenta con este email. Intenta iniciar sesión en su lugar.';
      } else if (error.message.includes('Email is required')) {
        errorMessage = 'El email es obligatorio.';
      } else if (error.message.includes('Password is required')) {
        errorMessage = 'La contraseña es obligatoria.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      } else if (error.message.includes('401')) {
        errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
      } else if (error.message.includes('check your password')) {
        errorMessage = 'La contraseña es incorrecta. Si acabas de registrarte, intenta iniciar sesión manualmente.';
      }

      Alert.alert('Error de registro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1} backgroundColor="background">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Elementos decorativos de fondo (estilo referencia con tema púrpura) */}
      <Box 
        position="absolute"
        top={40}
        right={40}
        width={128}
        height={128}
        borderRadius="full"
        backgroundColor="purple100"
        opacity={0.3}
        style={{
          shadowColor: theme.colors.purple100,
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
        backgroundColor="indigo100"
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
            Back
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

          {/* Preferred Styles (estilo referencia) */}
          <Box marginBottom="lg">
            <Label 
              style={{ 
                marginBottom: 12, 
                fontSize: 14, 
                color: theme.colors.foreground 
              }}
            >
              What's your style? (Select all that apply)
            </Label>
            <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
              {styleOptions.map((style) => {
                const IconComponent = style.icon;
                const isSelected = formData.preferredStyles.includes(style.id);
                return (
                  <TouchableOpacity
                    key={style.id}
                    onPress={() => handleStyleToggle(style.id)}
                    style={{
                      width: '48%',
                      marginBottom: 12,
                      padding: 16,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: isSelected 
                        ? theme.colors.purple300 
                        : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'),
                      backgroundColor: isSelected 
                        ? theme.colors.purple50 
                        : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)'),
                      alignItems: 'center',
                      shadowColor: isSelected ? theme.colors.purple300 : 'transparent',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: isSelected ? 0.2 : 0,
                      shadowRadius: 4,
                      elevation: isSelected ? 2 : 0,
                    }}
                  >
                    <Box
                      width={48}
                      height={48}
                      borderRadius="full"
                      backgroundColor={style.color}
                      alignItems="center"
                      justifyContent="center"
                      marginBottom="sm"
                    >
                      <IconComponent size={24} color="white" />
                    </Box>
                    <Text 
                      style={{ 
                        fontSize: 14,
                        color: isSelected ? theme.colors.purple700 : theme.colors.muted,
                        fontWeight: isSelected ? '500' : '400',
                        textAlign: 'center'
                      }}
                    >
                      {style.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Box>
          </Box>

          {/* Sizes Section (estilo referencia) */}
          <Box marginBottom="lg">
            <Label 
              style={{ 
                marginBottom: 12, 
                fontSize: 14, 
                color: theme.colors.foreground 
              }}
            >
              Your sizes (Optional)
            </Label>
            <Box flexDirection="row" justifyContent="space-between">
              {/* Shirt Size */}
              <Box flex={1} marginRight="sm">
                <Label 
                  style={{ 
                    marginBottom: 8, 
                    fontSize: 12, 
                    color: theme.colors.muted 
                  }}
                >
                  Shirt
                </Label>
                <Input
                  placeholder="S/M/L"
                  value={formData.shirtSize}
                  onChangeText={(value) => updateField('shirtSize', value.toUpperCase())}
                  style={{
                    height: 44,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                    borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    fontSize: 16,
                    borderWidth: 1,
                    textAlign: 'center',
                  }}
                />
              </Box>

              {/* Pants Size */}
              <Box flex={1} marginHorizontal="sm">
                <Label 
                  style={{ 
                    marginBottom: 8, 
                    fontSize: 12, 
                    color: theme.colors.muted 
                  }}
                >
                  Pants
                </Label>
                <Input
                  placeholder="30/32"
                  value={formData.pantsSize}
                  onChangeText={(value) => updateField('pantsSize', value)}
                  style={{
                    height: 44,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                    borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    fontSize: 16,
                    borderWidth: 1,
                    textAlign: 'center',
                  }}
                />
              </Box>

              {/* Shoe Size */}
              <Box flex={1} marginLeft="sm">
                <Label 
                  style={{ 
                    marginBottom: 8, 
                    fontSize: 12, 
                    color: theme.colors.muted 
                  }}
                >
                  Shoes
                </Label>
                <Input
                  placeholder="9/10"
                  value={formData.shoeSize}
                  onChangeText={(value) => updateField('shoeSize', value)}
                  style={{
                    height: 44,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                    borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    fontSize: 16,
                    borderWidth: 1,
                    textAlign: 'center',
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Birthday (estilo referencia) */}
          <Box marginBottom="lg">
            <Label 
              style={{ 
                marginBottom: 8, 
                fontSize: 14, 
                color: theme.colors.foreground 
              }}
            >
              Birthday (Optional) <Text variant="caption" color="muted" style={{ fontSize: 12 }}>— for personalized recommendations</Text>
            </Label>
            <Input
              placeholder="MM/DD/YYYY"
              value={formData.birthday}
              onChangeText={(value) => updateField('birthday', value)}
              style={{
                height: 44,
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                borderRadius: 12,
                paddingHorizontal: 16,
                fontSize: 16,
                borderWidth: 1,
              }}
            />
          </Box>

          {/* Biometric Login (estilo referencia) */}
          <Card
            style={{
              padding: 16,
              backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
              borderRadius: 12,
              borderWidth: 1,
              marginBottom: 24,
            }}
          >
            <Box flexDirection="row" alignItems="center" justifyContent="space-between">
              <Box flex={1} paddingRight="md">
                <Text 
                  style={{ 
                    fontSize: 14, 
                    color: theme.colors.foreground,
                    fontWeight: '500',
                    marginBottom: 4
                  }}
                >
                  Enable biometric login
                </Text>
                <Text variant="caption" color="muted" style={{ fontSize: 12 }}>
                  Use Face ID or fingerprint to sign in
                </Text>
              </Box>
              <Switch
                value={formData.biometricEnabled}
                onValueChange={(value) => updateField('biometricEnabled', value)}
                trackColor={{ 
                  false: theme.colors.gray300, 
                  true: theme.colors.purple300 
                }}
                thumbColor={formData.biometricEnabled ? theme.colors.purple500 : theme.colors.gray500}
              />
            </Box>
          </Card>

          {/* Action buttons (estilo referencia) */}
          <Box>
            <Button
              onPress={handleComplete}
              style={{
                height: 48,
                backgroundColor: theme.colors.purple400,
                borderRadius: 12,
                shadowColor: theme.colors.purple400,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
                marginBottom: 12,
              }}
            >
              <Text 
                style={{ 
                  color: 'white', 
                  fontSize: 16, 
                  fontWeight: '500' 
                }}
              >
                Start using Lookit
              </Text>
            </Button>
            
            <TouchableOpacity onPress={onSkip} style={{ alignItems: 'center', paddingVertical: 8 }}>
              <Text 
                style={{ 
                  fontSize: 14, 
                  color: theme.colors.muted,
                }}
              >
                Skip for now
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SignupStepTwo;