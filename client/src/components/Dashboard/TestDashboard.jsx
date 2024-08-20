import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CreateTest from '../TestData/CreateTest';
import AvailableTests from '../TestData/AvailableTest';

const TestDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="w-1/4 bg-gray-200 p-4">
        <ul>
          <li className="mb-4">
            <Link to="create-test" className="text-blue-600">Generate Test</Link>
          </li>
          <li className="mb-4">
            <Link to="available-tests" className="text-blue-600">Available Tests</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        <Routes>
          <Route path="create-test" element={<CreateTest />} />
          <Route path="available-tests" element={<AvailableTests />} />
        </Routes>
      </div>
    </div>
  );
};

export default TestDashboard;

