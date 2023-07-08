const Notification = require('../models/Notification');

async function createNotification(req, res) {
    try {
        const { title, message, recipient, metadata } = req.body;
        const notification = new Notification({
            title,
            message,
            recipient,
            metadata
        });
        const savedNotification = await notification.save();
        res.json({
            success: true,
            message: 'Saved notification',
            data: savedNotification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving notification',
            error: error.message
        });
    }
}

async function getAllNotifications(req, res) {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getNotification(req, res) {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found',
                data: null
            });
        }
        res.json({
            success: true,
            message: 'ok',
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while getting notification',
            error: error.message
        });
    }
}

async function updateNotification(req, res) {
    try {
        const { id } = req.params;
        const { title, message, recipient, metadata } = req.body;
        const updatedNotification = await Notification.findByIdAndUpdate(
            id,
            { title, message, recipient, metadata },
            { new: true }
        );
        if (!updatedNotification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found',
                data: null
            });
        }
        res.json({
            success: false,
            message: 'Notification updated',
            data: updatedNotification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating notification',
            error: error.message
        });
    }
}

async function deleteNotification(req, res) {
    try {
        const { id } = req.params;
        const deletedNotification = await Notification.findByIdAndDelete(id);
        if (!deletedNotification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found',
                data: null
            });
        }
        res.json({
            success: true,
            message: 'Notification deleted successfully',
            data: deletedNotification
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting notification',
            error: error.message
        });
    }
}

const getNotificationsByRecipient = async (req, res) => {
    try {
        const recipientId = req.params.recipientId;
        const notifications = await Notification.find({ recipient: recipientId });
    
        res.status(200).json({
            success: true,
            message: 'Notifications retrieved successfully',
            data: notifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get notifications',
            error: error.message,
        });
    }
};

module.exports = {
    createNotification,
    getAllNotifications,
    getNotification,
    updateNotification,
    deleteNotification,
    getNotificationsByRecipient
};
