import cron from "node-cron";
import notificationsService from "../../services/notificationsService.js";

// Corre todos los días a las 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("⏰ Revisando evaluaciones pendientes...");
  await notificationsService.notifyPendingEvaluations();
});
