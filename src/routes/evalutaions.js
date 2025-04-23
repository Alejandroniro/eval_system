import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import evaluationsController from "../controllers/evaluations.js";


const router = express.Router();

// Rutas de evaluaciones
router.post("/", authenticate, authorize("admin", "manager"), evaluationsController.createEvaluation);
router.get("/", authenticate, authorize("admin", "manager", "employee"), evaluationsController.getAllEvaluations);
router.get("/:id", authenticate, authorize("admin", "manager", "employee"), evaluationsController.getEvaluationById);
router.put("/:id", authenticate, authorize("admin", "manager"), evaluationsController.updateEvaluation);
router.post("/:id/submit", authenticate, authorize("admin", "manager"), evaluationsController.submitEvaluation);

export default router;
