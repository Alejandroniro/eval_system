import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;