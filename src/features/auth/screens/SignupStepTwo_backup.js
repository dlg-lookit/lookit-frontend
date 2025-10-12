import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { 
  Input, 
  Label, 
  Button, 
  Switch,
  Card 
} from '../../../components';
import { 
  Sparkles, 
  Shirt, 
  TrendingUp, 
  Heart, 
  Zap, 
  Target,
  Calendar,
  Fingerprint,
  ArrowRight,
  Check,
  ArrowLeft
} from '../../../components/Icons';

const SignupStepTwo = ({ onBack, onComplete, onSkip }) => {
  const theme = useTheme();
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    preferredStyles: [],
    shirtSize: '',
    pantsSize: '',
    shoeSize: '',
    birthday: '',
    biometricEnabled: false,
  });

  // Opciones de estilos con iconos
  const styleOptions = [
    { id: 'casual', name: 'Casual', icon: Shirt, color: 'blue' },
    { id: 'streetwear', name: 'Streetwear', icon: Zap, color: 'purple' },
    { id: 'formal', name: 'Formal', icon: Target, color: 'slate' },
    { id: 'minimalist', name: 'Minimalist', icon: Sparkles, color: 'rose' },
    { id: 'trendy', name: 'Trendy', icon: TrendingUp, color: 'orange' },
    { id: 'bohemian', name: 'Bohemian', icon: Heart, color: 'emerald' },
  ];

  // Tallas disponibles
  const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const pantsSizes = ['28', '30', '32', '34', '36', '38', '40'];
  const shoeSizes = ['6', '7', '8', '9', '10', '11', '12', '13'];

  // Alternar selección de estilo
  const toggleStyle = (styleId) => {
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

  // Componente de botón de talla
  const SizeButton = ({ size, selectedSize, onSelect }) => {
    const isSelected = selectedSize === size;
    return (
      <TouchableOpacity
        onPress={() => onSelect(size)}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: isSelected ? theme.colors.primary : theme.colors.gray300,
          backgroundColor: isSelected ? theme.colors.primary : theme.colors.background,
          marginRight: 8,
          marginBottom: 8,
        }}
      >
        <Text 
          variant="body" 
          color={isSelected ? 'primaryForeground' : 'foreground'}
          textAlign="center"
        >
          {size}
        </Text>
      </TouchableOpacity>
    );
  };

  // Componente de opción de estilo
  const StyleOption = ({ style }) => {
    const isSelected = formData.preferredStyles.includes(style.id);
    const Icon = style.icon;
    
    return (
      <TouchableOpacity
        onPress={() => toggleStyle(style.id)}
        style={{
          flex: 1,
          margin: 6,
          padding: 16,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: isSelected ? theme.colors.primary : theme.colors.gray300,
          backgroundColor: isSelected ? theme.colors.primaryMuted : theme.colors.background,
          alignItems: 'center',
          minHeight: 80,
        }}
      >
        <Icon size={24} color={isSelected ? theme.colors.primary : theme.colors.foreground} />
        <Text 
          variant="body" 
          color={isSelected ? 'primary' : 'foreground'}
          marginTop="xs"
          textAlign="center"
        >
          {style.name}
        </Text>
        {isSelected && (
          <Box
            position="absolute"
            top={8}
            right={8}
            width={20}
            height={20}
            borderRadius="full"
            backgroundColor="primary"
            alignItems="center"
            justifyContent="center"
          >
            <Check size={12} color={theme.colors.primaryForeground} />
          </Box>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Box flex={1} backgroundColor="background">
      {/* Header con progreso */}
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
        <Box flex={1} alignItems="center">
          <Text variant="header">Personaliza tu experiencia</Text>
          <Text variant="caption" color="muted" marginTop="xs">
            Paso 2 de 2 · Opcional pero recomendado
          </Text>
        </Box>
      </Box>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Icono y título principal */}
        <Box alignItems="center" marginBottom="xl">
          <Box
            width={64}
            height={64}
            borderRadius="full"
            backgroundColor="primary"
            alignItems="center"
            justifyContent="center"
            marginBottom="md"
          >
            <Sparkles size={32} color={theme.colors.primaryForeground} />
          </Box>
        </Box>

        {/* Estilos preferidos */}
        <Card marginBottom="lg">
          <Label text="¿Cuál es tu estilo?" />
          <Text variant="caption" color="muted" marginTop="xs" marginBottom="md">
            Selecciona todos los que apliquen
          </Text>
          
          <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {styleOptions.map((style, index) => (
              <Box key={style.id} width="48%" marginBottom="sm">
                <StyleOption style={style} />
              </Box>
            ))}
          </Box>
        </Card>

        {/* Tallas */}
        <Card marginBottom="lg">
          <Label text="Tus tallas" />
          <Text variant="caption" color="muted" marginTop="xs" marginBottom="md">
            Ayúdanos a recomendarte el ajuste perfecto
          </Text>
          
          {/* Talla de camisa */}
          <Box marginBottom="md">
            <Text variant="body" color="muted" marginBottom="sm">Camisa</Text>
            <Box flexDirection="row" flexWrap="wrap">
              {shirtSizes.map((size) => (
                <SizeButton
                  key={size}
                  size={size}
                  selectedSize={formData.shirtSize}
                  onSelect={(size) => updateField('shirtSize', size)}
                />
              ))}
            </Box>
          </Box>

          {/* Talla de pantalón */}
          <Box marginBottom="md">
            <Text variant="body" color="muted" marginBottom="sm">Pantalón (cintura)</Text>
            <Box flexDirection="row" flexWrap="wrap">
              {pantsSizes.map((size) => (
                <SizeButton
                  key={size}
                  size={size}
                  selectedSize={formData.pantsSize}
                  onSelect={(size) => updateField('pantsSize', size)}
                />
              ))}
            </Box>
          </Box>

          {/* Talla de zapatos */}
          <Box>
            <Text variant="body" color="muted" marginBottom="sm">Zapatos (US)</Text>
            <Box flexDirection="row" flexWrap="wrap">
              {shoeSizes.map((size) => (
                <SizeButton
                  key={size}
                  size={size}
                  selectedSize={formData.shoeSize}
                  onSelect={(size) => updateField('shoeSize', size)}
                />
              ))}
            </Box>
          </Box>
        </Card>

        {/* Fecha de nacimiento */}
        <Card marginBottom="lg">
          <Box flexDirection="row" alignItems="flex-start" marginBottom="sm">
            <Calendar size={20} color={theme.colors.primary} />
            <Box flex={1} marginLeft="sm">
              <Label text="Fecha de nacimiento" />
              <Text variant="caption" color="muted" marginTop="xs">
                Recibe sorpresas especiales de cumpleaños y recomendaciones
              </Text>
            </Box>
          </Box>
          
          <Input
            placeholder="DD/MM/AAAA"
            value={formData.birthday}
            onChangeText={(value) => updateField('birthday', value)}
            keyboardType="numeric"
          />
        </Card>

        {/* Login biométrico */}
        <Card marginBottom="xl">
          <Box flexDirection="row" alignItems="center" justifyContent="space-between">
            <Box flexDirection="row" alignItems="flex-start" flex={1}>
              <Fingerprint size={20} color={theme.colors.primary} />
              <Box flex={1} marginLeft="sm">
                <Label text="Login biométrico" />
                <Text variant="caption" color="muted" marginTop="xs">
                  Usa huella digital o Face ID para acceso rápido
                </Text>
              </Box>
            </Box>
            <Switch
              checked={formData.biometricEnabled}
              onCheckedChange={(checked) => updateField('biometricEnabled', checked)}
            />
          </Box>
        </Card>

        {/* Botones de acción */}
        <Box gap="md">
          <Button
            variant="primary"
            onPress={handleComplete}
          >
            <Box flexDirection="row" alignItems="center" justifyContent="center">
              <Text variant="button">Comenzar a usar Lookit</Text>
              <ArrowRight size={20} color={theme.colors.primaryForeground} />
            </Box>
          </Button>

          <TouchableOpacity onPress={onSkip}>
            <Text variant="body" color="muted" textAlign="center" paddingVertical="md">
              Omitir por ahora
            </Text>
          </TouchableOpacity>
        </Box>

        {/* Mensaje informativo */}
        <Box alignItems="center" marginTop="md">
          <Text variant="caption" color="muted" textAlign="center" paddingHorizontal="lg">
            Siempre puedes actualizar estas preferencias más tarde en la configuración de tu perfil
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SignupStepTwo;