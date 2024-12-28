import React from 'react';
import { Navigate } from 'react-router-dom';

// Dummy function to check if user is authenticated
// Replace with your actual authentication logic
const isAuthenticated = () => {
  // Example: Check if user token exists in localStorage
  return localStorage.getItem('authToken') !== null;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
