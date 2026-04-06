import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import ErrorBoundary from "./ErrorBoundary";

function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;