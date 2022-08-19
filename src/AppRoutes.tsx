import { Navigate, Route, Routes } from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import LoginComponent from './components/LoginComponent/LoginComponent';
import SignupComponent from './components/SignupComponent/SignupComponent';
import TaskContextProvider from './store/tasks-context';
import TaskComponent from './components/TaskComponent/TaskComponent';
import TestComponent from './components/TestComponent/TestComponent';
import React from 'react';
import ProfileComponent from './components/ProfileComponent/ProfileComponent';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticatedRoute element={<DashboardComponent/>}/>}/>
      <Route path="login" element={<LoginComponent/>}/>
      <Route path="signup" element={<SignupComponent/>}/>
      <Route path="task"
             element={<AuthenticatedRoute element={<TaskContextProvider><TaskComponent/></TaskContextProvider>}/>}/>
      <Route path="test" element={<AuthenticatedRoute element={<TestComponent/>}/>}/>
      <Route path="profile" element={<AuthenticatedRoute element={<ProfileComponent/>}/>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}

export default AppRoutes;