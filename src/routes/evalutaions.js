import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import evaluationsController from "../controllers/evaluations.js";
import { check } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Evaluations
 *   description: Endpoints de Evaluaciones
 */

/**
 * @swagger
 * /evaluations:
 *   post:
 *     tags: [Evaluations]
 *     summary: Crear una nueva evaluación (admin o manager)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - employee
 *               - period
 *               - type
 *               - status
 *             properties:
 *               description:
 *                 type: string
 *               employee:
 *                 type: string
 *               period:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [performance evaluation, skills assessment]
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *     responses:
 *       201:
 *         description: Evaluación creada correctamente
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
        check("description", "La descripción debe tener al menos 10 caracteres").isLength({ min: 10 }),
        check("employee", "El empleado es requerido").notEmpty(),
        check("period", "El periodo es requerido").notEmpty(),
        check("type", "El tipo de evaluación es requerido").notEmpty().isIn(["performance evaluation", "skills assessment"]),
        check("status", "El estado es requerido").notEmpty().isIn(["pending", "in progress", "completed"]),
    ],
    authenticate,
    authorize("admin", "manager"),
    evaluationsController.createEvaluation
);

/**
 * @swagger
 * /evaluations/{id}/submit:
 *   post:
 *     tags: [Evaluations]
 *     summary: Marcar evaluación como enviada (admin o manager)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Evaluación enviada correctamente
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Evaluación no encontrada
 */
router.post(
    "/:id/submit",
    [check("id", "El id de la evaluación es requerido").notEmpty()],
    authenticate,
    authorize("admin", "manager"),
    evaluationsController.submitEvaluation
);

/**
 * @swagger
 * /evaluations:
 *   get:
 *     tags: [Evaluations]
 *     summary: Obtener todas las evaluaciones (admin, manager, empleado)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de evaluaciones
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get("/", authenticate, authorize("admin", "manager", "employee"), evaluationsController.getAllEvaluations);

/**
 * @swagger
 * /evaluations/{id}:
 *   get:
 *     tags: [Evaluations]
 *     summary: Obtener una evaluación por ID (admin, manager, empleado)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Evaluación encontrada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Evaluación no encontrada
 */
router.get("/:id", authenticate, authorize("admin", "manager", "employee"), evaluationsController.getEvaluationById);

/**
 * @swagger
 * /evaluations/{id}:
 *   put:
 *     tags: [Evaluations]
 *     summary: Actualizar evaluación (admin o manager)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               period:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [performance evaluation, skills assessment]
 *               status:
 *                 type: string
 *                 enum: [pending, in progress, completed]
 *     responses:
 *       200:
 *         description: Evaluación actualizada
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Evaluación no encontrada
 */
router.put("/:id", authenticate, authorize("admin", "manager"), evaluationsController.updateEvaluation);

export default router;
