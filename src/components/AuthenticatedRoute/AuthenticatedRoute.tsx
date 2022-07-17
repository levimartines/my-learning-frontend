import { Navigate, Route } from 'react-router-dom';
import React from 'react';
import AuthenticationService from '../../services/AuthenticationService';

interface IProps {
  path: string;
  element: any;
}

function AuthenticatedRoute({ path, element }: IProps) {
  if (AuthenticationService.isUserLoggedIn()) {
    return <Route path={path} element={element}/>;
  }
  return <Navigate to="/login" replace/>;
}

export default AuthenticatedRoute;