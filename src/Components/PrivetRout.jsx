import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRout = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation(); // ✅ location আনতে হবে

    if (loading) {
        return (
            <div className="text-center mt-42">
                <span className="loading loading-spinner text-success"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/signIn" state={location?.pathname } replace />;
};

export default PrivetRout;
