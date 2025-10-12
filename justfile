# Justfile para Lookit Frontend - React Native con Expo
# Uso: just <comando>

# Variables
app_name := "lookit-frontend"
expo_cmd := "npx expo"

# Comando por defecto - mostrar ayuda
default:
    @just --list

# Ejecutar la aplicación en modo desarrollo
run:
    @echo "🚀 Iniciando Lookit Frontend..."
    {{expo_cmd}} start

# Ejecutar en Android
android:
    @echo "📱 Iniciando en Android..."
    {{expo_cmd}} start --android

# Ejecutar en iOS (solo macOS)
ios:
    @echo "📱 Iniciando en iOS..."
    {{expo_cmd}} start --ios

# Ejecutar en web
web:
    @echo "🌐 Iniciando en navegador web..."
    {{expo_cmd}} start --web

# Limpiar cache y ejecutar
clean:
    @echo "🧹 Limpiando cache y reiniciando..."
    {{expo_cmd}} start --clear

# Instalar dependencias
install:
    @echo "📦 Instalando dependencias..."
    npm install

# Actualizar dependencias
update:
    @echo "⬆️ Actualizando dependencias..."
    npm update

# Verificar el estado del proyecto
check:
    @echo "🔍 Verificando estado del proyecto..."
    {{expo_cmd}} doctor

# Construir para producción
build:
    @echo "🏗️ Construyendo para producción..."
    {{expo_cmd}} build

# Publicar a Expo
publish:
    @echo "📤 Publicando a Expo..."
    {{expo_cmd}} publish

# Abrir en Expo Go (generar QR)
qr:
    @echo "📱 Generando código QR para Expo Go..."
    {{expo_cmd}} start --tunnel

# Comando de desarrollo completo (instalar + limpiar + ejecutar)
dev:
    @echo "🔧 Configuración completa de desarrollo..."
    just install
    just clean

# Reiniciar servidor Metro
restart:
    @echo "🔄 Reiniciando servidor Metro..."
    {{expo_cmd}} r

# Ver logs detallados
logs:
    @echo "📋 Mostrando logs..."
    {{expo_cmd}} start --dev-client

# Ejecutar en túnel (para compartir)
tunnel:
    @echo "🌐 Iniciando en modo túnel..."
    {{expo_cmd}} start --tunnel

# Verificar configuración de Expo
config:
    @echo "⚙️ Verificando configuración..."
    {{expo_cmd}} config

# Ayuda con comandos disponibles
help:
    @echo "📚 Comandos disponibles para {{app_name}}:"
    @echo ""
    @echo "  just run      - Iniciar en modo desarrollo"
    @echo "  just android  - Ejecutar en Android"
    @echo "  just ios      - Ejecutar en iOS (solo macOS)"
    @echo "  just web      - Ejecutar en navegador"
    @echo "  just clean    - Limpiar cache y ejecutar"
    @echo "  just dev      - Setup completo de desarrollo"
    @echo "  just qr       - Generar QR para Expo Go"
    @echo "  just tunnel   - Ejecutar en modo túnel"
    @echo "  just install  - Instalar dependencias"
    @echo "  just check    - Verificar estado del proyecto"
    @echo "  just build    - Construir para producción"
    @echo ""
    @echo "💡 Tip: Usa 'just run' para inicio rápido"