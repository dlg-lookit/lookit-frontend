import React from 'react';
import { ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { 
  Button, 
  Card, 
  ImageWithFallback,
  BottomNavigation 
} from '../../../components';
import { 
  Sun, 
  Cloud, 
  Shirt,
  ArrowRight,
  Sparkles,
} from '../../../components/Icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ user, onNavigate }) => {
  const theme = useTheme();

  // Datos de ejemplo del usuario
  const userData = user || {
    name: 'Usuario',
    temperature: 22,
    location: 'Ciudad',
  };

  // TODO: Implementar llamada a API para obtener sugerencias de outfits
  // const outfitSuggestions = [ ... ];

  const handleDressMeToday = () => {
    onNavigate && onNavigate('suggestions');
  };

  const handleViewWardrobe = () => {
    onNavigate && onNavigate('wardrobe');
  };

  const handleTryOn = () => {
    onNavigate && onNavigate('try-on');
  };

  const handleTabChange = (tab) => {
    onNavigate && onNavigate(tab);
  };

  return (
    <Box flex={1} backgroundColor="background">
      {/* Main Content */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con saludo y clima */}
        <Box paddingHorizontal="lg" paddingTop="xl" paddingBottom="md">
          <Box flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom="lg">
            <Box flexDirection="row" alignItems="center">
              <Text variant="subheader" marginRight="sm">
                Hola {userData.name} 👋
              </Text>
              <Text variant="body" color="muted" marginRight="sm">·</Text>
              <Box flexDirection="row" alignItems="center">
                <Cloud size={16} color={theme.colors.blue400 || theme.colors.primary} />
                <Text variant="caption" color="muted" marginLeft="xs">
                  {userData.temperature}°C en {userData.location}
                </Text>
              </Box>
            </Box>
          </Box>

          {/* Botón CTA principal: Dress me today */}
          <TouchableOpacity activeOpacity={0.85} onPress={handleDressMeToday}>
            <Box
              height={64}
              borderRadius="xl"
              paddingHorizontal="lg"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              marginBottom="sm"
              style={{
                backgroundColor: '#fb7185', // similar a from-rose-400 to-pink-400
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Box
                width={32}
                height={32}
                borderRadius="full"
                alignItems="center"
                justifyContent="center"
                marginRight="sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Shirt size={20} color="#ffffff" />
              </Box>
              <Text variant="subheader" style={{ color: '#ffffff' }}>
                Dress me today
              </Text>
            </Box>
          </TouchableOpacity>

          {/* Botón Try On debajo: Virtual Try-On */}
          <TouchableOpacity activeOpacity={0.85} onPress={handleTryOn}>
            <Box
              height={56}
              borderRadius="xl"
              paddingHorizontal="lg"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              marginTop="sm"
              style={{
                backgroundColor: '#a855f7', // similar a from-purple-400 to-indigo-400
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 6,
              }}
            >
              <Box
                width={28}
                height={28}
                borderRadius="full"
                alignItems="center"
                justifyContent="center"
                marginRight="sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Sparkles size={18} color="#ffffff" />
              </Box>
              <Text variant="body" style={{ color: '#ffffff', fontWeight: '600' }}>
                Virtual Try-On
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>

        {/* Contenido principal */}
        <Box paddingHorizontal="lg">
          {/* Último outfit usado */}
          <Box marginBottom="lg">
            <Text variant="subheader" marginBottom="md">
              Último outfit usado
            </Text>
            {/* TODO: Implementar llamada a API para obtener el último outfit usado por el usuario */}
          </Box>

          {/* Sugerencias de hoy */}
          <Box marginBottom="lg">
            <Text variant="subheader" marginBottom="md">
              Sugerencias de hoy
            </Text>
            {/* TODO: Implementar llamada a API para obtener sugerencias de outfits del día */}
          </Box>

          {/* Tendencias de la semana */}
          <Box marginBottom="lg">
            <Text variant="subheader" marginBottom="md">
              Tendencias de la semana
            </Text>
            {/* TODO: Implementar llamada a API para obtener tendencias semanales de estilos */}
          </Box>
        </Box>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation currentTab="home" onTabChange={handleTabChange} />
    </Box>
  );
};

export default HomeScreen;