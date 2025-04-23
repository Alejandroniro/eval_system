import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import employeesRoutes from "./routes/employees.js";
import evaluationsRoutes from "./routes/evalutaions.js";
import questionsRoutes from "./routes/questions.js";
import reportsRoutes from "./routes/reports.js";
import deparmentsRoutes from "./routes/departments.js";
import answersRoutes from "./routes/answers.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.get("/api", (req, res) => {
    res.json({message: "API running"});
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/evaluations", evaluationsRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/departments", deparmentsRoutes);
app.use("/api/answers", answersRoutes);

// Middleware de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Algo salió mal", error: err.message });
});


export default app;