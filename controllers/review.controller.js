const Review = require('../models/Review');

async function createReview(req, res) {
    try {
        const { user, product, rating, comment } = req.body;
        const review = new Review({
            user,
            product,
            rating,
            comment
        });
        const savedReview = await review.save();
        res.json(savedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllReviews(req, res) {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getReview(req, res) {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateReview(req, res) {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { rating, comment },
            { new: true }
        );
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteReview(req, res) {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
};
