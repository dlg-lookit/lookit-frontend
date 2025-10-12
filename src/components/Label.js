import React from 'react';
import { Text } from '../theme';

// Componente Label para formularios
const Label = ({ 
  children, 
  htmlFor, // Solo para compatibilidad, no se usa en React Native
  required = false,
  style,
  ...props 
}) => {
  return (
    <Text 
      variant="bodySmall"
      color="foreground"
      fontWeight="500"
      marginBottom="s"
      style={style}
      {...props}
    >
      {children}
      {required && (
        <Text color="error"> *</Text>
      )}
    </Text>
  );
};

export default Label;