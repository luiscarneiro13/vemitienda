@echo off

echo =================================
echo Configuracion inicial
echo.

echo =================================
echo Verificando y deteniendo contenedor existente...
echo.

docker ps --filter "name=react-native-dev" --format "{{.Names}}" | findstr /C:"react-native-dev" >nul 2>&1
if %errorlevel% == 0 (
    echo >> Deteniendo el contenedor react-native-dev...
    docker compose down react-native
) else (
    echo >> El contenedor react-native-dev no está en ejecución.
)

echo.
echo =================================
echo Reconstruyendo el contenedor react-native...
echo.

docker compose build

echo.
echo =================================
echo Iniciando servicio react-native con puertos abiertos...
echo.

docker compose up -d react-native

REM Esperamos unos segundos
timeout /t 5 /nobreak >nul

echo.
echo =================================
echo Entrando al contenedor react-native-dev...
echo.

docker exec -it react-native-dev bash -c "CHOKIDAR_USEPOLLING=true npx expo start --host lan"

echo.
echo Proceso completado.
pause