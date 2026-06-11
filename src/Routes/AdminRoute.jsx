import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../shared/LoadingSpinner ";
import Forbitiene from "../shared/Forbitiene";

const AdminRoute = ({ children }) => {
  const { loding } = useAuth();
  const { role, roleLoding } = useRole();

  if (loding) {
    return <LoadingSpinner />;
  }

  if (roleLoding) {
    return <LoadingSpinner />;
  }

  if (role !== "admin") {
    return <Forbitiene />;
  }

  return children;
};

export default AdminRoute;
