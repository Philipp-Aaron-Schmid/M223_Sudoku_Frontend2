import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
//the auth provider keeps out unauthorized users from frontend calls they have no acess to based on role so that users can not just manually call these pages.
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
