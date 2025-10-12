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
  ArrowRight 
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

  // Datos de ejemplo para sugerencias
  const outfitSuggestions = [
    {
      id: 1,
      style: 'Minimal',
      match: '96%',
      image: 'https://images.unsplash.com/photo-1524282745852-a463fa495a7f?w=400',
    },
    {
      id: 2,
      style: 'Casual',
      match: '89%',
      image: 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?w=400',
    },
  ];

  const handleDressMeToday = () => {
    onNavigate && onNavigate('suggestions');
  };

  const handleViewWardrobe = () => {
    onNavigate && onNavigate('wardrobe');
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

          {/* Botón CTA principal */}
          <Button
            variant="primary"
            onPress={handleDressMeToday}
            style={{
              height: 64,
              borderRadius: 16,
              backgroundColor: theme.colors.primary,
              shadowColor: theme.colors.foreground,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Box flexDirection="row" alignItems="center" justifyContent="center">
              <Box
                width={32}
                height={32}
                borderRadius="full"
                backgroundColor="primaryForeground"
                alignItems="center"
                justifyContent="center"
                marginRight="sm"
                opacity={0.2}
              >
                <Shirt size={20} color={theme.colors.primary} />
              </Box>
              <Text variant="subheader" color="primaryForeground">
                Vísteme hoy
              </Text>
            </Box>
          </Button>
        </Box>

        {/* Contenido principal */}
        <Box paddingHorizontal="lg">
          {/* Último outfit usado */}
          <TouchableOpacity onPress={handleViewWardrobe}>
            <Card marginBottom="lg" padding="md">
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={48}
                  height={48}
                  borderRadius="md"
                  overflow="hidden"
                  marginRight="sm"
                >
                  <ImageWithFallback
                    source={{
                      uri: 'https://images.unsplash.com/photo-1524282745852-a463fa495a7f?w=200'
                    }}
                    style={{ width: '100%', height: '100%' }}
                    fallbackText="👔"
                  />
                </Box>
                
                <Box flex={1}>
                  <Text variant="body" marginBottom="xs">
                    Último outfit usado
                  </Text>
                  <Text variant="caption" color="muted">
                    Ayer • Smart Casual
                  </Text>
                </Box>
                
                <ArrowRight size={16} color={theme.colors.muted} />
              </Box>
            </Card>
          </TouchableOpacity>

          {/* Sugerencias de hoy */}
          <Box marginBottom="lg">
            <Text variant="subheader" marginBottom="md">
              Sugerencias de hoy
            </Text>
            
            <Box flexDirection="row" justifyContent="space-between">
              {outfitSuggestions.map((outfit, index) => (
                <TouchableOpacity
                  key={outfit.id}
                  onPress={handleDressMeToday}
                  style={{ width: '48%' }}
                >
                  <Card padding="sm">
                    <Box
                      width="100%"
                      height={80}
                      borderRadius="md"
                      overflow="hidden"
                      marginBottom="sm"
                    >
                      <ImageWithFallback
                        source={{ uri: outfit.image }}
                        style={{ width: '100%', height: '100%' }}
                        fallbackText="👕"
                      />
                    </Box>
                    
                    <Text variant="caption" marginBottom="xs">
                      {outfit.style}
                    </Text>
                    <Text variant="caption" color="muted">
                      {outfit.match} match
                    </Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </Box>
          </Box>

          {/* Tendencias de la semana */}
          <Box marginBottom="lg">
            <Text variant="subheader" marginBottom="md">
              Tendencias de la semana
            </Text>
            
            <Card padding="md">
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={40}
                  height={40}
                  borderRadius="full"
                  backgroundColor="primary"
                  alignItems="center"
                  justifyContent="center"
                  marginRight="sm"
                >
                  <Text variant="body" color="primaryForeground">🔥</Text>
                </Box>
                
                <Box flex={1}>
                  <Text variant="body" marginBottom="xs">
                    Estilo Minimalist
                  </Text>
                  <Text variant="caption" color="muted">
                    +25% esta semana
                  </Text>
                </Box>
                
                <ArrowRight size={16} color={theme.colors.muted} />
              </Box>
            </Card>
          </Box>
        </Box>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation currentTab="home" onTabChange={handleTabChange} />
    </Box>
  );
};

export default HomeScreen;