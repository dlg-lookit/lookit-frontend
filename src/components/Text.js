import React from 'react';
import { Text as RestyleText } from '../theme';

// Componente Text con variantes (header, body, muted, accent)
const Text = ({ 
  children, 
  variant = 'body', 
  color,
  ...props 
}) => {
  return (
    <RestyleText 
      variant={variant}
      color={color}
      {...props}
    >
      {children}
    </RestyleText>
  );
};

// Exportar también variantes específicas para uso directo
export const HeaderText = ({ children, ...props }) => (
  <Text variant="header" {...props}>{children}</Text>
);

export const SubheaderText = ({ children, ...props }) => (
  <Text variant="subheader" {...props}>{children}</Text>
);

export const BodyText = ({ children, ...props }) => (
  <Text variant="body" {...props}>{children}</Text>
);

export const MutedText = ({ children, ...props }) => (
  <Text variant="muted" {...props}>{children}</Text>
);

export const AccentText = ({ children, ...props }) => (
  <Text variant="accent" {...props}>{children}</Text>
);

export const CaptionText = ({ children, ...props }) => (
  <Text variant="caption" {...props}>{children}</Text>
);

export default Text;