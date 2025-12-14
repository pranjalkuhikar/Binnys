import { Navigate } from "react-router-dom";
import { useProfileQuery } from "../services/admin";

const ProtectedRoute = ({ children }) => {
  const { isError, isLoading, isSuccess } = useProfileQuery();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <Navigate to="/admin/login" replace />;

  if (isSuccess) return children;

  return null; // Don't render anything while auth is being determined
};

export default ProtectedRoute;
