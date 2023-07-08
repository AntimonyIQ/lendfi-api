const Search = require('../models/Search');

// Controller function to handle search requests
const searchProducts = async (req, res) => {
    try {
        const { query } = req.params;

        const search = new Search({
            user: req.user,
            query,
        });
        await search.save();

        res.json({ results: [] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    searchProducts,
};
