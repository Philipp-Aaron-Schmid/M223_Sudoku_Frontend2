import React, { useEffect, useState } from 'react';
import axios from 'axios';
function PrivatePage() {
    const [data, setData] = useState([]); // Hier werden die Daten gespeichert
    const [error, setError] = useState();
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user")).accessToken; // Token lesen
        axios.get("http://localhost:8080/play/message",
            {
                headers:
                {
                    "Authorization": `Bearer ${token}`, // hier wird der Token übergeben
                    "mode": "cors",
                }
            })
            .then((response) => {
                setData(response.data) // hier wird die Server-Rückgabe für React gespeichert
            })
            .catch((error) => {
                console.error(error);
                setError(error)  // Fehlerbehandlung
            });
    })
    return (
        <div>
            <h1>Private Seite</h1>
            <ul>
                {data}
            </ul>
            {error &&
                <div className="error">
                    {error} // dient der Fehleranzeige
                </div>
            }
        </div>
    );
}

export default PrivatePage