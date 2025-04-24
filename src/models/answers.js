import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  evaluation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evaluation",
    required: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
  score: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;