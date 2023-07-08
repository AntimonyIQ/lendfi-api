const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const SMSchema = new Schema({
    
    code:{},
    phone:{},
    createdat:{
        type:Date,
        default:Date.now
    }
})


const SMS = mongoose.model('SMS',SMSchema)

module.exports = SMS