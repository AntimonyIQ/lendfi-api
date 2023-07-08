const AdminOrderManagement = require('../models/AdminOrderManagement');

async function getAdminOrderManagement(req, res) {
    try {
        const orderManagement = await AdminOrderManagement.find();
        res.status(200).json({
            success: true,
            data: orderManagement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function createAdminOrderManagement(req, res) {
    try {
        const { orderNumber, customer, products, totalAmount, status } = req.body;
        const newOrderManagement = new AdminOrderManagement({
            orderNumber,
            customer,
            products,
            totalAmount,
            status,
        });
        const createdOrderManagement = await newOrderManagement.save();
        res.status(201).json({
            success: true,
            data: createdOrderManagement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function getAdminOrderManagementById(req, res) {
    try {
        const orderId = req.params.id;
        const orderManagement = await AdminOrderManagement.findById(orderId);
        if (!orderManagement) {
            return res.status(404).json({
                success: false,
                message: 'Admin order management record not found',
            });
        }
        res.status(200).json({
            success: true,
            data: orderManagement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

async function updateAdminOrderManagementStatus(req, res) {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const updatedOrderManagement = await AdminOrderManagement.findByIdAndUpdate(
                orderId,
                { status },
                { new: true }
        );
        if (!updatedOrderManagement) {
            return res.status(404).json({
                success: false,
                message: 'Admin order management record not found',
            });
        }
        res.status(200).json({
            success: true,
            data: updatedOrderManagement,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}


module.exports = {
    getAdminOrderManagement,
    createAdminOrderManagement,
    getAdminOrderManagementById,
    updateAdminOrderManagementStatus,
};
