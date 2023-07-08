const AdminReport = require('../models/AdminReport');

async function getAllAdminReports(req, res) {
    try {
        const adminReports = await AdminReport.find();
        res.status(200).json({
            success: true,
            data: adminReports,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function getAdminReportById(req, res) {
    try {
        const adminReportId = req.params.id;
        const adminReport = await AdminReport.findById(adminReportId);
        if (!adminReport) {
            return res.status(404).json({
                success: false,
                message: 'Admin report not found',
            });
        }
        res.status(200).json({
            success: true,
            data: adminReport,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function createAdminReport(req, res) {
    try {
        const adminReportData = req.body;
        const adminReport = await AdminReport.create(adminReportData);
        res.status(201).json({
            success: true,
            data: adminReport,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function updateAdminReport(req, res) {
    try {
        const adminReportId = req.params.id;
        const updateData = req.body;
        const adminReport = await AdminReport.findByIdAndUpdate(
            adminReportId,
            updateData,
            { new: true }
        );
        if (!adminReport) {
            return res.status(404).json({
                success: false,
                message: 'Admin report not found',
            });
        }
        res.status(200).json({
            success: true,
            data: adminReport,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function deleteAdminReport(req, res) {
    try {
        const adminReportId = req.params.id;
        const adminReport = await AdminReport.findByIdAndDelete(adminReportId);
        if (!adminReport) {
            return res.status(404).json({
                success: false,
                message: 'Admin report not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Admin report deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
  getAllAdminReports,
  getAdminReportById,
  createAdminReport,
  updateAdminReport,
  deleteAdminReport,
};
