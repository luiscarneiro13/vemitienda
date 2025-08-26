

**Levantar entorno de desarrollo**


    1. Levantar en segundo plano
        

        docker compose up -d --build


    2. Accede a una shell dentro del contenedor
        

        docker exec -it expo-dev-container bash


    3. Dentro del contenedor, inicia el servidor de desarrollo de Expo
   
        
        npx expo start --dev --tunnel
        

**Construir .aab**


    docker compose -f docker-compose-build.yml up --build


### Actualizar imagen base
    docker build -t carneiroluis2/reactnative:v1.1 -f Dockerfile.base .
    docker tag carneiroluis2/reactnative:v1.1 carneiroluis2/reactnative:latest
    docker login
    docker push carneiroluis2/reactnative:latest
