import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, user, redirect = "/" }) => {
  const doThings = () => {
    alert("Please login first");
  };
  if (!user)
    return (
      <>
        <Navigate to={redirect} />
        {doThings()}
      </>
    );
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
