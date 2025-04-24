import usersRepository from "../repositories/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import DatabaseError from "../utils/error/DatabaseError.js";
import BadRequestError from "../utils/error/BadRequestError.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await usersRepository.findUserByEmail({ email });
    console.log(existingUser);
    if (existingUser) {
      throw new BadRequestError("El email ya está registrado.");
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Crear usuario
    const user = await usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log(user);

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    next(error instanceof BadRequestError ? error : new DatabaseError("Error al registrar usuario", error));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const user = await usersRepository.findUserByEmail({ email });
    console.log(user);
    if (!user) throw new BadRequestError("Credenciales inválidas");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new BadRequestError("Credenciales inválidas");

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({message: "Login exitoso", token });
  } catch (error) {
    next(error instanceof BadRequestError ? error : new DatabaseError("Error al hacer login", error));
  }
};
