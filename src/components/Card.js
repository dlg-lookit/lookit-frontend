import React from 'react';
import { Box } from '../theme';

const Card = ({ 
  children,
  variant = 'default', // 'default' | 'outline' | 'elevated'
  padding = 'md', // 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  style,
  ...props 
}) => {
  // Variantes del card
  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: 'border',
        };
      case 'elevated':
        return {
          backgroundColor: 'card',
          shadowColor: 'foreground',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        };
      default:
        return {
          backgroundColor: 'card',
          shadowColor: 'foreground',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        };
    }
  };

  const variantStyles = getVariantStyles(variant);

  return (
    <Box
      borderRadius="lg"
      padding={padding}
      style={[variantStyles, style]}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;