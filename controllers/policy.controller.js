const Policy = require('../models/Policy');

async function createPolicy(req, res) {
    try {
        const policy = new Policy(req.body);
        const savedPolicy = await policy.save();
        res.json(savedPolicy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getPolicies(req, res) {
    try {
        const policies = await Policy.find();
        res.json(policies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getPolicyById(req, res) {
    try {
        const policy = await Policy.findById(req.params.policyId);
        if (!policy) {
            return res.status(404).json({ error: 'Policy not found' });
        }
        res.json(policy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updatePolicyById(req, res) {
    try {
        const policy = await Policy.findByIdAndUpdate(req.params.policyId, req.body, { new: true });
        if (!policy) {
            return res.status(404).json({ error: 'Policy not found' });
        }
        res.json(policy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deletePolicyById(req, res) {
    try {
        const policy = await Policy.findByIdAndDelete(req.params.policyId);
        if (!policy) {
            return res.status(404).json({ error: 'Policy not found' });
        }
        res.json({ message: 'Policy deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPolicy,
    getPolicies,
    getPolicyById,
    updatePolicyById,
    deletePolicyById,
};
