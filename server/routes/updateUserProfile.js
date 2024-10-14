const userModel = require('../models/users');
require('dotenv').config();

exports.updateUserProfile = async (req, res) => {
    const { userid } = req.params;  // Destructure userid from req.params
    const updates = req.body;  // The updated data sent in the request body

    try {
        // Find the user by ID and update their profile
        const userUpdate = await userModel.findOneAndUpdate(
            { _id: userid }, // Filter by user ID
            updates,         // The update data
            { new: true }    // Option to return the updated user
        );

        if (!userUpdate) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send success response with updated user details
        res.status(200).json({
            message: "User profile updated successfully",
            user: userUpdate
        });

    } catch (error) {
        // Handle errors properly
        res.status(500).json({
            message: "An error occurred while updating the profile",
            error: error.message
        });
    }
};
