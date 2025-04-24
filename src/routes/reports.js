import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import reportsController from "../controllers/reports.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Endpoints de Reportes
 */

/**
 * @swagger
 * /reports/employee/{id}:
 *   get:
 *     tags: [Reports]
 *     summary: Obtener reporte de un empleado (admin, manager)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reporte del empleado encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Empleado no encontrado
 */
router.get(
    "/employee/:id",
    authenticate,
    authorize("admin", "manager"),
    reportsController.getEmployeeReport
);

/**
 * @swagger
 * /reports/department/{id}:
 *   get:
 *     tags: [Reports]
 *     summary: Obtener reporte de un departamento (admin, manager)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reporte del departamento encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Departamento no encontrado
 */
router.get(
    "/department/:id",
    authenticate,
    authorize("admin", "manager"),
    reportsController.getDepartmentReport
);

export default router;
