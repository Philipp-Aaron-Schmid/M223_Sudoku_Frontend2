import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SudokuBoardDisplay from './SudokuBoardDisplay';
import SudokuBoardAdd from './SudokuBoardAdd';

function ChallengeManagementPage() {
    const [challenges, setChallenges] = useState([]);
    const [newChallenge, setNewChallenge] = useState({
        challangeTitle: '',
        challangeTime: '',
        challangeDisplay: false,
        challangeSet: ''
    });

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
        if (!token) {
            console.error('No access token found');
            return;
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "mode": "cors",
            }
        };

        try {
            const response = await axios.get('http://localhost:8080/manage/challenges', config);
            setChallenges(response.data);
        } catch (error) {
            console.error('Error fetching challenges:', error);
        }
    };

    const deleteChallenge = async (id) => {
        const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
        if (!token) {
            console.error('No access token found');
            return;
        }
    
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "mode": "cors",
            }
        };
    
        try {
            await axios.delete(`http://localhost:8080/manage/challenge/${id}`, config);
            // Refresh the list of challenges after deletion
            fetchChallenges();
        } catch (error) {
            console.error('Error deleting challenge:', error);
        }
    };
    

    const toggleChallengeDisplay = async (id) => {
        const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
        if (!token) {
            console.error('No access token found');
            return;
        }
    
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "mode": "cors",
            }
        };
    
        try {
            await axios.get(`http://localhost:8080/manage/challenge/${id}/toggle-display`, config);
            // Refresh the list of challenges after toggling
            fetchChallenges();
        } catch (error) {
            console.error('Error toggling challenge display status:', error);
        }
    };
    
    const handleInputChange = (e) => {
        setNewChallenge({ ...newChallenge, [e.target.name]: e.target.value });
    };

    const handleBoardUpdate = (boardString) => {
        setNewChallenge({ ...newChallenge, challangeSet: boardString });
    };

    const addChallenge = async () => {
        const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
        if (!token) {
            console.error('No access token found');
            return;
        }
    
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "mode": "cors",
            }
        };
    
        try {
            const challengeJsonString = JSON.stringify(newChallenge);
            const response = await axios.post('http://localhost:8080/manage/challange/add', challengeJsonString, config);
            console.log(response.data); // Or handle the response as needed
    
            // Optionally, clear the form and refresh the challenges list
            setNewChallenge({ challangeTitle: '', challangeTime: '', challangeDisplay: false, challangeSet: '' });
            fetchChallenges();
        } catch (error) {
            console.error('Error adding challenge:', error);
        }
    };
    

    return (
        <div className="challenge-management-container">
            {/* List of challenges */}
            <div className="challenges-list">
                {challenges.map(challenge => (
                    <div key={challenge.challangeId} className="challenge-item">
                        <span>{challenge.challangeTitle}</span>:&nbsp;
                        <span>{challenge.challangeTime} seconds</span>
                        <SudokuBoardDisplay challengeSet={challenge.challangeSet} />
    
                        {/* Toggle display button with conditional styling */}
                        <button 
                            onClick={() => toggleChallengeDisplay(challenge.challangeId)}
                            style={{ backgroundColor: challenge.challangeDisplay ? 'green' : 'grey' }}
                        >
                            Toggle Display
                        </button>
    
                        {/* Delete button */}
                        <button onClick={() => deleteChallenge(challenge.challangeId)}>Delete</button>
                    </div>
                ))}
            </div>
    
            {/* Form to add new challenge */}
            <div className="new-challenge-form">
                <input
                    type="text"
                    name="challangeTitle"
                    value={newChallenge.challangeTitle}
                    onChange={handleInputChange}
                    placeholder="Challenge Title"
                />
                <input
                    type="number"
                    name="challangeTime"
                    value={newChallenge.challangeTime}
                    onChange={handleInputChange}
                    placeholder="Challenge Time (seconds)"
                />
                <label>
                    Display:
                    <input
                        type="checkbox"
                        name="challangeDisplay"
                        checked={newChallenge.challangeDisplay}
                        onChange={(e) => setNewChallenge({ ...newChallenge, challangeDisplay: e.target.checked })}
                    />
                </label>
                <SudokuBoardAdd onUpdate={handleBoardUpdate} />
                <button onClick={addChallenge}>Add Challenge</button>
            </div>
        </div>
    );
    
    
}

export default ChallengeManagementPage;
