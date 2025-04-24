import { register } from "../../src/controllers/auth.js";
import usersRepository from "../../src/repositories/users.js";
import { jest } from "@jest/globals";


describe("Auth Controller - Register", () => {
  it("debería registrar un nuevo usuario", async () => {
    const req = {
      body: {
        name: "Juan",
        email: "juan@example.com",
        password: "123456",
        role: "employee",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    usersRepository.findUserByEmail = jest.fn().mockResolvedValue(null);
    usersRepository.createUser = jest.fn().mockResolvedValue({ ...req.body });

    await register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuario registrado correctamente" });
  });
});
