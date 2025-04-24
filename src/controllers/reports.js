import reportsRepository from "../repositories/reports.js";
import NotFoundError from "../utils/error/NotFoundError.js";
import DatabaseError from "../utils/error/DatabaseError.js";

class ReportsController {
  async getEmployeeReport(req, res, next) {
    try {
      const employee = await reportsRepository.getEmployeeById(req.params.id);
      if (!employee) {
        throw new NotFoundError("Employee not found");
      }

      const evaluations = await reportsRepository.getEvaluationsByEmployee(employee._id);
      if (!evaluations || evaluations.length === 0) {
        throw new NotFoundError("Evaluations not found");
      }

      res.status(200).json(evaluations);
    } catch (e) {
      next(e instanceof NotFoundError ? e : new DatabaseError("Error fetching employee report", e));
    }
  }

  async getDepartmentReport(req, res, next) {
    try {
      const department = await reportsRepository.getDepartmentById(req.params.id);
      if (!department) {
        throw new NotFoundError("Department not found");
      }

      const employees = await reportsRepository.getEmployeesByDepartment(department._id);
      if (!employees || employees.length === 0) {
        throw new NotFoundError("Employees not found");
      }

      const employeeIds = employees.map(emp => emp._id);
      const evaluations = await reportsRepository.getEvaluationsByEmployeeIds(employeeIds);
      if (!evaluations || evaluations.length === 0) {
        throw new NotFoundError("Evaluations not found");
      }

      res.status(200).json(evaluations);
    } catch (e) {
      next(e instanceof NotFoundError ? e : new DatabaseError("Error fetching department report", e));
    }
  }
}

export default new ReportsController();
