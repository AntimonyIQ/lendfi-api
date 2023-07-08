const Ponds = require('../models/Ponds');
const Pond = require('../models/Ponds');

async function createPond(req,res){
    const {name,tags,description,userid} = req.body;
    const newPond  = new Ponds({
        pond_name:name,
        pond_description:description,
        pond_tags:tags,
        pond_items:[],
        owner_id:userid
        
    })

    newPond.save().then(pond=>{
        res.status(200).json({
            message:"Pond created successfully",
        })
    })

}
async function getPonds(req,res){
    const {userid} = req.body;
 
    Ponds.find({
        owner_id:userid
    }, 
  
    ).then(ponds=>{
        console.log(ponds)
        res.status(200).json(ponds.reverse())
    })
}
module.exports = {
    createPond,
    getPonds
}