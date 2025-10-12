import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '../theme';

// Componente RadioOption individual
const RadioOption = ({ 
  label, 
  value, 
  selectedValue, 
  onValueChange, 
  disabled = false 
}) => {
  const isSelected = value === selectedValue;
  
  const handlePress = () => {
    if (!disabled && onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <Box flexDirection="row" alignItems="center" paddingVertical="xs">
        <Box
          width={20}
          height={20}
          borderRadius="full"
          borderWidth={2}
          borderColor={isSelected ? 'primary' : 'gray300'}
          backgroundColor={isSelected ? 'primary' : 'transparent'}
          alignItems="center"
          justifyContent="center"
          marginRight="sm"
          opacity={disabled ? 0.5 : 1}
        >
          {isSelected && (
            <Box
              width={8}
              height={8}
              borderRadius="full"
              backgroundColor="primaryForeground"
            />
          )}
        </Box>
        <Text 
          variant="body" 
          color={disabled ? 'gray400' : 'foreground'}
        >
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

// Componente RadioGroup principal
const RadioGroup = ({ 
  value, 
  onValueChange, 
  options = [],
  disabled = false,
  style,
  ...props 
}) => {
  return (
    <Box style={style} {...props}>
      {options.map((option) => (
        <RadioOption
          key={option.value}
          label={option.label}
          value={option.value}
          selectedValue={value}
          onValueChange={onValueChange}
          disabled={disabled}
        />
      ))}
    </Box>
  );
};

export default RadioGroup;