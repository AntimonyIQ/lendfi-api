const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminReportSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    reportData: {
        type: Schema.Types.Mixed,
        required: true
    }
});

const AdminReport = mongoose.model('AdminReport', AdminReportSchema);

module.exports = AdminReport;
