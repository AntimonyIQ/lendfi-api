const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const pondsSchema = new Schema({
    
    owner_id:{
        type:String
    },
    pond_name:{
        type:String 
    },
    pond_description:{

    },
    pond_tags:{
        type:Array
    },
    pond_items:{
        type:Array
    },
    
    createdat:{
        type:Date,
        default:Date.now
    }
})


const Ponds = mongoose.model('Ponds',pondsSchema)

module.exports = Ponds