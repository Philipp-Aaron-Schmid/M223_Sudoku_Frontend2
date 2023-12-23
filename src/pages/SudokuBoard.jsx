import React, { useState, useEffect } from 'react';
/**
 * 
 * @param {*} param0 
 * @returns 
 * This is the actial playing board with some additional navigation and hilighting features it only takes in digits as inputs
 * 
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
        const validInput = value.match(/^[1-9]$/);
        const newValue = validInput ? value : '0';
    
        const newBoardData = [...boardData];
        newBoardData[index] = newValue;
        setBoardData(newBoardData);
        onUpdate(newBoardData.join(''));
    };
    
    const navigateInput = (index, key) => {
        let nextIndex = index;

        switch (key) {
            case 'ArrowUp':
            case 'w':
                nextIndex = index - gridSize >= 0 ? index - gridSize : index;
                break;
            case 'ArrowDown':
            case 's':
                nextIndex = index + gridSize < gridSize * gridSize ? index + gridSize : index;
                break;
            case 'ArrowLeft':
            case 'a':
                nextIndex = index % gridSize !== 0 ? index - 1 : index;
                break;
            case 'ArrowRight':
            case 'd':
                nextIndex = (index + 1) % gridSize !== 0 ? index + 1 : index;
                break;
            default:
                return; // Ignore other keys
        }

        // Focus the next input
        document.getElementById(`cell-${nextIndex}`).focus();
    };

    return (
        <div className="sudoku-board">
            {boardData.map((cell, index) => (
                <div key={index} className={`sudoku-cell ${challengeSet[index] !== '0' ? 'preset' : ''}`}>
                    {challengeSet[index] !== '0' ? (
                        cell
                    ) : (
                        <input
                            key={index}
                            id={`cell-${index}`}
                            type="tel"
                            maxLength="1"
                            value={cell !== '0' ? cell : ''} // Display an empty string for '0'
                            onChange={(e) => handleInputChange(e.target.value, index)}
                            onKeyDown={(e) => navigateInput(index, e.key)}
                            className="sudoku-cell-add"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default SudokuBoard;

