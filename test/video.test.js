import { expect } from 'chai';
import { createVideo, allVideos, getVideoById, updateVideo, deleteVideo, getVideosByVisibility, getVideosByLikes, addCommentToVideo, likeVideo,getVideosByUser } from '../app/video/infrastructure/repository/video.js';

describe('Funciones de manejo de videos', () => {
  var videoId;

  it('Debería crear un nuevo video', async () => {
    const newVideo = { title: 'Nuevo Video', description: 'Descripción del nuevo video', isPublic: true,credits:"Creditos",publishDate:(new Date()),likes:0,user:1,comments:[] };
    const result = await createVideo(newVideo);
    videoId = result.insertedId; // Suponiendo que el ID se devuelva como 'insertedId'
    expect(result).to.have.property('insertedId');
  });

  it('Debería obtener todos los videos', async () => {
    const result = await allVideos();
    videoId = result[0].id
    expect(result).to.be.an('array');
  });

  it('Debería obtener un video por ID', async () => {
    const result = await getVideoById(videoId);
    expect(result).to.have.property('title').equal('Nuevo Video');
  });

  it('Debería actualizar un video', async () => {
    const updatedData = { title: 'Video Actualizado' };
    const result = await updateVideo(videoId, updatedData);
    expect(result).to.have.property('modifiedCount').equal(1);
  });

  it('Debería dar like a un video', async () => {
    const result = await likeVideo(videoId);
    expect(result).to.have.property('success').equal(true);
  });

  it('Debería eliminar un video', async () => {
    const result = await deleteVideo(videoId);
    expect(result).to.have.property('deletedCount').equal(1);
  });

  it('Debería obtener videos por visibilidad', async () => {
    const result = await getVideosByVisibility(true);
    expect(result).to.be.an('array');
  });

  it('Debería obtener videos por likes', async () => {
    const result = await getVideosByLikes();
    expect(result).to.be.an('array');
  });

  // Pruebas de errores y casos límite

  it('Debería manejar correctamente la creación de un video sin datos', async () => {
    const result = await createVideo({});
    expect(result).to.have.property('error');
  });

  it('Debería manejar correctamente la obtención de un video inexistente por ID', async () => {
    const result = await getVideoById('videoInexistenteID');
    expect(result).to.be.null;
  });

  it('Debería manejar correctamente la actualización de un video inexistente', async () => {
    const updatedData = { title: 'Video Actualizado' };
    const result = await updateVideo('videoInexistenteID', updatedData);
    expect(result).to.have.property('modifiedCount').equal(0);
  });

  it('Debería manejar correctamente la eliminación de un video inexistente', async () => {
    const result = await deleteVideo('videoInexistenteID');
    expect(result).to.have.property('deletedCount').equal(0);
  });

  // Pruebas adicionales

  it('Debería manejar correctamente la adición de comentarios a un video inexistente', async () => {
    const result = await addCommentToVideo('videoInexistenteID', 'Comentario de prueba');
    expect(result).to.have.property('error');
  });

  it('Debería manejar correctamente el intento de dar like a un video inexistente', async () => {
    const result = await likeVideo('videoInexistenteID');
    expect(result).to.have.property('error');
  });

  it('Debería devolver un array de vídeos para un usuario existente', async () => {
    // Simula un ID de usuario existente
    const userId = 1;

    // Llama a la función getVideosByUser con el ID de usuario simulado
    const userVideos = await getVideosByUser(userId);

    // Verifica si la respuesta es un array
    expect(userVideos).to.be.an('array');
    // Aquí podrías agregar más aserciones para verificar la estructura de los vídeos, etc.
  });

  it('Debería devolver un array vacío para un usuario inexistente', async () => {
    // Simula un ID de usuario que no existe
    const userId = '999';

    // Llama a la función getVideosByUser con el ID de usuario simulado
    const userVideos = await getVideosByUser(userId);

    // Verifica si la respuesta es un array vacío
    expect(userVideos).to.be.an('array').that.is.empty;
  });

});
