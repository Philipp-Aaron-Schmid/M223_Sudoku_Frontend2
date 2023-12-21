import React from 'react';
import { useLocation } from 'react-router-dom';




function ScorePage() {
    const location = useLocation();
    const { message } = location.state || {};

    return (
        <div>
            <h1>Score</h1>
            <p>{message}</p>
        </div>
    );
}

export default ScorePage;
