const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShippingSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ShippingSchema.virtual('fullAddress').get(function () {
    return `${this.address}, ${this.city}, ${this.state}, ${this.country}, ${this.postalCode}`;
});

ShippingSchema.pre('save', function (next) {

    const cleanedPhoneNumber = this.phoneNumber.replace(/\D/g, '');
    if (cleanedPhoneNumber.length === 10) {
        const formattedPhoneNumber = cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        this.phoneNumber = formattedPhoneNumber;
    }

    next();
});

const Shipping = mongoose.model('Shipping', ShippingSchema);

module.exports = Shipping;
