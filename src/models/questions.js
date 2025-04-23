import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  evaluation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evaluation",
    required: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["open-ended", "multiple choice"],
  },
}, { timestamps: true });


const Question = mongoose.model("Question", questionSchema);

export default Question;