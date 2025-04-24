import Evaluation from "../models/evaluations.js";
import Answer from "../models/answers.js";
import User from "../models/users.js";
import Employee from "../models/employees.js";
import notificationsRepository from "../repositories/notifications.js";
import calculateEvaluationScore from "../services/calculateEvaluationScore.js";
import NotFoundError from "../utils/error/NotFoundError.js";

const evaluationsRepository = {
    async getAllEvaluations() {
        return await Evaluation.find();
        
    },
    async getEvaluationById(id) {
        return await Evaluation.findById(id);
    },
    async getEvaluationByEmployee(employeeId) {
        return await Evaluation.find({ employee: employeeId });
    },
    async getEvaluationByEvaluator(evaluatorId) {
        return await Evaluation.find({ evaluator: evaluatorId });
    },
    async createEvaluation(evaluation) {
        const employee = await Employee.findById(evaluation.employee);
        // console.log(employee);
        const employees = await Employee.find({ department: employee.department }).populate("user").populate("department");
        console.log("employees: ", employees);
        const evaluators = employees.filter(emp => emp.user.role === "manager");
        console.log(evaluators);
        if (evaluators.length === 0) throw new NotFoundError("No hay managers disponibles en el departamento");
        const evaluator = evaluators[Math.floor(Math.random() * evaluators.length)];
        await notificationsRepository.createNotification({
            employee: evaluator._id,
            title: "Nueva Evaluacion",
            message: "Fuiste asignado a una evaluación",
        })
        await notificationsRepository.createNotification({
            employee: employee._id,
            title: "Nueva evaluacion",
            message: "Tienes una evaluación pendiente por realizar",
        });
        evaluation.notified = true;
        return await Evaluation.create(evaluation);
    },
    async updateEvaluation(id, evaluation) {
        return await Evaluation.findByIdAndUpdate(id, evaluation, { new: true });
    },
    async deleteEvaluation(id) {
        return await Evaluation.findByIdAndDelete(id);
    },
    async submitEvaluation(id) {
        const totalScore = await calculateEvaluationScore(id);
        const evaluation = await Evaluation.findById(id);
        await notificationsRepository.createNotification({
            employee: evaluation.employee,
            title: "Evaluación completada",
            message: "Tu evaluación ha sido completada",
        })
        return await Evaluation.findByIdAndUpdate(id, { submitted: true, totalScore: totalScore, notified: true }, { new: true });
    },
};

export default evaluationsRepository;