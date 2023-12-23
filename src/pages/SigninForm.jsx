import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Components/AuthContext';
/**
 * 
 * @returns 
 * To Do:
 *  Solve the problems with not recieving the error or sucess messages form the backend propperly
 */
function SigninForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/signin', { username, password }) 
                .then((response) => {
                    
                    if (response.data.username) { 
                        localStorage.setItem("user", JSON.stringify(response.data)); 
                        login(response.data);
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

export default SigninForm