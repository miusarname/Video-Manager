import { Router } from "express";
import {
  getAllVideos,
  getVideoByIdHandler,
  createVideoHandler,
  updateVideoHandler,
  deleteVideoHandler,
  getVideosByVisibilityHandler, // Agregado
  getVideosByLikesHandler,
  postNewComment,
  addLikeVideo,
  getVideoByUserIdHandler,
} from "./video.controller.js";
import { validarToken, validarTokenGets } from "../../../auth/JWT.js";
import { videoDTO,videoDTOPut } from "../domain/dto/video.model.js";

export const videos = Router();

/**
 * @swagger
 * /video:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene todos los videos.
 *     description: Obtiene una lista de todos los videos disponibles, si envia token muestra que esta logeado, por tanto muestra,privados y publicos de lo contrario, solo veras los publicos.
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Videos obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 videos:
 *                   type: array
 *                   description: Lista de videos.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID único del video.
 *                       title:
 *                         type: string
 *                         description: Título del video.
 *                       description:
 *                         type: string
 *                         description: Descripción del video.
 *                       url:
 *                         type: string
 *                         description: URL del video.
 *       500:
 *         description: Error interno del servidor al obtener todos los videos.
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
 *                   example: Error al obtener todos los videos.
 */
videos.get("/", validarTokenGets, getAllVideos);

/**
 * @swagger
 * /video/likes:
 *   get:
 *     summary: Obtiene los videos con más likes.
 *     description: Obtiene una lista de los 5 videos con más likes.
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Videos con más likes obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 videos:
 *                   type: array
 *                   description: Lista de videos con más likes.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID único del video.
 *                       title:
 *                         type: string
 *                         description: Título del video.
 *                       description:
 *                         type: string
 *                         description: Descripción del video.
 *                       likes:
 *                         type: number
 *                         description: Número de likes del video.
 *       500:
 *         description: Error interno del servidor al obtener los videos por visibilidad.
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
 *                   example: Error al obtener los videos por visibilidad.
 */

videos.get("/likes", getVideosByLikesHandler);

/**
 * @swagger
 * /video/user/{id}:
 *   get:
 *     summary: Obtiene un video de un usuario por su ID.
 *     description: Obtiene la información de un video específico de un usuario mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del usuario propietario del video.
 *     responses:
 *       200:
 *         description: Video obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 video:
 *                   type: object
 *                   description: Información del video.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID único del video.
 *                     title:
 *                       type: string
 *                       description: Título del video.
 *                     description:
 *                       type: string
 *                       description: Descripción del video.
 *                     owner:
 *                       type: string
 *                       description: ID del propietario del video.
 *       404:
 *         description: Video no encontrado.
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
 *                   example: Video no encontrado.
 *       500:
 *         description: Error interno del servidor al obtener el video.
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
 *                   example: Error al obtener el video.
 */

videos.get("/user/:id", getVideoByUserIdHandler);

/**
 * @swagger
 * /video/comment/{id}:
 *   post:
 *     summary: Agrega un comentario a un video.
 *     description: Agrega un comentario al video especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del video al que se agregará el comentario.
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Comentario agregado exitosamente.
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
 *                   example: Comentario agregado exitosamente.
 *       404:
 *         description: Video no encontrado o ningún cambio realizado.
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
 *                   example: Video no encontrado o ningún cambio realizado.
 *       500:
 *         description: Error interno del servidor al actualizar el video.
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
 *                   example: Error al actualizar video.
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
 *                       location:
 *                         type: string
 */

videos.post("/comment/:id", postNewComment);

/**
 * @swagger
 * /video/like/{id}:
 *   post:
 *     summary: Da like a un video.
 *     description: Da like al video especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del video al que se le dará like.
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Like agregado exitosamente.
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
 *                   example: Like agregado exitosamente.
 *       404:
 *         description: Video no encontrado o ningún cambio realizado.
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
 *                   example: Video no encontrado o ningún cambio realizado.
 *       500:
 *         description: Error interno del servidor al actualizar el video.
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
 *                   example: Error al actualizar video.
 */

videos.post("/like/:id", addLikeVideo);

/**
 * @swagger
 * /video/{id}:
 *   get:
 *     summary: Obtiene un video por su ID.
 *     description: Obtiene la información de un video específico mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del video.
 *     responses:
 *       200:
 *         description: Video obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 video:
 *                   type: object
 *                   description: Información del video.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID único del video.
 *                     title:
 *                       type: string
 *                       description: Título del video.
 *                     description:
 *                       type: string
 *                       description: Descripción del video.
 *       404:
 *         description: Video no encontrado.
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
 *                   example: Video no encontrado.
 *       500:
 *         description: Error interno del servidor al obtener el video.
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
 *                   example: Error al obtener el video.
 */

