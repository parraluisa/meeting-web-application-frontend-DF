# Meeting App - Frontend

Este es el frontend de la aplicación de videoconferencias, desarrollado con React y `socket.io-client`. Proporciona una interfaz para gestionar reuniones en línea, incluyendo opciones de configuración de dispositivos multimedia y control de cámara/micrófono.

## Características

- Transmisión de video y audio.
- Configuración de dispositivos (cámara, micrófono y altavoces).
- Gestión de participantes a través de WebSocket.
- Controles básicos de cámara y micrófono.
- Modal de configuración interactivo.

## Requisitos previos

Para ejecutar este proyecto, asegúrate de tener lo siguiente instalado en tu máquina:

- **Node.js** (versión 16 o superior).
- **npm** (o **yarn**, según prefieras).

### ¿No tienes Node.js instalado?

Si no tienes **Node.js** y **npm** instalados, sigue estos pasos:

1. **Descargar Node.js**:
   - Ve a la página oficial de Node.js: [https://nodejs.org](https://nodejs.org)
   - Descarga la versión **LTS** (Long Term Support), que es la más estable y recomendada para la mayoría de los usuarios.
   - Ejecuta el instalador y sigue las instrucciones en pantalla. Esto instalará **Node.js** y **npm** automáticamente.

2. **Verificar la instalación**:
   Una vez instalado, abre una terminal y ejecuta los siguientes comandos para asegurarte de que Node.js y npm se instalaron correctamente:
   ```bash
   node -v
   npm -v
Deberías ver algo como:

arduino
Copiar código
v16.x.x  # o una versión superior
8.x.x    # versión de npm

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd meeting-room-frontend

2. Instala las dependencias:
    ```bash
    npm install
3. Inicia el servidor de desarrollo:
        ```bash
        npm start
    ó
        ```bash
        yarn start

El frontend estará disponible en http://localhost:3000.