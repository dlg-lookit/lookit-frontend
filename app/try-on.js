import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import * as MediaLibrary from 'expo-media-library';
import { ATENEA_CONFIG } from '../src/config/api';
import ateneaService from '../src/services/ateneaService';
const rawBaseUrlRouter = ATENEA_CONFIG.BASE_URL || 'http://127.0.0.1:3001';
const BASE_URL_ATENEA = rawBaseUrlRouter.replace(/\/+$/, '');
console.log('[TryOn(router)] BASE_URL_ATENEA =', BASE_URL_ATENEA);

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000; // 32KB chunks to avoid stack overflow
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk);
  }
  return globalThis.btoa ? globalThis.btoa(binary) : Buffer.from(binary, 'binary').toString('base64');
}

function getOutputFileUri() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const datePart = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const timePart = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const randomPart = Math.random().toString(36).slice(2, 8);
  const fileName = `lookit_outfit_${datePart}_${timePart}_${randomPart}.png`;

  const baseDir = FileSystem.documentDirectory || FileSystem.cacheDirectory;
  const uri = `${baseDir}${fileName}`;
  return { uri, fileName };
}

export default function TryOnScreen() {
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
      : ImagePicker.MediaTypeOptions.Images;
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
      const asset = Asset.fromModule(require('../assets/person/person.jpeg'));
      if (!asset.localUri) await asset.downloadAsync();
      setPersonUri(asset.localUri || asset.uri);
    } catch (e) {
      Alert.alert('Imagen faltante', 'Agrega una imagen en assets/person/person.jpeg');
    }
  };

  const useDefaultGarment = async () => {
    try {
      const asset = Asset.fromModule(require('../assets/garments/garment.jpg'));
      if (!asset.localUri) await asset.downloadAsync();
      setGarmentUri(asset.localUri || asset.uri);
    } catch (e) {
      Alert.alert('Imagen faltante', 'Agrega una imagen en assets/garments/garment.jpg');
    }
  };

  const saveImageResponse = async (res) => {
    console.log('[TryOn(router)] Saving image response. Status =', res.status);
    const buf = await res.arrayBuffer();
    const base64 = arrayBufferToBase64(buf);
    const { uri, fileName } = getOutputFileUri();
    await FileSystem.writeAsStringAsync(uri, base64, { encoding: 'base64' });
    setOutputUri(uri);
    console.log('[TryOn(router)] Image saved to app storage', { platform: Platform.OS, uri, fileName });

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('[TryOn(router)] MediaLibrary permission not granted');
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(uri);

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
          console.log('[TryOn(router)] Image added to Downloads album on Android');
        } catch (albumError) {
          console.log('[TryOn(router)] Error handling Downloads album', albumError);
        }
      } else {
        await MediaLibrary.saveToLibraryAsync(uri);
        console.log('[TryOn(router)] Image saved to Photos library on iOS');
      }
    } catch (mlError) {
      console.log('[TryOn(router)] MediaLibrary error', mlError);
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
      console.log('[TryOn(router)] submitUrlMode start', { personUri, garmentUrl, baseUrl: BASE_URL_ATENEA });
      const form = new FormData();
      form.append('person_image', {
        uri: personUri,
        name: 'person.jpeg',
        type: 'image/jpeg',
      });
      form.append('garment_url', garmentUrl);
      console.log('[TryOn(router)] POST generate-outfit-url');
      const res = await ateneaService.generateOutfitFromUrl(form);
      await saveImageResponse(res);
      console.log('[TryOn(router)] submitUrlMode success');
    } catch (e) {
      console.log('[TryOn(router)] submitUrlMode error', e);
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
      console.log('[TryOn(router)] submitLocalMode start', { personUri, garmentUri, baseUrl: BASE_URL_ATENEA });
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
      console.log('[TryOn(router)] POST generate-outfit-local');
      const res = await ateneaService.generateOutfitFromLocal(form);
      await saveImageResponse(res);
      console.log('[TryOn(router)] submitLocalMode success');
    } catch (e) {
      console.log('[TryOn(router)] submitLocalMode error', e);
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Try On</Text>
      <Text style={styles.subtitle}>Prueba prendas con diseño minimalista</Text>

      <View style={styles.segment}>
        <TouchableOpacity
          style={[styles.segmentBtn, mode === 'url' && styles.segmentBtnActive]}
          onPress={() => setMode('url')}
        >
          <Text style={[styles.segmentText, mode === 'url' && styles.segmentTextActive]}>
            Persona + URL de prenda
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentBtn, mode === 'local' && styles.segmentBtnActive]}
          onPress={() => setMode('local')}
        >
          <Text style={[styles.segmentText, mode === 'local' && styles.segmentTextActive]}>
            Persona + Imagen local
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Imagen de la persona</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => pickImage(setPersonUri)}>
            <Text style={styles.buttonText}>Seleccionar imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGhost} onPress={useDefaultPerson}>
            <Text style={styles.buttonGhostText}>Usar por defecto</Text>
          </TouchableOpacity>
        </View>
        {personUri ? <Image source={{ uri: personUri }} style={styles.preview} /> : null}
      </View>

      {mode === 'url' ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>URL de la prenda</Text>
          <TextInput
            style={styles.input}
            placeholder="https://example.com/garment.jpg"
            value={garmentUrl}
            onChangeText={setGarmentUrl}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.primaryButton} onPress={submitUrlMode} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Generar outfit</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Imagen de la prenda</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => pickImage(setGarmentUri)}>
              <Text style={styles.buttonText}>Seleccionar imagen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGhost} onPress={useDefaultGarment}>
              <Text style={styles.buttonGhostText}>Usar por defecto</Text>
            </TouchableOpacity>
          </View>
          {garmentUri ? <Image source={{ uri: garmentUri }} style={styles.preview} /> : null}

          <TouchableOpacity style={styles.primaryButton} onPress={submitLocalMode} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Generar outfit</Text>}
          </TouchableOpacity>
        </View>
      )}

      {outputUri ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resultado</Text>
          <Image source={{ uri: outputUri }} style={styles.result} />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 4, color: '#111' },
  subtitle: { color: '#666', marginBottom: 16 },
  segment: { flexDirection: 'row', backgroundColor: '#f1f1f1', borderRadius: 10, padding: 4, marginBottom: 16 },
  segmentBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  segmentBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  segmentText: { color: '#666' },
  segmentTextActive: { color: '#111', fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#eee' },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#111' },
  row: { flexDirection: 'row', gap: 8 },
  button: { backgroundColor: '#efefef', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  buttonText: { color: '#111' },
  buttonGhost: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  buttonGhostText: { color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginTop: 8 },
  primaryButton: { backgroundColor: '#111', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  preview: { width: '100%', height: 200, borderRadius: 10, marginTop: 8, backgroundColor: '#f7f7f7' },
  result: { width: '100%', height: 300, borderRadius: 10, marginTop: 8, backgroundColor: '#f7f7f7' },
});
