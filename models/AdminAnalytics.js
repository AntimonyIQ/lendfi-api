const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const AdminAnalyticsSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    totalVisitors: {
        type: Number,
        required: true,
        default: 0
    },
    totalOrders: {
        type: Number,
        required: true,
        default: 0
    },
    totalRevenue: {
        type: Number,
        required: true,
        default: 0
    },
    topProducts: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantitySold: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ],
    topCategories: [
        {
            categoryId: {
                type: Schema.Types.ObjectId,
                ref: 'Category',
                required: true
            },
            totalOrders: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ],
});

const AdminAnalytics = mongoose.model('AdminAnalytics', AdminAnalyticsSchema);

module.exports = AdminAnalytics;
