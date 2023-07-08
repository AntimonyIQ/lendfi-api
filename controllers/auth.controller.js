const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { faker } = require('@faker-js/faker');
const SMS = require('../models/Sms');
const {generateOTP, sendSMS } = require('../utils/util');

async function authController(req,res){
    const {type,phoneno,email,firstname,lastname} = req.body;

    let query ={};

    if(type=='otp'){
        query.phone = phoneno;

    }else{
        query.email = email;
    }

    User.findOne(query).then(user=>{
        if(user){
        const token =    jwt.sign({user:user},process.env.JWT_SECRET)
        res.status(200).json({
            status: 'ok',
            token:token
        })
        }else{
            const payload = type=='otp'?{phone:phoneno}:{email:email,firstname:firstname,lastname:lastname}
            newUser = new User(payload)
            newUser.save().then(user=>{
                const token =    jwt.sign({user:user},process.env)
                res.status(200).json({
                    status: 'ok',
                    token:token
                })
            })
        }

    })

}

async function decodeJwtToken(req,res){
    console.log(req.body)
    try{
        const decodedToken = jwt.decode(req.body.token)
        if(req.body.verify==null){

        res.json({
                success: true,
                data: {
                    firstname:decodedToken.given_name,
                    lastname:decodedToken.family_name,
                    name:decodedToken.name,
                    email:decodedToken.email,
                    picture:decodedToken.picture
                }
        })
        }  else{
            User.findById(decodedToken.user._id).then(user => {
                if (user) {
                User.findOne({ email: decodedToken.user.email }).then(vuser => {

                    if(vuser){
                        res.json({
                            success: true,
                            data:

                            {firstname:decodedToken.given_name,
                                lastname:decodedToken.family_name,
                                name:decodedToken.name,
                                email:decodedToken.email,
                                picture:decodedToken.picture

                            }
                        })
                    }else{
                        res.status(500).json({
                            success:false
                        })
                    }
                }).catch(error => {
                    res.status(500).json({
                        success:false
                    })
                });
                } else {
                    res.status(500).json({
                        success:false
                    })
                }
            }).catch(error => {
                res.status(500).json({
                    success:false
                })
            });
        }   
    }
    catch (error){
        res.status(500).json({
            success:false
        })
   }
}

async function randomUsername(req,res){
    function makeUsername(){
        const word = faker.internet.domainWord()
        var words = word.split('-');

        for (var i = 1; i < words.length; i++) {
          var capitalizedWord = words[i][0].toUpperCase() + words[i].substring(1);
          words[i] = capitalizedWord;
        }

        return words.join('')+faker.internet.port();
    }
       const username = makeUsername();

       res.json({username:username})
}

async function verifyToken(req,res){

    try{
        const decodedToken =jwt.verify(req.body.token,process.env.JWT_SECRET)
        res.status(200).json({
            status:true,
            payload:decodedToken
        })

    }catch (err){
        res.status(500).json({
            status:false,
            error:err
        })
    }
}

async function handleSendSMS(req, res) {

    const OneTimePasscode = await generateOTP();
    console.log(`Your otp is: ${OneTimePasscode}`);
    const { phone } = req.body; // +2349070756064, +13468166358
    console.log(req.body)
    const msg = `#uniwish Your OTP verification code is: ${OneTimePasscode}. This code will expire in 10 minutes. Please do not share this code with anyone.`
    const messageStatus = await sendSMS('+12545365308', phone, msg);
    if (messageStatus == false) {
        const data = {
            success: false,
            message: 'error sms not sent',
            data: []
        };
        return res.status(400).json(data);
    } else {
        const newSMS = new SMS({
            phone: phone,
            code:OneTimePasscode
        })
        const data = {
            success: true,
            message: 'success sms sent successfully',
            data: [
                OneTimePasscode
            ]
        };

        return res.json(data);
    }
}

async function verifySMS(req,res){
    SMS.findOne({
        phone:req.body.phone,
        code:req.body.code
    }).then(resp=>{
        if(resp){
            res.status(200).json({
                status:true,
            })
        }
    })

}

module.exports = {
    authController,
    randomUsername,
    decodeJwtToken,
    verifyToken,
    handleSendSMS,
    verifySMS
}
