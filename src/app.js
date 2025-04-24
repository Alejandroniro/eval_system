import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import employeesRoutes from "./routes/employees.js";
import evaluationsRoutes from "./routes/evalutaions.js";
import questionsRoutes from "./routes/questions.js";
import reportsRoutes from "./routes/reports.js";
import deparmentsRoutes from "./routes/departments.js";
import answersRoutes from "./routes/answers.js";

import "./services/jobs/notificationJob.js";
import errorHandler from "./utils/error/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./utils/swaggerOptions.js";

const app = express();

// Seguridad: Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  message: "Demasiadas solicitudes desde esta IP, intenta más tarde.",
});
app.use("/api/", apiLimiter);

// Seguridad: Sanitización para prevenir inyecciones NoSQL
if (process.env.NODE_ENV !== 'test') {
  app.use(mongoSanitize());
}

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.get("/api", (req, res) => {
  res.json({ message: "API running" });
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
app.use(errorHandler);

export default app;
