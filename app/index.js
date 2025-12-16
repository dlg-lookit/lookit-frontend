// Home screen (clima + botón "Vísteme hoy" + Try On)
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lookit App</Text>
      <Text style={styles.subtitle}>Tu asistente de moda personal</Text>
      
      {/* Clima actual */}
      <View style={styles.weatherSection}>
        <Text style={styles.weatherText}>🌤️ 22°C - Soleado</Text>
      </View>
      
      {/* Botón principal */}
      <TouchableOpacity style={styles.primaryButton} onPress={() => {}}>
        <Text style={styles.primaryButtonText}>👗 Vísteme hoy</Text>
      </TouchableOpacity>

      {/* Botón Try On */}
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/try-on')}>
        <Text style={styles.secondaryButtonText}>Probarme ropa (Try On)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  weatherSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherText: {
    fontSize: 18,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#111',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 12,
  },
  secondaryButtonText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});