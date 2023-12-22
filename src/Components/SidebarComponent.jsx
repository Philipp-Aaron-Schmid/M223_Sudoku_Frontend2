import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Components/AuthContext';

const SidebarComponent = () => {
    const { user, logout } = useContext(AuthContext);
    const isLoggedIn = !!user && !!user.accessToken;
    const isAdmin = isLoggedIn && user.roles && user.roles.includes("ROLE_ADMIN");

    return (
        <div className="sidebar">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active-nav-link' : ''}>Home</NavLink>
            {!isLoggedIn && (
                <>
                    <NavLink to="/Signin" className={({ isActive }) => isActive ? 'active-nav-link' : ''}>Sign In</NavLink>
                    <NavLink to="/Signup" className={({ isActive }) => isActive ? 'active-nav-link' : ''}>Sign Up</NavLink>
                </>
            )}
            {isLoggedIn && (
                <>
                    <NavLink to="/challenges" className={({ isActive }) => isActive ? 'active-nav-link' : ''}>Challenges</NavLink>
                    <NavLink to="/TopScores" className={({ isActive }) => isActive ? 'active-nav-link' : ''}>Scores</NavLink>
                    <NavLink to="/Profile" className={({ isActive }) => isActive ? 'active-nav-link' : ''}>Profile</NavLink>
                    {isAdmin && (
                        <>
                            <NavLink to="/ManageChallenge" className={({ isActive }) => isActive ? 'active-nav-link' : ''}>Manage Challenges</NavLink>
                            <NavLink to="/ManageUser" className={({ isActive }) => isActive ? 'active-nav-link' : ''}>Manage Users</NavLink>
                        </>
                    )}
                    {isLoggedIn && (
                        <div className="logout-button">
                            <button onClick={logout}>Log Out</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SidebarComponent;

