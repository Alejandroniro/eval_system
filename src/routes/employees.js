import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import employeesController from "../controllers/employees.js";


const router = express.Router();

// Rutas de empleados
router.get("/", authenticate, authorize("admin", "manager"), employeesController.getAllEmployees);
router.get("/:id", authenticate, authorize("admin", "manager", "employee"), employeesController.getEmployeeById);
router.post("/", authenticate, authorize("admin"), employeesController.createEmployee);
router.put("/:id", authenticate, authorize("admin"), employeesController.updateEmployee);

export default router;
