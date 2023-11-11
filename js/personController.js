import { map, hero } from "./Map.js";

const coordinates = findElementCoordinates(map, hero);

let currentRow = coordinates.row;
let currentColumn = coordinates.column;

let newMap = map;

function moveObject(direction) {
    let lastRow = currentRow;
    let lastColumn = currentColumn;

    newMap[currentRow][currentColumn].person = null;

    switch (direction) {
        case 'w':
            currentRow = Math.max(0, currentRow - 1);
            break;
        case 's':
            currentRow = Math.min(newMap.length - 1, currentRow + 1);
            break;
        case 'a':
            currentColumn = Math.max(0, currentColumn - 1);
            break;
        case 'd':
            currentColumn = Math.min(newMap[0].length - 1, currentColumn + 1);
            break;
    }

    if (newMap[currentRow][currentColumn].type != "tileW" & newMap[currentRow][currentColumn].person != "tileE") {
        if (newMap[currentRow][currentColumn].buff) {
            newMap[currentRow][currentColumn].buff = null;
        }
        newMap[currentRow][currentColumn].person = "tileP";
        updateHtmlMap(map, newMap);
    } else {
        currentRow = lastRow;
        currentColumn = lastColumn;
    }
}

function hit() {

    const directions = [
        { row: -1, col: 0 },
        { row: -1, col: -1 },
        { row: 0, col: 0 },
        { row: 1, col: 1 },

        { row: 1, col: -1 },

        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 }
    ];

    for (const dir of directions) {
        const newRow = currentRow + dir.row;
        const newColumn = currentColumn + dir.col;

        if (newRow >= 0 && newRow < newMap.length && newColumn >= 0 && newColumn < newMap[0].length) {
            console.log(newMap[newRow][newColumn].person);
            if (newMap[newRow][newColumn].person === "tileE") {
                newMap[newRow][newColumn].person = null;
            }
        }
    }
    updateHtmlMap(map, newMap);


}

document.addEventListener('keydown', function (event) {
    console.log(event);
    switch (event.key) {
        case 'w':
        case 's':
        case 'a':
        case 'd':
            moveObject(event.key);
            break;
        case " ":
            hit();
            break;
    }
});



function updateHtmlMap(originalMatrix, updatedMatrix) {
    const container = $('.field');


    container.empty();

    for (let i = 0; i < updatedMatrix.length; i++) {
        for (let j = 0; j < updatedMatrix[i].length; j++) {
            var tile = $("<div></div>").addClass(["tile", map[i][j].type, map[i][j].person, map[i][j].buff].join(" "));
            container.append(tile);

        }
    }
}

function findElementCoordinates(matrix, targetElement) {
    for (const row in matrix) {
        for (const col in matrix[row]) {
            if (matrix[row][col] === targetElement) {
                return { row: parseInt(row), column: parseInt(col) };
            }
        }
    }
    return null;
}


