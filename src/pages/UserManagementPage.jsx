import React, { useState, useEffect } from 'react';
import axios from 'axios';
/**
 * 
 * @returns 
 *  This protected page allows the Admin to manage users and is
 *  only acessible to users with the role admin, the infromatio is in the backend also secured trough validation of the bearer token
 */
const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Retrieve token from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser ? storedUser.accessToken : null;

    // Axios config with Authorization header
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "mode": "cors",
        }
    };

    useEffect(() => { //called to load page makes a request to return all users 
        if (token) {
            axios.get('http://localhost:8080/manage/users/all', config)
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    setErrorMessage('Error fetching users: ' + error.message);
                });
        } else {
            setErrorMessage('Authentication token not found.');
        }
    }, [token]);

    const handleDelete = (userId) => { //function called on button click to send axios request to the backend
        axios.delete(`http://localhost:8080/manage/users/${userId}`, config)
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => {
                setErrorMessage('Error deleting user: ' + error.message);
            });
    };

    const handleResetPassword = (userId) => { //activated upon resetPassword 
        axios.patch(`http://localhost:8080/manage/users/${userId}`, { password: 'Reset123' }, config) //hardcoded bad solution looking to get a specially secured backend call
            .then(() => {
                alert(`Password for user ${userId} reset successfully`);
            })
            .catch(error => {
                setErrorMessage('Error resetting password: ' + error.message);
            });
    };

    return (
        <div className="user-management-container">
            <div className="h1-container">
            <h1>User Management</h1></div>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <b>{user.username}</b> - {user.email}
                        <div>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                            <button onClick={() => handleResetPassword(user.id)}>Reset Password</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagementPage;

