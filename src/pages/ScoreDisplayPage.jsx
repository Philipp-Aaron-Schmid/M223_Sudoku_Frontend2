import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ScoreDisplayPage() {
    const [userScores, setUserScores] = useState([]);
    const [topScores, setTopScores] = useState([]);
    const [selectedScore, setSelectedScore] = useState(null);

    const handleRowClick = (score) => {
        if (selectedScore && selectedScore.id === score.id) {
            setSelectedScore(null); // Deselect if the same row is clicked again
        } else {
            setSelectedScore(score); // Select the clicked row
        }
    };

    useEffect(() => {
        fetchUserScores();
        fetchTopScores();
    }, []);

    const fetchUserScores = async () => {
        const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
        const userId = JSON.parse(localStorage.getItem("user")).id;
        if (!token) {
            console.error('No access token found');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/score/${userId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            // Sorting the scores by ID in descending order and getting the top 10
            const sortedScores = response.data.sort((a, b) => b.id - a.id).slice(0, 10);
            setUserScores(sortedScores);
        } catch (error) {
            console.error('Error fetching user scores:', error);
        }
    };

    const fetchTopScores = async () => {

        const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
        if (!token) {
            console.error('No access token found');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/score/top10', {
                headers: { "Authorization": `Bearer ${token}` }
            });
            setTopScores(response.data);
        } catch (error) {
            console.error('Error fetching top scores:', error);
        }
    };



    // Function to create placeholder rows if there are less than 10 scores
    const fillPlaceholderRows = (scores) => {
        const placeholders = [];
        for (let i = scores.length; i < 10; i++) {
            placeholders.push({
                rank: i + 1,
                score: '',
                playerAlias: '',
                challengeTitle: ''
            });
        }
        return placeholders;
    };

    const SudokuBoardScores = ({ playSet, playsScoreSet }) => {
        const renderCell = (index) => {
            const value = playSet[index];
            const color = playsScoreSet[index] === '1' ? 'black' : playsScoreSet[index] === '2' ? '#0056b3' : 'lightgrey';

            return (
                <div key={index} style={{ color }} className="sudoku-cell-scores">
                    {value !== '0' ? value : ''}
                </div>
            );
        };

        return (
            <div className="sudoku-board-scores">
                {Array.from({ length: 81 }).map((_, index) => renderCell(index))}
            </div>
        );
    };



    return (

        <div className="scores-container">
            <div className="h1-container">
                <h1>Scores</h1>
            </div>
            <div className="sudoku-placeholder">
                {selectedScore ? (
                    <SudokuBoardScores
                        playSet={selectedScore.playSet}
                        playsScoreSet={selectedScore.playsScoreSet}
                    />
                ) : (
                    <div className="sudoku-placeholder-content">
                    </div>
                )}
            </div>
            <div className="user-scores">
                <h2>Own Scores</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Recent</th>
                            <th>Score</th>
                            <th>Challenge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userScores.map((score, index) => (
                            <tr key={score.id} onClick={() => handleRowClick(score)}>
                                <td>{index + 1}</td>
                                <td>{score.score}</td>
                                <td>{score.challengeTitle}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="top-scores">
                <h2>Top 10 Scores</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Score</th>
                            <th>Player</th>
                            <th>Challenge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topScores.map((score, index) => (
                            <tr key={score.id}>
                                <td>{index + 1}</td>
                                <td>{score.score}</td>
                                <td>{score.playerAlias || 'John Smith'}</td>
                                <td>{score.challengeTitle}</td>
                            </tr>
                        ))}
                        {fillPlaceholderRows(topScores).map((placeholder, index) => (
                            <tr key={`placeholder-${index}`}>
                                <td>{placeholder.rank}</td>
                                <td>{placeholder.score}</td>
                                <td>{placeholder.playerAlias}</td>
                                <td>{placeholder.challengeTitle}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ScoreDisplayPage;
