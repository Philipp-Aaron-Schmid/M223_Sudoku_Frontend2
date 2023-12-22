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
        <div className='wide-content'>
            <h1>Avaliable Challenges</h1>
            <div className='column-content'>
                {data.map(challenge => (
                    <div key={challenge.challangeId} className="challenge-box">
                        <div className='constant-box'>
                            <h2>{challenge.challangeTitle}</h2>
                            <p>Time: {challenge.challangeTime} seconds</p>
                        </div>
                        <div className='center-button'>
                            <Link to={`/playChallenge/${challenge.challangeId}`}>
                                <button>Play</button>
                            </Link>
                        </div>
                    </div>
                ))}
                {error && (
                    <div className="error">
                        {error.message}
                    </div>
                )}
            </div></div>
    );
}

export default ChallengePage;
