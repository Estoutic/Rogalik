import { directions } from "./const.js";


export function findElementCoordinates(matrix, targetElement) {
    for (const row in matrix) {
        for (const col in matrix[row]) {
            if (matrix[row][col] === targetElement) {
                return { row: parseInt(row), column: parseInt(col) };
            }
        }
    }
    return null;
}

export function getRandomVal() {
    return Math.round(Math.random());
}

export function getRandomDirection() {
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
}

export function getIndexs(str) {
    const match = str.match(/(\d+)_(\d+)/);

    if (match) {
        const firstNumber = parseInt(match[1], 10);
        const secondNumber = parseInt(match[2], 10);
        return {firstNumber, secondNumber};

    }
}