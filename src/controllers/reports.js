import reportsRepository from "../repositories/reports.js";

class ReportsController {
  async getEmployeeReport(req, res) {
    try {
      const employee = await reportsRepository.getEmployeeById(req.params.id);
      if (!employee) {
        return res.status(404).json({ status: "error", error: "employee not found" });
      }

      const evaluations = await reportsRepository.getEvaluationsByEmployee(employee._id);
      if (!evaluations || evaluations.length === 0) {
        return res.status(404).json({ status: "error", error: "evaluations not found" });
      }

      res.status(200).json({ status: "get-by-id-ok", data: evaluations });
    } catch (e) {
      res.status(500).json({ status: "error", error: e.message });
    }
  }

  async getDepartmentReport(req, res) {
    try {
      const department = await reportsRepository.getDepartmentById(req.params.id);
      if (!department) {
        return res.status(404).json({ status: "error", error: "department not found" });
      }

      const employees = await reportsRepository.getEmployeesByDepartment(department._id);
      if (!employees || employees.length === 0) {
        return res.status(404).json({ status: "error", error: "employees not found" });
      }

      const employeeIds = employees.map(emp => emp._id);
      const evaluations = await reportsRepository.getEvaluationsByEmployeeIds(employeeIds);
      if (!evaluations || evaluations.length === 0) {
        return res.status(404).json({ status: "error", error: "evaluations not found" });
      }

      res.status(200).json({ status: "get-by-id-ok", data: evaluations });
    } catch (e) {
      res.status(500).json({ status: "error", error: e.message });
    }
  }
}

export default new ReportsController();
