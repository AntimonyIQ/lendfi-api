const express = require('express');
const router = express.Router();
const {
    getAllAdminReports,
    getAdminReportById,
    createAdminReport,
    updateAdminReport,
    deleteAdminReport,
} = require('../controllers/adminReport.controller');

// Routes
router.get('/', getAllAdminReports);
router.get('/:id', getAdminReportById);
router.post('/', createAdminReport);
router.put('/:id', updateAdminReport);
router.delete('/:id', deleteAdminReport);

module.exports = router;
