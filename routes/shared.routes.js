const express = require('express');
const router = express.Router();
const {
    createSharedWishlist,
    getAllSharedWishlists,
    getSharedWishlist,
    updateSharedWishlist,
    deleteSharedWishlist,
    addNoteToSharedWishlist,
} = require('../controllers/shared.controller');

router.post('/', createSharedWishlist);
router.get('/', getAllSharedWishlists);
router.get('/:username', getSharedWishlist);
router.put('/:id', updateSharedWishlist);
router.delete('/:id', deleteSharedWishlist);
router.post('/:id/notes', addNoteToSharedWishlist);

module.exports = router;
