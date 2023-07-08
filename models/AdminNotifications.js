const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminNotificationsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'AdminUser',
    },
    metadata: {
        type: Schema.Types.Mixed,
    },
});

const AdminNotifications = mongoose.model('AdminNotifications', AdminNotificationsSchema);

module.exports = AdminNotifications;
