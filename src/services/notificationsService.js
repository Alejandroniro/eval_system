import Evaluation from "../models/evaluations.js";

// Este es un ejemplo con consola, pero puedes conectar un servicio de correo, notificaciones push, etc.
async function notifyPendingEvaluations() {
  const pendingEvaluations = await Evaluation.find({
    status: "pending",
    notified: false
  }).populate("evaluator employee");

  for (const evaluation of pendingEvaluations) {
    const evaluator = evaluation.evaluator;
    const employee = evaluation.employee;

    // Aquí podrías usar un servicio como nodemailer, twilio, firebase, etc.
    console.log(`🔔 Notificando a ${evaluator.email} sobre evaluación pendiente para ${employee.firstName} ${employee.lastName}`);

    // Marcamos como notificada
    evaluation.notified = true;
    await evaluation.save();
  }
}

export default {
  notifyPendingEvaluations,
};
