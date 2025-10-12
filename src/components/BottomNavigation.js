import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text, useTheme } from '../theme';
import { Home, Shirt, Sparkles, BarChart3, User } from './Icons';

const BottomNavigation = ({ currentTab = 'home', onTabChange }) => {
  const theme = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'wardrobe', label: 'Wardrobe', icon: Shirt },
    { id: 'suggestions', label: 'Suggestions', icon: Sparkles },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleTabPress = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      paddingHorizontal="lg"
      paddingBottom="xl"
    >
      <Box
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        backgroundColor="background"
        borderRadius="xl"
        paddingVertical="sm"
        style={{
          shadowColor: theme.colors.foreground,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
          // Glass effect que se adapta al tema
          backgroundColor: theme.colors.background === '#ffffff' 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'rgba(42, 42, 42, 0.9)',
        }}
      >
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleTabPress(item.id)}
              style={{
                alignItems: 'center',
                paddingVertical: 4,
                minWidth: 50,
              }}
            >
              <Icon 
                size={20} 
                color={isActive ? theme.colors.primary : theme.colors.muted} 
              />
              <Text 
                variant="caption" 
                color={isActive ? 'primary' : 'muted'}
                marginTop="xs"
                style={{ fontSize: 12 }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Box>
    </Box>
  );
};

export default BottomNavigation;