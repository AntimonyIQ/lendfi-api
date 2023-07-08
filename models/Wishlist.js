const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    partner: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    description: String,
    published_at: {
        type: [String],
        required: true,
        default: []
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    vendor: String,
    type: String,
    tags: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    price_min: Number,
    price_max: Number,
    available: {
        type: Boolean,
        default: true
    },
    price_varies: {
        type: Boolean,
        default: false
    },
    compare_at_price: Number,
    compare_at_price_min: Number,
    compare_at_price_max: Number,
    compare_at_price_varies: {
        type: Boolean,
        default: false
    },
    images: [String],
    featured_image: String,
    options: [String],
    content: String
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = Wishlist;
