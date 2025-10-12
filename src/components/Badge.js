import React from 'react';
import { Box, Text } from '../theme';

const Badge = ({ 
  children,
  variant = 'default', // 'default' | 'secondary' | 'destructive' | 'outline'
  size = 'medium', // 'small' | 'medium' | 'large'
  style,
  ...props 
}) => {
  // Variantes de color
  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'secondary',
          color: 'secondaryForeground',
        };
      case 'destructive':
        return {
          backgroundColor: 'destructive',
          color: 'destructiveForeground',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'foreground',
          borderWidth: 1,
          borderColor: 'border',
        };
      default:
        return {
          backgroundColor: 'primary',
          color: 'primaryForeground',
        };
    }
  };

  // Tamaños
  const getSizeStyles = (size) => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 'xs',
          paddingVertical: 'xs',
          textVariant: 'caption',
        };
      case 'large':
        return {
          paddingHorizontal: 'md',
          paddingVertical: 'sm',
          textVariant: 'body',
        };
      default:
        return {
          paddingHorizontal: 'sm',
          paddingVertical: 'xs',
          textVariant: 'caption',
        };
    }
  };

  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      style={style}
      {...variantStyles}
      {...sizeStyles}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text 
          variant={sizeStyles.textVariant}
          color={variantStyles.color}
          textAlign="center"
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Box>
  );
};

export default Badge;