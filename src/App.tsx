import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/AuthComponents/LoginComponent/LoginComponent';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import SignupComponent from './components/AuthComponents/SignupComponent/SignupComponent';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticatedRoute element={<DashboardComponent/>}/>}/>
          <Route path="login" element={<LoginComponent/>}/>
          <Route path="signup" element={<SignupComponent/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