videos.get("/:id", getVideoByIdHandler);

/**
 * @swagger
 * /video/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Crea un nuevo video.
 *     description: Crea un nuevo video con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del video.
 *               description:
 *                 type: string
 *                 description: Descripción del video.
 *               credits:
 *                 type: string
 *                 description: Créditos del video.
 *               publishDate:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de publicación del video (formato ISO 8601).
 *               isPublic:
 *                 type: boolean
 *                 description: Indica si el video es público o no.
 *               likes:
 *                 type: integer
 *                 description: Número de likes del video.
 *               user:
 *                 type: integer
 *                 description: ID del usuario propietario del video.
 *     responses:
 *       201:
 *         description: Video creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 newVideo:
 *                   type: object
 *                   description: Información del video creado.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID único del video.
 *                     title:
 *                       type: string
 *                       description: Título del video.
 *                     description:
 *                       type: string
 *                       description: Descripción del video.
 *                     credits:
 *                       type: string
 *                       description: Créditos del video.
 *                     publishDate:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de publicación del video (formato ISO 8601).
 *                     isPublic:
 *                       type: boolean
 *                       description: Indica si el video es público o no.
 *                     likes:
 *                       type: integer
 *                       description: Número de likes del video.
 *                     user:
 *                       type: integer
 *                       description: ID del usuario propietario del video.
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
 *       500:
 *         description: Error interno del servidor al crear el video.
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
 *                   example: Error al crear video.
 */

videos.post("/", videoDTO, validarToken, createVideoHandler);

/**
 * @swagger
 * /video/:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Actualiza un video existente.
 *     description: Actualiza los datos de un video existente.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID único del video a actualizar.
 *               title:
 *                 type: string
 *                 description: Nuevo título del video.
 *               description:
 *                 type: string
 *                 description: Nueva descripción del video.
 *               credits:
 *                 type: string
 *                 description: Nuevos créditos del video.
 *               publishDate:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva fecha de publicación del video (formato ISO 8601).
 *               isPublic:
 *                 type: boolean
 *                 description: Nuevo estado de visibilidad del video.
 *               likes:
 *                 type: integer
 *                 description: Nuevo número de likes del video.
 *               user:
 *                 type: integer
 *                 description: Nuevo ID del usuario propietario del video.
 *     responses:
 *       200:
 *         description: Video actualizado exitosamente.
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
 *                   example: Video actualizado exitosamente.
 *       404:
 *         description: Video no encontrado o ningún cambio realizado.
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
 *                   example: Video no encontrado o ningún cambio realizado.
 *       500:
 *         description: Error interno del servidor al actualizar el video.
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
 *                   example: Error al actualizar video.
 */

videos.put("/:id",videoDTOPut,validarToken, updateVideoHandler);

/**
 * @swagger
 * /video/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID del video a eliminar.
 *       schema:
 *         type: string
 *   delete:
 *     summary: Elimina un video existente.
 *     description: Elimina un video existente según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del video a eliminar.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video eliminado exitosamente.
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
 *                   example: Video eliminado exitosamente.
 *       404:
 *         description: Video no encontrado.
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
 *                   example: Video no encontrado.
 *       500:
 *         description: Error interno del servidor al eliminar el video.
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
 *                   example: Error al eliminar video.
 */

videos.delete("/:id", validarToken, deleteVideoHandler);

/**
 * @swagger
 * /video/visibility/{visibility}:
 *   get:
 *     summary: Obtiene videos por visibilidad.
 *     description: Obtiene una lista de videos públicos o privados según la visibilidad especificada.
 *     parameters:
 *       - in: path
 *         name: visibility
 *         required: true
 *         schema:
 *           type: string
 *           enum: [public, private]
 *           description: Visibilidad de los videos a obtener (publico o privado).
 *     responses:
 *       200:
 *         description: Videos obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 videos:
 *                   type: array
 *                   description: Lista de videos.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID único del video.
 *                       title:
 *                         type: string
 *                         description: Título del video.
 *                       description:
 *                         type: string
 *                         description: Descripción del video.
 *       500:
 *         description: Error interno del servidor al obtener los videos por visibilidad.
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
 *                   example: Error al obtener los videos por visibilidad.
 */

// Nueva ruta para obtener videos públicos o privados
videos.get("/visibility/:visibility", getVideosByVisibilityHandler);
