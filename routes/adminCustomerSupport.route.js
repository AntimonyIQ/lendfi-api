const express = require('express');
const {
    getAdminCustomerSupports,
    createAdminCustomerSupport,
    getAdminCustomerSupportById,
} = require('../controllers/adminCustomerSupport.controller');

const router = express.Router();

router.get('/', getAdminCustomerSupports);
router.get('/:id', getAdminCustomerSupportById);
router.post('/', createAdminCustomerSupport);

module.exports = router;
