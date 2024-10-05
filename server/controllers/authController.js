const userModel = require('../models/users');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


// Register user
exports.register = async (req, res) => {

  try {
    const { fullname, phone, email, password } = req.body;

     if(!fullname || !email || !phone || !password){
       return res.status(400).json({success:false,message:"All fileds are required"})
     }
    // Check if user exists
    let user = await userModel.findOne({ email });
    let userPhone = await userModel.findOne({ phone });
    if (user || userPhone) return res.status(400).json({ msg: 'User already exists', err:"The email address or phone number you entered is already in use. Please try another or log in to your existing account." });

    const hashpassword = await bcrypt.hashSync(password, 10);
    // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const userid = uuidv4();
   
    //User current ip ---->
    var userip = '';
    const fetchData = await fetch('https://api.ipify.org?format=json');
    const dataRes = await fetchData.json();
    userip = await dataRes.ip;

    //Phone OTP Generation ----->
    const phoneOTP = Math.floor(1000 + Math.random() * 9000).toString();

    user = new userModel({ userid, userip, fullname, email, phone, hashpassword });

    // Save user
    await user.save();

   // Respond with success and user ID
   res.status(200).json({
    status: "Successfully Registered",
    user: {
      userid: user.userid,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
    }
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

    // If the user is found, send the user object (or specific details you want to expose)
    return res.status(200).json({ success: true, message: "Login successful", user });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
