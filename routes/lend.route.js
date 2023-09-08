const express = require('express');
const router = express.Router();
const {
    updateLend,
    createLend,
    deleteLend,
    readLends,
    readAllLendsByUser,
    readAllPublicLendsByUser,
    readAllPrivateLendsByUser,
    readAllLendsAll,
    readAllPrivateLends,
    readAllPublicLends,
} = require('../controllers/lend.controller');

router.get('/all', readAllLendsAll);
router.get('/public', readAllPublicLends);
router.get('/private', readAllPrivateLends);
router.get('/:id', readAllLendsByUser);
router.delete('/:id', deleteLend);
router.put('/:id', updateLend);
router.post('/', createLend);
router.get('/public/:id', readAllPublicLendsByUser);
router.get('/private/:id', readAllPrivateLendsByUser);

module.exports = router;
