const express = require('express');
const router = express.Router();
const {
    searchProducts
} = require('../controllers/search.controller');

router.get('/:query', searchProducts);

module.exports = router;
