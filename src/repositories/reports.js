import Employee from "../models/employees.js";
import Department from "../models/departments.js";
import Evaluation from "../models/evaluations.js";

const reportsRepository = {
  getEmployeeById: async (id) => {
    return await Employee.findById(id);
  },

  getDepartmentById: async (id) => {
    return await Department.findById(id);
  },

  getEmployeesByDepartment: async (departmentId) => {
    return await Employee.find({ department: departmentId });
  },

  getEvaluationsByEmployee: async (employeeId) => {
    return await Evaluation.find({ employee: employeeId });
  },

  getEvaluationsByEmployeeIds: async (employeeIds) => {
    return await Evaluation.find({ employee: { $in: employeeIds } });
  },
};

export default reportsRepository;
