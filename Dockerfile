FROM reactnativecommunity/react-native-android:v16.0

# Instalamos herramientas útiles
RUN apt-get update && apt-get install -y \
    git \
    nano \
    curl \
    unzip \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Instalamos expo-cli y eas-cli globalmente
RUN npm install -g expo-cli eas-cli @expo/ngrok@^4.1.0

# Definimos carpeta de trabajo
WORKDIR /app

# Copiamos package.json y locks primero
COPY package.json yarn.lock* package-lock.json* ./

# Instalamos dependencias solo si cambian los archivos anteriores
RUN if [ -f yarn.lock ]; then yarn install; else npm install; fi

# Ahora copiamos el resto del código separado
# COPY . .

# Exponemos puertos
EXPOSE 8081 19000 19001 19002

# Comando por defecto
CMD ["bash"]
