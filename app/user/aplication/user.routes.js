import { Router } from "express";
import {
  getAllUsers,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  verifyUserHandler,
  logginHandler,
  verificationEmail
} from "./user.controller.js";
import { userPostDTO,userPutDTO } from "../domain/dto/user.model.js";
import {validarToken} from '../../../auth/JWT.js'


export const users = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtiene la lista de usuarios.
 *     description: Obtiene la lista completa de usuarios registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único del usuario.
 *                   username:
 *                     type: string
 *                     description: Nombre de usuario.
 *                   email:
 *                     type: string
 *                     description: Dirección de correo electrónico del usuario.
 *       500:
 *         description: Error interno del servidor.
 */
users.get("/", getAllUsers);

users.get("/loggin", logginHandler);

users.get("/verfy/email", verificationEmail);

users.get("/verify/:id", verifyUserHandler);

users.get("/:id",getUserByIdHandler);

users.post("/",userPostDTO, validarToken ,createUserHandler);

users.post("/register",userPostDTO,createUserHandler);

users.put("/:id",userPutDTO, validarToken ,updateUserHandler);

users.delete("/:id",validarToken ,deleteUserHandler);

