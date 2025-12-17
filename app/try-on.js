import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const VirtualTryOnScreen = () => {
  const [activeTab, setActiveTab] = useState('url'); // 'url' | 'image' | 'outfit'
  const [personImageUri, setPersonImageUri] = useState(null);
  const [garmentUrl, setGarmentUrl] = useState('https://ejemplo.com/prenda.jpg');

  const handleSelectImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!res.canceled && res.assets?.[0]?.uri) {
      setPersonImageUri(res.assets[0].uri);
    }
  };

  const handleTryOn = () => {
    console.log('[VirtualTryOnScreen] handleTryOn', {
      activeTab,
      personImageUri,
      garmentUrl,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Título */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Virtual Try-On</Text>
          <Text style={styles.subtitle}>Prueba prendas virtualmente</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'url' && styles.tabActive]}
            onPress={() => setActiveTab('url')}
          >
            <Text
              style={[styles.tabText, activeTab === 'url' && styles.tabTextActive]}
            >
              Persona + URL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'image' && styles.tabActiveSecondary]}
            onPress={() => setActiveTab('image')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'image' && styles.tabTextSecondaryActive,
              ]}
            >
              Persona + Imagen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'outfit' && styles.tabActiveSecondary]}
            onPress={() => setActiveTab('outfit')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'outfit' && styles.tabTextSecondaryActive,
              ]}
            >
              Arma tu Outfit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenido principal: pestaña Persona + URL */}
        {activeTab === 'url' && (
          <>
            {/* Imagen de Persona */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Imagen de Persona</Text>
              <TouchableOpacity
                style={styles.imagePickerBox}
                onPress={handleSelectImage}
              >
                {personImageUri ? (
                  <Image
                    source={{ uri: personImageUri }}
                    style={styles.personImage}
                  />
                ) : (
                  <View style={styles.imagePickerInner}>
                    <Text style={styles.uploadIcon}>⬆️</Text>
                    <Text style={styles.uploadText}>Seleccionar imagen</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* URL de la Prenda */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>URL de la Prenda</Text>
              <TextInput
                style={styles.textInput}
                value={garmentUrl}
                onChangeText={setGarmentUrl}
                placeholder="https://ejemplo.com/prenda.jpg"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>
          </>
        )}

        {activeTab === 'image' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Persona + Imagen (contenido pendiente)
            </Text>
            <Text style={styles.placeholderText}>
              Aquí podrás combinar una foto de persona con una prenda local.
            </Text>
          </View>
        )}

        {activeTab === 'outfit' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Arma tu Outfit (contenido pendiente)
            </Text>
            <Text style={styles.placeholderText}>
              Aquí podrás seleccionar múltiples prendas para armar un outfit completo.
            </Text>
          </View>
        )}

        {/* Botón inferior */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleTryOn} activeOpacity={0.9}>
            <LinearGradient
              colors={['#ff7acb', '#d99eff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>✨ Generar Try-On</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VirtualTryOnScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f8fc',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f1f2e',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#7c7a8c',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d99eff',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#d99eff',
    borderColor: '#d99eff',
  },
  tabActiveSecondary: {
    backgroundColor: '#f3e8ff',
    borderColor: '#d99eff',
  },
  tabText: {
    fontSize: 12,
    color: '#6b21a8',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  tabTextSecondaryActive: {
    color: '#4b0082',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f1f2e',
    marginBottom: 12,
  },
  imagePickerBox: {
    borderWidth: 1.5,
    borderColor: '#d99eff',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfaff',
    minHeight: 140,
  },
  imagePickerInner: {
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#6b21a8',
  },
  personImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    fontSize: 14,
    color: '#111',
  },
  placeholderText: {
    fontSize: 13,
    color: '#7c7a8c',
  },
  buttonContainer: {
    marginTop: 8,
  },
  gradientButton: {
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#d99eff',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});
