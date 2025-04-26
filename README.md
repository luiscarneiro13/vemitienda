

**Levantar entorno de desarrollo**


    1. Levantar en segundo plano
        

        docker compose up -d --build


    2. Accede a una shell dentro del contenedor
        

        docker exec -it expo-dev-container bash


    3. Dentro del contenedor, inicia el servidor de desarrollo de Expo
   
        
        npx expo start --dev --tunnel
        

**Construir .aab**


    docker compose -f docker-compose-build.yml up --build


**Abrir puertos desde windows para comunicacion con wsl**


    la Direccion del wsl es: 172.23.52.48. Si cambia entonces hay que correr el comando con la nueva direccion
    En powershel hay que redirigir los puertos de windows hacia ws (Ejecutar en powersehll modo admin)l:
    netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=8081 connectaddress=172.23.52.48 connectport=8081
    netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=19000 connectaddress=172.23.52.48 connectport=19000
    netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=19001 connectaddress=172.23.52.48 connectport=19001
    netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=19002 connectaddress=172.23.52.48 connectport=19002
