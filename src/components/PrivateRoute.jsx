import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { userEmail } = useAuth();

  return userEmail ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
