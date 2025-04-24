import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{7,15}$/,
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  notifications: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notification",
  },
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;