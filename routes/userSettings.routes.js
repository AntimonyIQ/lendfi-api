const express = require('express');
const router = express.Router();
const userSettingsController = require('../controllers/userSettings.controller');

router.post('/', userSettingsController.createUserSettings);
router.get('/:userId', userSettingsController.getUserSettings);
router.put('/:userId', userSettingsController.updateUserSettings);
router.delete('/:userId', userSettingsController.deleteUserSettings);

module.exports = router;
