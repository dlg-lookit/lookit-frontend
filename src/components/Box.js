import React from 'react';
import { Box } from '../theme';

// Componente Box reutilizable (contenedor genérico)
// Ya está exportado desde theme/index.js, pero aquí agregamos funcionalidades extras

const CustomBox = ({ children, variant = 'regular', ...props }) => {
  // Si se pasa una variante de tarjeta, la aplicamos
  if (variant && typeof variant === 'string') {
    return (
      <Box {...props} {...(variant in ['regular', 'elevated'] ? { variant } : {})}>
        {children}
      </Box>
    );
  }
  
  return (
    <Box {...props}>
      {children}
    </Box>
  );
};

export default CustomBox;