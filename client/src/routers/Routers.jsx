import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import TestDashboard from "../components/Dashboard/TestDashboard";
import UserDashboard from "../components/Dashboard/UserDashboard";
import Questions from "../components/User/Questions";


// ProtectedRoute Component
const ProtectedRoute = ({ children, role, isLoggedIn, userRole }) => {
  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }
  if (role && role !== userRole) {
    return <Navigate to="/home" />;
  }
  return children;
};

const Routers = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      {/* Protected Route for Admin */}
      <Route
        path="/test-dashboard/*"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role="ADMIN" userRole={user?.role}>
            <TestDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Route for User */}
      <Route
        path="/user-dashboard/*"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role="USER" userRole={user?.role}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Route for Question component */}
      <Route
        path="/user-dashboard/question/:testId"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} role="USER" userRole={user?.role}>
            <Questions />
          </ProtectedRoute>
        }
      />

      {/* Redirect any undefined route to Home */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Routers;
