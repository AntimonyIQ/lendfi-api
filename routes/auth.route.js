const express = require('express')
const { authController,randomUsername,decodeJwtToken,verifyToken, handleSendSMS,verifySMS } = require('../controllers/auth.controller')
const router = express.Router()

router.post('/start',authController)
router.get('/generate_username',randomUsername)
router.post('/decode_token',decodeJwtToken)
router.post('/verify_token',verifyToken)
router.post('/send_sms',handleSendSMS)
router.post('/verify_sms',verifySMS)
module.exports = router
