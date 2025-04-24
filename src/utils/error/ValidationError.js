import AppError from "./AppError.js";

export default class ValidationError extends AppError {
  constructor(message = "Datos inválidos") {
    super(message, 400);
  }
}
