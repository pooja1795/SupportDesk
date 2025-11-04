import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = ({ children }) => {
    const {  token, loading  } = useAuth();
    if (loading) {
        // Wait for auth context to load before deciding redirect
        return <div className="text-center mt-10">Loading...</div>;
    }
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
