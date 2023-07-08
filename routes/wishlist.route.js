const express = require('express');
const router = express.Router();
const {
    addWishList,
    deleteWishList,
    readUserWishlist,
    deleteAllWishlistsByUserId,
    updateWishlistFromWebhook,
    getProductRecommendations,
    readAllWishlists,
} = require('../controllers/wishlist.controller');

router.post('/add', addWishList);
router.get('/all', readAllWishlists);
router.delete('/delete/:id', deleteWishList);
router.get('/user/:userId', readUserWishlist);
router.delete('/delete/all/:userId', deleteAllWishlistsByUserId);
router.post('/webhook', updateWishlistFromWebhook);
router.get('/:userId/recommendations', getProductRecommendations);

module.exports = router;
