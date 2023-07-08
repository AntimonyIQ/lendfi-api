const UserSettings = require('../models/UserSettings');

async function createUserSettings(req, res) {
    try {
        const { user, username, wishlistVisibility, addressManagement, notificationPreferences, connectToPartnerSites, deleteWishlist } = req.body;

        const newUserSettings = new UserSettings({
            user,
            username,
            wishlistVisibility,
            addressManagement,
            notificationPreferences,
            connectToPartnerSites,
            deleteWishlist
        });

        const savedUserSettings = await newUserSettings.save();
        res.json(savedUserSettings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserSettings(req, res) {
    try {
        const userId = req.params.userId;
        const userSettings = await UserSettings.findOne({ user: userId });
        res.json(userSettings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUserSettings(req, res) {
    try {
        const userId = req.params.userId;
        const updatedSettings = req.body;

        const userSettings = await UserSettings.findOneAndUpdate({ user: userId }, updatedSettings, { new: true });
        res.json(userSettings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUserSettings(req, res) {
    try {
        const userId = req.params.userId;
        await UserSettings.findOneAndRemove({ user: userId });
        res.json({ message: 'User settings deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUserSettings,
    getUserSettings,
    updateUserSettings,
    deleteUserSettings
};
