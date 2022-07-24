import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/AuthComponents/LoginComponent/LoginComponent';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import SignupComponent from './components/AuthComponents/SignupComponent/SignupComponent';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
import TaskComponent from './components/TaskComponent/TaskComponent';
import TestComponent from './components/TestComponent/TestComponent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthenticatedRoute element={<DashboardComponent/>}/>}/>
        <Route path="login" element={<LoginComponent/>}/>
        <Route path="signup" element={<SignupComponent/>}/>
        <Route path="task" element={<TaskComponent/>}/>
        <Route path="test" element={<TestComponent/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  );
}

export default App;
