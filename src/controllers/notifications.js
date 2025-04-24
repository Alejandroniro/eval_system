import notificationsRepository from "../repositories/notifications.js";
import DatabaseError from "../utils/error/DatabaseError.js";
import NotFoundError from "../utils/error/NotFoundError.js";

class notificationsController {
    async getAllNotifications(req, res, next) {
        try {
            const notifications = await notificationsRepository.getAllNotifications();
            res.status(200).json(notifications);
        } catch (e) {
            next(new DatabaseError("Error al obtener notificaciones", e));
        }
    }

    async createNotification(req, res, next) {
        try {
            const notification = await notificationsRepository.createNotification(req.body);
            res.status(201).json(notification);
        } catch (e) {
            next(new DatabaseError("Error al crear notificación", e));
        }
    }

    async updateNotification(req, res, next) {
        try {
            const notification = await notificationsRepository.updateNotification(req.params.id, req.body);
            if (!notification) {
                throw new NotFoundError("Notificación no encontrada");
            }
            res.status(200).json(notification);
        } catch (e) {
            next(e instanceof NotFoundError ? e : new DatabaseError("Error al actualizar notificación", e));
        }
    }
}

export default new notificationsController();
