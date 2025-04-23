import Department from "../models/departments.js";

const departmentsRepository = {
  getAllDepartments: async () => {
    return await Department.find();
  },
  getDepartmentById: async (id) => {
    return await Department.findById(id);
  },
  createDepartment: async (department) => {
    return await Department.create(department);
  },
  updateDepartment: async (id, department) => {
    return await Department.findByIdAndUpdate(id, department, { new: true });
  },
  deleteDepartment: async (id) => {
    return await Department.findByIdAndDelete(id);
  },
};

export default departmentsRepository;