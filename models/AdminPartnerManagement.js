const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentInfoSchema = new Schema({
    accountNumber: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    routingNumber: {
        type: String,
        required: true
    },
    accountHolderName: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ['Checking', 'Savings'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});  

const AdminPartnerManagementSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    paymentInfo: {
        type: paymentInfoSchema,
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
    }
});

const AdminPartnerManagement = mongoose.model('AdminPartnerManagement', AdminPartnerManagementSchema);

module.exports = AdminPartnerManagement;
