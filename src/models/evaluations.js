import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
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
}, { timestamps: true });


const Evaluation = mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;