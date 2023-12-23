import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Components/AuthContext';

//this page redirects users that are trying to access data they are not privilaged to by utaliting the auth context component
const ProtectedRoute = ({ children, roles }) => {
    const { user } = useContext(AuthContext);
    const isLoggedIn = user?.accessToken;
    const hasRequiredRole = roles ? roles.some(role => user?.roles?.includes(role)) : true;

    if (!isLoggedIn || !hasRequiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute