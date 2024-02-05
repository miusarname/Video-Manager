import {
  allUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  verifyUser
} from "../infrastructure/repository/user.js";
import { validationResult } from 'express-validator';


export async function getAllUsers(req, res) {
  try {
    const users = await allUsers();
    res.status(200).json({ status: 200, users: users });
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    res.status(500).json({ status: 500, message: "Error al obtener todos los usuarios" });
  }
}

export async function getUserByIdHandler(req, res) {
  const userId = Number(req.params.id);
  try {
    const user = await getUserById(userId);
    if (user) {
      res.status(200).json({ status: 200, user: user });
    } else {
      res.status(404).json({ status: 404, message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ status: 500, message: "Error al obtener el usuario" });
  }
}

export async function createUserHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userData = req.body;
  try {
    const newUser = await createUser(userData);
    res.status(201).json({ status: 201, newUser: newUser });
  } catch (error) {
    console.error("Error al crear usuario:");
    res.status(500).json({ status: 500, message: "Error al crear usuario" });
  }
}

export async function updateUserHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = Number(req.params.id);
  const updatedUserData = req.body;
  try {
    const result = await updateUser(userId, updatedUserData);
    if (result.modifiedCount > 0) {
      res.status(200).json({ status: 200, message: "Usuario actualizado exitosamente" });
    } else {
      res.status(404).json({ status: 404, message: "Usuario no encontrado o ningún cambio realizado" });
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ status: 500, message: "Error al actualizar usuario" });
  }
}

export async function deleteUserHandler(req, res) {
  const userId = Number(req.params.id);
  try {
    const result = await deleteUser(userId);
    if (result.deletedCount > 0) {
      res.status(200).json({ status: 200, message: "Usuario eliminado exitosamente" });
    } else {
      res.status(404).json({ status: 404, message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ status: 500, message: "Error al eliminar usuario" });
  }
}

export async function verifyUserHandler(req, res) {
  const userId =Number(req.params.id);
  try {
    const result = await verifyUser(userId);
    if (result.modifiedCount > 0) {
      res.status(200).json({ status: 200, message: "Usuario verificado exitosamente" });
    } else {
      res.status(404).json({ status: 404, message: "Usuario no encontrado o ningún cambio realizado" });
    }
  } catch (error) {
    console.error("Error al verificar usuario:", error);
    res.status(500).json({ status: 500, message: "Error al verificar usuario" });
  }
}
