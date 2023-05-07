import React from 'react';
import { useAuth } from './AuthContext';
import LoginPage from '../pages/LoginPage/LoginPage';
import { Outlet } from "react-router-dom";

const PrivateRoute = (): JSX.Element | null => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <LoginPage/>;
};

export default PrivateRoute;