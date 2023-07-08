const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    guest: {
        type: Schema.Types.ObjectId,
        ref: 'Guest',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const sharedWishlistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            link: {
                type: String,
            }
        },
    ],
    notes: [noteSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SharedWishlist = mongoose.model('SharedWishlist', sharedWishlistSchema);

module.exports = SharedWishlist;
