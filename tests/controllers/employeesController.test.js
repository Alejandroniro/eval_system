import employeesController from "../../src/controllers/employees.js";
import employeesRepository from "../../src/repositories/employees.js";
import NotFoundError from "../../src/utils/error/NotFoundError.js";
import { jest } from "@jest/globals";

describe("employeesController", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("createEmployee", () => {
    it("debería crear un empleado", async () => {
      req.body = {
        user: "abc123",
        firstName: "manager 5",
        lastName: "feliz",
        birthdate: "10/09/1999",
        address: "venezuela",
        phone: "04166503102",
        jobTitle: "developer",
        department: "abc123"
        
      };
      const created = { ...req.body, _id: "abc123" };
      employeesRepository.createEmployee = jest.fn().mockResolvedValue(created);

      await employeesController.createEmployee(req, res, next);

      expect(employeesRepository.createEmployee).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });
  });

  describe("getAllEmployees", () => {
    it("debería devolver todos los empleados", async () => {
      const mockEmployees = [{ name: "Alice" }, { name: "Bob" }];
      employeesRepository.getAllEmployees = jest.fn().mockResolvedValue(mockEmployees);

      await employeesController.getAllEmployees(req, res, next);

      expect(employeesRepository.getAllEmployees).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockEmployees);
    });
  });

  describe("getEmployeeById", () => {
    it("debería devolver un empleado existente", async () => {
      const employee = { name: "Juan" };
      req.params.id = "123";
      employeesRepository.getEmployeeById = jest.fn().mockResolvedValue(employee);

      await employeesController.getEmployeeById(req, res, next);

      expect(employeesRepository.getEmployeeById).toHaveBeenCalledWith("123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(employee);
    });

    it("debería manejar empleado no encontrado", async () => {
      req.params.id = "999";
      employeesRepository.getEmployeeById = jest.fn().mockResolvedValue(null);

      await employeesController.getEmployeeById(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  

  describe("updateEmployee", () => {
    it("debería actualizar un empleado existente", async () => {
      req.params.id = "abc123";
      req.body = { name: "Carlos" };
      const updated = { _id: "abc123", name: "Carlos" };
      employeesRepository.updateEmployee = jest.fn().mockResolvedValue(updated);

      await employeesController.updateEmployee(req, res, next);

      expect(employeesRepository.updateEmployee).toHaveBeenCalledWith("abc123", req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updated);
    });

    it("debería manejar actualización de empleado inexistente", async () => {
      req.params.id = "abc999";
      req.body = { name: "NoExiste" };
      employeesRepository.updateEmployee = jest.fn().mockResolvedValue(null);

      await employeesController.updateEmployee(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });
});
