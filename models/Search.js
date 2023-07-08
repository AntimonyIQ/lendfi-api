const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSearchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const UserSearch = mongoose.model('UserSearch', UserSearchSchema);
module.exports = UserSearch;
