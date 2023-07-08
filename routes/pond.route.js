const express = require('express')
const { createPond,getPonds } = require('../controllers/pond.controller')
 
const router = express.Router()



router.post('/create_pond',createPond)
router.post('/get_ponds',getPonds)
module.exports = router