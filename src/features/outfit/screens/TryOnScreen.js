import React, { useState } from 'react';
import { ScrollView, Image, TextInput, ActivityIndicator, Alert, Platform } from 'react-native';
import { Box, Text, useTheme } from '../../../theme';
import { Card, Button } from '../../../components';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import * as MediaLibrary from 'expo-media-library';
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
  const [mode, setMode] = useState('url'); // 'url' | 'local'
  const [personUri, setPersonUri] = useState(null);
  const [garmentUri, setGarmentUri] = useState(null);
  const [garmentUrl, setGarmentUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [outputUri, setOutputUri] = useState(null);

  const pickImage = async (setter) => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permisos', 'Se requiere permiso para acceder a tus imágenes.');
      return;
    }
    const mediaTypes = ImagePicker.MediaType
      ? [ImagePicker.MediaType.Image]
      : ImagePicker.MediaTypeOptions.Images; // fallback for older SDKs
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      quality: 1,
    });
    if (!res.canceled && res.assets?.[0]?.uri) {
      setter(res.assets[0].uri);
    }
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
    console.log('[TryOn] Image saved to app storage', { platform: Platform.OS, uri, fileName });
  };

  const handleDownloadResult = async () => {
    if (!outputUri) {
      Alert.alert('Sin imagen', 'Primero genera un outfit para poder descargarlo.');
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso requerido', 'Activa el permiso de fotos/almacenamiento para guardar la imagen.');
        console.log('[TryOn] MediaLibrary permission not granted');
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(outputUri);

      if (Platform.OS === 'android') {
        try {
          let album = await MediaLibrary.getAlbumAsync('Download');
          if (!album) {
            album = await MediaLibrary.getAlbumAsync('Downloads');
          }
          if (!album) {
            album = await MediaLibrary.createAlbumAsync('Download', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
          }
          console.log('[TryOn] Image added to Downloads album on Android (via button)');
        } catch (albumError) {
          console.log('[TryOn] Error handling Downloads album', albumError);
        }
      } else {
        await MediaLibrary.saveToLibraryAsync(outputUri);
        console.log('[TryOn] Image saved to Photos library on iOS (via button)');
      }

      Alert.alert('Guardado', 'La imagen se ha guardado en tu galería.');
    } catch (mlError) {
      console.log('[TryOn] MediaLibrary error', mlError);
      Alert.alert('Error', 'No se pudo guardar la imagen.');
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

  return (
    <Box flex={1} backgroundColor="background">
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Box paddingHorizontal="lg" paddingTop="xl" paddingBottom="md">
          <Text variant="subheader" marginBottom="xs">Try On</Text>
          <Text variant="caption" color="muted">Prueba prendas sobre tu imagen</Text>
        </Box>

        <Box paddingHorizontal="lg" marginBottom="md">
          <Card padding="xs">
            <Box flexDirection="row" backgroundColor="secondary" borderRadius="m" padding="xs">
              <Button 
                variant={mode === 'url' ? 'primary' : 'ghost'} 
                onPress={() => setMode('url')} 
                style={{ flex: 1 }}
              >
                Persona + URL
              </Button>
              <Button 
                variant={mode === 'local' ? 'primary' : 'ghost'} 
                onPress={() => setMode('local')} 
                style={{ flex: 1 }}
              >
                Persona + Imagen
              </Button>
            </Box>
          </Card>
        </Box>

        <Box paddingHorizontal="lg">
          <Card padding="md" marginBottom="md">
            <Text variant="body" marginBottom="sm">Imagen de la persona</Text>
            <Box flexDirection="row" marginBottom="sm">
              <Button variant="secondary" onPress={() => pickImage(setPersonUri)} style={{ marginRight: 8 }}>
                Seleccionar imagen
              </Button>
              <Button variant="ghost" onPress={useDefaultPerson}>Usar por defecto</Button>
            </Box>
            {personUri ? (
              <Image source={{ uri: personUri }} style={{ width: '100%', height: 200, borderRadius: 10, backgroundColor: theme.colors.gray100 || '#f5f5f5' }} />
            ) : null}
          </Card>

          {mode === 'url' ? (
            <Card padding="md" marginBottom="md">
              <Text variant="body" marginBottom="sm">URL de la prenda</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.gray300 || '#ddd',
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
                placeholder="https://example.com/garment.jpg"
                value={garmentUrl}
                onChangeText={setGarmentUrl}
                autoCapitalize="none"
              />
              <Button variant="primary" onPress={submitUrlMode} style={{ marginTop: 12 }} disabled={loading}>
                {loading ? <ActivityIndicator color={theme.colors.primaryForeground} /> : 'Generar outfit'}
              </Button>
            </Card>
          ) : (
            <Card padding="md" marginBottom="md">
              <Text variant="body" marginBottom="sm">Imagen de la prenda</Text>
              <Box flexDirection="row" marginBottom="sm">
                <Button variant="secondary" onPress={() => pickImage(setGarmentUri)} style={{ marginRight: 8 }}>
                  Seleccionar imagen
                </Button>
                <Button variant="ghost" onPress={useDefaultGarment}>Usar por defecto</Button>
              </Box>
              {garmentUri ? (
                <Image source={{ uri: garmentUri }} style={{ width: '100%', height: 200, borderRadius: 10, backgroundColor: theme.colors.gray100 || '#f5f5f5' }} />
              ) : null}

              <Button variant="primary" onPress={submitLocalMode} style={{ marginTop: 12 }} disabled={loading}>
                {loading ? <ActivityIndicator color={theme.colors.primaryForeground} /> : 'Generar outfit'}
              </Button>
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
    </Box>
  );
};

export default TryOnScreen;
