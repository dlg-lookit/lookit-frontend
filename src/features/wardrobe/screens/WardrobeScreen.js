import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { Button, Badge, Card, ImageWithFallback } from '../../../components';
import { Plus, Camera, Filter, Search } from '../../../components/Icons';
import { LucideArrowLeft } from '../../../components/LucideIcons';
import BottomNavigation from '../../../components/BottomNavigation';

const WardrobeScreen = ({ user, onNavigate }) => {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const wardrobeItems = [
    { 
      name: 'White T-Shirt', 
      category: 'Tops', 
      worn: '3x this month', 
      image: 'https://via.placeholder.com/300x400/FFFFFF/000000?text=White+T-Shirt' 
    },
    { 
      name: 'Blue Jeans', 
      category: 'Bottoms', 
      worn: '5x this month', 
      image: 'https://via.placeholder.com/300x400/0000FF/FFFFFF?text=Blue+Jeans' 
    },
    { 
      name: 'Black Sneakers', 
      category: 'Shoes', 
      worn: '7x this month', 
      image: 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Black+Sneakers' 
    },
    { 
      name: 'Beige Coat', 
      category: 'Outerwear', 
      worn: '2x this month', 
      image: 'https://via.placeholder.com/300x400/F5F5DC/000000?text=Beige+Coat' 
    },
    { 
      name: 'Cotton Dress', 
      category: 'Dresses', 
      worn: '1x this month', 
      image: 'https://via.placeholder.com/300x400/FFB6C1/000000?text=Cotton+Dress' 
    },
    { 
      name: 'Leather Bag', 
      category: 'Accessories', 
      worn: '4x this month', 
      image: 'https://via.placeholder.com/300x400/8B4513/FFFFFF?text=Leather+Bag' 
    }
  ];

  const filters = ['All', 'Tops', 'Bottoms', 'Shoes', 'Outerwear', 'Dresses', 'Accessories'];

  const filteredItems = activeFilter === 'All' 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === activeFilter);

  const handleAddItem = () => {
    setShowAddModal(true);
    // Simulate camera/photo picker
    setTimeout(() => {
      setShowAddModal(false);
      Alert.alert('Success', 'Item added to your wardrobe!');
    }, 2000);
  };

  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <Box flex={1} backgroundColor="background">
      {/* Header */}
      <Box 
        paddingTop="xxxl" 
        paddingHorizontal="lg" 
        paddingBottom="md"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.indigo50}, ${theme.colors.blue50})`,
          backgroundColor: theme.colors.indigo50,
        }}
      >
        <Box flexDirection="row" alignItems="center" marginBottom="md">
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
            My Wardrobe
          </Text>
          
          <Box flexDirection="row" style={{ marginLeft: 'auto' }}>
            <TouchableOpacity>
              <Search size={24} color={theme.colors.muted} />
            </TouchableOpacity>
          </Box>
        </Box>

        {/* Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <Box flexDirection="row" style={{ gap: 8 }}>
            {filters.map((filter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleFilterPress(filter)}
              >
                <Badge
                  variant={filter === activeFilter ? "primary" : "secondary"}
                  style={{
                    backgroundColor: filter === activeFilter 
                      ? theme.colors.indigo400 
                      : theme.colors.background,
                    borderColor: filter === activeFilter 
                      ? theme.colors.indigo400 
                      : theme.colors.border,
                  }}
                >
                  <Text
                    variant="caption"
                    style={{
                      color: filter === activeFilter 
                        ? theme.colors.primaryForeground 
                        : theme.colors.muted
                    }}
                  >
                    {filter}
                  </Text>
                </Badge>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <Filter size={20} color={theme.colors.muted} />
            </TouchableOpacity>
          </Box>
        </ScrollView>
      </Box>

      {/* Wardrobe Grid */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          paddingHorizontal: 24, 
          paddingBottom: 120,
          paddingTop: 16 
        }}
        showsVerticalScrollIndicator={false}
      >
        <Box 
          flexDirection="row" 
          flexWrap="wrap" 
          justifyContent="space-between"
        >
          {filteredItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '48%',
                marginBottom: 16,
              }}
            >
              <Card
                padding="md"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  shadowColor: theme.colors.foreground,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Box
                  width="100%"
                  height={120}
                  borderRadius="md"
                  overflow="hidden"
                  marginBottom="sm"
                >
                  <ImageWithFallback 
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
                
                <Text variant="bodySmall" color="foreground" marginBottom="xs">
                  {item.name}
                </Text>
                
                <Text variant="caption" color="muted" marginBottom="sm">
                  {item.category}
                </Text>
                
                <Badge
                  variant="secondary"
                  style={{
                    backgroundColor: theme.colors.green50,
                    borderColor: theme.colors.green200,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Text
                    variant="caption"
                    style={{
                      color: theme.colors.green600,
                      fontSize: 10,
                    }}
                  >
                    {item.worn}
                  </Text>
                </Badge>
              </Card>
            </TouchableOpacity>
          ))}
        </Box>
      </ScrollView>

      {/* Floating Add Button */}
      <Box
        position="absolute"
        bottom={100}
        right={24}
      >
        <TouchableOpacity
          onPress={handleAddItem}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: theme.colors.indigo400,
            shadowColor: theme.colors.foreground,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box alignItems="center">
            <Plus size={20} color={theme.colors.primaryForeground} />
            <Camera size={12} color={theme.colors.primaryForeground} style={{ marginTop: 2 }} />
          </Box>
        </TouchableOpacity>
      </Box>

      {/* Add Item Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <Box 
          flex={1} 
          justifyContent="center" 
          alignItems="center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <Card
            padding="xl"
            margin="lg"
            style={{
              backgroundColor: theme.colors.background,
              maxWidth: 320,
              width: '100%',
            }}
          >
            <Box alignItems="center">
              <Camera size={48} color={theme.colors.indigo400} />
              <Text variant="subheader" marginTop="md" marginBottom="sm" textAlign="center">
                Add New Item
              </Text>
              <Text variant="caption" color="muted" textAlign="center">
                Opening camera to capture your clothing item...
              </Text>
            </Box>
          </Card>
        </Box>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentTab="wardrobe" 
        onTabChange={onNavigate}
      />
    </Box>
  );
};

export default WardrobeScreen;