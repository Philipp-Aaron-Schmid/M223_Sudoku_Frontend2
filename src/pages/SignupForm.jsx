import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/signup', { username, password, email })
                .then(message => {
                    alert("Sign up was a success");
                    navigate('/signin');
                })
                .catch(message => {
                    alert("Sign up failed")
                    setError("Fehler: " + message)
                });
        }
        catch (error) {
            console.error('Signup fehlgeschlagen:', error);
        }
    }

    return (
        <div className="form-container">
            <form className="form-box" onSubmit={handleSubmit}>
                <label>
                    Benutzername:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
        </div>
    );
}

export default SignupForm