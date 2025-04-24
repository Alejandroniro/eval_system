import AppError from "./AppError.js";

class ConflictError extends AppError {
  constructor(message = "Conflicto en la solicitud") {
    super(message, 409);
    this.name = "ConflictError";
  }
}

export default ConflictError;
