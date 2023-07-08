const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminAuditLogSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    performedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    performedOn: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const AdminAuditLog = mongoose.model('AdminAuditLog', adminAuditLogSchema);

module.exports = AdminAuditLog;
