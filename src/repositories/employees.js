import Employee from "../models/employees.js";

const employeesRepository = {
  getAllEmployees: async () => {
    return await Employee.find();
  },
  getEmployeeById: async (id) => {
    return await Employee.findById(id);
  },
  createEmployee: async (employee) => {
    return await Employee.create(employee);
  },
  updateEmployee: async (id, employee) => {
    return await Employee.findByIdAndUpdate(id, employee, {new: true});
  },
};

export default employeesRepository;