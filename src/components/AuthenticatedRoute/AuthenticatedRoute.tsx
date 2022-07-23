import { Navigate } from 'react-router-dom';
import React from 'react';
import AuthenticationService from '../../services/AuthenticationService';

function AuthenticatedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = AuthenticationService.isUserLoggedIn();
  return isAuthenticated ? children : <Navigate to="/login" replace/>;
}

export default AuthenticatedRoute;