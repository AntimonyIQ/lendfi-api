const express = require('express');
const router = express.Router();
const {
    getAllAdminPartnerManagement,
    getAdminPartnerManagementById,
    createAdminPartnerManagement,
    updateAdminPartnerManagement,
    deleteAdminPartnerManagement,
} = require('../controllers/adminPartnerManagement.controller');

// Routes
router.get('/', getAllAdminPartnerManagement);
router.get('/:id', getAdminPartnerManagementById);
router.post('/', createAdminPartnerManagement);
router.put('/:id', updateAdminPartnerManagement);
router.delete('/:id', deleteAdminPartnerManagement);

module.exports = router;
