const express = require('express');
const {
    getAdminAuditLogs,
    createAdminAuditLog,
} = require('../controllers/adminAuditLog.controller');

const router = express.Router();

// Routes
router.get('/', getAdminAuditLogs);
router.post('/', createAdminAuditLog); 

module.exports = router;
