import questionsRepository from "../repositories/questions.js";
import DatabaseError from "../utils/error/DatabaseError.js";
import NotFoundError from "../utils/error/NotFoundError.js";

class questionsController {
    async getAllQuestions(req, res, next) {
        try {
            const questions = await questionsRepository.getAllQuestions();
            res.status(200).json(questions);
        } catch (e) {
            next(new DatabaseError("Error al obtener las preguntas", e));
        }
    }

    async createQuestion(req, res, next) {
        try {
            const question = await questionsRepository.createQuestion(req.body);
            res.status(201).json(question);
        } catch (e) {
            next(new DatabaseError("Error al crear la pregunta", e));
        }
    }

    async updateQuestion(req, res, next) {
        try {
            const question = await questionsRepository.updateQuestion(req.params.id, req.body);
            if (!question) {
                throw new NotFoundError("Pregunta no encontrada");
            }
            res.status(200).json(question);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error al actualizar la pregunta", e));
        }
    }
}

export default new questionsController();
