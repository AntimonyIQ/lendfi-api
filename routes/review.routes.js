const express = require('express');
const router = express.Router();
const {
    createReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview,
} = require('../controllers/review.controller');

router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/:id', getReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
