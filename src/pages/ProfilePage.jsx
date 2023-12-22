import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const ProfilePage = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        alias: 'Smith',
        password: '' // Password is initially empty
    });
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Retrieve user ID and access token from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser ? storedUser.id : null;
    const accessToken = storedUser ? storedUser.accessToken : null;

    useEffect(() => {
        if (!userId || !accessToken) {
            setErrorMessage('User not authenticated.');
            setIsLoading(false);
            return;
        }

        axios.get(`http://localhost:8080/user/${userId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setUser({ ...user, ...response.data, password: '' });
                setIsLoading(false);
            })
            .catch(error => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, [userId, accessToken]);

    const handleUpdate = () => {
        let updateData = { ...user };

        // If password field is empty, do not send it in the update
        if (!updateData.password) {
            delete updateData.password;
        }

        axios.put(`http://localhost:8080/user/${userId}`, updateData, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then(response => {
                alert('Profile updated successfully!');
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/user/${userId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then(response => {
                alert('Profile deleted successfully!');
                localStorage.removeItem("user");
                navigate('/'); // Redirect to public page
            })
            .catch(error => {
                setErrorMessage('Failed to delete profile: ' + error.message);
            });
    };

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <form className="profile-form">
                <div>
                    <label>Username:</label>
                    <input 
                        name="username"
                        value={user.username}
                        onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        name="email"
                        value={user.email}
                        onChange={handleChange} />
                </div>
                <div>
                    <label>Alias:</label>
                    <input 
                        name="alias"
                        value={user.alias}
                        onChange={handleChange} />
                </div>
                <div>
                    <label>Password (leave blank to keep current):</label>
                    <input 
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange} />
                </div>
                <button type="button" onClick={handleUpdate}>Update Profile</button>
                <button type="button" onClick={handleDelete}>Delete Profile</button>
            </form>
            {errorMessage && (
                <div className="error-message">Error: {errorMessage}</div>
            )}
        </div>
    );
};

export default ProfilePage;
