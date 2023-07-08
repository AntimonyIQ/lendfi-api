const express = require('express');
const router = express.Router();
const {
    createAdmin,
    getAllAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    activateAdmin,
    deactivateAdmin,
} = require('../controllers/admin.controller');

router.post('/', createAdmin);
router.get('/', getAllAdmins);
router.get('/:id', getAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);
router.put('/activate/:id', activateAdmin);
router.put('/deactivate/:id', deactivateAdmin);

module.exports = router; 
