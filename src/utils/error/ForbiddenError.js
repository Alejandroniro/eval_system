import AppError from "./AppError.js";

class ForbiddenError extends AppError {
  constructor(message = "Prohibido") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

export default ForbiddenError;
