import { Navigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";

const AutoRedirectDashboard = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <div>Loading...</div>;

  if (!role) return <div>Loading...</div>;

  if (role === "admin") return <Navigate to="/deshbord/admin" replace />;
  if (role === "librarian") return <Navigate to="/deshbord/libraian" replace />;
  if (role === "user") return <Navigate to="/deshbord/user" replace />;

  return <div>Loading...</div>;
};

export default AutoRedirectDashboard;
