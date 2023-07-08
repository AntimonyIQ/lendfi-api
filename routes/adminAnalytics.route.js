const express = require('express');
const {
    getAdminAnalytics,
    updateAdminAnalytics,
} = require('../controllers/adminAnalytics.controller');

const router = express.Router();

// Routes
router.get('/', getAdminAnalytics);
router.put('/', updateAdminAnalytics);

module.exports = router;
