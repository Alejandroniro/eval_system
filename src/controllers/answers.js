import answersRepository from "../repositories/answers.js";
import NotFoundError from "../utils/error/NotFoundError.js";
import DatabaseError from "../utils/error/DatabaseError.js";

class AnswersController {
    async getAllAnswers(req, res, next) {
        try {
            const answers = await answersRepository.getAllAnswers();
            res.status(200).json(answers);
        } catch (error) {
            next(new DatabaseError("Error al obtener las respuestas", error));
        }
    }

    async getAnswerById(req, res, next) {
        try {
            const answer = await answersRepository.getAnswerById(req.params.id);
            if (!answer) throw new NotFoundError("Respuesta no encontrada");
            res.status(200).json(answer);
        } catch (error) {
            next(error instanceof NotFoundError ? error : new DatabaseError("Error al obtener respuesta", error));
        }
    }

    async createAnswer(req, res, next) {
        try {
            const answer = await answersRepository.createAnswer(req.body);
            res.status(201).json(answer);
        } catch (error) {
            next(new DatabaseError("Error al crear la respuesta", error));
        }
    }

    async updateAnswer(req, res, next) {
        try {
            const answer = await answersRepository.updateAnswer(req.params.id, req.body);
            if (!answer) throw new NotFoundError("Respuesta no encontrada para actualizar");
            res.status(200).json(answer);
        } catch (error) {
            next(error instanceof NotFoundError ? error : new DatabaseError("Error al actualizar respuesta", error));
        }
    }

    async deleteAnswer(req, res, next) {
        try {
            const answer = await answersRepository.deleteAnswer(req.params.id);
            if (!answer) throw new NotFoundError("Respuesta no encontrada para eliminar");
            res.status(200).json(answer);
        } catch (error) {
            next(error instanceof NotFoundError ? error : new DatabaseError("Error al eliminar respuesta", error));
        }
    }
}

export default new AnswersController();
