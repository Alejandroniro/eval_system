import express from "express";
import answerController from "../controllers/answers.js";
import { check } from "express-validator";
import validationMiddleware from "../middlewares/validationMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Endpoints de Answers
 */

/**
 * @swagger
 * /answers:
 *   post:
 *     tags: [Answers]
 *     summary: Crear una nueva respuesta
 *     description: Crear una nueva respuesta para una pregunta en una evaluación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *               - evaluation
 *             properties:
 *               question:
 *                 type: string
 *                 description: ID de la pregunta a la que se responde
 *               answer:
 *                 type: string
 *                 description: La respuesta proporcionada
 *               evaluation:
 *                 type: string
 *                 description: ID de la evaluación asociada a la respuesta
 *     responses:
 *       201:
 *         description: Respuesta creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 question:
 *                   type: string
 *                 answer:
 *                   type: string
 *                 evaluation:
 *                   type: string
 *       400:
 *         description: Datos incompletos o inválidos
 */
router.post(
  "/",
  [
    check("question", "La pregunta es requerida").notEmpty(),
    check("answer", "La respuesta es requerida").notEmpty(),
    check("evaluation", "La evaluación es requerida").notEmpty(),
  ],
  validationMiddleware,
  answerController.createAnswer
);

/**
 * @swagger
 * /answers:
 *   get:
 *     tags: [Answers]
 *     summary: Obtener todas las respuestas
 *     description: Obtener todas las respuestas
 *     responses:
 *       200:
 *         description: Lista de todas las respuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   question:
 *                     type: string
 *                   answer:
 *                     type: string
 *                   evaluation:
 *                     type: string
 */
router.get("/", answerController.getAllAnswers);

/**
 * @swagger
 * /answers/{id}:
 *   get:
 *     tags: [Answers]
 *     summary: Obtener una respuesta por ID
 *     description: Obtener una respuesta por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la respuesta
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 question:
 *                   type: string
 *                 answer:
 *                   type: string
 *                 evaluation:
 *                   type: string
 *       404:
 *         description: Respuesta no encontrada
 */
router.get("/:id", answerController.getAnswerById);

/**
 * @swagger
 * /answers/{id}:
 *   put:
 *     tags: [Answers]
 *     summary: Actualizar una respuesta
 *     description: Actualizar una respuesta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la respuesta
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               evaluation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta actualizada correctamente
 *       400:
 *         description: Datos inválidos para la actualización
 *       404:
 *         description: Respuesta no encontrada
 */
router.put("/:id", answerController.updateAnswer);

/**
 * @swagger
 * /answers/{id}:
 *   delete:
 *     tags: [Answers]
 *     summary: Eliminar una respuesta
 *     description: Eliminar una respuesta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la respuesta a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta eliminada correctamente
 *       404:
 *         description: Respuesta no encontrada
 */
router.delete("/:id", answerController.deleteAnswer);

export default router;
