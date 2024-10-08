import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  
  const token = localStorage.getItem('token'); // Check for the JWT token
  // If token is not present, redirect to the login page
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
