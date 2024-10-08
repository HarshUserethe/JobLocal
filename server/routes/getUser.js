const userModel = require('../models/users');
require('dotenv').config();

exports.getUserData = async (req, res) => {
    const { userid } = req.params;
    try {
        const user = await userModel.findById(userid);

    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}