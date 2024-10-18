const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dontenv = require('dotenv')
const { register, login } = require('./controllers/authController');
const cors = require('cors');
const bodyParser = require("body-parser");
const { updateUserProfile } = require('./routes/updateUserProfile');
const { getUserData } = require('./routes/getUser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sentVerificationMail } = require('./routes/sentVerificationMail');
const { verificationLink } = require('./routes/verificationLink');
const { checkImage } = require('./routes/checkImage');
const { sentOtp } = require('./routes/sentOtp');
const { loginOtp } = require('./routes/loginOtp');


app.use(express.json());


app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();

//middleware function
// Connect to MongoDB
 mongoose.connect(process.env.MONGODB_URI)
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.log(err));

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'resume/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const userId = req.params.userid;
    cb(null, `${userId}${file.originalname}`); // Ensure unique file names
  }
});

const storageProfile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'profile/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const userId = req.params.userid;
    const ext = path.extname(file.originalname);
    cb(null, `${userId}${ext}`); // Ensure unique file names
  }
});

// Multer upload middleware
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit to 2MB
});

const uploadProfile = multer({ 
  storage: storageProfile,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit to 2MB
});

app.post('/upload/:userid', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  
  res.send({ message: 'File uploaded successfully', filePath: req.file.path });
});

app.post('/upload/profile/picture/:userid', uploadProfile.single('profile'), (req, res) => {
  if(!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ message: 'File uploaded successfully', filePath: req.file.path });
})


app.use('/resume', express.static(path.join(__dirname, 'resume')));
app.use('/profile', express.static(path.join(__dirname, 'profile')));
// Routes
app.get('/home', (req, res) => {
    res.send("Welcome To Server")
})

// Register user
app.post('/api/register', register);

//Login user
app.post('/api/login', login);

//Update user profile
app.post('/profile/update/:userid', updateUserProfile);

//Get user data
app.get('/get/userdata/:userid', getUserData);

//sent verification mail to user
app.get('/sent/:userid', sentVerificationMail)

//route to verify email
app.get('/verify/email/:userid', verificationLink) 

app.post('/check/image/:userid', checkImage)

app.post('/sendotp', sentOtp)

app.post('/login/sentotp', loginOtp)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
