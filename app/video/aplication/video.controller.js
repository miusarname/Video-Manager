import {
    allVideos,
    createVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    getVideosByLikes,
    addCommentToVideo,
    likeVideo
  } from "../infrastructure/repository/video.js";
  import { validationResult } from 'express-validator';

  
  export async function getAllVideos(req, res) {
    try {
      const videos = await allVideos();
      res.status(200).json({ status: 200, videos: videos });
    } catch (error) {
      console.error("Error al obtener todos los videos:", error);
      res.status(500).json({ status: 500, message: "Error al obtener todos los videos" });
    }
  }
  
  export async function getVideoByIdHandler(req, res) {
    const videoId =Number(req.params.id);
    try {
      const video = await getVideoById(videoId);
      if (video) {
        res.status(200).json({ status: 200, video: video });
      } else {
        res.status(404).json({ status: 404, message: "Video no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener el video:", error);
      res.status(500).json({ status: 500, message: "Error al obtener el video" });
    }
  }
  
  export async function createVideoHandler(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const videoData = req.body;
    try {
      const newVideo = await createVideo(videoData);
      res.status(201).json({ status: 201, newVideo: newVideo });
    } catch (error) {
      console.error("Error al crear video:", error);
      res.status(500).json({ status: 500, message: "Error al crear video" });
    }
  }
  
  export async function updateVideoHandler(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const videoId = Number(req.params.id);
    const updatedVideoData = req.body;
    try {
      const result = await updateVideo(videoId, updatedVideoData);
      if (result.modifiedCount > 0) {
        res.status(200).json({ status: 200, message: "Video actualizado exitosamente" });
      } else {
        res.status(404).json({ status: 404, message: "Video no encontrado o ningún cambio realizado" });
      }
    } catch (error) {
      console.error("Error al actualizar video:", error);
      res.status(500).json({ status: 500, message: "Error al actualizar video" });
    }
  }
  
  export async function deleteVideoHandler(req, res) {
    const videoId = Number(req.params.id);
    try {
      const result = await deleteVideo(videoId);
      if (result.deletedCount > 0) {
        res.status(200).json({ status: 200, message: "Video eliminado exitosamente" });
      } else {
        res.status(404).json({ status: 404, message: "Video no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar video:", error);
      res.status(500).json({ status: 500, message: "Error al eliminar video" });
    }
  }
  
  export async function getVideosByVisibilityHandler(req, res) {
    const isPublic = req.params.visibility === 'public';
    try {
      const videos = await getVideosByVisibility(isPublic);
      res.status(200).json({ status: 200, videos: videos });
    } catch (error) {
      console.error("Error al obtener los videos por visibilidad:", error);
      res.status(500).json({ status: 500, message: "Error al obtener los videos por visibilidad" });
    }
  }

  export async function getVideosByLikesHandler(req, res) {
    try {
      const videos = await getVideosByLikes();
      res.status(200).json({ status: 200, videos: videos });
    } catch (error) {
      console.error("Error al obtener los videos por visibilidad:", error);
      res.status(500).json({ status: 500, message: "Error al obtener los videos por visibilidad" });
    }
  }
  
  export async function postNewComment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const videoId = Number(req.params.id);
    const updatedVideoData = req.body;
    try {
      const result = await addCommentToVideo(videoId, updatedVideoData);
      if (result.success) {
        res.status(200).json({ status: 200, message: "Comentario agregado exitosamente" });
      } else {
        res.status(404).json({ status: 404, message: "Video no encontrado o ningún cambio realizado " });
      }
    } catch (error) {
      console.error("Error al actualizar video:", error);
      res.status(500).json({ status: 500, message: "Error al actualizar video" });
    }
  }

  export async function addLikeVideo(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const videoId = Number(req.params.id);
      try {
      const result = await likeVideo(videoId);
      if (result.success) {
        res.status(200).json({ status: 200, message: "like agregado exitosamente" });
      } else {
        res.status(404).json({ status: 404, message: "Video no encontrado o ningún cambio realizado " });
      }
    } catch (error) {
      console.error("Error al actualizar video:", error);
      res.status(500).json({ status: 500, message: "Error al actualizar video" });
    }
  }