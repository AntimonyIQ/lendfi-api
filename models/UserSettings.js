const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSettingsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    wishlistVisibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
    addressManagement: {
        type: Boolean,
        default: false,
    },
    notificationPreferences: {
        email: {
            type: Boolean,
            default: true,
        },
        push: {
            type: Boolean,
            default: true,
        },
    },
    connectToPartnerSites: {
        type: Boolean,
        default: false,
    },
    deleteWishlist: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserSettings = mongoose.model('UserSettings', UserSettingsSchema);

module.exports = UserSettings;
