import React from 'react';
import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import Profile from '../User/Profile';
import SubmittedTest from '../TestData/SubmittedTest';
import 'boxicons';
import TestList from '../User/TestList';

const UserDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <nav className="bg-slate-800 p-4 w-full md:w-1/4">
        <ul>
          <li className="mb-4">
            <NavLink 
              to="profile" 
              className={({ isActive }) => `flex items-center text-white ${isActive ? 'font-bold' : ''}`} 
              aria-label="Profile"
            >
              <i className='bx bx-user mr-2'></i>
              Profile
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink 
              to="tests" 
              className={({ isActive }) => `flex items-center text-white ${isActive ? 'font-bold' : ''}`} 
              aria-label="Tests"
            >
              <i className='bx bx-list-ul mr-2'></i>
              Tests
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink 
              to="submitted-test" 
              className={({ isActive }) => `flex items-center text-white ${isActive ? 'font-bold' : ''}`} 
              aria-label="Submitted Tests"
            >
              <i className='bx bx-check-circle mr-2'></i>
              Submitted Tests
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="w-full md:w-3/4 p-4">
        <Routes>
          <Route path="/" element={<Navigate to="profile" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tests" element={<TestList />} />
          <Route path="submitted-test" element={<SubmittedTest />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
