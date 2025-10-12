import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text, useTheme } from '../theme';

// Componente Checkbox reutilizable
const Checkbox = ({ 
  checked = false, 
  onCheckedChange, 
  disabled = false,
  size = 20,
  style,
  ...props 
}) => {
  const theme = useTheme();
  
  const handlePress = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      disabled={disabled}
      style={style}
      {...props}
    >
      <Box
        width={size}
        height={size}
        borderRadius="xs"
        borderWidth={2}
        borderColor={checked ? 'primary' : 'gray300'}
        backgroundColor={checked ? 'primary' : 'transparent'}
        alignItems="center"
        justifyContent="center"
        opacity={disabled ? 0.5 : 1}
      >
        {checked && (
          <Text 
            style={{ 
              color: theme.colors.primaryForeground, 
              fontSize: size * 0.7,
              fontWeight: 'bold'
            }}
          >
            ✓
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default Checkbox;