const Wishlist = require('../models/Wishlist');
const UserSearch = require('../models/Search');

async function addWishList(req, res) {
    try {
        const wishlistItemData = {
            user: req.body.user,
            partner: req.body.partner,
            product_id: req.body.product_id,
            title: req.body.title,
            handle: req.body.handle,
            description: req.body.description,
            published_at: req.body.published_at,
            created_at: req.body.created_at || new Date().toUTCString(),
            vendor: req.body.vendor || null,
            type: req.body.type || "",
            tags: req.body.tags || [],
            price: req.body.price,
            price_min: req.body.price_min,
            price_max: req.body.price_max,
            available: req.body.available === "true",
            price_varies: req.body.price_varies || false,
            compare_at_price: req.body.compare_at_price || null,
            compare_at_price_min: req.body.compare_at_price_min || 0,
            compare_at_price_max: req.body.compare_at_price_max || 0,
            compare_at_price_varies: req.body.compare_at_price_varies || false,
            image: req.body.image,
            featured_image: req.body.featured_image,
            options: req.body.options || [],
            content: req.body.media || null,
        };

        const wishlistItem = new Wishlist(wishlistItemData);
        const savedItem = await wishlistItem.save();

        const response = {
            success: true,
            message: "Wishlist item added successfully",
            data: savedItem
        };

        res.status(200).json(response);
    } catch (error) {
        const response = {
            success: false,
            message: "Failed to add wishlist item",
            error: error.message
        };

        res.status(500).json(response);
    }
}

async function readAllWishlists(req, res) {
    try {
        const wishlistItems = await Wishlist.find();

        if (wishlistItems.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No wishlists found',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Wishlists retrieved successfully',
            data: wishlistItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve wishlists',
            error: error.message
        });
    }
}

async function deleteWishList(req, res) {
    try {
        const wishlistId = req.params.id;
        const deletedItem = await Wishlist.findOneAndDelete({ product_id: wishlistId });

        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: 'Wishlist item not found',
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: 'Wishlist item deleted successfully',
            data: deletedItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete wishlist item',
            error: error.message
        });
    }
}

async function readUserWishlist(req, res) {
    try {
        const userId = req.params.userId;

        // Find the wishlist items belonging to the user
        const wishlistItems = await Wishlist.find({ user: userId });

        if (wishlistItems.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'User wishlist is empty',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'User wishlist retrieved successfully',
            data: wishlistItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user wishlist',
            error: error.message
        });
    }
}

async function deleteAllWishlistsByUserId(req, res) {
    try {
        const userId = req.params.userId;
        await Wishlist.deleteMany({ user: userId });
        res.json({
            success: true, 
            message: 'All wishlists deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'failed to delete wishlist',
            error: error.message,
        });
    }
}

async function updateWishlistFromWebhook(req, res) {
    try {
        const { wishlistId, updatedData } = req.body;
        const wishlist = await Wishlist.findById(wishlistId);
        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: 'Wishlist not found',
                data: null
            });
        }

        wishlist.title = updatedData.title;
        wishlist.description = updatedData.description;
        const updatedWishlist = await wishlist.save();

        res.json({
            success: true,
            message: 'ok',
            data: updatedWishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update wishlist',
            error: error.message
        });
    }
}

const getProductRecommendations = async (req, res) => {
    try {
        const { userId } = req.params;
        const searchHistory = await UserSearch.find({ user: userId });
        const mostRecentSearchToken = searchHistory[0].searchToken;

        const wishlist = await Wishlist.findOne({ user: userId });
        const recommendations = await performRecommendationLogic(mostRecentSearchToken, wishlist);

        res.json({
            success: true,
            message: 'ok',
            data: recommendations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed tp fetch recommendations',
            error: error.message
        });
    }
};

const performRecommendationLogic = async (searchToken, wishlist) => {

    const recommendedProducts = wishlist.filter((product) => {
        const productTags = product.tags || [];
        const searchTokenTags = searchToken.split(' ');

        return searchTokenTags.some((tag) => productTags.includes(tag));
    });

    return recommendedProducts;
};


module.exports = {
    addWishList,
    deleteWishList,
    readUserWishlist,
    deleteAllWishlistsByUserId,
    updateWishlistFromWebhook,
    getProductRecommendations,
    readAllWishlists,
};
