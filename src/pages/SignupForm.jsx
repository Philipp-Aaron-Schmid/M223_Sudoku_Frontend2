import React, { useState } from 'react';
import axios from 'axios';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/signup', { username, password, email })
                .then(response => {
                    setData(response.data); // Speichert die Daten aus der Antwort
                })
                .catch(error => {
                    setError("Fehler: " + error)
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