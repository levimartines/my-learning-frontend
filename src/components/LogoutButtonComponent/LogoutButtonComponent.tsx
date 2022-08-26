import { Button } from 'react-bootstrap';
import React from 'react';
import AuthenticationService from '../../services/AuthenticationService';
import { useNavigate } from 'react-router-dom';

const LogoutButtonComponent = () => {
  const navigate = useNavigate();

  function logout() {
    AuthenticationService.deleteTokens();
    navigate('/login');
  }

  return (
    <div className="mb-4">
      <Button variant="primary" type="button" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutButtonComponent;