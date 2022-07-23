import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/LoginComponent/LoginComponent';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import SignupComponent from './components/SignupComponent/SignupComponent';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';

function App() {
  return (
    <div className="App">
      <header>
      </header>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticatedRoute><DashboardComponent/></AuthenticatedRoute>}/>
          <Route path="login" element={<LoginComponent/>}/>
          <Route path="signup" element={<SignupComponent/>}/>
          <Route
            path="*"
            element={<Navigate to="/" replace/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
