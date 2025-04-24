import evaluationsRepository from "../repositories/evaluations.js";
import DatabaseError from "../utils/error/DatabaseError.js";
import NotFoundError from "../utils/error/NotFoundError.js";

class evaluationsController {
    async getAllEvaluations(req, res, next) {
        try {
            const evaluations = await evaluationsRepository.getAllEvaluations();
            res.status(200).json(evaluations);
        } catch (e) {
            next(new DatabaseError("Error al obtener evaluaciones", e));
        }
    }

    async getEvaluationById(req, res, next) {
        try {
            const evaluation = await evaluationsRepository.getEvaluationById(req.params.id);
            if (!evaluation) {
                throw new NotFoundError("Evaluación no encontrada");
            }
            res.status(200).json(evaluation);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error al obtener evaluación", e));
        }
    }

    async createEvaluation(req, res, next) {
        try {
            const evaluation = await evaluationsRepository.createEvaluation(req.body);
            res.status(201).json(evaluation);
        } catch (e) {
            next(new DatabaseError("Error al crear evaluación", e));
        }
    }

    async updateEvaluation(req, res, next) {
        try {
            const evaluation = await evaluationsRepository.updateEvaluation(req.params.id, req.body);
            if (!evaluation) {
                throw new NotFoundError("Evaluación no encontrada");
            }
            res.status(200).json(evaluation);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error al actualizar evaluación", e));
        }
    }

    async submitEvaluation(req, res, next) {
        try {
            const { id } = req.params;

            const evaluation = await evaluationsRepository.submitEvaluation(id);
            if (!evaluation) {
                throw new NotFoundError("Evaluación no encontrada");
            }
            res.status(200).json({ message: "Evaluación completada correctamente", evaluation });
        } catch (error) {
            next(error instanceof NotFoundError ? error : new DatabaseError("Error al completar evaluación", error));
        }
    }
}

export default new evaluationsController();
