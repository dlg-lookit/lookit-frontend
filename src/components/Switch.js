import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';
import { Box, useTheme } from '../theme';

const Switch = ({ 
  checked = false, 
  onCheckedChange, 
  disabled = false,
  size = 'medium', // 'small' | 'medium' | 'large'
  style,
  ...props 
}) => {
  const theme = useTheme();
  const translateX = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const backgroundColor = useRef(new Animated.Value(checked ? 1 : 0)).current;

  // Tamaños del switch
  const sizes = {
    small: { width: 44, height: 24, thumb: 20 },
    medium: { width: 52, height: 28, thumb: 24 },
    large: { width: 60, height: 32, thumb: 28 }
  };

  const switchSize = sizes[size];
  const thumbOffset = (switchSize.width - switchSize.thumb - 4) / (switchSize.width - switchSize.thumb);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: checked ? thumbOffset : 0,
        duration: 200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }),
      Animated.timing(backgroundColor, {
        toValue: checked ? 1 : 0,
        duration: 200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }),
    ]).start();
  }, [checked, translateX, backgroundColor, thumbOffset]);

  const handlePress = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const animatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.gray300, theme.colors.primary],
  });

  const animatedTranslateX = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [2, switchSize.width - switchSize.thumb - 2],
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={style}
      activeOpacity={0.8}
      {...props}
    >
      <Animated.View
        style={{
          width: switchSize.width,
          height: switchSize.height,
          borderRadius: switchSize.height / 2,
          backgroundColor: animatedBackgroundColor,
          opacity: disabled ? 0.5 : 1,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: switchSize.thumb,
            height: switchSize.thumb,
            borderRadius: switchSize.thumb / 2,
            backgroundColor: theme.colors.background,
            shadowColor: theme.colors.foreground,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            transform: [{ translateX: animatedTranslateX }],
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Switch;