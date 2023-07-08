const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policy.controller');

router.post('/', policyController.createPolicy);
router.get('/', policyController.getPolicies);
router.get('/:policyId', policyController.getPolicyById);
router.put('/:policyId', policyController.updatePolicyById);
router.delete('/:policyId', policyController.deletePolicyById);

module.exports = router;
