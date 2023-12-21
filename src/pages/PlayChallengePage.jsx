import React, { useEffect, useState, useRef } from 'react'; // Import useRef here
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SudokuBoard from './SudokuBoard';

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
    }, [challengeId]); // Dependency array should include challengeId

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
    };

    return (
        <div>
            <h1>Play Challenge</h1>
            <p>Time Remaining: {timer} seconds</p>
            <p>Challenge ID: {challengeData.challengeId}
                Challenge Set: {challengeData.challengeSet}
                Challenge Time: {challengeData.challengeTime}</p>
            <SudokuBoard
                challengeSet={challengeData.challengeSet || ''}
                onUpdate={setSudokuData}
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && (<div className="error"> {error.message} </div>)}

        </div>
    );
}

export default PlayChallengePage;

