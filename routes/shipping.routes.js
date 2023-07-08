const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shipping.controller');

router.post('/', shippingController.createShipping);
router.get('/', shippingController.getAllShipping);
router.get('/:id', shippingController.getShipping);
router.put('/:id', shippingController.updateShipping);
router.delete('/:id', shippingController.deleteShipping);

module.exports = router;
