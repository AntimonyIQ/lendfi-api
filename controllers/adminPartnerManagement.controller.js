const AdminPartnerManagement = require('../models/AdminPartnerManagement');

async function getAllAdminPartnerManagement(req, res) {
    try {
        const adminPartnerManagement = await AdminPartnerManagement.find();
        res.status(200).json({
            success: true,
            data: adminPartnerManagement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function getAdminPartnerManagementById(req, res) {
    try {
        const adminPartnerManagementId = req.params.id;
        const adminPartnerManagement = await AdminPartnerManagement.findById(adminPartnerManagementId);
        if (!adminPartnerManagement) {
            return res.status(404).json({
                success: false,
                message: 'Admin partner management record not found',
            });
        }
        res.status(200).json({
            success: true,
            data: adminPartnerManagement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function createAdminPartnerManagement(req, res) {
    try {
        const adminPartnerManagementData = req.body;
        const adminPartnerManagement = await AdminPartnerManagement.create(adminPartnerManagementData);
        res.status(201).json({
            success: true,
            data: adminPartnerManagement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function updateAdminPartnerManagement(req, res) {
    try {
        const adminPartnerManagementId = req.params.id;
        const updateData = req.body;
        const adminPartnerManagement = await AdminPartnerManagement.findByIdAndUpdate(
            adminPartnerManagementId,
            updateData,
            { new: true }
        );
        if (!adminPartnerManagement) {
            return res.status(404).json({
                success: false,
                message: 'Admin partner management record not found',
            });
        }
        res.status(200).json({
            success: true,
            data: adminPartnerManagement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function deleteAdminPartnerManagement(req, res) {
    try {
        const adminPartnerManagementId = req.params.id;
        const adminPartnerManagement = await AdminPartnerManagement.findByIdAndDelete(adminPartnerManagementId);
        if (!adminPartnerManagement) {
            return res.status(404).json({
                success: false,
                message: 'Admin partner management record not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Admin partner management record deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    getAllAdminPartnerManagement,
    getAdminPartnerManagementById,
    createAdminPartnerManagement,
    updateAdminPartnerManagement,
    deleteAdminPartnerManagement,
};
