import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

import AssignTaskPage from './components/AssignTask'; 
import AssignedTasksPage from './components/AssignedTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} /> 
        <Route path="/assign-task" element={<AssignTaskPage />} />
        <Route path="/view-tasks" element={<AssignedTasksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
