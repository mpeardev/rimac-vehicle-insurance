import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const PrivateRouter = ({ children }) => {
  const { userRegistre } = useContext(UserContext);
  return userRegistre ? children : <Navigate to="/" />;
};
