import { body } from "express-validator";

export const videoDTO = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isString()
    .withMessage("El título debe ser de tipo string"),
  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isString()
    .withMessage("La descripción debe ser de tipo string"),
  body("credits")
    .notEmpty()
    .withMessage("Los créditos son obligatorios")
    .isString()
    .withMessage("Los créditos deben ser de tipo string"),
  body("publishDate")
    .notEmpty()
    .withMessage("La fecha de publicación es obligatoria")
    .isISO8601()
    .toDate()
    .withMessage("La fecha de publicación debe tener un formato ISO8601 válido"),
  body("isPublic")
    .notEmpty()
    .withMessage("El indicador de público/privado es obligatorio")
    .isBoolean()
    .withMessage("El indicador de público/privado debe ser de tipo booleano"),
  body("likes")
    .notEmpty()
    .withMessage("El indicador de likes es obligatorio")
    .isNumeric()
    .withMessage("El indicador de likes debe ser de tipo numerico"),
  body("user")
    .notEmpty()
    .withMessage("El indicador de user es obligatorio")
    .isNumeric()
    .withMessage("El indicador de user debe ser de tipo numerico")
];

export const videoDTOPut = [
  body("title")
    .optional()
    .isString()
    .withMessage("El título debe ser de tipo string"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser de tipo string"),
  body("credits")
    .optional()
    .isString()
    .withMessage("Los créditos deben ser de tipo string"),
  body("publishDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("La fecha de publicación debe tener un formato ISO8601 válido"),
  body("isPublic")
    .optional()
    .isBoolean()
    .withMessage("El indicador de público/privado debe ser de tipo booleano"),
  body("likes")
    .optional()
    .isNumeric()
    .withMessage("El indicador de likes debe ser de tipo numérico"),
  body("user")
    .optional()
    .isNumeric()
    .withMessage("El indicador de user debe ser de tipo numérico")
];
