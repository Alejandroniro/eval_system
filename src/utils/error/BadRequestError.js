import AppError from "./AppError.js";

class BadRequestError extends AppError {
  constructor(message = "Solicitud incorrecta") {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

export default BadRequestError;
