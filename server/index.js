const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dontenv = require('dotenv')
const { register, login } = require('./controllers/authController');
const cors = require('cors');

app.use(cors()); 
app.use(express.json());
dontenv.config();

// Middleware
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
 mongoose.connect('mongodb+srv://jobslocal:SfNZT0uSusgXjuvb@cluster0.d0ech.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.log(err));

// Routes
app.get('/home', (req, res) => {
    res.send("Welcome To Server")
})

// Register user
app.post('/api/register', register);

//Login user
app.post('/api/login', login)
 

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
