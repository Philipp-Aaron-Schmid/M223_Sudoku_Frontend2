import React, { useState, useEffect } from 'react';
const SudokuBoardAdd = ({ onUpdate }) => {
    const gridSize = 9;
    const [boardData, setBoardData] = useState(Array(81).fill('0'));

    const handleInputChange = (value, index) => {
        const newBoardData = [...boardData];
        newBoardData[index] = value || '0'; // Replace empty input with '0'
        setBoardData(newBoardData);
        onUpdate(newBoardData.join(''));
    };

    return (
        <div className="sudoku-board">
            {boardData.map((cell, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={cell !== '0' ? cell : ''}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    className="sudoku-cell"
                />
            ))}
        </div>
    );
};

export default SudokuBoardAdd;
