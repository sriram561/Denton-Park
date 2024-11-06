import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin } = useAuth(); 

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
