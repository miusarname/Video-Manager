import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
import { crearToken } from "./auth/JWT.js";
import { users } from "./app/user/aplication/user.routes.js";
import { videos } from "./app/video/aplication/video.routes.js";
import morgan from "morgan";
import cors from "cors";

// Environment variables
dotenv.config();

// Initialize server
const index = express();

// Setting
index.set("port", process.env.PORT || 3000);

// Middlewares
index.use(morgan("dev"));
index.use(cors());
index.use(express.json());

// Swagger config
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Video Manager",
      version: "1.0.0",
      description: "El backend de la aplicación de gestión de vídeos ofrece servicios para la administración de usuarios, gestión de vídeos y autenticación. Incluye funcionalidades como CRUD de usuarios y vídeos, autenticación segura, recuperación de vídeos por usuario, acceso a vídeos públicos y privados, lista de vídeos mejor calificados, y endpoints adicionales como búsqueda por palabras clave y gestión de comentarios. En resumen, proporciona una API segura para operaciones relacionadas con usuarios, vídeos y características clave de la aplicación.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["index.js", "./app/user/aplication/user.routes.js"], // Ruta a los archivos donde se definen las rutas de la API
};

const specs = swaggerJsdoc(options);
index.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
index.use("/user", users);
index.use("/video", videos);
index.get('/tk',crearToken)

// Server
index.listen(index.get("port"), () => {
  console.log("Server on port " + index.get("port"));
});
