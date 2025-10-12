import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Switch } from 'react-native';
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

const SignupStepTwo = ({ onBack, onComplete, onSkip }) => {
  const { isDark } = useThemeMode();
  const theme = useTheme();
  
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
  const handleComplete = () => {
    onComplete && onComplete(formData);
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