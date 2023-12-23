import React, { useEffect, useState, useRef } from 'react'; // Import useRef here
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SudokuBoard from './SudokuBoard';

/** 
 * This page handles the timer and submission logic as well as calling the SudokuBoard component to play on. 
 * The axios get request loads a challange string from the challangess backend entity
 * 
 * It also handles the submit logic which sends the newly created sudoku string to the backend and calls the score page
 * 
 * Todo:
 * Eliminate Known Bug on Reloading the page tha data is 
 * lost and a faulty API request is sent to the backend 
 * */
function PlayChallengePage() {
    const { challengeId } = useParams();
    const navigate = useNavigate();
    const [challengeData, setChallengeData] = useState({});
    const [sudokuData, setSudokuData] = useState('');
    const [error, setError] = useState();
    const [timer, setTimer] = useState(0); // Define timer state
    const timerRef = useRef(null); // Define timerRef
    const [isPageLoaded, setIsPageLoaded] = useState(false);


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
        const userId = JSON.parse(localStorage.getItem("user")).id;

        axios.get(`http://localhost:8080/play/load?userId=${userId}&challengeId=${challengeId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "mode": "cors",
            },
        })
            .then((response) => {
                setChallengeData(response.data);
                // Start the timer only if it's a valid challenge time and the timer isn't already running
                if (response.data.challengeTime > 0 && !timerRef.current) {
                    setTimer(response.data.challengeTime);
                }
                setIsPageLoaded(true);
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });
        const savedState = localStorage.getItem('sudokuChallengeState');
        if (savedState) {
            const { remainingTime, sudokuState } = JSON.parse(savedState);
            setSudokuData(sudokuState);
            setTimer(remainingTime);

            if (remainingTime <= 0) {
                handleSubmit(0); // Automatically submit if time ran out
            }
        }
    }, [challengeId]);


    useEffect(() => {
        if (timer > 0 && !timerRef.current) {
            timerRef.current = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && isPageLoaded) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            handleSubmit(0); // Call handleSubmit only if the page is fully loaded
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [timer, isPageLoaded]);

    useEffect(() => {
        // Save the current state and time to local storage
        const challengeState = {
            remainingTime: timer,
            sudokuState: sudokuData
        };
        localStorage.setItem('sudokuChallengeState', JSON.stringify(challengeState));
        // Timer effect as before
    }, [timer, sudokuData]);

    const handleSubmit = (currentTimer) => {
        const playTime = challengeData.challengeTime - currentTimer;
        const filledSudokuData = sudokuData.split('').map(cell => cell === '' ? '' : cell).join('');
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.accessToken) {
            setError("Authentication token not found");
            return;
        }
        axios.post('http://localhost:8080/play/submit', {
            playId: challengeData.playId,
            playSet: filledSudokuData,
            playTime: playTime // or however you calculate playTime
        }, {
            headers: {
                "Authorization": `Bearer ${user.accessToken}`
            }
        })
            .then(response => {
                navigate('/score', { state: { message: response.data } });
            })
            .catch(error => {
                console.error(error);
                setError(error);
            });
        localStorage.removeItem('sudokuChallengeState');
    };
    return (
        <div className="play-challenge-container">
            <h1>Play Challenge</h1>
            <div className="timer-box">Time Remaining: {timer} seconds</div>
            <SudokuBoard
                challengeSet={challengeData.challengeSet || ''}
                onUpdate={setSudokuData}
            />
            <button onClick={handleSubmit}>Submit</button>
            <div className="challenge-info">
                <div className="info-box">Challenge ID: {challengeData.challengeId}</div>
                <div className="info-box">Challenge Set: {challengeData.challengeSet}</div>
                <div className="info-box">Challenge Time: {challengeData.challengeTime}</div>
            </div>
            {error && <div className="error"> {error.message} </div>}
        </div>
    );
}


export default PlayChallengePage;

