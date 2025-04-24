import AppError from "./AppError.js";

export default function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);

  if (!(err instanceof AppError)) {
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }

  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
}
