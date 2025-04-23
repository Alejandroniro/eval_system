import Evaluation from "../models/evaluations.js";

const evaluationsRepository = {
    async getAllEvaluations() {
        return await Evaluation.find();
        
    },
    async getEvaluationById(id) {
        return await Evaluation.findById(id);
    },
    async createEvaluation(evaluation) {
        return await Evaluation.create(evaluation);
    },
    async updateEvaluation(id, evaluation) {
        return await Evaluation.findByIdAndUpdate(id, evaluation, { new: true });
    },
    async deleteEvaluation(id) {
        return await Evaluation.findByIdAndDelete(id);
    },
    async submitEvaluation(id) {
        return await Evaluation.findByIdAndUpdate(id, { submitted: true }, { new: true });
    }
};

export default evaluationsRepository;