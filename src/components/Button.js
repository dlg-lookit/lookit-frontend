import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { Box, Text, useTheme } from '../theme';

// Componente Button reutilizable con variantes (primary, secondary, destructive)
const Button = ({ 
  children, 
  variant = 'primary', 
  onPress, 
  disabled = false,
  loading = false,
  size = 'medium',
  fullWidth = false,
  ...props 
}) => {
  const theme = useTheme();
  
  // Configuración de variantes
  const variants = {
    primary: {
      backgroundColor: 'primary',
      textColor: 'primaryForeground',
    },
    secondary: {
      backgroundColor: 'secondary',
      textColor: 'secondaryForeground',
      borderWidth: 1,
      borderColor: 'gray300',
    },
    destructive: {
      backgroundColor: 'error',
      textColor: 'errorText',
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: 'foreground',
    },
  };
  
  // Configuración de tamaños
  const sizes = {
    small: {
      paddingVertical: 's',
      paddingHorizontal: 'm',
      fontSize: 14,
    },
    medium: {
      paddingVertical: 'm',
      paddingHorizontal: 'l',
      fontSize: 16,
    },
    large: {
      paddingVertical: 'l',
      paddingHorizontal: 'xl',
      fontSize: 18,
    },
  };
  
  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.medium;
  
  const buttonOpacity = disabled || loading ? 0.6 : 1;
  
  return (
    <TouchableOpacity 
      onPress={disabled || loading ? undefined : onPress}
      style={{ opacity: buttonOpacity }}
      activeOpacity={0.8}
    >
      <Box
        borderRadius="m"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        width={fullWidth ? '100%' : undefined}
        {...variantStyles}
        {...sizeStyles}
        {...props}
      >
        {loading && (
          <ActivityIndicator 
            size="small" 
            color={theme.colors[variantStyles.textColor]} 
            style={{ marginRight: theme.spacing.s }}
          />
        )}
        
        <Text 
          variant="body"
          color={variantStyles.textColor}
          fontSize={sizeStyles.fontSize}
          fontWeight="600"
          textAlign="center"
        >
          {children}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

// Exportar también variantes específicas para uso directo
export const PrimaryButton = ({ children, ...props }) => (
  <Button variant="primary" {...props}>{children}</Button>
);

export const SecondaryButton = ({ children, ...props }) => (
  <Button variant="secondary" {...props}>{children}</Button>
);

export const DestructiveButton = ({ children, ...props }) => (
  <Button variant="destructive" {...props}>{children}</Button>
);

export const GhostButton = ({ children, ...props }) => (
  <Button variant="ghost" {...props}>{children}</Button>
);

export default Button;