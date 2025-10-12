import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { Button, Badge, Card } from '../../../components';
import { Edit3, Palette, Star, LogOut } from '../../../components/Icons';
import BottomNavigation from '../../../components/BottomNavigation';

const StyleProfileScreen = ({ user, onNavigate, onLogout }) => {
  const theme = useTheme();
  const [selectedStyles, setSelectedStyles] = useState(['Minimalist', 'Smart-Casual', 'Urban']);
  
  const stylePreferences = [
    { name: 'Minimalist', description: 'Clean lines & simple silhouettes' },
    { name: 'Smart-Casual', description: 'Polished yet relaxed' },
    { name: 'Urban', description: 'Street-inspired & contemporary' },
    { name: 'Bohemian', description: 'Free-spirited & artistic' },
    { name: 'Classic', description: 'Timeless & elegant' },
    { name: 'Trendy', description: 'Fashion-forward & current' }
  ];

  const favoriteColors = [
    { color: theme.colors.foreground, name: 'Black' },
    { color: theme.colors.background, name: 'White' },
    { color: '#F5F5DC', name: 'Beige' },
    { color: '#8B7355', name: 'Brown' },
    { color: '#2F4F4F', name: 'Dark Slate' }
  ];
  
  const favoriteBrands = ['Zara', 'Uniqlo', 'COS', 'Everlane', 'Arket'];

  const toggleStyle = (styleName) => {
    setSelectedStyles(prev => 
      prev.includes(styleName) 
        ? prev.filter(style => style !== styleName)
        : [...prev, styleName]
    );
  };

  const handleUpdateStyle = () => {
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
          background: `linear-gradient(135deg, ${theme.colors.green50}, ${theme.colors.indigo50})`,
          backgroundColor: theme.colors.green50,
        }}
      >
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="lg">
          <Text variant="header" color="foreground">
            Style Profile
          </Text>
          <Box flexDirection="row" style={{ gap: 8 }}>
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
          <Card
            padding="xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              shadowColor: theme.colors.foreground,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
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
                  backgroundColor: theme.colors.green400,
                  background: `linear-gradient(135deg, ${theme.colors.green400}, ${theme.colors.indigo400})`,
                }}
              >
                <Star size={40} color={theme.colors.primaryForeground} />
              </Box>
              <Text variant="subheader" color="foreground" marginBottom="sm" textAlign="center">
                Modern Minimalist
              </Text>
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
                          ? theme.colors.green300 
                          : theme.colors.border,
                        backgroundColor: isSelected 
                          ? theme.colors.green50 
                          : theme.colors.gray50,
                      }}
                    >
                      <Text 
                        variant="bodySmall" 
                        marginBottom="xs"
                        style={{
                          color: isSelected 
                            ? theme.colors.green700 
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
                      backgroundColor: theme.colors.green100,
                      borderColor: theme.colors.green200,
                    }}
                  >
                    <Text
                      variant="caption"
                      style={{
                        color: theme.colors.green700,
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
            backgroundColor: theme.colors.green400,
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