const userModel = require('../models/users');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the transporter (this example uses Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to another email service provider
  auth: {
    user: 'useretheharsh2211@gmail.com', // Replace with your email
    pass: 'pjvt able qlsm qacz', // Replace with your email password or app password
  },
});

exports.sentVerificationMail = async (req, res) => {
  // Extract the recipient's email, subject, and message from the request body
  const { userid } = req.params;
  const user = await userModel.findById(userid);
  const userEmail = await user.email;

  const mailOptions = {
    from: 'useretheharsh2211@gmail.com', 
    to: userEmail,                      
    subject: 'Email Verification',
    html: `
        <h1>Email Verification</h1>
        <p>Click the button below to verify your email address:</p>
        <a href="http://localhost:5000/verify/email/${userid}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
            Verify Email
        </a>
        <p>If you did not request this, please ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({message: "Email sent successfully"})
  } catch (error) {
    console.error('Error sending email: ', error);
    res.status(500).send("Error sending email");
  }
};
