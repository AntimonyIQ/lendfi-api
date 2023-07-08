const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSettingsSchema = new Schema({
    siteName: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    timeZone: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    emailNotifications: {
        type: Boolean,
        default: false,
    },
    paymentGateway: {
        type: String,
        required: true,
    },
    taxRate: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AdminSettings = mongoose.model('AdminSettings', AdminSettingsSchema);

module.exports = AdminSettings;
