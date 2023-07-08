const AdminAuditLog = require('../models/AdminAuditLog');

async function getAdminAuditLogs(req, res) {
    try {
        const auditLogs = await AdminAuditLog.find();
        res.status(200).json({
            success: true,
            message: 'ok',
            data: auditLogs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error',
            error: error.message,
        });
    }
}

async function createAdminAuditLog(req, res) {
    try {
        const { action, performedBy } = req.body;
        const newAuditLog = new AdminAuditLog({
            action,
            performedBy,
        });
        const savedAuditLog = await newAuditLog.save();
        res.status(201).json({
            success: true,
            message: 'ok',
            data: savedAuditLog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error',
            error: error.message,
        });
    }
}

module.exports = {
    getAdminAuditLogs,
    createAdminAuditLog,
};
