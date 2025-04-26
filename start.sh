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

echo ">> Reconstruyendo el contenedor react-native..."
docker compose build

echo ">> Iniciando servicio react-native con puertos abiertos..."
docker compose up -d react-native

# Esperamos unos segundos
sleep 5

echo ">> Entrando al contenedor react-native-dev..."
# docker exec -it react-native-dev bash -c "npx expo start --host lan"
docker exec -it react-native-dev bash -c "CHOKIDAR_USEPOLLING=true npx expo start --host lan"

