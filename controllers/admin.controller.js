const Admin = require('../models/Admin');

async function createAdmin(req, res) {
    try {
        const { username, email, firstName, lastName, phoneNumber } = req.body;

        // Check if admin with the same username or email already exists
        const existingAdmin = await Admin.findOne({
            $or: [{ phoneNumber }, { email }]
        });

        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: 'Admin with the same username or email already exists',
                data: existingAdmin
            });
        }

        // Create a new admin
        const admin = new Admin({
            username,
            email,
            firstName,
            lastName,
            phoneNumber,
        });

        // Save the admin to the database
        const savedAdmin = await admin.save();

        res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            admin: savedAdmin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create admin',
            error: error.message,
        });
    }
}

async function getAllAdmins(req, res) {
    try {
      const admins = await Admin.find();
      
        res.json({
            success: true,
            message: 'Admins retrieved successfully',
            data: admins,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve admins',
            error: error.message,
        });
    }
}

async function getAdmin(req, res) {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findById(adminId);
        
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found',
                admin: null,
            });
        }
        
        res.json({
            success: true,
            message: 'Admin retrieved successfully',
            data: admin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve admin',
            error: error.message,
        });
    }
}

async function updateAdmin(req, res) {
    try {
        const adminId = req.params.id;
        const updatedData = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updatedData, {
            new: true,
        });
        
        if (!updatedAdmin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found',
                admin: null,
            });
        }
        
        res.json({
            success: true,
            message: 'Admin updated successfully',
            admin: updatedAdmin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update admin',
            error: error.message,
        });
    }
}

async function deleteAdmin(req, res) {
    try {
      const adminId = req.params.id;
      const deletedAdmin = await Admin.findByIdAndDelete(adminId);
      
        if (!deletedAdmin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found',
                admin: null,
            });
        }
      
        res.json({
            success: true,
            message: 'Admin deleted successfully',
            admin: deletedAdmin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete admin',
            error: error.message,
        });
    }
}


async function activateAdmin(req, res) {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findByIdAndUpdate(adminId, { isActive: true }, { new: true });

        if (!admin) {
            const data = {
                success: false,
                message: 'Admin not found',
                data: null
            };
            return res.status(404).json(data);
        }

        const data = {
            success: true,
            message: 'Admin activated successfully',
            data: admin
        };
        res.json(data);
    } catch (error) {
        const data = {
            success: false,
            message: 'Error activating admin',
            data: null
        };
        res.status(500).json(data);
    }
}

async function deactivateAdmin(req, res) {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findByIdAndUpdate(adminId, { isActive: false }, { new: true });

        if (!admin) {
            const data = {
                success: false,
                message: 'Admin not found',
                data: null
            };
            return res.status(404).json(data);
        }

        const data = {
            success: true,
            message: 'Admin deactivated successfully',
            data: admin
        };
        res.json(data);
    } catch (error) {
        const data = {
            success: false,
            message: 'Error deactivating admin',
            data: null
        };
        res.status(500).json(data);
    }
}

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    activateAdmin,
    deactivateAdmin,
};
