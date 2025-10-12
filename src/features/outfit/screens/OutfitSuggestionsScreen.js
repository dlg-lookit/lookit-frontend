import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { 
  Button, 
  Badge, 
  Card, 
  ImageWithFallback,
  BottomNavigation 
} from '../../../components';
import { 
  Heart, 
  Shirt, 
  Bookmark, 
  Cloud, 
  ChevronDown 
} from '../../../components/Icons';

const { width } = Dimensions.get('window');

const OutfitSuggestionsScreen = ({ user, onNavigate }) => {
  const theme = useTheme();
  
  // Estados para likes y saves
  const [likedOutfits, setLikedOutfits] = useState([1]);
  const [savedOutfits, setSavedOutfits] = useState([]);

  // Datos de ejemplo para sugerencias
  const outfitSuggestions = [
    {
      image: 'https://images.unsplash.com/photo-1524282745852-a463fa495a7f?w=400',
      style: 'Minimalist',
      match: '96%',
      weather: 'Perfect for cloudy weather',
      id: 0
    },
    {
      image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?w=400',
      style: 'Modern Casual',
      match: '92%',
      weather: 'Great for mild temperatures',
      id: 1
    },
    {
      image: 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?w=400',
      style: 'Smart Casual',
      match: '89%',
      weather: 'Ideal for office wear',
      id: 2
    }
  ];

  // Datos del usuario por defecto
  const userData = user || {
    temperature: 22,
    weather: 'Cloudy'
  };

  // Alternar like
  const toggleLike = (id) => {
    setLikedOutfits(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Alternar save
  const toggleSave = (id) => {
    setSavedOutfits(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Manejar try on
  const handleTryOn = (outfit) => {
    // Demo action
    console.log('Try on outfit:', outfit.style);
  };

  // Manejar cambio de tab
  const handleTabChange = (tab) => {
    onNavigate && onNavigate(tab);
  };

  return (
    <Box flex={1} backgroundColor="background">
      {/* Header */}
      <Box paddingHorizontal="lg" paddingTop="xl" paddingBottom="md">
        <Text variant="header" marginBottom="md">
          Sugerencias de Outfits
        </Text>
        
        {/* Filtros */}
        <Box flexDirection="row" marginBottom="md" gap="sm">
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: theme.colors.background,
              borderWidth: 1,
              borderColor: theme.colors.border,
              shadowColor: theme.colors.foreground,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Cloud size={16} color={theme.colors.foreground} />
            <Text variant="caption" marginLeft="xs" marginRight="xs">
              {userData.temperature}°C Nublado
            </Text>
            <ChevronDown size={12} color={theme.colors.muted} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: theme.colors.background,
              borderWidth: 1,
              borderColor: theme.colors.border,
              shadowColor: theme.colors.foreground,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text variant="caption" marginRight="xs">
              Estilo
            </Text>
            <ChevronDown size={12} color={theme.colors.muted} />
          </TouchableOpacity>
        </Box>
      </Box>

      {/* Lista de sugerencias */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Box gap="lg">
          {outfitSuggestions.map((outfit, index) => (
            <Card key={outfit.id} padding="none" style={{ overflow: 'hidden' }}>
              {/* Imagen del outfit */}
              <Box position="relative" height={240}>
                <ImageWithFallback
                  source={{ uri: outfit.image }}
                  style={{ width: '100%', height: '100%' }}
                  fallbackText="👕"
                />
                
                {/* Badge de match */}
                <Box
                  position="absolute"
                  top={16}
                  left={16}
                >
                  <Badge variant="default" size="small">
                    <Text variant="caption" color="primaryForeground">
                      {outfit.match} match
                    </Text>
                  </Badge>
                </Box>
              </Box>

              {/* Detalles del outfit */}
              <Box padding="md">
                <Box flexDirection="row" alignItems="center" justifyContent="space-between" marginBottom="sm">
                  <Text variant="subheader">{outfit.style}</Text>
                  
                  <Box flexDirection="row" gap="sm">
                    {/* Botón Like */}
                    <TouchableOpacity
                      onPress={() => toggleLike(outfit.id)}
                      style={{
                        padding: 8,
                        borderRadius: 20,
                      }}
                    >
                      <Heart 
                        size={20} 
                        color={likedOutfits.includes(outfit.id) ? theme.colors.destructive : theme.colors.muted}
                      />
                    </TouchableOpacity>
                    
                    {/* Botón Save */}
                    <TouchableOpacity
                      onPress={() => toggleSave(outfit.id)}
                      style={{
                        padding: 8,
                        borderRadius: 20,
                      }}
                    >
                      <Bookmark 
                        size={20} 
                        color={savedOutfits.includes(outfit.id) ? theme.colors.primary : theme.colors.muted}
                        filled={savedOutfits.includes(outfit.id)}
                      />
                    </TouchableOpacity>
                  </Box>
                </Box>
                
                <Text variant="caption" color="muted" marginBottom="md">
                  {outfit.weather}
                </Text>
                
                {/* Botones de acción */}
                <Box flexDirection="row" gap="sm">
                  <Box flex={1}>
                    <Button
                      variant="primary"
                      onPress={() => handleTryOn(outfit)}
                    >
                      <Box flexDirection="row" alignItems="center" justifyContent="center">
                        <Shirt size={16} color={theme.colors.primaryForeground} />
                        <Text variant="button" marginLeft="xs">Probar</Text>
                      </Box>
                    </Button>
                  </Box>
                  
                  <Button
                    variant={savedOutfits.includes(outfit.id) ? "secondary" : "outline"}
                    onPress={() => toggleSave(outfit.id)}
                    style={{ paddingHorizontal: 24 }}
                  >
                    <Text variant="button">
                      {savedOutfits.includes(outfit.id) ? 'Guardado' : 'Guardar'}
                    </Text>
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}

          {/* Contenido patrocinado */}
          <TouchableOpacity>
            <Card 
              padding="md"
              style={{
                backgroundColor: theme.colors.amber100,
                borderColor: theme.colors.amber500,
                borderWidth: 1,
              }}
            >
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={48}
                  height={48}
                  borderRadius="md"
                  backgroundColor="amber400"
                  alignItems="center"
                  justifyContent="center"
                  marginRight="sm"
                >
                  <Text style={{ fontSize: 24 }}>👗</Text>
                </Box>
                
                <Box flex={1}>
                  <Text variant="body" marginBottom="xs">
                    Zara: Compra este look
                  </Text>
                  <Text variant="caption" color="muted">
                    Piezas seleccionadas que combinan con tu estilo
                  </Text>
                </Box>
                
                <Button
                  variant="outline"
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderColor: theme.colors.amber500,
                  }}
                >
                  <Text variant="caption" style={{ color: theme.colors.amber800 }}>
                    Comprar
                  </Text>
                </Button>
              </Box>
            </Card>
          </TouchableOpacity>
        </Box>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation currentTab="suggestions" onTabChange={handleTabChange} />
    </Box>
  );
};

export default OutfitSuggestionsScreen;