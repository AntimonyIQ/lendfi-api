const express = require('express');
const router = express.Router();
const {
    createNotification,
    getAllNotifications,
    getNotification,
    updateNotification,
    deleteNotification,
    getNotificationsByRecipient,
} = require('../controllers/notification.controller');

router.post('/', createNotification);
router.get('/', getAllNotifications);
router.get('/:id', getNotification);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);
router.get('/recipient/:recipientId', getNotificationsByRecipient);


module.exports = router;
