import { check } from "express-validator";

export const userPostDTO = [
  check("firstName")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isString()
    .withMessage("El nombre debe ser de tipo string"),
  check("lastName")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isString()
    .withMessage("El apellido debe ser de tipo string"),
  check("phone")
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .isString()
    .withMessage("El teléfono debe ser de tipo string"),
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isString()
    .withMessage("El email debe ser de tipo string")
    .isEmail()
    .withMessage("El email debe tener un formato válido"),
  check("verified")
    .notEmpty()
    .withMessage("La verificación es obligatoria")
    .isBoolean()
    .withMessage("La verificación debe ser de tipo booleano"),
];


export const userPutDTO = [
  check("firstName")
    .optional({ nullable: true })
    .isString()
    .withMessage("El nombre debe ser de tipo string"),
  check("lastName")
    .optional({ nullable: true })
    .isString()
    .withMessage("El apellido debe ser de tipo string"),
  check("phone")
    .optional({ nullable: true })
    .isString()
    .withMessage("El teléfono debe ser de tipo string"),
  check("email")
    .optional({ nullable: true })
    .isString()
    .withMessage("El email debe ser de tipo string")
    .isEmail()
    .withMessage("El email debe tener un formato válido"),
  check("verified")
    .optional({ nullable: true })
    .isBoolean()
    .withMessage("La verificación debe ser de tipo booleano"),
];

const validate = async (req, res) => {
  // Verifica si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
}