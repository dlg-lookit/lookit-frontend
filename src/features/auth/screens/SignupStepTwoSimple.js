import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box, Text, useTheme } from '../../../theme';
import { useThemeMode } from '../../../theme/ThemeProvider';
import { 
  Input, 
  Label, 
  Button,
  Card 
} from '../../../components';
import { 
  LucideArrowLeft,
  LucideShirt,
  LucideWind,
  LucideGlasses,
  LucideSparkles,
  LucideBriefcase,
  LucidePartyPopper
} from '../../../components/LucideIcons';

const SignupStepTwo = ({ onBack, onComplete, onSkip }) => {
  const { isDark } = useThemeMode();
  const theme = useTheme();
  
  return (
    <Box flex={1} backgroundColor="background">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <Box padding="lg">
        <TouchableOpacity onPress={onBack}>
          <LucideArrowLeft size={20} color={theme.colors.muted} />
        </TouchableOpacity>
        
        <Text variant="h1" textAlign="center" marginTop="xl">
          SignupStepTwo Test
        </Text>
        
        <Button
          onPress={onComplete}
          style={{
            marginTop: 32,
            backgroundColor: theme.colors.purple400,
          }}
        >
          <Text style={{ color: 'white' }}>Complete</Text>
        </Button>
      </Box>
    </Box>
  );
};

export default SignupStepTwo;