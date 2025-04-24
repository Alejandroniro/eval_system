import Answer from "../models/answers.js";

async function calculateEvaluationScore(evaluationId) {
        const answers = await Answer.find({ evaluation: evaluationId });
        let totalScore = 0;
        for (const answer of answers) {
            totalScore += answer.score;
        }
        return totalScore;
    }

    export default calculateEvaluationScore