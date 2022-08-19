import React from 'react';
import './App.css';
import AuthenticationService from './services/AuthenticationService';
import AppRoutes from './AppRoutes';

function App() {
  if (AuthenticationService.isUserLoggedIn()) {
    AuthenticationService.setupAxiosInterceptors();
  }
  return (
    <div className="App">
      <AppRoutes/>
    </div>
  );
}

export default App;
