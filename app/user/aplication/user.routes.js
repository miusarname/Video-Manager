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
 * /user/register/:
 *   post:
 *     summary: Registrar un nuevo usuario.
 *     description: Registrar un nuevo usuario con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Nombre del usuario.
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario.
 *               phone:
 *                 type: string
 *                 description: Teléfono del usuario.
 *               email:
 *                 type: string
 *                 description: Dirección de correo electrónico del usuario.
 *               verified:
 *                 type: boolean
 *                 description: Estado de verificación del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 user:
 *                   type: object
 *                   description: Información del usuario creado.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID único del usuario.
 *                     firstName:
 *                       type: string
 *                       description: Nombre del usuario.
 *                     lastName:
 *                       type: string
 *                       description: Apellido del usuario.
 *                     phone:
 *                       type: string
 *                       description: Teléfono del usuario.
 *                     email:
 *                       type: string
 *                       description: Dirección de correo electrónico del usuario.
 *                     verified:
 *                       type: boolean
 *                       description: Estado de verificación del usuario.
 *       400:
 *         description: Datos de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor al crear el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Error al crear el usuario.
 */

users.post("/register",userPostDTO,createUserHandler);

/**
 * @swagger
 * /user/loggin:
 *   post:
 *     summary: Iniciar sesión de usuario.
 *     description: Permite a un usuario iniciar sesión en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Nombre del usuario.
 *               email:
 *                 type: string
 *                 description: Dirección de correo electrónico del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Retorna un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 newUser:
 *                   type: string
 *                   description: Token JWT generado para el usuario.
 *       500:
 *         description: Error interno del servidor al iniciar sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Error al iniciar sesión. Por favor, inténtelo de nuevo.
 */

users.post("/loggin", logginHandler);

/**
 * @swagger
 * /user/verify/email:
 *   get:
 *     summary: Verificar correo electrónico del usuario.
 *     description: Verifica el correo electrónico proporcionado por el usuario y le envía un correo de verificación, para verificar la cuenta.
 *     parameters:
 *       - in: query
 *         name: lastName
 *         required: true
 *         schema:
 *           type: string
 *           description: Apellido del usuario.
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *           description: Dirección de correo electrónico del usuario.
 *     responses:
 *       200:
 *         description: Correo electrónico verificado. Se envió un correo de verificación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Revisa el email proporcionado, te debió haber llegado un correo electrónico de verificación.
 *       500:
 *         description: Error interno del servidor al verificar usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Error al verificar usuario. Por favor, inténtelo de nuevo.
 */

users.get("/verfy/email", verificationEmail);

/**
 * @swagger
 * /user/verify/{id}:
 *   get:
 *     summary: Verificar cuenta de usuario.
 *     description: Verifica la cuenta de usuario mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID único del usuario.
 *     responses:
 *       200:
 *         description: Usuario verificado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Usuario verificado exitosamente.
 *       404:
 *         description: Usuario no encontrado o ningún cambio realizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado o ningún cambio realizado.
 *       500:
 *         description: Error interno del servidor al verificar usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Error al verificar usuario.
 */

users.get("/verify/:id", verifyUserHandler);

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

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtiene información de un usuario por su ID.
 *     description: Obtiene la información de un usuario específico mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID único del usuario.
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 user:
 *                   type: object
 *                   description: Información del usuario.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID único del usuario.
 *                     username:
 *                       type: string
 *                       description: Nombre de usuario.
 *                     email:
 *                       type: string
 *                       description: Dirección de correo electrónico del usuario.
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor al obtener el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Error al obtener el usuario.
 */

users.get("/:id",getUserByIdHandler);

/**
 * @swagger
 * /user/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Crea un nuevo usuario.
 *     description: Crea un nuevo usuario con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Nombre del usuario.
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario.
 *               phone:
 *                 type: string
 *                 description: Teléfono del usuario.
 *               email:
 *                 type: string
 *                 description: Dirección de correo electrónico del usuario.
 *               verified:
 *                 type: boolean
 *                 description: Estado de verificación del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 user:
 *                   type: object
 *                   description: Información del usuario creado.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID único del usuario.
 *                     firstName:
 *                       type: string
 *                       description: Nombre del usuario.
 *                     lastName:
 *                       type: string
 *                       description: Apellido del usuario.
 *                     phone:
 *                       type: string
 *                       description: Teléfono del usuario.
 *                     email:
 *                       type: string
 *                       description: Dirección de correo electrónico del usuario.
 *                     verified:
 *                       type: boolean
 *                       description: Estado de verificación del usuario.
 *       400:
 *         description: Datos de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor al crear el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Error al crear el usuario.
 */

users.post("/",userPostDTO, validarToken ,createUserHandler);

/**
 * @swagger
 * /user/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID del usuario a actualizar.
 *       schema:
 *         type: string
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Actualiza un usuario existente.
 *     description: Actualiza los datos de un usuario existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Nuevo nombre del usuario.
 *               lastName:
 *                 type: string
 *                 description: Nuevo apellido del usuario.
 *               phone:
 *                 type: string
 *                 description: Nuevo teléfono del usuario.
 *               email:
 *                 type: string
 *                 description: Nueva dirección de correo electrónico del usuario.
 *               verified:
 *                 type: boolean
 *                 description: Nuevo estado de verificación del usuario.
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado exitosamente.
 *       400:
 *         description: Datos de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                       param:
 *                         type: string
 *       404:
 *         description: Usuario no encontrado o ningún cambio realizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado o ningún cambio realizado.
 *       500:
 *         description: Error interno del servidor al actualizar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Error al actualizar el usuario.
 */

users.put("/:id",userPutDTO, validarToken ,updateUserHandler);

/**
 * @swagger
 * /user/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID del usuario a actualizar o eliminar.
 *       schema:
 *         type: string
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Elimina un usuario existente.
 *     description: Elimina un usuario existente según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario a eliminar.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado exitosamente.
 *       400:
 *         description: Datos de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                       param:
 *                         type: string
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor al eliminar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Error al eliminar el usuario.
 */
users.delete("/:id",validarToken ,deleteUserHandler);

