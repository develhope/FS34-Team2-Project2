import { useAuth } from "./Context/authContext";
import { Navigate } from "react-router-dom";
export default function Privacy2({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : children;
}
