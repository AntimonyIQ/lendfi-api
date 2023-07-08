const express = require('express');
const router = express.Router();
const {
    getAdminOrderManagement,
    createAdminOrderManagement,
    getAdminOrderManagementById,
    updateAdminOrderManagementStatus,
} = require('../controllers/adminOrderManagement.controller');

router.get('/', getAdminOrderManagement);
router.post('/', createAdminOrderManagement);
router.get('/:id', getAdminOrderManagementById);
router.put('/:id/status', updateAdminOrderManagementStatus);


module.exports = router;
