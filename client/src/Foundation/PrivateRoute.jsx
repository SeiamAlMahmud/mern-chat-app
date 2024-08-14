import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'


const PrivateRoute = ({ children }) => {
  const location = useLocation()

  const token =  localStorage.getItem("chat-user")
  if (!token) {
    // Save the current location to redirect after login
    const from = location.pathname;
    return <Navigate to={`/login?from=${encodeURIComponent(from)}`} replace />;
  }

  return children;

}

export default PrivateRoute