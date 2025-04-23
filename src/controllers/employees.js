import Employee from "../models/employees.js";
import employeesRepository from "../repositories/employees.js";
class employeesController {
    async getAllEmployees(req, res) {
        try {
            const employees = await employeesRepository.getAllEmployees();
            res.status(200).json({status: "get-all-ok", data: employees});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async getEmployeeById(req, res) {
        try {
            const employee = await employeesRepository.getEmployeeById(req.params.id);
            if (!employee) {
                return res.status(404).json({status: "error", error: "Employee not found"});
            }
            res.status(200).json({status: "get-by-id-ok", data: employee});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async createEmployee(req, res) {
        try {
            const employee = await employeesRepository.createEmployee(req.body);
            res.status(200).json({status: "create-ok", data: employee});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async updateEmployee(req, res) {
        try {
            const employee = await employeesRepository.updateEmployee(req.params.id, req.body);
            if (!employee) {
                return res.status(404).json({status: "error", error: "Employee not found"});
            }
            res.status(200).json({status: "update-ok", data: employee});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }
}

export default new employeesController();