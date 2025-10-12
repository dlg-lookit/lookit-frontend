// Test script para verificar las variantes del tema
import { lightTheme, darkTheme } from './lightTheme';

console.log('=== Light Theme textVariants ===');
console.log(Object.keys(lightTheme.textVariants));

console.log('=== Dark Theme textVariants ==='); 
console.log(Object.keys(darkTheme.textVariants));

// Verificar que 'defaults' existe
console.log('=== Verificando "defaults" ===');
console.log('Light theme defaults:', lightTheme.textVariants.defaults);
console.log('Dark theme defaults:', darkTheme.textVariants.defaults);