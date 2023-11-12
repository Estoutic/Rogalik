import { map, hero } from "./Map.js";

const coordinates = findElementCoordinates(map, hero);

let currentRow = coordinates.row;
let currentColumn = coordinates.column;

function moveObject(direction) {
    let lastRow = currentRow;
    let lastColumn = currentColumn;

    map[currentRow][currentColumn].person = null;

    switch (direction) {
        case 'w':
            currentRow = Math.max(0, currentRow - 1);
            break;
        case 's':
            currentRow = Math.min(map.length - 1, currentRow + 1);
            break;
        case 'a':
            currentColumn = Math.max(0, currentColumn - 1);
            break;
        case 'd':
            currentColumn = Math.min(map[0].length - 1, currentColumn + 1);
            break;
    }

    if (map[currentRow][currentColumn].type !== "tileW" && map[currentRow][currentColumn].person !== "tileE") {
        if (map[currentRow][currentColumn].buff) {
            map[currentRow][currentColumn].buff = null;
        }
        map[currentRow][currentColumn].person = "tileP";
        updateHtmlMap(map);
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

        if (newRow >= 0 && newRow < map.length && newColumn >= 0 && newColumn < map[0].length) {
            if (map[newRow][newColumn].person === "tileE") {
                map[newRow][newColumn].health -= 50;

                if (map[newRow][newColumn].health <= 0) {
                    map[newRow][newColumn].person = null;
                }
            }
        }
    }
    updateHtmlMap(map);
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

function updateHtmlMap(updatedMatrix) {
    const container = $('.field');
    container.empty();

    for (let i = 0; i < updatedMatrix.length; i++) {
        for (let j = 0; j < updatedMatrix[i].length; j++) {
            var tile = $("<div></div>").addClass(["tile", map[i][j].type, map[i][j].person, map[i][j].buff].join(" "));

            if (map[i][j].person) {
                var health = $("<div></div>").addClass("health");
                health.css("width", map[i][j].getHealthPx());
                tile.append(health);
            }

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
