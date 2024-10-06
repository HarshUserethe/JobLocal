const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'jwtSecret'); // Use the same secret used for signing
    req.user = decoded; // Add user info to the request
    next(); // Proceed to the next middleware/route
  } catch (error) {
    res.status(400).json({ msg: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
