const mongoose = require('mongoose');

// Define the OTP schema
const otpSchema = mongoose.Schema({
    phone: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }  // OTP expires in 5 minutes (300 seconds)
});

// Create the OTP model
module.exports = mongoose.model('otp', otpSchema);
