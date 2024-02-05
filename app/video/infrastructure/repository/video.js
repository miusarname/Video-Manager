// Importa la conexión a la base de datos
import { con } from "../database/atlas.js";

// Obtiene la conexión y la colección de videos
const db = await con();
const videos = db.collection("videos");

async function siguienteId(coleccion) {
  try {
    const db = await con(); // Obtener la conexión a la base de datos
    const sequenceDocument = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: coleccion + "Id" },
        { $inc: { sequence_value: 1 } },
        { returnDocument: "after" }
      );
    return sequenceDocument.value.sequence_value;
  } catch (error) {
    console.error("Error al obtener el siguiente ID:", error);
    throw error; // Puedes manejar el error de otra forma si lo prefieres
  }
}

// Operación de Crear Video
export const createVideo = async (videoToInsert) => {
  try {
    videoToInsert.id = await siguienteId("video");
    return await videos.insertOne(videoToInsert);
  } catch (error) {
    return { error: error, completed: false };
  }
};

// Operación de Leer Todos los Videos
export const allVideos = async () => {
  try {
    return await videos.find().toArray();
  } catch (error) {
    console.error("Error al obtener todos los videos:", error);
    return [];
  }
};

// Operación de Leer un Video por ID
export const getVideoById = async (ids) => {
  try {
    return await videos.findOne({ id: ids });
  } catch (error) {
    console.error("Error al obtener el video por ID:", error);
    return null;
  }
};

// Operación de Actualizar Video
export const updateVideo = async (ids, updatedVideoData) => {
  try {
    return await videos.updateOne({ id: ids }, { $set: updatedVideoData });
  } catch (error) {
    console.error("Error al actualizar el video:", error);
    return { error: error, completed: false };
  }
};

// Operación de Eliminar Video
export const deleteVideo = async (ids) => {
  try {
    return await videos.deleteOne({ id: ids });
  } catch (error) {
    console.error("Error al eliminar el video:", error);
    return { error: error, completed: false };
  }
};

// Operación de Obtener Videos por Visibilidad
export const getVideosByVisibility = async (isPublic) => {
  try {
    return await videos.find({ isPublic: isPublic }).toArray();
  } catch (error) {
    console.error("Error al obtener los videos por visibilidad:", error);
    return [];
  }
};

export const getVideosByLikes = async () => {
  try {
    return await videos
      .aggregate([
        { $sort: { likes: -1 } }, // Ordena los videos por likes de forma descendente
        { $limit: 5 }, // Limita los resultados a los primeros 5 videos
      ])
      .toArray();
  } catch (error) {
    console.error("Error al obtener los videos por visibilidad:", error);
    return [];
  }
};

// Función para agregar un comentario a un video
export const addCommentToVideo = async (videoId, comment) => {
  try {
    const video = await getVideoById(Number(videoId));

    if (!video) {
      console.error(`El video con ID ${videoId} no existe.`);
      return { error: `El video con ID ${videoId} no existe.`, completed: false };
    }

    const numberL = video.comments.length;
    video.comments.push(comment);

    const updatedVideo = await updateVideo(Number(videoId), video);
    console.log(numberL)

    const video2 = await getVideoById(Number(videoId));
    console.log(video2.comments.length)

    if (await numberL <= await video2.comments.length) {
      return { success: true, message: 'Comentario agregado correctamente.' };
    } else {
      return { error: 'No se pudo agregar el comentario al video.', completed: false };
    }
  } catch (error) {
    console.error('Error al agregar el comentario al video:', error);
    return { error: 'Error al agregar el comentario al video.', completed: false };
  }
};


