import { useAppSelector } from "../redux/hook";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  inverted: boolean;
  children: React.ReactNode;
  requiredRoles?: string[];
}

const PrivateRoute = ({
  inverted,
  children,
  requiredRoles,
}: PrivateRouteProps) => {
  const access_token = localStorage.getItem("access_token");
  const isAuth = access_token ? true : false;
  const { role: currentRole } = useAppSelector((state) => state.role);

  if (inverted) {
    return isAuth ? <Navigate to="/dashboard" /> : children;
  }
  if (currentRole.role && !requiredRoles?.some((r) => currentRole.role === r)) {
    <></>;
  }
  return isAuth ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
