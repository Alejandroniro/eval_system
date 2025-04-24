import { validationResult } from "express-validator";
import ValidationError from "../utils/error/ValidationError.js";

export default function validationMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map(err => `${err.param}: ${err.msg}`).join(", ");
    return next(new ValidationError(message));
  }
  next();
}
