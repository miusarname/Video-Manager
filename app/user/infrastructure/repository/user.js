// Importa la conexión a la base de datos
import { con } from "../database/atlas.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";


dotenv.config("../");

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

// Función para verificar si existe un usuario con el mismo firstname y email
export const checkDuplicateUser = async (firstnames, emails) => {
  try {
    // Realizar la consulta a la base de datos
    const existingUser = await users.findOne({ firstName: firstnames, email: emails });
    console.log(firstnames, emails)

    // Si existe un usuario con los mismos valores de firstname y email, retornar true
    // Si no existe, retornar false
    return existingUser ? true : false;
  } catch (error) {
    console.error("Error al verificar usuario duplicado:", error);
    return false; // En caso de error, retornar false
  }
};

// Operación de Leer un Usuario por Apellido y Correo Electrónico
export const getUserByLastNameAndEmail = async (lastnames, emails) => {
  try {
    return await users.findOne({ lastName: lastnames, email: emails });
  } catch (error) {
    console.error("Error al obtener el usuario por Apellido y Correo Electrónico:", error);
    return null;
  }
};


// Función para enviar el correo electrónico de verificación
export const sendVerificationEmail = async (email, lastName) => {
  try {
    // Busca al usuario por email y lastname
    const user = await getUserByLastNameAndEmail(lastName, email);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    console.log(process.env.HOST)
    // Genera un enlace de verificación único con el ID del usuario
    let port = process.env.PORT ?? 3000
    let host = process.env.HOST?? `http://localhost:${port}`;
    const verificationLink = `${host}/user/verify/${user.id}`;
    
    // Crea el transporte SMTP reutilizable usando las credenciales y la configuración
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
          user: 'verfiesmessagess223@hotmail.com', // Cambia a tu dirección de correo electrónico de Outlook/Hotmail
          pass: 'Oscar3004' // Cambia a tu contraseña de correo electrónico
      }
  });

    // Configura el correo electrónico
    const mailOptions = {
      from: 'verfiesmessagess223@hotmail.com',
      to: email,
      subject: 'Verificación de cuenta',
      html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p><p><a href="${verificationLink}">Verificar cuenta</a></p>`
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);

    // Marca al usuario como verificado
    await verifyUser(user.id);

    console.log('Correo electrónico de verificación enviado con éxito');
    return true;
  } catch (error) {
    console.error('Error al enviar el correo electrónico de verificación:', error);
    return false;
  }
};