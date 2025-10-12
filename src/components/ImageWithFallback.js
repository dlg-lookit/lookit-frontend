import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Box, Text } from '../theme';

const ImageWithFallback = ({ 
  source, 
  fallbackSource,
  alt = '',
  style,
  fallbackText = '📷',
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Si hay error y no hay fallback, mostrar placeholder
  if (hasError && !fallbackSource) {
    return (
      <Box 
        style={style}
        backgroundColor="gray200"
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        <Text variant="body">{fallbackText}</Text>
      </Box>
    );
  }

  // Si hay error pero existe fallback, usar fallback
  if (hasError && fallbackSource) {
    return (
      <Image
        source={fallbackSource}
        style={style}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    );
  }

  // Mostrar imagen principal
  return (
    <Image
      source={source}
      style={style}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};

export default ImageWithFallback;