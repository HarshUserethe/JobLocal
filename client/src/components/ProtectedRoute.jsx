import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Get token from localStorage

  // Check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true; // No token, treat as expired

    try {
      const decoded = jwtDecode(token); // Decode the token
      const currentTime = Date.now() / 1000; // Get current time in seconds
      return decoded.exp < currentTime; // Compare token expiration with current time
    } catch (error) {
      return true; // If token is invalid or can't be decoded, treat it as expired
    }
  };

  // If the token is expired, remove it from localStorage and redirect to login
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token'); // Remove expired token
    return (
      <>
        <Navigate to="/" 
          state={{ message: 'Session expired. Please log in again.' }}
        />;
        
      </>
    ) // Redirect to login page
  }

  // If the token is valid, render the protected children components
  return children;
};

export default ProtectedRoute;
