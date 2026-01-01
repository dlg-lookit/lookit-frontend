import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { 
  Button, 
  Badge, 
  Card, 
  BottomNavigation,
  SimpleBarChart,
  SimplePieChart 
} from '../../../components';
import { 
  Trophy, 
  Flame, 
  Share2, 
  TrendingUp, 
  Shirt,
  Award 
} from '../../../components/Icons';
import { LucideArrowLeft } from '../../../components/LucideIcons';

const PersonalStatsScreen = ({ user, wardrobeStreak = 7, onNavigate }) => {
  const theme = useTheme();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Datos de ejemplo para elementos más usados
  const mostUsedItems = [
    { name: 'Blue Jeans', count: 15 },
    { name: 'White Tee', count: 12 },
    { name: 'Black Sneakers', count: 18 },
    { name: 'Denim Jacket', count: 8 }
  ];

  // Datos para uso del guardarropa
  const wardrobeUsage = [
    { name: 'Frequently Used', value: 35, color: theme.colors.green500 },
    { name: 'Occasionally Used', value: 45, color: theme.colors.warning },
    { name: 'Rarely Used', value: 20, color: theme.colors.red500 }
  ];

  // Logros
  const achievements = [
    { 
      title: 'Style Explorer', 
      description: 'Tried 5 different styles this month', 
      icon: '🎨', 
      unlocked: true 
    },
    { 
      title: 'Eco-Conscious', 
      description: 'Rewore outfits 10+ times', 
      icon: '🌱', 
      unlocked: true 
    },
    { 
      title: 'Trendsetter', 
      description: 'Created 3 unique combinations', 
      icon: '⭐', 
      unlocked: false 
    },
    { 
      title: 'Minimalist', 
      description: '80% wardrobe usage rate', 
      icon: '✨', 
      unlocked: false 
    }
  ];

  // Manejar compartir
  const handleShare = () => {
    setShareModalOpen(true);
    setTimeout(() => {
      setShareModalOpen(false);
    }, 2000);
  };

  // Manejar cambio de tab
  const handleTabChange = (tab) => {
    onNavigate && onNavigate(tab);
  };

  return (
    <Box flex={1} backgroundColor="background">
      {/* Header */}
      <Box 
        flexDirection="row" 
        alignItems="center"
        paddingHorizontal="lg" 
        paddingTop="xl" 
        paddingBottom="md"
      >
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
        
        <Text variant="header">Mis Estadísticas</Text>
        
        <Box flexDirection="row" style={{ marginLeft: 'auto' }}>
          <TouchableOpacity onPress={handleShare}>
            <Share2 size={24} color={theme.colors.muted} />
          </TouchableOpacity>
        </Box>
      </Box>

      {/* Content */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Box gap="lg">
          {/* Daily Streak */}
          <Card 
            padding="md"
            style={{
              background: `linear-gradient(to right, ${theme.colors.orange100}, ${theme.colors.amber100})`,
              backgroundColor: theme.colors.orange100,
            }}
          >
            <Box flexDirection="row" alignItems="center">
              <Box
                width={48}
                height={48}
                borderRadius="full"
                style={{ backgroundColor: theme.colors.orange400 }}
                alignItems="center"
                justifyContent="center"
                marginRight="md"
              >
                <Flame size={24} color={theme.colors.primaryForeground} />
              </Box>
              
              <Box flex={1}>
                <Text variant="subheader" marginBottom="xs">
                  ¡{wardrobeStreak} Días de Racha!
                </Text>
                <Text variant="caption" color="muted">
                  Sin repetir outfits
                </Text>
              </Box>
              
              <Box alignItems="center">
                <Text style={{ fontSize: 28, color: theme.colors.orange600, fontWeight: 'bold' }}>
                  {wardrobeStreak}
                </Text>
                <Text variant="caption" color="muted">
                  días
                </Text>
              </Box>
            </Box>
          </Card>

          {/* Most Used Items Chart */}
          <Card padding="md">
            <Box flexDirection="row" alignItems="center" marginBottom="md">
              <TrendingUp size={20} color={theme.colors.muted} />
              <Text variant="subheader" marginLeft="sm">
                Elementos Más Usados
              </Text>
            </Box>
            
            <SimpleBarChart 
              data={mostUsedItems} 
              height={120} 
              color={theme.colors.purple500}
            />
            
            <Box flexDirection="row" justifyContent="space-around" marginTop="sm">
              {mostUsedItems.map((item, index) => (
                <Box key={index} alignItems="center" flex={1}>
                  <Text variant="caption" color="muted" textAlign="center">
                    {item.name}
                  </Text>
                  <Text variant="caption" style={{ fontWeight: '600', color: theme.colors.indigo600 }}>
                    {item.count}x
                  </Text>
                </Box>
              ))}
            </Box>
          </Card>

          {/* Wardrobe Usage */}
          <Card padding="md">
            <Box flexDirection="row" alignItems="center" marginBottom="md">
              <Shirt size={20} color={theme.colors.muted} />
              <Text variant="subheader" marginLeft="sm">
                Uso del Guardarropa
              </Text>
            </Box>
            
            <Box flexDirection="row" alignItems="center">
              <Box marginRight="md">
                <SimplePieChart data={wardrobeUsage} size={80} />
              </Box>
              
              <Box flex={1} gap="sm">
                {wardrobeUsage.map((usage, index) => (
                  <Box key={index} flexDirection="row" alignItems="center">
                    <Box
                      width={12}
                      height={12}
                      borderRadius="full"
                      style={{ backgroundColor: usage.color }}
                      marginRight="sm"
                    />
                    <Text variant="caption" flex={1}>
                      {usage.name}
                    </Text>
                    <Text variant="caption" color="muted">
                      {usage.value}%
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>

          {/* Achievements */}
          <Card padding="md">
            <Box flexDirection="row" alignItems="center" marginBottom="md">
              <Trophy size={20} color={theme.colors.muted} />
              <Text variant="subheader" marginLeft="sm">
                Logros
              </Text>
            </Box>
            
            <Box flexDirection="row" flexWrap="wrap" justifyContent="space-between">
              {achievements.map((achievement, index) => (
                <Box 
                  key={index} 
                  width="48%" 
                  marginBottom="sm"
                >
                  <TouchableOpacity>
                    <Box
                      padding="sm"
                      borderRadius="md"
                      borderWidth={2}
                      style={{
                        borderColor: achievement.unlocked ? theme.colors.yellow300 : theme.colors.border,
                        backgroundColor: achievement.unlocked ? theme.colors.yellow50 : theme.colors.gray50
                      }}
                      minHeight={100}
                    >
                      <Text style={{ fontSize: 32, marginBottom: 8 }}>
                        {achievement.icon}
                      </Text>
                      <Text 
                        variant="caption" 
                        marginBottom="xs"
                        style={{ 
                          fontWeight: '600',
                          color: achievement.unlocked ? theme.colors.yellow700 : theme.colors.muted
                        }}
                      >
                        {achievement.title}
                      </Text>
                      <Text variant="caption" color="muted" style={{ fontSize: 10 }}>
                        {achievement.description}
                      </Text>
                      
                      {achievement.unlocked && (
                        <Box marginTop="xs">
                          <Badge variant="default" size="small">
                            <Box flexDirection="row" alignItems="center">
                              <Award size={12} color={theme.colors.yellow700} />
                              <Text 
                                variant="caption" 
                                marginLeft="xs"
                                style={{ fontSize: 10, color: theme.colors.yellow700 }}
                              >
                                Desbloqueado
                              </Text>
                            </Box>
                          </Badge>
                        </Box>
                      )}
                    </Box>
                  </TouchableOpacity>
                </Box>
              ))}
            </Box>
          </Card>

          {/* Share Progress Button */}
          <Button
            variant="primary"
            onPress={handleShare}
            style={{
              height: 48,
              borderRadius: 16,
              backgroundColor: theme.colors.indigo400,
              marginVertical: 16,
            }}
          >
            <Box flexDirection="row" alignItems="center" justifyContent="center">
              <Share2 size={20} color={theme.colors.primaryForeground} />
              <Text variant="button" marginLeft="sm">
                Compartir mi progreso de estilo
              </Text>
            </Box>
          </Button>
        </Box>
      </ScrollView>

      {/* Share Modal */}
      <Modal
        visible={shareModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShareModalOpen(false)}
      >
        <Box 
          flex={1} 
          backgroundColor="overlay" 
          alignItems="center" 
          justifyContent="center"
          paddingHorizontal="lg"
        >
          <Card 
            padding="xl"
            style={{ 
              width: '100%', 
              maxWidth: 300,
              backgroundColor: theme.colors.background 
            }}
          >
            <Box alignItems="center">
              <Share2 size={48} color={theme.colors.indigo400} />
              <Text variant="subheader" marginTop="md" marginBottom="sm">
                Compartiendo Progreso
              </Text>
              <Text variant="caption" color="muted" textAlign="center">
                Tu jornada de estilo se está compartiendo...
              </Text>
            </Box>
          </Card>
        </Box>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation currentTab="stats" onTabChange={handleTabChange} />
    </Box>
  );
};

export default PersonalStatsScreen;