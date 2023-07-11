const express = require('express');
const router = express.Router();
const {
    updateLend,
    createLend,
    deleteLend,
    readLends,
    readAllLendsByUser,
    readAllPublicLendsByUser,
    readAllPrivteLendsByUser,
} = require('../controllers/lend.controller');

router.get('/all', readLends);
router.get('/:id', readAllLendsByUser);
router.delete('/:id', deleteLend);
router.put('/:id', updateLend);
router.post('/', createLend);
router.get('/public/:id', readAllPublicLendsByUser);
router.get('/private/:id', readAllPrivteLendsByUser);

module.exports = router;
