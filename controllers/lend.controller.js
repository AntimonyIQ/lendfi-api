const Lending = require('../models/Lend');
const User = require('../models/User');

const createLend = async (req, res) => {
    try {
        const { user_id, owner, amount, lendCurrency, lendNetwork, interestRate, collateralDetails, lendRepaymentMethod, lend, loanDuration } = req.body;

        const is_user = await User.findById(user_id);
        if (!is_user) {
            return res.status(409).json({
                success: false,
                message: 'User not found',
                data: null
            });
        } 

        const lending = new Lending({
            user: user_id,
            owner,
            amount,
            lendCurrency,
            lendNetwork,
            interestRate,
            collateralDetails,
            lendRepaymentMethod,
            lend,
            loanDuration
        });
  
        const savedLending = await lending.save();
        res.status(201).json({
            success: true,
            message: 'Lend saved successfully',
            data: savedLending
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error: Failed to create lending',
            error: error.message
        });
    }
};

const updateLend = async (req, res) => {
    try {
        const { lend_id, user_id, owner, amount, lendCurrency, lendNetwork, interestRate, collateralDetails, lendRepaymentMethod, lend, loanDuration } = req.body;

        const is_user = await User.findById(user_id);
        if (!is_user) {
            return res.status(409).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }

        const updatedLending = await Lending.findByIdAndUpdate(
            lend_id,
            {
                user: user_id,
                owner,
                amount,
                lendCurrency,
                lendNetwork,
                interestRate,
                collateralDetails,
                lendRepaymentMethod,
                lend,
                loanDuration
            },
            { new: true }
        );

        if (!updatedLending) {
            return res.status(404).json({
                success: false,
                message: 'Lending not found',
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lending updated successfully',
            data: updatedLending
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update lending',
            error: error.message
        });
    }
};

const deleteLend = async (req, res) => {
    try {
        const { lend_id, user_id } = req.body;

        const is_user = await User.findById(user_id);
        if (!is_user) {
            return res.status(409).json({
                success: false,
                message: 'User not found',
                data: null
            });
        }

        const deletedLending = await Lending.findOneAndDelete({ _id: lend_id, user: user_id });
        if (!deletedLending) {
            return res.status(404).json({
                success: false,
                message: 'Lending not found',
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lending deleted successfully',
            data: deletedLending
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete lending',
            error: error.message
        });
    }
};

const readAllLendsByUser = async (req, res) => {
    try {
        const user_id = req.params.id;
    
        const lends = await Lending.find({ user: user_id });
    
        res.status(200).json({
            success: true,
            message: 'Lends retrieved successfully',
            data: lends
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve lends',
            error: error.message
        });
    }
};

const readAllPublicLendsByUser = async (req, res) => {
    try {
        const user_id = req.params.id;
    
        const lends = await Lending.find({ user: user_id, lend: 'public' });
    
        res.status(200).json({
            success: true,
            message: 'Public lends retrieved successfully',
            data: lends
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve public lends',
            error: error.message
        });
    }
};

const readAllPrivateLendsByUser = async (req, res) => {
    try {
        const user_id = req.params.id;
    
        const lends = await Lending.find({ user: user_id, lend: 'private' });
    
        res.status(200).json({
            success: true,
            message: 'private lends retrieved successfully',
            data: lends
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve private lends',
            error: error.message
        });
    }
};

const readAllLends = async (req, res, lendType) => {
    try {
        let query = {};
        if (lendType !== 'all') {
            query = { lend: lendType };
        }
        const lends = await Lending.find(query);
        res.status(200).json({
            success: true,
            message: `${lendType} lends retrieved successfully`,
            data: lends
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to retrieve ${lendType} lends`,
            error: error.message
        });
    }
};

const readAllLendsAll = async (req, res) => {
    await readAllLends(req, res, 'all');
};

const readAllPrivateLends = async (req, res) => {
    await readAllLends(req, res, 'private');
};

const readAllPublicLends = async (req, res) => {
    await readAllLends(req, res, 'public');
};



module.exports = {
    updateLend,
    createLend,
    deleteLend,
    readAllLendsByUser,
    readAllPublicLendsByUser,
    readAllPrivateLendsByUser,
    readAllLendsAll,
    readAllPrivateLends,
    readAllPublicLends,
}
