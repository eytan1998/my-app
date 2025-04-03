import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useAuth();

  if (!authContext || !authContext.currentUser) {
    return (<Navigate to="/login" />);
  }

  return <>{children}</>;
};

export default PrivateRoute;