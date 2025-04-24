import request from "supertest";
import app from "../../src/app.js";
import mongoose from "mongoose";
import "dotenv/config";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});
beforeEach(async () => {
    await mongoose.connection.collection("users").deleteMany({});
  });
  

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {
  it("debería registrar un usuario", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ana",
        email: "ana@example.com",
        password: "secure123",
        role: "employee",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Usuario registrado correctamente");
  });
  
});
