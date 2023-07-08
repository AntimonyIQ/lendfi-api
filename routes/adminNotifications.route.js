const express = require('express');
const router = express.Router();
const {
    getAdminNotifications,
    createAdminNotification,
    getAdminNotificationById,
    updateAdminNotification,
} = require('../controllers/adminNotifications.controller');


router.get('/', getAdminNotifications);
router.post('/', createAdminNotification);
router.get('/:id', getAdminNotificationById);
router.put('/:id', updateAdminNotification);

module.exports = router;
