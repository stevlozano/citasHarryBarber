@echo off
title Despliegue Harry Barber - Vercel

echo === Despliegue del Sistema Harry Barber ===
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js no encontrado. Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si vercel está instalado
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI no encontrado. Instalando...
    npm install -g vercel
    echo.
)

REM Verificar si estamos en el directorio correcto
if not exist "vercel.json" (
    echo Error: No se encuentra vercel.json. Asegúrate de estar en el directorio raíz del proyecto.
    pause
    exit /b 1
)

echo Iniciando despliegue en Vercel...
echo.
vercel --prod

echo.
echo Despliegue completado. ¡Tu aplicación está ahora en línea!
echo.
pause