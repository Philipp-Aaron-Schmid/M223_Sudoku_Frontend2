import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 
 * Simples page mearly shows the score of the Sudoku play after it has been calculated
 * 
 */


function ScorePage() {
    const location = useLocation();
    const { message } = location.state || {};

    return (
        <div>
            <h1>Score</h1>
            <div className="message-box">
                <p>{message}</p>
            </div>
        </div>
    );
}

export default ScorePage;
