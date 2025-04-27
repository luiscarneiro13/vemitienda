#!/bin/bash

echo "================================="
echo "Configuración inicial 🚀"
echo ""

# Preguntamos todo de una vez
echo "¿Deseas purgar Docker completamente antes de levantar? (s/n)"
read PURGE

echo ""
echo "================================="
echo "Configuración completa. Iniciando... 🚀"
echo ""

# Ahora procesamos en orden
if [[ "$PURGE" == "s" || "$PURGE" == "S" ]]; then
  echo ">> Purgando contenedores, volúmenes e imágenes..."
  docker system prune -af --volumes
fi

# Comprobamos si el contenedor ya existe
if [ "$(docker ps -a -q -f name=^react-native-dev$)" ]; then
  echo ">> Deteniendo y eliminando contenedor react-native-dev existente..."
  docker stop react-native-dev
  docker rm react-native-dev
fi

echo ">> Reconstruyendo el contenedor react-native..."
docker compose build

echo ">> Iniciando servicio react-native con puertos abiertos..."
docker compose up -d react-native

# Esperamos unos segundos
sleep 5

echo ">> Entrando al contenedor react-native-dev..."
docker exec -it react-native-dev bash -c "CHOKIDAR_USEPOLLING=true npx expo start --host lan"
