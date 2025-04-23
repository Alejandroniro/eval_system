import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import questionsController from "../controllers/questions.js";


const router = express.Router();

// Rutas de evaluaciones
router.post("/", authenticate, authorize("admin", "manager"), questionsController.createQuestion);
router.get("/", authenticate, authorize("admin", "manager", "employee"), questionsController.getAllQuestions);
router.put("/:id", authenticate, authorize("admin", "manager"), questionsController.updateQuestion);

export default router;
