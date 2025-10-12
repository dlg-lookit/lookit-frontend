#!/bin/bash

# Script de setup para Lookit Frontend
# Instala dependencias y herramientas necesarias

echo "🔧 Setup de Lookit Frontend"
echo "=========================="

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js v16 o superior."
    echo "   Descarga desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) encontrado"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está disponible"
    exit 1
fi

echo "✅ npm $(npm --version) encontrado"

# Instalar dependencias del proyecto
echo "📦 Instalando dependencias del proyecto..."
npm install

# Verificar si Just está instalado
if ! command -v just &> /dev/null; then
    echo "⚠️  Just (task runner) no está instalado"
    echo "   Puedes instalarlo para comandos simplificados:"
    echo ""
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "   # macOS con Homebrew:"
        echo "   brew install just"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "   # Ubuntu/Debian:"
        echo "   wget -qO - 'https://proget.makedeb.org/debian-feeds/prebuilt-mpr.pub' | gpg --dearmor | sudo tee /usr/share/keyrings/prebuilt-mpr-archive-keyring.gpg 1> /dev/null"
        echo "   echo \"deb [arch=all,amd64 signed-by=/usr/share/keyrings/prebuilt-mpr-archive-keyring.gpg] https://proget.makedeb.org prebuilt-mpr bullseye\" | sudo tee /etc/apt/sources.list.d/prebuilt-mpr.list"
        echo "   sudo apt update && sudo apt install just"
        echo ""
        echo "   # O con cargo:"
        echo "   cargo install just"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        echo "   # Windows con Chocolatey:"
        echo "   choco install just"
        echo ""
        echo "   # O con Scoop:"
        echo "   scoop install just"
    fi
    echo ""
    echo "   Más info: https://github.com/casey/just#installation"
    echo ""
    echo "🔄 Sin Just, usa comandos tradicionales:"
    echo "   npx expo start    # En lugar de 'just run'"
    echo "   npx expo start --android  # En lugar de 'just android'"
else
    echo "✅ Just $(just --version) encontrado"
    echo ""
    echo "🎉 ¡Todo listo! Comandos disponibles:"
    echo "   just run      # Iniciar aplicación"
    echo "   just android  # Ejecutar en Android"  
    echo "   just ios      # Ejecutar en iOS"
    echo "   just web      # Ejecutar en web"
    echo "   just --list   # Ver todos los comandos"
fi

# Verificar Expo CLI
if ! command -v expo &> /dev/null; then
    echo ""
    echo "💡 Tip: Puedes instalar Expo CLI globalmente:"
    echo "   npm install -g @expo/cli"
fi

echo ""
echo "🚀 Setup completado. Para iniciar la aplicación:"
if command -v just &> /dev/null; then
    echo "   just run"
else
    echo "   npx expo start"
fi
echo ""