# Video Manage

Video Manage es un backend para un administrador de videos, inspirado en plataformas como YouTube. El proyecto está construido siguiendo una arquitectura hexagonal para una mejor organización y mantenimiento del código.

## Uso

Una vez que el servidor esté en funcionamiento, puedes acceder a la documentación y al Swagger UI visitando la ruta `/api-docs`. Aquí encontrarás la documentación detallada de las rutas disponibles junto con ejemplos de uso.

## Estructura del Proyecto

La estructura del proyecto sigue una organización basada en la arquitectura hexagonal. A continuación, se muestra la estructura de carpetas del proyecto:

```
|-- app/
|   |-- user/
|   |   |-- aplication/
|   |   |   |-- user.controller.js
|   |   |   |-- user.routes.js
|   |   |-- domain/
|   |   |   |-- dto/
|   |   |   |   |-- user.model.js
|   |   |-- infrastructure/
|   |   |   |-- config/
|   |   |   |   |-- RateLimit.js
|   |   |   |-- database/
|   |   |   |   |-- atlas.js
|   |   |   |-- repository/
|   |   |   |   |-- user.js
|   |-- video/
|   |   |-- aplication/
|   |   |   |-- video.controller.js
|   |   |   |-- video.routes.js
|   |   |-- domain/
|   |   |   |-- dto/
|   |   |   |   |-- video.model.js
|   |   |-- infrastructure/
|   |   |   |-- config/
|   |   |   |   |-- RateLimit.js
|   |   |   |-- database/
|   |   |   |   |-- atlas.js
|   |   |   |-- repository/
|   |   |   |   |-- video.js
|-- auth/
|   |-- JWT.js
|-- db/
|   |-- schemas/
|   |   |-- schemas.mongodb
|-- test/
|   |-- user.test.js
|   |-- video.test.js
|-- readme.md
|-- package.json
|-- .gitignore
|-- index.js
|-- .env
```

## Test

Se han implementado pruebas unitarias utilizando Mocha para garantizar la calidad del código y la funcionalidad del backend. Las pruebas se encuentran en la carpeta `test` y cubren las funcionalidades relacionadas con usuarios y videos.

## Requisitos

Para ejecutar Video Manage, se necesitan los siguientes requisitos:

- Node.js versión 18.16.1 o superior. Puedes instalar Node.js desde [https://nodejs.org/en/download](https://nodejs.org/en/download).
- MongoDB Atlas con una cuenta previamente creada en [https://www.mongodb.com/es/atlas/database](https://www.mongodb.com/es/atlas/database). Se utilizará la conexión a una base de datos personal para realizar las pruebas. El archivo de entorno `.env.example` proporciona un ejemplo de configuración.

## Instalación

Para instalar Video Manage, sigue los siguientes pasos:

1. Clona el repositorio ejecutando el siguiente comando en tu terminal:

   ```
   git clone https://github.com/miusarname/Video-Manager.git
   ```

2. Una vez clonado el repositorio, accede a la carpeta del proyecto y abre una terminal.

3. Ejecuta el siguiente comando para instalar todas las dependencias listadas en el archivo `package.json`:

   ```
   npm install
   ```

4. Renombra el archivo de ejemplo `.env.example` a `.env` para que la dependencia `dotenv` pueda acceder a las variables de entorno.

5. Inicia el servidor con el siguiente comando:

   ```
   npm run dev
   ```

   El servidor se ejecutará por defecto en el puerto 3000, a menos que se especifique otro en el archivo `.env`.

## Contribuir

Si deseas contribuir a Video Manage, siéntete libre de hacer fork del repositorio y enviar pull requests con tus contribuciones.

## Licencia

Video Manage está bajo la licencia MIT. Puedes encontrar más detalles en el archivo `LICENSE`.