import { Navigate } from 'react-router-dom';
import React from 'react';
import AuthenticationService from '../../services/AuthenticationService';

function AuthenticatedRoute({ element }: { element: JSX.Element }) {
  const isAuthenticated = AuthenticationService.isUserLoggedIn();
  return isAuthenticated ? element : <Navigate to="/login" replace/>;
}

export default AuthenticatedRoute;