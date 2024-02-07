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

## Modelo Base de Datos

A continuación se presenta el modelo base de datos utilizado en el proyecto:

```javascript
use("beMaster")

// Esquema de validación para la colección "users"
db.createCollection("users", {
  validator: {
      $jsonSchema: {
          bsonType: "object",
          additionalProperties: true,
          required: ["id", "firstName", "lastName", "phone", "email", "verified"],
          properties: {
              id: { bsonType: "number", description: "ID es requerido" },
              firstName: { bsonType: "string", description: "Nombre es requerido" },
              lastName: { bsonType: "string", description: "Apellido es requerido" },
              phone: { bsonType: "string", description: "Teléfono es requerido" },
              email: { bsonType: "string", description: "Email es requerido" },
              verified: { bsonType: "bool", description: "Verificación es requerida" }
          }
      }
  }
});

db.createCollection("counters");
db.counters.insertMany([
  { _id: "userId", sequence_value: 0 }, // Cambiado a "userId" para que coincida con la colección "users"
  { _id: "videoId", sequence_value: 0 }
]);

function siguienteId(coleccion) {
  const sequenceDocument = db.counters.findOneAndUpdate(
      { _id: coleccion + "Id" },
      { $inc: { sequence_value: 1 } },
      { returnDocument: "after" }
  );
  return sequenceDocument.sequence_value;
}
use("beMaster")

// Esquema de validación para la colección "videos"
db.createCollection("videos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      additionalProperties: true,
      required: ["id","title", "description", "credits", "publishDate", "isPublic", "likes", "user"],
      properties: {
        id: { bsonType: "number", description: "ID es requerido" },
        title: { bsonType: "string", description: "Título es requerido" },
        description: { bsonType: "string", description: "Descripción es requerida" },
        credits: { bsonType: "string", description: "Créditos son requeridos" },
        publishDate: { bsonType: "date", description: "Fecha de publicación es requerida" },
        isPublic: { bsonType: "bool", description: "Indicador de público/privado es requerido" },
        likes: { bsonType: "number", description: "Número de likes" },
        user: { bsonType: "number", description: "ID del usuario" },
        comments: {
          bsonType: "array",
          description: "Lista de comentarios",
          items: {
            bsonType: "object",
            required: ["usuario", "comentario"],
            properties: {
              usuario: { bsonType: "number", description: "ID del usuario" },
              comentario: { bsonType: "string", description: "Comentario" }
            }
          }
        }
      }
    }
  }
});

use("beMaster")

db.videos.insertMany([
  {
    id: Number(siguienteId("video")),
    title: "Video 3",
    description: "Descripción del video 3",
    credits: "Créditos del video 3",
    publishDate: new Date("2024-02-05"),
    isPublic: true,
    likes: 20,
    user: 1,
    comments: []
  },
  {
    id: Number(siguienteId("video")),
    title: "Video 4",
    description: "Descripción del video 4",
    credits: "Créditos del video 4",
    publishDate: new Date("2024-02-05"),
    isPublic: false,
    likes: 15,
    user: 1,
    comments: [
      { usuario: 1, comentario: "Comentario del video 4" }
    ]
  },
  // Puedes seguir agregando más documentos aquí según tus necesidades
]);

use("beMaster")

function siguienteId(coleccion) {
  const sequenceDocument = db.counters.findOneAndUpdate(
      { _id: coleccion + "Id" },
      { $inc: { sequence_value: 1 } },
      { returnDocument: "after" }
  );
  return sequenceDocument.sequence_value;
}
db.users.insertMany([
  {
      id: Number(siguienteId("user")),
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john@example.com",
      verified: true
  },
  {
      id: Number(siguienteId("user")),
      firstName: "Alice",
      lastName: "Smith",
      phone: "0987654321",
      email: "alice@example.com",
      verified: false
  },
  {
      id: Number(siguienteId("user")),
      firstName: "Bob",
      lastName: "Johnson",
      phone: "5551234567",
      email: "bob@example.com",
      verified: true
  },
  {
      id: Number(siguienteId("user")),
      firstName: "Eve",
      lastName: "Jones",
      phone: "7778889999",
      email: "eve@example.com",
      verified: false
  },
  {
      id: Number(siguienteId("user")),
      firstName: "Jane",
      lastName: "Brown",
      phone: "3334445555",
      email: "jane@example.com",
      verified: true
  }
]);

use("beMaster")

function siguienteId(coleccion) {
  const sequenceDocument = db.counters.findOneAndUpdate(
      { _id: coleccion + "Id" },
      { $inc: { sequence_value: 1 } },
      { returnDocument: "after" }
  );
  return sequenceDocument.sequence_value;
}

db.users.insertOne({
  id: Number(siguienteId("user")),
  firstName: "Alice",
  lastName: "Smith",
  phone: "0987654321",
  email: "alice@example.com",
  verified: false
})
```

Este modelo establece la estructura y las restricciones de los datos para las colecciones `users` y `videos` en la base de datos.

## Contribuir

Si deseas contribuir a Video Manage, siéntete libre de hacer fork del repositorio y enviar pull requests con tus contribuciones.

## Licencia

Video Manage está bajo la licencia MIT. Puedes encontrar más detalles en el archivo `LICENSE`.