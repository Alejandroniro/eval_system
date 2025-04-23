import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import reportsController from "../controllers/reports.js";

const router = express.Router();

router.get("/employee/:id", authenticate, authorize("admin", "manager"), reportsController.getEmployeeReport);
router.get("/department/:id", authenticate, authorize("admin", "manager"), reportsController.getDepartmentReport);

export default router;
