// controllers/authController.js
import usersRepository from "../repositories/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await usersRepository.findUserByEmail({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado." });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = new usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "Usuario registrado correctamente", data: user });
  } catch (error) {
    next(error); // Usando middleware de errores
  }
};

export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await usersRepository.findUserByEmail({ email });
      if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(400).json({ message: "Credenciales inválidas" });

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
  