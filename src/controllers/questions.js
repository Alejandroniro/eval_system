import Question from "../models/questions.js";
import questionsRepository from "../repositories/questions.js";
class questionsController {
    async getAllQuestions(req, res) {
        try {
            const questions = await questionsRepository.getAllQuestions();
            res.status(200).json({status: "get-all-ok", data: questions});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async createQuestion(req, res) {
        try {
            const question = await questionsRepository.createQuestion(req.body);
            res.status(200).json({status: "create-ok", data: question});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async updateQuestion(req, res) {
        try {
            const question = await questionsRepository.updateQuestion(req.params.id, req.body);
            if (!question) {
                return res.status(404).json({status: "error", error: "question not found"});
            }
            res.status(200).json({status: "update-ok", data: question});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }
  }

export default new questionsController();