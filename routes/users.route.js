const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    createUser,
} = require('../controllers/users.controller');

router.get('/all', getAllUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.post('/', createUser);

module.exports = router;
