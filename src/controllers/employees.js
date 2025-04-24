import employeesRepository from "../repositories/employees.js";
import DatabaseError from "../utils/error/DatabaseError.js";
import NotFoundError from "../utils/error/NotFoundError.js";

class employeesController {
    async getAllEmployees(req, res, next) {
        try {
            const employees = await employeesRepository.getAllEmployees();
            res.status(200).json(employees);
        } catch (e) {
            next(new DatabaseError("Error al obtener empleados", e));
        }
    }

    async getEmployeeById(req, res, next) {
        try {
            const employee = await employeesRepository.getEmployeeById(req.params.id);
            if (!employee) {
                throw new NotFoundError("Employee not found");
            }
            res.status(200).json(employee);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error al obtener empleado", e));
        }
    }

    async createEmployee(req, res, next) {
        try {
            const employee = await employeesRepository.createEmployee(req.body);
            res.status(201).json(employee);
        } catch (e) {
            next(new DatabaseError("Error al crear empleado", e));
        }
    }

    async updateEmployee(req, res, next) {
        try {
            const employee = await employeesRepository.updateEmployee(req.params.id, req.body);
            if (!employee) {
                throw new NotFoundError("Employee not found");
            }
            res.status(200).json(employee);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error al actualizar empleado", e));
        }
    }
}

export default new employeesController();
