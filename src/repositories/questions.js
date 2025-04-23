import Question from "../models/questions.js";

const questionsRepository = {
  getAllQuestions: async () => {
    return await Question.find();
  },
  createQuestion: async (question) => {
    return await Question.create(question);
  },
  updateQuestion: async (id, question) => {
    return await Question.findByIdAndUpdate(id, question, {new: true});
  },
};

export default questionsRepository;