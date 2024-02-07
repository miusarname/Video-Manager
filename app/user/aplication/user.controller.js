import {
  allUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  verifyUser,
  checkDuplicateUser,
  sendVerificationEmail
} from "../infrastructure/repository/user.js";
import { validationResult } from 'express-validator';
import { SignJWT, jwtVerify } from "jose";


export async function crearTokenIntern(role) {
  const enconder = new TextEncoder();
  if (role == "user") {
    const jwtConstructor = await new SignJWT({role})
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .sign(enconder.encode(process.env.JWT_KEY));
    return ({ status: 200, token: jwtConstructor });
  } else {
    return({ status: 400, message: "Invalid Credentials required" });
  }
}

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

export async function logginHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {firstname,email} = req.body;
  try {
    const newUser = await checkDuplicateUser(firstname,email);
    if (newUser) {
      const token = await crearTokenIntern("user")
      res.status(200).json({ status: 200, newUser: token });
    }
  } catch (error) {
    console.error("Error al crear usuario:",error);
    res.status(500).json({ status: 500, message: "Error al crear usuario" });
  }
}

export async function verificationEmail(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {lastName,email} = req.body;
  try {
    const newUser = await sendVerificationEmail(email,lastName);
    if (newUser) {
      res.status(200).json({ status: 200, message: "Revisa el email proporsionado,te debio haber llegado un email" });
    }else{
      res.status(500).json({ status: 500, message: "Error al Verificar usuario" });
    }
  } catch (error) {
    console.error("Error al Verificar usuario:",error);
    res.status(500).json({ status: 500, message: "Error al Verificar usuario" });
  }
}