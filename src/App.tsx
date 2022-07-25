import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/LoginComponent/LoginComponent';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import SignupComponent from './components/SignupComponent/SignupComponent';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
import TaskComponent from './components/ListTaskComponent/TaskComponent';
import TestComponent from './components/TestComponent/TestComponent';
import AuthenticationService from './services/AuthenticationService';

function App() {
  if (AuthenticationService.isUserLoggedIn()) {
    AuthenticationService.setupAxiosInterceptors();
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthenticatedRoute element={<DashboardComponent/>}/>}/>
        <Route path="login" element={<LoginComponent/>}/>
        <Route path="signup" element={<SignupComponent/>}/>
        <Route path="task" element={<AuthenticatedRoute element={<TaskComponent/>}/>}/>
        <Route path="test" element={<AuthenticatedRoute element={<TestComponent/>}/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  );
}

export default App;
