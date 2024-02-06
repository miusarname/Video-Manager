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
  addLikeVideo
} from "./video.controller.js";
import {validarToken} from '../../../auth/JWT.js'
import { videoDTO } from "../domain/dto/video.model.js";

export const videos = Router();

videos.get("/", getAllVideos);
videos.get("/likes", getVideosByLikesHandler);
videos.post("/comment/:id", postNewComment);
videos.post("/like/:id", addLikeVideo);
videos.get("/:id", getVideoByIdHandler);
videos.post("/", videoDTO,validarToken,createVideoHandler);
videos.put("/:id", validarToken,updateVideoHandler);
videos.delete("/:id", validarToken,deleteVideoHandler);
// Nueva ruta para obtener videos públicos o privados
videos.get("/visibility/:visibility", getVideosByVisibilityHandler);

