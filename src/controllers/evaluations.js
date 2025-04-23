import evaluationsRepository from "../repositories/evaluations.js";

class evaluationsController {
    async getAllEvaluations(req, res) {
        try {
            const evaluations = await evaluationsRepository.getAllEvaluations();
            res.status(200).json({status: "get-all-ok", data: evaluations});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async getEvaluationById(req, res) {
        try {
            const evaluation = await evaluationsRepository.getEvaluationById(req.params.id);
            if (!evaluation) {
                return res.status(404).json({status: "error", error: "evaluation not found"});
            }
            res.status(200).json({status: "get-by-id-ok", data: evaluation});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async createEvaluation(req, res) {
        try {
            const evaluation = await evaluationsRepository.createEvaluation(req.body);
            res.status(200).json({status: "create-ok", data: evaluation});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async updateEvaluation(req, res) {
        try {
            const evaluation = await evaluationsRepository.updateEvaluation(req.params.id, req.body);
            if (!evaluation) {
                return res.status(404).json({status: "error", error: "evaluation not found"});
            }
            res.status(200).json({status: "update-ok", data: evaluation});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }
    async submitEvaluation(req, res, next) {
        try {
          const { id } = req.params;
  
          const evaluation = await evaluationsRepository.submitEvaluation(id);
          if (!evaluation) {
            return res.status(404).json({ message: "Evaluación no encontrada" });
          }
          res.status(200).json({ message: "Evaluación completada correctamente", evaluation });
        } catch (error) {
          next(error);
        }
    }
  }

export default new evaluationsController();