import AppError from "./AppError.js";

class DatabaseError extends AppError {
  constructor(message = "Error en la base de datos") {
    super(message, 500);
    this.name = "DatabaseError";
  }
}

export default DatabaseError;
