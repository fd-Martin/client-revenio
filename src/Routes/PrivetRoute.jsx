import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../shared/LoadingSpinner ";

const PrivetRoute = ({ children }) => {
  const { user, loding } = useAuth();
  const location = useLocation();

  if (loding) return <LoadingSpinner></LoadingSpinner>;
  if (!user) {
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivetRoute;
