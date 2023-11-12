import { map, hero } from "./Map.js";
import { attackHero } from "./enemyController.js";
import { renderMap } from "./renderMap.js";

const coordinates = findElementCoordinates(map, hero);

let currentRow = coordinates.row;
let currentColumn = coordinates.column;
let heroDamage = 50;
let newMap = [];

for(let i = 0; i < map.length; i++){
    newMap[i] = map[i];
}

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
        case 'a':``
            currentColumn = Math.max(0, currentColumn - 1);
            break;
        case 'd':
            currentColumn = Math.min(newMap[0].length - 1, currentColumn + 1);
            break;
    }

    if (newMap[currentRow][currentColumn].type !== "tileW" && newMap[currentRow][currentColumn].person !== "tileE") {

        const container = $('.inventory');

        if (newMap[currentRow][currentColumn].buff === "tileSW") {
            heroDamage += 25;
            container.append($("<div></div>").addClass("elementSW"));

            newMap[currentRow][currentColumn].buff = null;

        }
        else if (newMap[currentRow][currentColumn].buff === "tileHP") {
            newMap[currentRow][currentColumn].health += 5;
            container.append($("<div></div>").addClass("elementHP"));

            newMap[currentRow][currentColumn].buff = null;
        }

        newMap[currentRow][currentColumn].person = "tileP";
        attackHero({ currentRow, currentColumn }, newMap);
        renderMap(newMap,map);
    } else {
        currentRow = lastRow;
        currentColumn = lastColumn;
    }

}

function hit() {
    const directions = [
        { row: -1, col: 0 },
        { row: -1, col: 1 },
        { row: -1, col: -1 },
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
            if (newMap[newRow][newColumn].person === "tileE") {
                newMap[newRow][newColumn].health -= heroDamage;

                if (newMap[newRow][newColumn].health <= 0) {
                    newMap[newRow][newColumn].person = null;
                }
            }
        }
    }
    renderMap(newMap,map);
}

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'w':
        case 's':
        case 'a':
        case 'd':
            moveObject(event.key);
            break;
        case " ":
            event.preventDefault();
            hit();
            break;
    }
});

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
