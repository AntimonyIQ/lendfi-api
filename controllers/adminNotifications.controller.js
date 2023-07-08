const AdminNotifications = require('../models/AdminNotifications');

async function getAdminNotifications(req, res) {
    try {
        const notifications = await AdminNotifications.find();
        res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function createAdminNotification(req, res) {
  try {
        const {
            title,
            message,
            type,
            recipient,
            metadata
        } = req.body;
        const notification = new AdminNotifications({
            title,
            message,
            type,
            recipient,
            metadata
        });
        const savedNotification = await notification.save();
        res.status(200).json({
            success: true,
            data: savedNotification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function getAdminNotificationById(req, res) {
    try {
        const notificationId = req.params.id;
        const notification = await AdminNotifications.findById(notificationId);
        if (!notification) {
            return res.status(404).json({
            success: false,
            message: 'Admin notification not found',
            });
        }
        res.status(200).json({
            success: true,
            data: notification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function updateAdminNotification(req, res) {
    try {
        const notificationId = req.params.id;
        const { isRead } = req.body;
        const notification = await AdminNotifications.findById(notificationId);
        if (!notification) {
            return res.status(404).json({
            success: false,
            message: 'Admin notification not found',
            });
        }
        notification.isRead = isRead;
        const updatedNotification = await notification.save();
        res.status(200).json({
            success: true,
            data: updatedNotification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    getAdminNotifications,
    createAdminNotification,
    getAdminNotificationById,
    updateAdminNotification,
};
