const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const ItemSchema = new Schema({
    
    owner_id:{
        type:String
    },
    pond_id:{
    },
    createdat:{
        type:Date,
        default:Date.now
    }
})


const Item = mongoose.model('Item',ItemSchema)

module.exports = Item