import React, { useState } from 'react';
import {
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { Card, Button } from '../../../components';
import { ArrowLeft, Sparkles, Camera, User, Plus } from '../../../components/LucideIcons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { ATENEA_CONFIG } from '../../../config/api';
import ateneaService from '../../../services/ateneaService';

const rawBaseUrl = ATENEA_CONFIG.BASE_URL || 'http://127.0.0.1:3001';
const BASE_URL_ATENEA = rawBaseUrl.replace(/\/+$/, '');
console.log('[TryOn] BASE_URL_ATENEA =', BASE_URL_ATENEA);

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk);
  }
  // RN Hermes may not have btoa
  return globalThis.btoa ? globalThis.btoa(binary) : Buffer.from(binary, 'binary').toString('base64');
}

function getOutputFileUri() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const datePart = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const timePart = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const randomPart = Math.random().toString(36).slice(2, 8);
  const fileName = `lookit_outfit_${datePart}_${timePart}_${randomPart}.png`;

  // Usamos documentDirectory para que sea persistente en ambas plataformas
  const baseDir = FileSystem.documentDirectory || FileSystem.cacheDirectory;
  const uri = `${baseDir}${fileName}`;
  return { uri, fileName };
}

const TryOnScreen = ({ onNavigate }) => {
  const theme = useTheme();
  const [mode, setMode] = useState('url'); // 'url' | 'local' | 'multi'
  const [personUri, setPersonUri] = useState(null);
  const [garmentUri, setGarmentUri] = useState(null);
  const [multiGarmentUris, setMultiGarmentUris] = useState([]); // hasta 6 prendas (solo preview visual)
  const [garmentUrl, setGarmentUrl] = useState('');
  const [upperGarmentUrls, setUpperGarmentUrls] = useState(['', '', '']);
  const [lowerGarmentUrls, setLowerGarmentUrls] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const [outputUri, setOutputUri] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const selectedGarmentsCount = [...upperGarmentUrls, ...lowerGarmentUrls].filter(
    (url) => url && url.trim().length > 0,
  ).length;

  const pickImage = async (setter) => {
    try {
      console.log('[TryOn] Requesting media library permissions...');
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('[TryOn] Permissions result:', perm);

      if (!perm.granted) {
        Alert.alert('Permisos', 'Se requiere permiso para acceder a tus imágenes.');
        return;
      }

      console.log('[TryOn] Launching image library...');
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        quality: 1,
        allowsEditing: false,
        aspect: undefined,
      });

      console.log('[TryOn] Image picker result:', res);

      if (!res.canceled && res.assets?.[0]?.uri) {
        let selectedUri = res.assets[0].uri;
        console.log('[TryOn] Selected image URI:', selectedUri);

        // En iOS, muchas fotos son HEIC; las convertimos a JPEG para el backend
        if (Platform.OS === 'ios') {
          try {
            const manipulated = await ImageManipulator.manipulateAsync(
              selectedUri,
              [],
              { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
            );
            selectedUri = manipulated.uri;
          } catch (err) {
            console.log('[TryOn] Image manipulation failed, using original uri', err);
          }
        }

        setter(selectedUri);
      } else {
        console.log('[TryOn] Image selection was canceled or no asset selected');
      }
    } catch (error) {
      console.error('[TryOn] Error picking image:', error);
      Alert.alert('Error', `No se pudo seleccionar la imagen: ${error.message}`);
    }
  };

  const addGarmentToMulti = async () => {
    if (multiGarmentUris.length >= 6) {
      Alert.alert('Límite alcanzado', 'Puedes seleccionar hasta 6 prendas.');
      return;
    }
    await pickImage((uri) => {
      setMultiGarmentUris((prev) => {
        if (prev.length >= 6) return prev;
        return [...prev, uri];
      });
    });
  };

  const setMultiGarmentSlot = (index, uri) => {
    setMultiGarmentUris((prev) => {
      const next = [...prev];
      next[index] = uri;
      return next;
    });
  };

  const updateUpperUrl = (index, text) => {
    setUpperGarmentUrls((prev) => {
      const next = [...prev];
      next[index] = text;
      return next;
    });
  };

  const updateLowerUrl = (index, text) => {
    setLowerGarmentUrls((prev) => {
      const next = [...prev];
      next[index] = text;
      return next;
    });
  };

  const useDefaultPerson = async () => {
    try {
      const asset = Asset.fromModule(require('../../../../assets/person/person.jpeg'));
      if (!asset.localUri) await asset.downloadAsync();
      setPersonUri(asset.localUri || asset.uri);
    } catch (e) {
      Alert.alert('Imagen faltante', 'Agrega una imagen en assets/person/person.jpeg');
    }
  };

  const useDefaultGarment = async () => {
    try {
      const asset = Asset.fromModule(require('../../../../assets/garments/garment.jpg'));
      if (!asset.localUri) await asset.downloadAsync();
      setGarmentUri(asset.localUri || asset.uri);
    } catch (e) {
      Alert.alert('Imagen faltante', 'Agrega una imagen en assets/garments/garment.jpg');
    }
  };

  const saveImageResponse = async (res) => {
    console.log('[TryOn] Saving image response. Status =', res.status);
    const buf = await res.arrayBuffer();
    const base64 = arrayBufferToBase64(buf);
    const { uri, fileName } = getOutputFileUri();
    await FileSystem.writeAsStringAsync(uri, base64, { encoding: 'base64' });
    setOutputUri(uri);
    setShowResult(true);
    console.log('[TryOn] Image saved to app storage', { platform: Platform.OS, uri, fileName });
  };

  const handleDownloadResult = async () => {
    if (!outputUri) {
      Alert.alert('Sin imagen', 'Primero genera un outfit para poder descargarlo.');
      return;
    }

    try {
      // Solicitar permisos específicos para media library usando expo-permissions
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== 'granted') {
        Alert.alert('Permiso requerido', 'Activa el permiso de fotos/almacenamiento para guardar la imagen.');
        console.log('[TryOn] Media library permission not granted');
        return;
      }

      console.log('[TryOn] Media library permissions granted');

      const asset = await MediaLibrary.createAssetAsync(outputUri);

      if (Platform.OS === 'android') {
        try {
          // Intentar guardar en un álbum propio para que sea más visible en la galería
          const albumName = 'Lookit';
          let album = await MediaLibrary.getAlbumAsync(albumName);
          if (!album) {
            album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
          console.log('[TryOn] Image saved to Android album', {
            album: albumName,
            uri: asset.uri,
          });
        } catch (albumError) {
          console.log('[TryOn] Android album error, fallback to saveToLibraryAsync', albumError);
          await MediaLibrary.saveToLibraryAsync(asset.uri || outputUri);
        }
      } else {
        await MediaLibrary.saveToLibraryAsync(asset.uri || outputUri);
        console.log('[TryOn] Image saved to media library (iOS)', {
          uri: asset.uri || outputUri,
        });
      }

      Alert.alert('Guardado', 'La imagen se ha guardado en tu galería.');
    } catch (mlError) {
      console.log('[TryOn] MediaLibrary error', mlError);
      const message = mlError?.message || 'Error desconocido al guardar en la galería.';
      Alert.alert('Error', `No se pudo guardar la imagen.\n\nDetalle: ${message}`);
    }
  };

  const submitUrlMode = async () => {
    if (!personUri || !garmentUrl) {
      Alert.alert('Faltan datos', 'Selecciona la imagen de la persona y escribe la URL de la prenda.');
      return;
    }
    setLoading(true);
    setOutputUri(null);
    try {
      console.log('[TryOn] submitUrlMode start', { personUri, garmentUrl, baseUrl: BASE_URL_ATENEA });
      const form = new FormData();
      form.append('person_image', {
        uri: personUri,
        name: 'person.jpeg',
        type: 'image/jpeg',
      });
      form.append('garment_url', garmentUrl);
      const res = await ateneaService.generateOutfitFromUrl(form);
      await saveImageResponse(res);
      console.log('[TryOn] submitUrlMode success');
    } catch (e) {
      console.log('[TryOn] submitUrlMode error', e);
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const submitLocalMode = async () => {
    if (!personUri || !garmentUri) {
      Alert.alert('Faltan datos', 'Selecciona la imagen de la persona y la imagen de la prenda.');
      return;
    }
    setLoading(true);
    setOutputUri(null);
    try {
      console.log('[TryOn] submitLocalMode start', { personUri, garmentUri, baseUrl: BASE_URL_ATENEA });
      const form = new FormData();
      form.append('person_image', {
        uri: personUri,
        name: 'person.jpeg',
        type: 'image/jpeg',
      });
      form.append('garment_image', {
        uri: garmentUri,
        name: 'garment.jpg',
        type: 'image/jpeg',
      });
      const res = await ateneaService.generateOutfitFromLocal(form);
      await saveImageResponse(res);
      console.log('[TryOn] submitLocalMode success');
    } catch (e) {
      console.log('[TryOn] submitLocalMode error', e);
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const submitMultiMode = async () => {
    if (!personUri) {
      Alert.alert('Faltan datos', 'Selecciona primero la imagen de la persona.');
      return;
    }

    const garmentEntries = [];

    upperGarmentUrls.forEach((url) => {
      if (url && url.trim().length > 0) {
        garmentEntries.push({ url: url.trim(), type: 'superior' });
      }
    });

    lowerGarmentUrls.forEach((url) => {
      if (url && url.trim().length > 0) {
        garmentEntries.push({ url: url.trim(), type: 'inferior' });
      }
    });

    if (garmentEntries.length === 0) {
      Alert.alert('Faltan datos', 'Agrega al menos una URL de prenda (superior o inferior).');
      return;
    }
    setLoading(true);
    setOutputUri(null);
    try {
      console.log('[TryOn] submitMultiMode start', {
        personUri,
        garments: garmentEntries.length,
        baseUrl: BASE_URL_ATENEA,
      });
      const form = new FormData();
      form.append('person_image', {
        uri: personUri,
        name: 'person.jpeg',
        type: 'image/jpeg',
      });

      garmentEntries.forEach((entry) => {
        form.append('garment_urls', entry.url);
        form.append('garment_types', entry.type);
      });

      const res = await ateneaService.generateOutfitFromMulti(form);
      await saveImageResponse(res);
      console.log('[TryOn] submitMultiMode success');
    } catch (e) {
      console.log('[TryOn] submitMultiMode error', e);
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} backgroundColor="background">
      {/* Header estilo Virtual Try-On con botón atrás */}
      <Box
        paddingHorizontal="lg"
        paddingTop="xl"
        paddingBottom="md"
        style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.purple100 || '#E9D5FF',
        }}
      >
        <Box flexDirection="row" alignItems="center">
          {onNavigate && (
            <Button
              variant="ghost"
              onPress={() => onNavigate('home')}
              style={{ marginRight: 12, width: 36, height: 36, borderRadius: 999 }}
            >
              <ArrowLeft size={20} color={theme.colors.text || '#111'} />
            </Button>
          )}
          <Box>
            <Text variant="subheader" marginBottom="xs">Virtual Try-On</Text>
            <Text variant="caption" color="muted">Prueba prendas virtualmente</Text>
          </Box>
        </Box>
      </Box>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tabs estilo pastilla: URL / Imagen / Arma tu outfit */}
        <Box paddingHorizontal="lg" marginTop="md" marginBottom="md">
          <Box style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, mode === 'url' && styles.tabActiveMain]}
              onPress={() => setMode('url')}
            >
              <Text
                variant="caption"
                style={[styles.tabText, mode === 'url' && styles.tabTextActiveMain]}
              >
                Persona + URL
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, mode === 'local' && styles.tabActiveSecondary]}
              onPress={() => setMode('local')}
            >
              <Text
                variant="caption"
                style={[styles.tabText, mode === 'local' && styles.tabTextActiveSecondary]}
              >
                Persona + Imagen
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, mode === 'multi' && styles.tabActiveSecondary]}
              onPress={() => setMode('multi')}
            >
              <Text
                variant="caption"
                style={[styles.tabText, mode === 'multi' && styles.tabTextActiveSecondary]}
              >
                Arma tu Outfit
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>

        <Box paddingHorizontal="lg">
          {/* Bloque común de imagen de persona con borde punteado */}
          <Card padding="md" marginBottom="md">
            <Text variant="body" marginBottom="sm">Imagen de Persona</Text>
            <TouchableOpacity
              style={styles.imagePickerBox}
              onPress={() => pickImage(setPersonUri)}
            >
              {personUri ? (
                <Image source={{ uri: personUri }} style={styles.personImage} />
              ) : (
                <Box alignItems="center">
                  <User size={32} color="#6b21a8" />
                  <Text style={styles.uploadText}>Seleccionar persona</Text>
                </Box>
              )}
            </TouchableOpacity>
            <Button variant="ghost" onPress={useDefaultPerson} style={{ marginTop: 8 }}>
              Usar por defecto
            </Button>
          </Card>

          {/* Persona + URL */}
          {mode === 'url' && (
            <Card padding="md" marginBottom="md">
              <Text variant="body" marginBottom="sm">URL de la prenda</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.gray300 || '#ddd',
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  backgroundColor: '#f0f0f0',
                  color: '#111',
                  fontSize: 14,
                }}
                placeholder="https://ejemplo.com/prenda.jpg"
                placeholderTextColor="#999"
                value={garmentUrl}
                onChangeText={setGarmentUrl}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={submitUrlMode}
                activeOpacity={0.9}
                disabled={loading}
                style={{ marginTop: 12, opacity: loading ? 0.8 : 1 }}
              >
                <LinearGradient
                  colors={['#ff7acb', '#d99eff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Box flexDirection="row" alignItems="center" justifyContent="center">
                      <Sparkles size={18} color="#ffffff" />
                      <Text variant="body" style={styles.gradientButtonText}>
                        Generar Try-On
                      </Text>
                    </Box>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Card>
          )}

          {/* Persona + Imagen local */}
          {mode === 'local' && (
            <Card padding="md" marginBottom="md">
              <Text variant="body" marginBottom="sm">Imagen de prenda</Text>
              <Box flexDirection="row" marginBottom="sm">
                <Button variant="secondary" onPress={() => pickImage(setGarmentUri)} style={{ marginRight: 8 }}>
                  Seleccionar imagen
                </Button>
                <Button variant="ghost" onPress={useDefaultGarment}>Usar por defecto</Button>
              </Box>
              {garmentUri ? (
                <Image
                  source={{ uri: garmentUri }}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 10,
                    backgroundColor: theme.colors.gray100 || '#f5f5f5',
                  }}
                />
              ) : null}

              <TouchableOpacity
                onPress={submitLocalMode}
                activeOpacity={0.9}
                disabled={loading}
                style={{ marginTop: 12, opacity: loading ? 0.8 : 1 }}
              >
                <LinearGradient
                  colors={['#ff7acb', '#d99eff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Box flexDirection="row" alignItems="center" justifyContent="center">
                      <Sparkles size={18} color="#ffffff" />
                      <Text variant="body" style={styles.gradientButtonText}>
                        Generar Try-On
                      </Text>
                    </Box>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Card>
          )}

          {/* Arma tu Outfit (multi-prendas) */}
          {mode === 'multi' && (
            <Card padding="md" marginBottom="md">
              <Text variant="body" marginBottom="sm">Arma tu Outfit (hasta 6 prendas)</Text>
              <Text variant="caption" color="muted" marginBottom="md">
                {selectedGarmentsCount} / 6 prendas seleccionadas
              </Text>

              <Text variant="body" marginBottom="xs">Prendas Superiores (3)</Text>
              <Box flexDirection="row" marginBottom="md">
                {[0, 1, 2].map((index) => (
                  <Box key={index} style={styles.slotContainer}>
                    <TouchableOpacity
                      style={styles.garmentSlotBox}
                      onPress={() => pickImage((uri) => setMultiGarmentSlot(index, uri))}
                    >
                      {multiGarmentUris[index] ? (
                        <Image
                          source={{ uri: multiGarmentUris[index] }}
                          style={styles.garmentSlotImage}
                        />
                      ) : (
                        <Box alignItems="center">
                          <Plus size={20} color="#6b21a8" />
                          <Text style={styles.slotLabel}>Prenda {index + 1}</Text>
                        </Box>
                      )}
                    </TouchableOpacity>
                    <TextInput
                      style={styles.slotInput}
                      placeholder="URL prenda"
                      placeholderTextColor="#999"
                      value={upperGarmentUrls[index]}
                      onChangeText={(text) => updateUpperUrl(index, text)}
                      autoCapitalize="none"
                    />
                  </Box>
                ))}
              </Box>

              <Text variant="body" marginBottom="xs">Prendas Inferiores (3)</Text>
              <Box flexDirection="row">
                {[3, 4, 5].map((slotIndex, arrayIndex) => (
                  <Box key={slotIndex} style={styles.slotContainer}>
                    <TouchableOpacity
                      style={styles.garmentSlotBox}
                      onPress={() => pickImage((uri) => setMultiGarmentSlot(slotIndex, uri))}
                    >
                      {multiGarmentUris[slotIndex] ? (
                        <Image
                          source={{ uri: multiGarmentUris[slotIndex] }}
                          style={styles.garmentSlotImage}
                        />
                      ) : (
                        <Box alignItems="center">
                          <Plus size={20} color="#6b21a8" />
                          <Text style={styles.slotLabel}>Prenda {arrayIndex + 1}</Text>
                        </Box>
                      )}
                    </TouchableOpacity>
                    <TextInput
                      style={styles.slotInput}
                      placeholder="URL prenda"
                      placeholderTextColor="#999"
                      value={lowerGarmentUrls[arrayIndex]}
                      onChangeText={(text) => updateLowerUrl(arrayIndex, text)}
                      autoCapitalize="none"
                    />
                  </Box>
                ))}
              </Box>

              <TouchableOpacity
                onPress={submitMultiMode}
                activeOpacity={0.9}
                disabled={loading || !personUri || selectedGarmentsCount === 0}
                style={{
                  marginTop: 16,
                  opacity: loading || !personUri || selectedGarmentsCount === 0 ? 0.6 : 1,
                }}
              >
                <LinearGradient
                  colors={['#ff7acb', '#d99eff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Box flexDirection="row" alignItems="center" justifyContent="center">
                      <Sparkles size={18} color="#ffffff" />
                      <Text variant="body" style={styles.gradientButtonText}>
                        Generar Outfit Completo
                      </Text>
                    </Box>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Card>
          )}

          {outputUri ? (
            <Card padding="md" marginBottom="md">
              <Text variant="body" marginBottom="sm">Resultado</Text>
              <Image
                source={{ uri: outputUri }}
                style={{ width: '100%', height: 300, borderRadius: 10, backgroundColor: theme.colors.gray100 || '#f5f5f5' }}
              />
              <Button variant="secondary" onPress={handleDownloadResult} style={{ marginTop: 12 }}>
                Descargar imagen
              </Button>
            </Card>
          ) : null}
        </Box>
      </ScrollView>

      {/* Overlay de resultado al estilo web */}
      {showResult && outputUri && (
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            padding="md"
            style={{
              width: '90%',
              maxWidth: 600,
              backgroundColor: 'rgba(255,255,255,0.95)',
            }}
          >
            <Text variant="body" marginBottom="sm">Resultado de la Prueba Virtual</Text>
            <Box marginBottom="md">
              <Image
                source={{ uri: outputUri }}
                style={{ width: '100%', height: 300, borderRadius: 12, backgroundColor: theme.colors.gray100 || '#f5f5f5' }}
              />
            </Box>
            <Button
              variant="secondary"
              onPress={handleDownloadResult}
              style={{ marginBottom: 8 }}
            >
              Descargar resultado
            </Button>
            <Button
              variant="ghost"
              onPress={() => setShowResult(false)}
            >
              Cerrar
            </Button>
          </Card>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  tabText: {
    fontSize: 12,
    color: '#6b21a8',
  },
  tabActiveMain: {
    backgroundColor: '#d99eff',
    borderColor: '#d99eff',
  },
  tabTextActiveMain: {
    color: '#ffffff',
  },
  tabActiveSecondary: {
    backgroundColor: '#f3e8ff',
    borderColor: '#d99eff',
  },
  tabTextActiveSecondary: {
    color: '#4b0082',
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
    marginTop: 4,
  },
  personImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  uploadIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#6b21a8',
  },
  slotContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  garmentSlotBox: {
    borderWidth: 1.5,
    borderColor: '#d99eff',
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfaff',
    minHeight: 90,
  },
  garmentSlotImage: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  slotInput: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12,
    backgroundColor: '#f9f8fc',
    color: '#111',
  },
  slotLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#6b21a8',
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
  gradientButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default TryOnScreen;
