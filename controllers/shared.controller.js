const SharedWishlist = require('../models/Shared');
const User = require('../models/User');

// Create a new shared wishlist
async function createSharedWishlist(req, res) {
    try {
        const { name, username, items } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }
        const sharedWishlist = new SharedWishlist({
            name,
            createdBy: user._id,
            items
        });
        const savedSharedWishlist = await sharedWishlist.save();
        res.json({
            success: true,
            message: 'ok',
            data: savedSharedWishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error sharing wishpo',
            error: error.message
        });
    }
}

// Get all shared wishlists
async function getAllSharedWishlists(req, res) {
    try {
        const sharedWishlists = await SharedWishlist.find();
        res.json(sharedWishlists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a shared wishlist by ID
async function getSharedWishlist(req, res) {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: true,
                message: 'unknown',
                data: null
            });
        }
        
        const sharedWishlist = await SharedWishlist.findOne({ createdBy: user._id });
        if (!sharedWishlist) {
            return res.status(404).json({
                success: true,
                message: 'user',
                data: null
            });
        }
        res.json({
            success: true,
            message: 'user',
            data: sharedWishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'unknown',
            data: null,
            error: error.message
        });
    }
}

// Update a shared wishlist by ID
async function updateSharedWishlist(req, res) {
    try {
        const { id } = req.params;
        const { name, items } = req.body;
        const updatedSharedWishlist = await SharedWishlist.findByIdAndUpdate(
            id,
            { name, items },
            { new: true }
        );
        if (!updatedSharedWishlist) {
            return res.status(404).json({ message: 'Shared wishlist not found' });
        }
        res.json(updatedSharedWishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteSharedWishlist(req, res) {
    try {
        const { id } = req.params;
        const deletedSharedWishlist = await SharedWishlist.findByIdAndDelete(id);
        if (!deletedSharedWishlist) {
            return res.status(404).json({ message: 'Shared wishlist not found' });
        }
        res.json({ message: 'Shared wishlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addNoteToSharedWishlist(req, res) {
    try {
        const { id } = req.params;
        const { content, guest } = req.body;
    
        const sharedWishlist = await SharedWishlist.findById(id);
        if (!sharedWishlist) {
            return res.status(404).json({ message: 'Shared wishlist not found' });
        }
    
        sharedWishlist.notes.push({ content, guest });
        const updatedSharedWishlist = await sharedWishlist.save();
    
        res.json(updatedSharedWishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createSharedWishlist,
    getAllSharedWishlists,
    getSharedWishlist,
    updateSharedWishlist,
    deleteSharedWishlist,
    addNoteToSharedWishlist
};
