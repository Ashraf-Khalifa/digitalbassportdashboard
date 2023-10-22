// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem("token");
  
    if (!isAuthenticated) {
      console.log("Redirecting to login page"); // Add this log message
      return <Navigate to="/" state={{ from: location }} />;
    }
  
    return <Outlet />;
  }
  

export default ProtectedRoute;
