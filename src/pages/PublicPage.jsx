import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Public.css'
/**
 * 
 * @returns 
 * This is the landing page of the application loads by default, interestingly it loads data from the backend that requires no special permission 
 * as such it immediately test if the connection to the backend is there at all which can be usefull to find root causes of authorization issues
 */
function PublicPage() {
    const [data, setData] = useState([]); 
const [error, setError] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8080/index/index')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                setError("Fehler beim Abruf der Daten: " + error)
            });
    }, []); 
    return (
        <div className='wide-content'>
            <h1>Competitive Sudoku</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li> 
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