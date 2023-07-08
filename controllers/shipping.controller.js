const Shipping = require('../models/Shipping');

async function createShipping(req, res) {
    try {
        const newShipping = await Shipping.create(req.body);
        res.status(201).json(newShipping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllShipping(req, res) {
    try {
        const shippings = await Shipping.find();
        res.json(shippings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getShipping(req, res) {
    try {
        const shipping = await Shipping.findById(req.params.id);
        if (!shipping) {
            return res.status(404).json({ message: 'Shipping entry not found' });
        }
        res.json(shipping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateShipping(req, res) {
    try {
        const updatedShipping = await Shipping.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedShipping) {
            return res.status(404).json({ message: 'Shipping entry not found' });
        }
        res.json(updatedShipping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteShipping(req, res) {
    try {
        const deletedShipping = await Shipping.findByIdAndRemove(req.params.id);
        if (!deletedShipping) {
            return res.status(404).json({ message: 'Shipping entry not found' });
        }
        res.json({ message: 'Shipping entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createShipping,
    getAllShipping,
    getShipping,
    updateShipping,
    deleteShipping,
};
