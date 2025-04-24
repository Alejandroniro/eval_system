import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import questionsController from "../controllers/questions.js";
import { check } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Endpoints de Preguntas
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     tags: [Questions]
 *     summary: Crear una nueva pregunta (admin, manager)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - evaluation
 *               - type
 *             properties:
 *               question:
 *                 type: string
 *               evaluation:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum:
 *                   - open-ended
 *                   - multiple choice
 *     responses:
 *       201:
 *         description: Pregunta creada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.post(
    "/",
    [
        check("question", "La pregunta es requerida").notEmpty(),
        check("evaluation", "La evaluación es requerida").notEmpty(),
        check("type", "El tipo de evaluación es requerido").notEmpty().isIn(["open-ended", "multiple choice"]),
    ],
    authenticate,
    authorize("admin", "manager"),
    questionsController.createQuestion
);

/**
 * @swagger
 * /questions:
 *   get:
 *     tags: [Questions]
 *     summary: Obtener todas las preguntas (admin, manager, empleado)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get("/", authenticate, authorize("admin", "manager", "employee"), questionsController.getAllQuestions);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     tags: [Questions]
 *     summary: Actualizar una pregunta (admin, manager)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               evaluation:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum:
 *                   - open-ended
 *                   - multiple choice
 *     responses:
 *       200:
 *         description: Pregunta actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Pregunta no encontrada
 */
router.put("/:id", authenticate, authorize("admin", "manager"), questionsController.updateQuestion);

export default router;
