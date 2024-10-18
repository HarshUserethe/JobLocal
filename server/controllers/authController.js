const userModel = require('../models/users');
const nodemailer = require('nodemailer');
const otpModel = require('../models/userotp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
 

// Register user
exports.register = async (req, res) => {

  try {
     const { fullname, phone, email, password, otp } = req.body;

     //checking input fields
     if(!fullname || !email || !phone || !password || !otp){
       return res.status(400).json({success:false,message:"All fileds are required"})
     }
    // Check if user exists
    let user = await userModel.findOne({ email });
    let userPhone = await userModel.findOne({ phone });
    if (user || userPhone) return res.status(400).json({ msg: 'User already exists', err:"The email address or phone number you entered is already in use. Please try another or log in to your existing account." });

    const hashpassword = await bcrypt.hashSync(password, 10);

    // const userid = uuidv4();
   
    //User current ip ---->
    var userip = '';
    const fetchData = await fetch('https://api.ipify.org?format=json');
    const dataRes = await fetchData.json();
    userip = await dataRes.ip;

   //otp verification proccess
   const storedOtpEntry = await otpModel.findOne({ phone });
   if (!storedOtpEntry) {
     return res.status(400).json({ success: false, message: "OTP not found. Please request a new OTP." });
   }

   // Check if the entered OTP matches the stored OTP
   if (storedOtpEntry.otp !== otp) {
     return res.status(400).json({ success: false, message: "Invalid OTP" });
   }
   
 
      user = new userModel({userip, fullname, email, phone, hashpassword});

      // Save user
      await user.save();
      
      // Generate JWT token
        const payload = {
          id: user._id,
          phone: user.phone
        };
      
      // Generate JWT token
      jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      
      // Respond with success and user ID along with the token
      res.status(200).json({
        status: "Successfully Registered",
        token, // include the token here
        user: {
            userid: user._id,
        }
      });
      });



  } catch (err) {
    console.log(err)
    return res.status(400).json({success:false,message:"Internal server error"});
  }
};


exports.login = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findOne({ phone: phone });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'Login failed',
        err: "Sorry, we couldn't find a matching account. Please check your details and try again",
      });
    }

    // Generate JWT token
    const payload = {
      user: { id: user.id }
    };

    jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
  
      // If the user is found, send the user object along with the token
      return res.status(200).json({ 
          success: true, 
          message: "Login successful", 
          token, // include the token here
          user 
      });
  });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
