import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ProtectedRoute() {
    const { user, loading } = useAuth();
    const isAuthenticated = !!user?.id;
    console.log("USER:", user);
    console.log("LOADING:", loading);
    if (loading) {
        return (
            <div style={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center"
            }}>
                Loading...
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;