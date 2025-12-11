@echo off
echo Inicializando Firebase...
npx firebase init hosting
echo.
echo Configurando directorio publico como .
echo . | npx firebase init hosting
echo.
echo Firebase inicializado correctamente.
pause