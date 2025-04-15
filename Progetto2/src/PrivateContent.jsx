import { useAuth } from "./Context/authContext";
import { Navigate } from "react-router-dom";
export default function Privacy({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
}
