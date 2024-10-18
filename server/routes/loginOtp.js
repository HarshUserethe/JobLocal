const axios = require('axios');
const otpModel = require('../models/userotp');
const userModel = require('../models/users');


exports.loginOtp = async (req, res) => {

    
    try {
        
        const { phone } = req.body;
        let userPhone = await userModel.findOne({ phone });

        if (userPhone) {
        // Generate OTP
        const phoneOTP = Math.floor(1000 + Math.random() * 9000).toString();

        // Store OTP in MongoDB
        const otpRecord = new otpModel({
            phone,
            otp: phoneOTP
        });

        await otpRecord.save();

        // Prepare the API URL
        const url = `https://api.authkey.io/request?authkey=a08a0c97a5e962c8&mobile=${phone}&country_code=91&sid=8871&company=VanVihar&otp=${phoneOTP}`;

        // Send the OTP via the AuthKey API
        const response = await axios.get(url);

        // Handle the response from the API
        if (response.status === 200) {
            return res.status(200).json({
                message: "OTP sent successfully",
                otp: phoneOTP  // Consider not sending the OTP in the response for security reasons
            });
        } else {
            return res.status(response.status).json({
                message: "Failed to send OTP",
                error: response.data
            });
        }
        } else {
            return res.status(400).json({
                message: "User not found, Please register your account."
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }

}