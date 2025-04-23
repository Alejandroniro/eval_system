import express from "express";
import answerController from "../controllers/answers.js";

const router = express.Router();

router.post("/", answerController.createAnswer)
router.get("/", answerController.getAllAnswers)
router.get("/:id", answerController.getAnswerById)
router.put("/:id", answerController.updateAnswer)
router.delete("/:id", answerController.deleteAnswer)

export default router;