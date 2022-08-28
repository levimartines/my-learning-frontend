import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TaskContextProvider from './store/tasks-context';
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute';
import ConfirmRegistrationComponent from './components/ConfirmRegistrationComponent/ConfirmRegistrationComponent';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import LoginComponent from './components/LoginComponent/LoginComponent';
import ProfileComponent from './components/ProfileComponent/ProfileComponent';
import SignupComponent from './components/SignupComponent/SignupComponent';
import TaskComponent from './components/TaskComponent/TaskComponent';
import TestComponent from './components/TestComponent/TestComponent';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticatedRoute element={<DashboardComponent/>}/>}/>
      <Route path="login" element={<LoginComponent/>}/>
      <Route path="signup" element={<SignupComponent/>}/>
      <Route path="confirm-registration" element={<ConfirmRegistrationComponent/>}/>
      <Route path="task"
             element={<AuthenticatedRoute element={<TaskContextProvider><TaskComponent/></TaskContextProvider>}/>}/>
      <Route path="test" element={<AuthenticatedRoute element={<TestComponent/>}/>}/>
      <Route path="profile" element={<AuthenticatedRoute element={<ProfileComponent/>}/>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}

export default AppRoutes;