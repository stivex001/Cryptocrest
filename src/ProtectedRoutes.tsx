import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

const ProtectedRoutes = () => {
	// TODO: Use authentication token
	const localStorageToken = localStorage.getItem("token");

	return localStorageToken ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoutes;
