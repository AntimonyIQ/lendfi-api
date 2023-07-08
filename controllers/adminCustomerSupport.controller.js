const AdminCustomerSupport = require('../models/AdminCustomerSupport');

async function getAdminCustomerSupports(req, res) {
    try {
        const customerSupports = await AdminCustomerSupport.find();
            res.status(200).json({
            success: true,
            data: customerSupports,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function createAdminCustomerSupport(req, res) {
    try {
        const { name, email, department } = req.body;
        const newCustomerSupport = new AdminCustomerSupport({
            name,
            email,
            department,
        });
        const savedCustomerSupport = await newCustomerSupport.save();
        res.status(201).json({
            success: true,
            data: savedCustomerSupport,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function getAdminCustomerSupportById(req, res) {
    try {
        const { id } = req.params;
        const customerSupport = await AdminCustomerSupport.findById(id);
        if (!customerSupport) {
            return res.status(404).json({
                success: false,
                message: 'Admin customer support not found',
            });
        }
        res.status(200).json({
            success: true,
            data: customerSupport,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    getAdminCustomerSupports,
    createAdminCustomerSupport,
    getAdminCustomerSupportById,
};
