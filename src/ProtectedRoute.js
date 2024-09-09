import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {

  const token = localStorage.getItem('authToken');
  console.log('Token:', token); // Check if the token is being retrieved
  return !!token;
  
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
   
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
