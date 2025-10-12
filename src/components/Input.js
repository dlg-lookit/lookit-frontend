import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Box, useTheme } from '../theme';

// Componente Input reutilizable para formularios
const Input = ({ 
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  rightIcon,
  onRightIconPress,
  style,
  error = false,
  ...props 
}) => {
  const theme = useTheme();
  
  const inputStyles = {
    height: 48,
    borderRadius: theme.borderRadii.m,
    borderWidth: 1,
    borderColor: error ? theme.colors.error : theme.colors.gray300,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    paddingRight: rightIcon ? theme.spacing.xxxl : theme.spacing.m,
    fontSize: 16,
    color: theme.colors.foreground,
    fontWeight: 'normal',
  };

  return (
    <Box position="relative">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.mutedText}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[inputStyles, style]}
        {...props}
      />
      
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={{
            position: 'absolute',
            right: theme.spacing.m,
            top: '50%',
            transform: [{ translateY: -12 }],
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default Input;