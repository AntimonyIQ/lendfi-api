const AdminSettings = require('../models/AdminSettings');

async function createAdminSettings(req, res) {
    try {
        const adminSettings = new AdminSettings(req.body);
        const savedSettings = await adminSettings.save();
        res.status(201).json(savedSettings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAdminSettings(req, res) {
    try {
        const settings = await AdminSettings.findOne();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateAdminSettings(req, res) {
    try {
        const updatedSettings = await AdminSettings.findOneAndUpdate({}, req.body, { new: true });
        res.json(updatedSettings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createAdminSettings,
    getAdminSettings,
    updateAdminSettings,
};
