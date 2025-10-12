import React from 'react';
import { View } from 'react-native';
import { Box, Text, useTheme } from '../theme';

// Componente SimpleBarChart para React Native
const SimpleBarChart = ({ data, height = 120, color }) => {
  const theme = useTheme();
  const defaultColor = color || theme.colors.purple350;
  const maxValue = Math.max(...data.map(item => item.count));
  
  return (
    <Box height={height} flexDirection="row" alignItems="flex-end" justifyContent="space-around" paddingVertical="sm">
      {data.map((item, index) => {
        const barHeight = (item.count / maxValue) * (height - 40);
        return (
          <Box key={index} alignItems="center" flex={1}>
            <Box
              width={20}
              height={barHeight}
              borderRadius="xs"
              marginBottom="xs"
              style={{ backgroundColor: defaultColor }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

// Componente SimplePieChart para React Native
const SimplePieChart = ({ data, size = 80 }) => {
  const theme = useTheme();
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  return (
    <Box 
      width={size} 
      height={size} 
      borderRadius="full" 
      style={{ overflow: 'hidden' }}
      position="relative"
    >
      {data.map((item, index) => {
        const percentage = item.value / total;
        const angle = percentage * 360;
        
        // Para simplificar, mostramos solo círculos concéntricos con colores
        const radius = (size / 2) - (index * 8);
        
        return (
          <Box
            key={index}
            position="absolute"
            width={radius * 2}
            height={radius * 2}
            borderRadius="full"
            style={{
              backgroundColor: item.color,
              opacity: 0.7 - (index * 0.2),
              top: (size - radius * 2) / 2,
              left: (size - radius * 2) / 2,
            }}
          />
        );
      })}
    </Box>
  );
};

export { SimpleBarChart, SimplePieChart };