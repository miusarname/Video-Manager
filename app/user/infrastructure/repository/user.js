// Importa la conexión a la base de datos
import { con } from "../database/atlas.js";

// Obtiene la conexión y la colección de usuarios
const db = await con();
const users = db.collection("users");

async function siguienteId(coleccion) {
  try {
    const db = await con(); // Obtener la conexión a la base de datos
    const sequenceDocument = await db.collection('counters').findOneAndUpdate(
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


// Operación de Crear Usuario
export const createUser = async (userToInsert) => {
  try {
    userToInsert.verified = false;
    userToInsert.id = await siguienteId("user");
    
    return await users.insertOne(userToInsert);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return { error: error, completed: false };
  }
};


// Operación de Leer Todos los Usuarios
export const allUsers = async () => {
  try {
    return await users.find().toArray();
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    return [];
  }
};

// Operación de Leer un Usuario por ID
export const getUserById = async (ids) => {
  try {
    return await users.findOne({ id: ids });
  } catch (error) {
    console.error("Error al obtener el usuario por ID:", error);
    return null;
  }
};

// Operación de Actualizar Usuario
export const updateUser = async (ids, updatedUserData) => {
  try {
    return await users.updateOne({ id: ids }, { $set: updatedUserData });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return { error: error, completed: false };
  }
};

// Operación de Eliminar Usuario
export const deleteUser = async (ids) => {
  try {
    return await users.deleteOne({ id: ids });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return { error: error, completed: false };
  }
};

// Operación para verificar un usuario
export const verifyUser = async (ids) => {
  try {
    return await users.updateOne({ id: ids }, { $set: { verified: true } });
  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    return { error: error, completed: false };
  }
};