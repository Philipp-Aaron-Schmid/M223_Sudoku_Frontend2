import React, { useState, useEffect } from 'react';

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