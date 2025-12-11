#!/bin/bash

# Script de despliegue para Vercel
echo "=== Despliegue del Sistema Harry Barber ==="

# Verificar si vercel está instalado
if ! command -v vercel &> /dev/null
then
    echo "Vercel CLI no encontrado. Instalando..."
    npm install -g vercel
fi

# Verificar si estamos en el directorio correcto
if [ ! -f "vercel.json" ]; then
    echo "Error: No se encuentra vercel.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

echo "Iniciando despliegue en Vercel..."
vercel --prod

echo "Despliegue completado. ¡Tu aplicación está ahora en línea!"