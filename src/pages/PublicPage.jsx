import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Public.css'

function PublicPage() {
    const [data, setData] = useState([]); // Hier werden die Daten gespeichert 
const [error, setError] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8080/index/index')
            .then(response => {
                setData(response.data); // Speichert die Daten aus der Antwort
            })
            .catch(error => {
                setError("Fehler beim Abruf der Daten: " + error)
            });
    }, []); // Die leere Array-Dependency sorgt dafür, dass dies nur beim ersten Render passi
    return (
        <div className='wide-content'>
            <h1>Competitive Sudoku</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li> // Zeigt jeden String in einem Listenpunkt an
                ))}
            </ul>
            {error &&
                <div className="error">
                    {error} // dient der Fehleranzeige
                </div>
            }
        </div>
    );
}

export default PublicPage