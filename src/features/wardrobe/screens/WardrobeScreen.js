import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { Button, Badge, Card, ImageWithFallback } from '../../../components';
import { Plus, Camera, Filter, Search } from '../../../components/Icons';
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
      image: 'https://images.unsplash.com/photo-1524282745852-a463fa495a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZmFzaGlvbiUyMGNsb3RoaW5nJTIwb3V0Zml0fGVufDF8fHx8MTc1NTA5ODY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' 
    },
    { 
      name: 'Blue Jeans', 
      category: 'Bottoms', 
      worn: '5x this month', 
      image: 'https://images.unsplash.com/photo-1655252205431-5d0ef316837b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJkcm9iZSUyMGNsb3NldCUyMGNsb3RoZXN8ZW58MXx8fHwxNzU1MDk4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' 
    },
    { 
      name: 'Black Sneakers', 
      category: 'Shoes', 
      worn: '7x this month', 
      image: 'https://images.unsplash.com/photo-1565953198075-db265882ee68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBzaG9lc3xlbnwxfHx8fDE3NTUwOTg2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' 
    },
    { 
      name: 'Beige Coat', 
      category: 'Outerwear', 
      worn: '2x this month', 
      image: 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwc3R5bGV8ZW58MXx8fHwxNzU1MDk4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' 
    },
    { 
      name: 'Cotton Dress', 
      category: 'Dresses', 
      worn: '1x this month', 
      image: 'https://images.unsplash.com/photo-1736555142217-916540c7f1b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwb3V0Zml0fGVufDF8fHx8MTc1NTA5ODY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' 
    },
    { 
      name: 'Leather Bag', 
      category: 'Accessories', 
      worn: '4x this month', 
      image: 'https://images.unsplash.com/photo-1655252205431-5d0ef316837b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJkcm9iZSUyMGNsb3NldCUyMGNsb3RoZXN8ZW58MXx8fHwxNzU1MDk4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' 
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
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="md">
          <Text variant="header" color="foreground">
            My Wardrobe
          </Text>
          <TouchableOpacity>
            <Search size={24} color={theme.colors.muted} />
          </TouchableOpacity>
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