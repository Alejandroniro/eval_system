import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
    autopopulate: true
  },
  evaluator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true

  },
  questions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    autopopulate: true

  },
  period: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in progress", "completed"],
  },
  type: {
    type: String,
    required: true,
    enum: ["performance evaluation", "skills assessment"],
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  totalScore: {
    type: Number,
    default: null,
  },
  notified: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });


const Evaluation = mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;