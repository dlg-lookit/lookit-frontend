import { ATENEA_CONFIG } from '../config/api';

class AteneaService {
  /**
   * Realizar petición HTTP al backend Atenea con configuración base
   * Devuelve el objeto Response para que el caller maneje el cuerpo (imagen binaria).
   */
  async request(endpoint, options = {}) {
    const baseUrl = (ATENEA_CONFIG.BASE_URL || 'http://127.0.0.1:3001').replace(/\/+$/, '');
    const url = `${baseUrl}${endpoint}`;

    const config = {
      method: 'POST',
      // No establecemos Content-Type por defecto para permitir multipart/form-data (FormData)
      ...options,
    };

    try {
      console.log(`🌐 Atenea Request: ${config.method} ${url}`);
      console.log('📍 Atenea Network Info:', { baseUrl, endpoint });
      console.log('🧾 Atenea Request Config (sin body):', {
        method: config.method,
        headers: config.headers,
        hasBody: !!config.body,
      });

      const controller = new AbortController();
      const timeoutMs = 60000; // 60s por si el modelo tarda
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log(`📡 Atenea Response: ${response.status} ${response.statusText}`);
      console.log('📦 Atenea Response Headers:', {
        'content-type': response.headers.get('content-type'),
        'content-length': response.headers.get('content-length'),
      });

      if (!response.ok) {
        let bodyPreview = '';
        try {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await response.json();
            bodyPreview = JSON.stringify(data);
          } else {
            bodyPreview = await response.text();
          }
        } catch (parseError) {
          console.log('Atenea error body parse failed:', parseError.message);
        }

        console.error('Atenea non-OK response details:', {
          status: response.status,
          statusText: response.statusText,
          bodyPreview: bodyPreview ? bodyPreview.slice(0, 500) : null,
        });

        const extra = bodyPreview ? ` - ${bodyPreview.slice(0, 200)}` : '';
        throw new Error(`HTTP ${response.status}: ${response.statusText}${extra}`);
      }

      return response;
    } catch (error) {
      console.error('Atenea API Error:', error.message);
      if (error.stack) {
        console.error('Atenea API Error stack:', error.stack);
      }
      console.error('🔍 Atenea Connection Details:', {
        baseUrl,
        endpoint,
        method: config.method,
      });

      if (error.name === 'AbortError') {
        throw new Error('Atenea request timeout - verifica conexión y servidor en puerto 3001');
      }

      if (error.message.includes('Network request failed')) {
        throw new Error(`No se puede conectar con Atenea en ${baseUrl}. Revisa:
• Que el servidor esté corriendo
• Que escuche en 0.0.0.0:3001
• Que el móvil y la Mac estén en la misma red
• Firewall de macOS`);
      }

      throw error;
    }
  }

  async generateOutfitFromUrl(formData) {
    return this.request(ATENEA_CONFIG.ENDPOINTS.GENERATE_OUTFIT_URL, {
      method: 'POST',
      body: formData,
    });
  }

  async generateOutfitFromLocal(formData) {
    return this.request(ATENEA_CONFIG.ENDPOINTS.GENERATE_OUTFIT_LOCAL, {
      method: 'POST',
      body: formData,
    });
  }

  async generateOutfitFromMulti(formData) {
    return this.request(ATENEA_CONFIG.ENDPOINTS.GENERATE_OUTFIT_MULTI, {
      method: 'POST',
      body: formData,
    });
  }
}

const ateneaService = new AteneaService();
export default ateneaService;
