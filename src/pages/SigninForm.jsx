import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SigninForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {await axios.post('http://localhost:8080/api/auth/signin', { username, password })
        .then((response) => {
        // Serverantwort verarbeiten
        if (response.data.username) { // wenn login erfolgreich
        localStorage.setItem("user", JSON.stringify(response.data)); // JWT-Strin
        navigate('/Challenges');
        }
        else {
        console.error('Login fehlgeschlagen:', response.data);
        }
        });
        }
        catch (error) {
        console.error('Login fehlgeschlagen:', error);
        }
        };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Benutzername:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Passwort:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Anmelden</button>
        </form>
    );
}

export default SigninForm