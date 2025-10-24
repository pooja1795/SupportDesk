import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Restore token from localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        if (token && email) setUser({ email, token });
    }, []);

    const login = (email, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        setUser({ email, token });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
