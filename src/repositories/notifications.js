import Notification from "../models/notifications.js";

const notificationsRepository = {
    async getAllNotifications(id) {
        return await Notification.find({ employee: id });
    },
    async createNotification(notification) {
        return await Notification.create(notification);
    },
    async updateNotification(id, notification) {
        return await Notification.findByIdAndUpdate(id, notification, { new: true });
    },
};

export default notificationsRepository;