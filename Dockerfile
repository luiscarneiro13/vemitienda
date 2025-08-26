FROM carneiroluis2/reactnative:latest

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
