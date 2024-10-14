const userModel = require('../models/users');
require('dotenv').config();

exports.verificationLink = async (req, res) => {
    try {
        const { userid } = req.params;

        // Find the user by ID and update the emailVerified field
        const user = await userModel.findByIdAndUpdate(
            userid,
            { emailVerified: true },  // Set emailVerified to true
            { new: true }  // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.redirect(`http://localhost:5173/#profile/${userid}`);
        // res.json({ message: 'Email verified successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}