import { createContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore token from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken) {
            setToken(savedToken);
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
        }

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.warn("Invalid user JSON", e);
            }
        }
        setLoading(false);
    }, []);

    const login = (data) => {
        const { token, user } = data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };


    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axiosClient.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
