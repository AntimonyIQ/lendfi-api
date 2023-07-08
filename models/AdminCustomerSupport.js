const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminCustomerSupportSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    assignedTickets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SupportTicket'
        }
    ]
});

const AdminCustomerSupport = mongoose.model('AdminCustomerSupport', adminCustomerSupportSchema);

module.exports = AdminCustomerSupport;
