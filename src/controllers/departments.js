import departmentsRepository from "../repositories/departments.js";
import DatabaseError from "../utils/error/DatabaseError.js";
import NotFoundError from "../utils/error/NotFoundError.js";

class departmentController {
    async getAllDepartments(req, res, next) {
        try {
            const departments = await departmentsRepository.getAllDepartments();
            res.status(200).json(departments);
        } catch (e) {
            next(new DatabaseError("Error al obtener departamentos", e));
        }
    }

    async getDepartmentById(req, res, next) {
        try {
            const department = await departmentsRepository.getDepartmentById(req.params.id);
            if (!department) {
                throw new NotFoundError("Department not found");
            }
            res.status(200).json(department);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error al obtener departamento", e));
        }
    }

    async createDepartment(req, res, next) {
        try {
            const department = await departmentsRepository.createDepartment(req.body);
            res.status(201).json(department);
        } catch (e) {
            next(new DatabaseError("Error al crear departamento", e));
        }
    }

    async updateDepartment(req, res, next) {
        try {
            const department = await departmentsRepository.updateDepartment(req.params.id, req.body);
            if (!department) {
                throw new NotFoundError("Department not found");
            }
            res.status(200).json(department);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error al actualizar departamento", e));
        }
    }

    async deleteDepartment(req, res, next) {
        try {
            const department = await departmentsRepository.deleteDepartment(req.params.id);
            if (!department) {
                throw new NotFoundError("Department not found");
            }
            res.status(200).json(department);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error al eliminar departamento", e));
        }
    }
}

export default new departmentController();
