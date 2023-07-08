const express = require('express');
const router = express.Router();
const {
    createAdminSettings,
    getAdminSettings,
    updateAdminSettings
} = require('../controllers/adminSettings.controller');

router.post('/', createAdminSettings);
router.get('/', getAdminSettings);
router.put('/', updateAdminSettings);

module.exports = router;
