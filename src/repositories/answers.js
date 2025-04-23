import Answer from "../models/answers.js";

const answersRepository = {
  createAnswer: async (answerData) => {
    const answer = new Answer(answerData);
    return await answer.save();
  },
  getAllAnswers: async () => {
    return await Answer.find();
  },
  getAnswerById: async (answerId) => {
    return await Answer.findById(answerId);
  },
  updateAnswer: async (answerId, answerData) => {
    return await Answer.findByIdAndUpdate(answerId, answerData, { new: true });
  },
  deleteAnswer: async (answerId) => {
    return await Answer.findByIdAndDelete(answerId);
  },
};

export default answersRepository;