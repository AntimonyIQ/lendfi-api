const Order = require('../models/Order');

async function createOrder(req, res) {
    try {
        const { orderNumber, user, products, totalAmount, status, image } = req.body;
        const order = new Order({
            orderNumber,
            user,
            products,
            totalAmount,
            status,
            image,
        });
        const createdOrder = await order.save();
        res.json(createdOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getOrderById(req, res) {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.json(order);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateOrderById(req, res) {
    try {
        const orderId = req.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
        if (!updatedOrder) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.json(updatedOrder);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteOrderById(req, res) {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.json({ message: 'Order deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById,
};
