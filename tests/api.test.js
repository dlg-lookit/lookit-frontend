import authService from '../src/services/authService';

/**
 * Script de prueba para el servicio de autenticación
 * Este archivo puede ejecutarse para probar la conexión con la API
 */

const testAPI = async () => {
  console.log('🧪 Iniciando pruebas de la API...\n');

  // Datos de prueba
  const testUser = {
    email: 'test@lookit.com',
    password: 'testPassword123',
    username: 'testuser',
  };

  try {
    // Prueba 1: Validaciones locales
    console.log('📋 Prueba 1: Validaciones locales');
    console.log('Email válido:', authService.isValidEmail(testUser.email));
    console.log('Validación de contraseña:', authService.validatePassword(testUser.password));
    console.log('✅ Validaciones locales completadas\n');

    // Prueba 2: Registro de usuario
    console.log('📋 Prueba 2: Registro de usuario');
    const registerResult = await authService.register(testUser);
    console.log('Resultado del registro:', registerResult);
    console.log('✅ Registro completado\n');

    // Prueba 3: Login de usuario
    console.log('📋 Prueba 3: Login de usuario');
    const loginResult = await authService.login({
      email: testUser.email,
      password: testUser.password,
    });
    console.log('Resultado del login:', loginResult);
    console.log('✅ Login completado\n');

    console.log('🎉 Todas las pruebas completadas exitosamente!');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    console.log('\n🔍 Detalles del error:');
    console.log('- Asegúrate de que el servidor Janus Auth esté corriendo en http://localhost:8080');
    console.log('- Verifica que el endpoint POST /auth/register esté disponible');
    console.log('- Revisa los logs del servidor para más detalles');
  }
};

// Ejecutar pruebas si este archivo se ejecuta directamente
if (require.main === module) {
  testAPI();
}

export { testAPI };