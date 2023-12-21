import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ChallengePage() {
    const [data, setData] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
        const userId = JSON.parse(localStorage.getItem("user")).id;

        axios.get("http://localhost:8080/challenges/byUser", {
            params: {
                userId: userId
            },
            headers: {
                "Authorization": `Bearer ${token}`,
                "mode": "cors",
            },
        })
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error(error);
            setError(error);
        });
    }, []);

    return (
        <div>
            <h1>Private Seite</h1>
            {data.map(challenge => (
                <div key={challenge.challangeId} className="challenge-box">
                    <h2>{challenge.challangeTitle}</h2>
                    <p>Time: {challenge.challangeTime} seconds</p>
                    <Link to={`/playChallenge/${challenge.challangeId}`}>
                        <button>Play Challenge</button>
                    </Link>
                </div>
            ))}
            {error && (
                <div className="error">
                    {error.message}
                </div>
            )}
        </div>
    );
}

export default ChallengePage;
