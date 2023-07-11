const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname:{
        type:String,
        default: null
    },
    lastname:{
        type:String,
        default: null
    },
    email:{
        type:String,
        default: null
    },
    wallet:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        default: null
    },
    createdat:{
        type:Date,
        default:Date.now
    },
    picture: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


const User = mongoose.model('User',userSchema)

module.exports = User;
