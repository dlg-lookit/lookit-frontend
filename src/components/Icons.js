import React from 'react';
import { Text } from '../theme';

// Iconos simples usando emojis/símbolos
export const EyeIcon = ({ size = 20, color = '#666' }) => (
  <Text style={{ fontSize: size, color }}>👁️</Text>
);

export const EyeOffIcon = ({ size = 20, color = '#666' }) => (
  <Text style={{ fontSize: size, color }}>🙈</Text>
);

// Alternativas con símbolos Unicode
export const EyeIconAlt = ({ size = 20, color = '#666' }) => (
  <Text style={{ fontSize: size, color }}>👀</Text>
);

export const EyeOffIconAlt = ({ size = 20, color = '#666' }) => (
  <Text style={{ fontSize: size, color }}>●</Text>
);