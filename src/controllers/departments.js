import departmentsRepository from "../repositories/departments.js";

class departmentController {
    async getAllDepartments(req, res) {
        try {
            const deparments = await departmentsRepository.getAllDepartments();
            res.status(200).json({status: "get-all-ok", data: deparments});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async getDepartmentById(req, res) {
        try {
            const department = await departmentsRepository.getDepartmentById(req.params.id);
            if (!department) {
                return res.status(404).json({status: "error", error: "department not found"});
            }
            res.status(200).json({status: "get-by-id-ok", data: department});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async createDepartment(req, res) {
        try {
            const department = await departmentsRepository.createDepartment(req.body);
            res.status(200).json({status: "create-ok", data: department});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async updateDepartment(req, res) {
        try {
            const department = await departmentsRepository.updateDepartment(req.params.id, req.body);
            if (!department) {
                return res.status(404).json({status: "error", error: "department not found"});
            }
            res.status(200).json({status: "update-ok", data: department});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async deleteDepartment(req, res) {
        try {
            const department = await departmentsRepository.deleteDepartment(req.params.id);
            if (!department) {
                return res.status(404).json({status: "error", error: "department not found"});
            }
            res.status(200).json({status: "delete-ok", data: department});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }
}

export default new departmentController();