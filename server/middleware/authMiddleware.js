// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ msg: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'jwtSecret'); // Use the same secret used for signing
//     req.user = decoded; // Add user info to the request
//     next(); // Proceed to the next middleware/route
//   } catch (error) {
//     res.status(400).json({ msg: 'Invalid token.' });
//   }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.SECRET); // Replace 'jwtSecret' with the secret key from env
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware/route
  } catch (error) {
    // Check if the error is because the token has expired
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token expired. Please log in again.' });
    } 
    // Handle other token errors (e.g., malformed token)
    return res.status(400).json({ msg: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
