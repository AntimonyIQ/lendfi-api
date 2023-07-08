const Transaction = require('../models/Transaction');

async function createTransaction(req, res) {
    try {
        const { user, amount, currency, paymentMethod, description, metadata } = req.body;
        const newTransaction = await Transaction.create({
            user,
            amount,
            currency,
            paymentMethod,
            description,
            metadata,
        });
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllTransactions(req, res) {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTransactionsByUser(req, res) {
    try {
        const { userId } = req.params;
        const transactions = await Transaction.find({ user: userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTransactionById(req, res) {
    try {
        const transaction = await Transaction.findById(req.params.transactionId);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTransactionById(req, res) {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.transactionId,
            req.body,
            { new: true }
        );
        if (!updatedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(updatedTransaction);
    } catch (error) {
        es.status(500).json({ error: error.message });
    }
}

async function deleteTransactionById(req, res) {
    try {
        const deletedTransaction = await Transaction.findByIdAndRemove(req.params.transactionId);
        if (!deletedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionsByUser,
    getTransactionById,
    updateTransactionById,
    deleteTransactionById,
};
