// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../appWrite/isAuthenticated';

const ProtectedRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isAuthenticated();
      setIsLoggedIn(loggedIn);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isLoggedIn ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
