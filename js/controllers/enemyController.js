import { getAllEnemies, rerenderMap } from "../map/renderMap.js";
import { getCurrentMap } from "../map/Map.js";
import { currentRow, currentColumn } from "./personController.js";
import { directions } from "../utils/const.js";
import { getIndexs, getRandomDirection, getRandomVal } from "../utils/utils.js";


let gameIsEnd = false;

export function enemyStart() {

    const intervalDuration = 500;

    setInterval(() => {
        checkHero();
    }, intervalDuration);

    setInterval(() => {
        moveEnemy();
    }, intervalDuration);
}

function checkHero() {
    if (gameIsEnd) {
        return;
    }
    const attackingEnemies = [];

    let map = JSON.parse(JSON.stringify(getCurrentMap()));


    for (const dir of directions) {

        const enemyRow = currentRow + dir.row;
        const enemyColumn = currentColumn + dir.col;

        if (
            enemyRow >= 0 &&
            enemyRow < map.length &&
            enemyColumn >= 0 &&
            enemyColumn < map[0].length &&
            map[enemyRow][enemyColumn].person?.name === "enemy"
        ) {
            attackingEnemies.push({ row: enemyRow, column: enemyColumn });
        }
    }

    for (const enemy of attackingEnemies) {


        let person = map[currentRow][currentColumn].person;
        if (person) {

            person.hp -= map[enemy.row][enemy.column].person.damage;

            if (person?.hp <= 0) {
                person = null;
                gameIsEnd = true;
                if (confirm("You Die..")) {
                    window.location.reload();
                }
            }
        }
    }
    rerenderMap(map);
}

function moveEnemy() {
    if (gameIsEnd) {
        return;
    }

    const enemies = getAllEnemies();
    for (const enemy of enemies) {
        if (getRandomVal() === 1) {
            let map = JSON.parse(JSON.stringify(getCurrentMap()));

            const indexs = getIndexs(enemy.id);
            const randomDirection = getRandomDirection();

            let newEnemyRow = Math.max(0, Math.min(map.length - 1, indexs.firstNumber + randomDirection.row));
            let newEnemyColumn = Math.max(0, Math.min(map[0].length - 1, indexs.secondNumber + randomDirection.col));

            const destinationTile = map[newEnemyRow][newEnemyColumn];

            if (destinationTile.type !== "wall" && destinationTile.person?.name !== "person" && destinationTile.person?.name !== "enemy") {

                const sourceTile = map[indexs.firstNumber][indexs.secondNumber];

                if (destinationTile.buff === "weapon") {

                    sourceTile.person.damage += 5;
                    destinationTile.buff = null;
                } else if (destinationTile.buff === "healthPotion") {
                    if (sourceTile.person?.hp < 20) {
                        sourceTile.person.hp += 5;
                    }
                    destinationTile.buff = null;
                }

                destinationTile.person = sourceTile.person;
                sourceTile.person = null;

                rerenderMap(map);
            }
        }
    }
}
