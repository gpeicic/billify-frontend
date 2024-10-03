import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const bearer = localStorage.getItem('token');

console.log(bearer)
  return bearer ? Component : <Navigate to="/" />;
};

export default ProtectedRoute;
