import React, { useState, useEffect } from 'react';
/**
 * 
 * @param {*} param0 
 * @returns 
 * 
 * toDo Add arrowkey board navigation/wasd
 */
const SudokuBoard = ({ challengeSet, onUpdate }) => {
    const gridSize = 9;
    const [boardData, setBoardData] = useState(Array(81).fill('0'));

    useEffect(() => {
        const initialBoardData = challengeSet.split('');
        setBoardData(initialBoardData);
        onUpdate(initialBoardData.join(''));
    }, [challengeSet, onUpdate]);

    const handleInputChange = (value, index) => {
        const newBoardData = [...boardData];
        newBoardData[index] = value || '0'; // Store '0' for empty inputs
        setBoardData(newBoardData);
        onUpdate(newBoardData.join(''));
    };

    return (
        <div className="sudoku-board">
            {boardData.map((cell, index) => (
                <div key={index} className={`sudoku-cell ${challengeSet[index] !== '0' ? 'preset' : ''}`}>
                    {challengeSet[index] !== '0' ? (
                        cell
                    ) : (
                        <input 
                            type="text" 
                            maxLength="1" 
                            value={cell !== '0' ? cell : ''} // Display an empty string for '0'
                            onChange={(e) => handleInputChange(e.target.value, index)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default SudokuBoard;

