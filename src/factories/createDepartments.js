import mongoose from "mongoose";
import dotenv from "dotenv";
import Department from "../models/departments.js";

dotenv.config();

const departmentsData = [
  { name: "Human Resources", description: "Handles employee relations and HR policies" },
  { name: "Technology", description: "Responsible for software development and IT infrastructure" },
  { name: "Sales", description: "Manages client acquisition and sales operations" },
  { name: "Marketing", description: "Focuses on brand strategy and market outreach" },
  { name: "Finance", description: "Oversees budgeting, accounting, and financial planning" },
];

const createDepartments = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Optional: Clear existing departments
    await Department.deleteMany();

    await Department.insertMany(departmentsData);
    console.log("🎉 Departments created successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error creating departments:", error);
    mongoose.disconnect();
  }
};

createDepartments();

export default createDepartments;