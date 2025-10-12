// Exportar todos los componentes desde un solo archivo
export { default as Box } from './Box';
export { 
  default as Text,
  HeaderText,
  SubheaderText,
  BodyText,
  MutedText,
  AccentText,
  CaptionText,
} from './Text';
export { 
  default as Button,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  GhostButton,
} from './Button';
export { default as Input } from './Input';
export { default as Label } from './Label';
export { default as Checkbox } from './Checkbox';
export { default as RadioGroup } from './RadioGroup';
export { default as Switch } from './Switch';
export { default as Badge } from './Badge';
export { default as Card } from './Card';
export { default as ImageWithFallback } from './ImageWithFallback';
export { default as BottomNavigation } from './BottomNavigation';
export { SimpleBarChart, SimplePieChart } from './Charts';

// Exportar iconos
export * from './Icons';
export * from './LucideIcons';