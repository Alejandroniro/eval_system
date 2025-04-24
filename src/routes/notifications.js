import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import notificationsController from "../controllers/notifications.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Endpoints de Notificaciones
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Obtener todas las notificaciones (admin, manager, empleado)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get("/", authenticate, authorize("admin", "manager", "employee"), notificationsController.getAllnotifications);

/**
 * @swagger
 * /notifications:
 *   post:
 *     tags: [Notifications]
 *     summary: Crear una nueva notificación (admin, manager, empleado)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - recipient
 *             properties:
 *               message:
 *                 type: string
 *               recipient:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notificación creada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.post("/", authenticate, authorize("admin", "manager", "employee"), notificationsController.createNotification);

/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     tags: [Notifications]
 *     summary: Actualizar una notificación (admin, manager, empleado)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la notificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               recipient:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notificación actualizada
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Notificación no encontrada
 */
router.put("/:id", authenticate, authorize("admin", "manager", "employee"), notificationsController.updateNotification);

export default router;
