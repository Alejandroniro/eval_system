import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import employeesController from "../controllers/employees.js";
import { check } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Endpoints de Empleados
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     tags: [Employees]
 *     summary: Crear un nuevo empleado (solo admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - department
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               department:
 *                 type: string
 *                 enum: [Human Resources, Technology, Sales, Finance, Marketing]
 *               role:
 *                 type: string
 *                 enum: [admin, manager, employee]
 *     responses:
 *       201:
 *         description: Empleado creado correctamente
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
        check("name", "El nombre debe tener al menos 3 caracteres").isLength({ min: 3 }),
        check("email", "Debe ser un email válido").isEmail(),
        check("password", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
        check("department", "El departamento es requerido").notEmpty().isIn(["Human Resources", "Technology", "Sales", "Finance", "Marketing"]),
        check("role", "El rol es requerido").notEmpty().isIn(["admin", "manager", "employee"]),
    ],
    authenticate,
    authorize("admin"),
    employeesController.createEmployee
);

/**
 * @swagger
 * /employees:
 *   get:
 *     tags: [Employees]
 *     summary: Obtener todos los empleados (admin o manager)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get("/", authenticate, authorize("admin", "manager"), employeesController.getAllEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     tags: [Employees]
 *     summary: Obtener un empleado por ID (admin, manager o el mismo empleado)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Empleado no encontrado
 */
router.get("/:id", authenticate, authorize("admin", "manager", "employee"), employeesController.getEmployeeById);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     tags: [Employees]
 *     summary: Actualizar un empleado por ID (solo admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               department:
 *                 type: string
 *                 enum: [Human Resources, Technology, Sales, Finance, Marketing]
 *               role:
 *                 type: string
 *                 enum: [admin, manager, employee]
 *     responses:
 *       200:
 *         description: Empleado actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Empleado no encontrado
 */
router.put("/:id", authenticate, authorize("admin"), employeesController.updateEmployee);

export default router;
