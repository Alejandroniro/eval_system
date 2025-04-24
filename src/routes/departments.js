import express from "express";
import departmentController from "../controllers/departments.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Endpoints de Departamentos
 */

/**
 * @swagger
 * /departments:
 *   post:
 *     tags: [Departments]
 *     summary: Crear un nuevo departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del departamento
 *     responses:
 *       201:
 *         description: Departamento creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 */
router.post("/", departmentController.createDepartment);

/**
 * @swagger
 * /departments:
 *   get:
 *     tags: [Departments]
 *     summary: Obtener todos los departamentos
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get("/", departmentController.getAllDepartments);

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     tags: [Departments]
 *     summary: Obtener un departamento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Departamento no encontrado
 */
router.get("/:id", departmentController.getDepartmentById);

/**
 * @swagger
 * /departments/{id}:
 *   put:
 *     tags: [Departments]
 *     summary: Actualizar un departamento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Departamento actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Departamento no encontrado
 */
router.put("/:id", departmentController.updateDepartment);

/**
 * @swagger
 * /departments/{id}:
 *   delete:
 *     tags: [Departments]
 *     summary: Eliminar un departamento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del departamento a eliminar
 *     responses:
 *       200:
 *         description: Departamento eliminado correctamente
 *       404:
 *         description: Departamento no encontrado
 */
router.delete("/:id", departmentController.deleteDepartment);

export default router;
