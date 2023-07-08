const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getAllTransactions);
router.get('/user/:userId', transactionController.getTransactionsByUser);
router.get('/:transactionId', transactionController.getTransactionById);
router.put('/:transactionId', transactionController.updateTransactionById);
router.delete('/:transactionId', transactionController.deleteTransactionById);

module.exports = router;
