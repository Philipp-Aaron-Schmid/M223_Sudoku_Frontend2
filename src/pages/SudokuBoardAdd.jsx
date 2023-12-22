import React, { useState, useEffect } from 'react';
const SudokuBoardAdd = ({ onUpdate }) => {
    const gridSize = 9;
    const [boardData, setBoardData] = useState(Array(81).fill('0'));

    const handleInputChange = (value, index) => {
        if (value === '' || (value >= '1' && value <= '9')) {
            const newBoardData = [...boardData];
            newBoardData[index] = value;
            setBoardData(newBoardData);
            onUpdate(newBoardData.join(''));
        }
    };
    
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newBoardData = [...boardData];
            newBoardData[index] = '0';
            setBoardData(newBoardData);
            onUpdate(newBoardData.join(''));
        }
    };

    return (
        <div className="sudoku-board-add">
            {boardData.map((cell, index) => (
                <input
                    key={index}
                    type="tel" // Type set to 'tel' for numeric keypad on mobile devices
                    maxLength="1"
                    value={cell !== '0' ? cell : ''}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="sudoku-cell-add"
                />
            ))}
        </div>
    );
};

export default SudokuBoardAdd;
