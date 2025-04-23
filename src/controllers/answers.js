import answersRepository from "../repositories/answers.js";
class answersController {
    async getAllAnswers(req, res) {
        try {
            const answers = await answersRepository.getAllAnswers();
            res.status(200).json({status: "get-all-ok", data: answers});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async getAnswerById(req, res) {
        try {
            const answer = await answersRepository.getAnswerById(req.params.id);
            if (!answer) {
                return res.status(404).json({status: "error", error: "answer not found"});
            }
            res.status(200).json({status: "get-by-id-ok", data: answer});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async createAnswer(req, res) {
        try {
            const answer = await answersRepository.createAnswer(req.body);
            res.status(200).json({status: "create-ok", data: answer});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async updateAnswer(req, res) {
        try {
            const answer = await answersRepository.updateAnswer(req.params.id, req.body);
            if (!answer) {
                return res.status(404).json({status: "error", error: "answer not found"});
            }
            res.status(200).json({status: "update-ok", data: answer});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }

    async deleteAnswer(req, res) {
        try {
            const answer = await answersRepository.deleteAnswer(req.params.id);
            if (!answer) {
                return res.status(404).json({status: "error", error: "answer not found"});
            }
            res.status(200).json({status: "delete-ok", data: answer});
        } catch (e) {
            res.status(500).json({status: "error", error: e});
        }
    }
}

export default new answersController ();