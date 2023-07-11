const User = require('../models/User');
require('dotenv').config();


async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        const data = {
            success: true,
            message: 'ok',
            data: users
        }
        res.json(data);
    } catch (error) {
        const data = {
            success: false,
            message: 'Error retrieving users',
            data: []
        }
        res.status(500).json(data);
    }
}

async function getUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            const data = {
                success: false,
                message: 'User not found',
                data: null
            };
            return res.status(404).json(data);
        }

        const data = {
            success: true,
            message: 'OK',
            data: user
        };
        res.json(data);
    } catch (error) {
        const data = {
            success: false,
            message: 'Error retrieving user',
            error: error.message,
        };
        res.status(500).json(data);
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
    
        // Delete the user
        const user = await User.findByIdAndDelete(userId);
    
        if (!user) {
            const data = {
                success: false,
                message: 'User not found',
                data: null,
            };
            return res.status(404).json(data);
        }
    
        const data = {
            success: true,
            message: 'User deleted successfully',
            data: user,
        };
        res.json(data);
    } catch (error) {
        const data = {
            success: false,
            message: 'Error deleting user',
            data: null,
        };
        res.status(500).json(data);
    }
}

async function updateUser(req, res) {
    try {
        const { user_id, firstname, lastname, email, wallet, username, picture } = req.body;

        // Create the updates object
        const updates = {};
        if (firstname) updates.firstname = firstname;
        if (lastname) updates.lastname = lastname;
        if (email) updates.email = email;
        if (wallet) updates.wallet = wallet;
        if (username) updates.username = username;
        if (picture) updates.picture = picture;
  
        // Update the user
        const user = await User.findByIdAndUpdate(user_id, updates, { new: true });
    
        if (!user) {
            const data = {
                success: false,
                message: 'User not found',
                data: null,
            };
            return res.status(404).json(data);
        }
  
        const data = {
            success: true,
            message: 'User updated successfully',
            data: user,
        };
        res.json(data);
        
    } catch (error) {
        const data = {
            success: false,
            message: 'Error updating user',
            data: null,
        };
        res.status(500).json(data);
    }
}

const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, wallet, username, picture } = req.body;

        const existingUser = await User.findOne({ wallet: wallet });
        if (existingUser) {
            return res.status(409).json({
                success: true,
                message: 'User with wallet already exists',
                data: existingUser
            });
        }

        const newUser = new User({
            firstname,
            lastname,
            email,
            wallet,
            username,
            picture,
        });
  
        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User saved successfully',
            data: savedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error: Failed to create user',
            error: error.message
        });
    }
};
  
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    createUser,
};
