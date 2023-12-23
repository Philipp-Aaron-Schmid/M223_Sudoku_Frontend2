import React, { useState, useEffect } from 'react';
/**
 * 
 * @param {*} param0 
 * @returns 
 * The Sudoku board display is a simple component for the admin to have a visual representation of what the boards look like
 * 
 */
const SudokuBoardDisplay = ({ challengeSet }) => {
    const gridSize = 9;
    const [boardData, setBoardData] = useState(Array(81).fill('0'));

    useEffect(() => {
        setBoardData(challengeSet.split(''));
    }, [challengeSet]);

    return (
        <div className="sudoku-board-preview">
            {boardData.map((cell, index) => (
                <div key={index} className="sudoku-cell-preview">
                    {cell !== '0' ? cell : ''}
                </div>
            ))}
        </div>
    );
}

export default SudokuBoardDisplay;