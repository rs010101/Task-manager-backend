import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
  // Check for the authorization header
  const token = req.headers.authorization?.split(' ')[1];
  
  // If no token is provided, return a 403 Forbidden response
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If the token is invalid, return a 401 Unauthorized response
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    // Attach the decoded user information to the request object
    req.user = decoded; 
    next(); // Proceed to the next middleware or route handler
  });
};