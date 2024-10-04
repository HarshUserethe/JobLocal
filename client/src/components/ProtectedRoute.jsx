// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../appWrite/isAuthenticated';

const ProtectedRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isAuthenticated();
      setIsLoggedIn(loggedIn);
      setLoading(false);
    };

    checkAuth();
  }, [isLoggedIn]);

  if (loading) return <div>Loading...</div>;
  if(!isLoggedIn){
    navigate('/')
    console.log("User Not LoggedIn")
  }

  // return isLoggedIn ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
