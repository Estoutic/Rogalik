import { updateMap } from "./renderMap.js";
import { newMap, currentRow, currentColumn } from "./personController.js";



export function attack(gameIsOver) {
    const intervalDuration = 1000;

    setInterval(() => {
        checkEnemies();
    }, intervalDuration);
}

function checkEnemies(gameIsOver) {

    console.log(currentRow, currentColumn);
    const enemyDirections = [
        { row: -1, col: 0 },
        { row: -1, col: 1 },
        { row: -1, col: -1 },
        { row: 1, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 }
    ];

    const attackingEnemies = [];

    for (const dir of enemyDirections) {
        const enemyRow = currentRow + dir.row;
        const enemyColumn = currentColumn + dir.col;

        if (
            enemyRow >= 0 &&
            enemyRow < newMap.length &&
            enemyColumn >= 0 &&
            enemyColumn < newMap[0].length &&
            newMap[enemyRow][enemyColumn].person?.name === "tileE"
        ) {
            attackingEnemies.push({ row: enemyRow, column: enemyColumn });
        }
    }

    for (const enemy of attackingEnemies) {
        if (newMap[currentRow][currentColumn].person) {
            newMap[currentRow][currentColumn].person.hp -= newMap[enemy.row][enemy.column].person.damage;
            if (newMap[currentRow][currentColumn].person?.hp <= 0) {
                var hero = $("#tile_" + currentRow + "_" + currentColumn);
                hero.removeClass(newMap[currentRow][currentColumn].person.name);
                newMap[currentRow][currentColumn].person = null;
            
            }
        }
    }

    updateMap(newMap);

}