import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { Button, Badge, Card } from '../../../components';
import { Edit3, Palette, Star, LogOut, LucideArrowLeft } from '../../../components/LucideIcons';
import BottomNavigation from '../../../components/BottomNavigation';

/**
 * StyleProfileScreen Component
 *
 * TODO: This entire component is currently hardcoded and needs API integration
 * All user data (style preferences, favorite colors, brands, quiz results) should come from:
 * - GET /api/user/profile - for user style profile data
 * - PUT /api/user/preferences - for updating user preferences
 * - POST /api/user/style-quiz - for style quiz results
 *
 * Current hardcoded data should be replaced with:
 * - user.styleProfile (from API)
 * - user.preferences (from API)
 * - Dynamic style options from API
 *
 * TODO: Add useEffect to load user data on component mount:
 * useEffect(() => {
 *   // Load user style profile from API
 *   // Load user preferences from API
 * }, []);
 *
 * TODO: Consider using global state management (Redux, Context, etc.) instead of local state
 * for user preferences to maintain consistency across the app
 *
 * TODO: Add loading states and error handling for API calls:
 * - Loading spinner while fetching user data
 * - Error states for failed API requests
 * - Retry mechanisms for failed requests
 * - Offline support with cached data
 */
const StyleProfileScreen = ({ user, onNavigate, onLogout }) => {
  const theme = useTheme();
  // TODO: Replace hardcoded selected styles with user data from API
  // This should come from user.preferences.selectedStyles or similar API endpoint
  const [selectedStyles, setSelectedStyles] = useState(['Minimalist', 'Smart-Casual', 'Urban']);
  
  // TODO: Replace hardcoded style preferences with dynamic data from API
  // This should come from a styles/preferences API endpoint
  const stylePreferences = [
    { name: 'Minimalist', description: 'Clean lines & simple silhouettes' },
    { name: 'Smart-Casual', description: 'Polished yet relaxed' },
    { name: 'Urban', description: 'Street-inspired & contemporary' },
    { name: 'Bohemian', description: 'Free-spirited & artistic' },
    { name: 'Classic', description: 'Timeless & elegant' },
    { name: 'Trendy', description: 'Fashion-forward & current' }
  ];

  // TODO: Replace hardcoded favorite colors with user data from API
  // This should come from user.preferences.favoriteColors API endpoint
  const favoriteColors = [
    { color: '#000000', name: 'Black' },
    { color: '#FFFFFF', name: 'White' },
    { color: '#F5F5DC', name: 'Beige' },
    { color: '#8B7355', name: 'Brown' },
    { color: '#2F4F4F', name: 'Dark Slate' }
  ];
  
  // TODO: Replace hardcoded favorite brands with user data from API
  // This should come from user.preferences.favoriteBrands API endpoint
  const favoriteBrands = ['Zara', 'Uniqlo', 'COS', 'Everlane', 'Arket'];

  const toggleStyle = (styleName) => {
    setSelectedStyles(prev => 
      prev.includes(styleName) 
        ? prev.filter(style => style !== styleName)
        : [...prev, styleName]
    );
  };

  const handleUpdateStyle = () => {
    // TODO: Replace mock alert with actual API call to save user preferences
    // Should call API endpoint like: PUT /api/user/preferences with selectedStyles
    Alert.alert(
      'Style Updated',
      'Your style preferences have been updated successfully!',
      [{ text: 'OK' }]
    );
    console.log('Updating style preferences:', selectedStyles);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: onLogout }
      ]
    );
  };

  return (
    <Box flex={1} backgroundColor="background">
      {/* Header */}
      <Box 
        paddingTop="xxxl" 
        paddingHorizontal="lg" 
        paddingBottom="md"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.emerald50 || theme.colors.green50}, ${theme.colors.teal50 || theme.colors.indigo50})`,
          backgroundColor: theme.colors.emerald50 || theme.colors.green50,
        }}
      >
        <Box flexDirection="row" alignItems="center" marginBottom="lg">
          {/* Botón de navegación hacia atrás */}
          <TouchableOpacity
            onPress={() => onNavigate && onNavigate('home')}
            style={{
              padding: 8,
              borderRadius: 20,
              backgroundColor: theme.colors.muted + '20', // fondo semi-transparente
              marginRight: 12,
            }}
          >
            <LucideArrowLeft size={20} color={theme.colors.muted} />
          </TouchableOpacity>
          
          <Text variant="header" color="foreground">
            Style Profile
          </Text>
          
          <Box flexDirection="row" alignItems="center" style={{ marginLeft: 'auto', gap: 8 }}>
            <TouchableOpacity>
              <Edit3 size={24} color={theme.colors.muted} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <LogOut size={24} color={theme.colors.muted} />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          paddingHorizontal: 24, 
          paddingBottom: 140,
          paddingTop: 16 
        }}
        showsVerticalScrollIndicator={false}
      >
        <Box style={{ gap: 24 }}>
          {/* Style Quiz Result */}
          {/* TODO: Replace hardcoded style quiz result with user data from API */}
          {/* This should come from user.styleProfile.quizResult or similar API endpoint */}
          <Card
            padding="xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              shadowColor: theme.colors.foreground,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              borderRadius: 16,
            }}
          >
            <Box alignItems="center" marginBottom="lg">
              <Box
                width={80}
                height={80}
                borderRadius="full"
                marginBottom="md"
                alignItems="center"
                justifyContent="center"
                style={{
                  backgroundColor: theme.colors.emerald400 || theme.colors.green400,
                  background: `linear-gradient(135deg, ${theme.colors.emerald400 || theme.colors.green400}, ${theme.colors.teal400 || theme.colors.indigo400})`,
                }}
              >
                <Star size={40} color={theme.colors.primaryForeground} />
              </Box>
              {/* TODO: Replace hardcoded "Modern Minimalist" with user.styleProfile.styleType from API */}
              <Text variant="subheader" color="foreground" marginBottom="sm" textAlign="center">
                Modern Minimalist
              </Text>
              {/* TODO: Replace hardcoded description with user.styleProfile.description from API */}
              <Text variant="caption" color="muted" textAlign="center">
                Your style is characterized by clean lines, neutral colors, and thoughtful simplicity
              </Text>
            </Box>
          </Card>

          {/* Selected Styles */}
          <Card
            padding="lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              shadowColor: theme.colors.foreground,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              borderRadius: 16,
            }}
          >
            <Text variant="subheader" color="foreground" marginBottom="md">
              Your Style Preferences
            </Text>
            <Box 
              flexDirection="row" 
              flexWrap="wrap" 
              justifyContent="space-between"
            >
              {stylePreferences.map((style, index) => {
                const isSelected = selectedStyles.includes(style.name);
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: '48%',
                      marginBottom: 12,
                    }}
                    onPress={() => toggleStyle(style.name)}
                  >
                    <Box
                      padding="sm"
                      borderRadius="md"
                      borderWidth={2}
                      style={{
                        borderColor: isSelected
                          ? (theme.colors.emerald300 || theme.colors.green300)
                          : theme.colors.border,
                        backgroundColor: isSelected
                          ? (theme.colors.emerald50 || theme.colors.green50)
                          : theme.colors.gray50,
                        borderRadius: 12,
                      }}
                    >
                      <Text 
                        variant="bodySmall" 
                        marginBottom="xs"
                        style={{
                          color: isSelected 
                            ? (theme.colors.emerald700 || theme.colors.green700) 
                            : theme.colors.muted,
                          fontWeight: '600'
                        }}
                      >
                        {style.name}
                      </Text>
                      <Text variant="caption" color="muted">
                        {style.description}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </Box>
          </Card>

          {/* Favorite Colors */}
          <Card
            padding="lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              shadowColor: theme.colors.foreground,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              borderRadius: 16,
            }}
          >
            <Box flexDirection="row" alignItems="center" marginBottom="md" style={{ gap: 8 }}>
              <Palette size={20} color={theme.colors.muted} />
              <Text variant="subheader" color="foreground">
                Favorite Colors
              </Text>
            </Box>
            <Box flexDirection="row" style={{ gap: 12 }}>
              {favoriteColors.map((colorItem, index) => (
                <TouchableOpacity
                  key={index}
                >
                  <Box
                    width={40}
                    height={40}
                    borderRadius="full"
                    borderWidth={2}
                    borderColor="background"
                    style={{
                      backgroundColor: colorItem.color,
                      shadowColor: theme.colors.foreground,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </Box>
          </Card>

          {/* Favorite Brands */}
          <Card
            padding="lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              shadowColor: theme.colors.foreground,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              borderRadius: 16,
            }}
          >
            <Text variant="subheader" color="foreground" marginBottom="md">
              Favorite Brands
            </Text>
            <Box flexDirection="row" flexWrap="wrap" style={{ gap: 8 }}>
              {favoriteBrands.map((brand, index) => (
                <TouchableOpacity key={index}>
                  <Badge
                    style={{
                      backgroundColor: theme.colors.emerald100 || theme.colors.green100,
                      borderColor: theme.colors.emerald200 || theme.colors.green200,
                      borderRadius: 20,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                    }}
                  >
                    <Text
                      variant="caption"
                      style={{
                        color: theme.colors.emerald700 || theme.colors.green700,
                        fontWeight: '500'
                      }}
                    >
                      {brand}
                    </Text>
                  </Badge>
                </TouchableOpacity>
              ))}
            </Box>
          </Card>
        </Box>
      </ScrollView>

      {/* Update Button */}
      <Box
        position="absolute"
        bottom={100}
        left={24}
        right={24}
      >
        <TouchableOpacity
          onPress={handleUpdateStyle}
          style={{
            backgroundColor: theme.colors.emerald400 || theme.colors.green400,
            background: `linear-gradient(135deg, ${theme.colors.emerald400 || theme.colors.green400}, ${theme.colors.teal400 || theme.colors.indigo400})`,
            paddingVertical: 16,
            borderRadius: 16,
            shadowColor: theme.colors.foreground,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Text 
            variant="button" 
            textAlign="center"
            style={{ color: theme.colors.primaryForeground }}
          >
            Update My Style
          </Text>
        </TouchableOpacity>
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentTab="profile" 
        onTabChange={onNavigate}
      />
    </Box>
  );
};

export default StyleProfileScreen;