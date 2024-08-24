import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const useAuth = () => {
  return { user: { role: 'admin' } }; 
};

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
