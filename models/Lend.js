const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lendingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    lendCurrency: {
        type: String,
        enum: ['usdt', 'lendx'],
        default: 'usdt',
    },
    lendNetwork: {
        type: String,
        enum: ['bsc', 'eth', 'matic'],
        default: 'bsc',
    },
    loanDuration: {
        type: String,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    collateralDetails: {
        type: String,
        required: true,
    },
    lendRepaymentMethod: {
        type: String,
        enum: ['usdt', 'lendx'],
        default: 'usdt',
    },
    lend: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
  

const Lending = mongoose.model('Lending', lendingSchema);

module.exports = Lending;