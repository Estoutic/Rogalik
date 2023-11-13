import { updateMap } from "../map/renderMap.js";
import { newMap, currentRow, currentColumn } from "./personController.js";
import { directions } from "../utils/const.js";
import { getIndexs, getRandomDirection, getRandomVal } from "../utils/utils.js";

export function enemyStart() {

    const intervalDuration = 1000;

    setInterval(() => {
        checkHero();
    }, intervalDuration);

    setInterval(() => {
        moveEnemy();
    }, intervalDuration);
}

function checkHero() {

    const attackingEnemies = [];

    for (const dir of directions) {

        const enemyRow = currentRow + dir.row;
        const enemyColumn = currentColumn + dir.col;

        if (
            enemyRow >= 0 &&
            enemyRow < newMap.length &&
            enemyColumn >= 0 &&
            enemyColumn < newMap[0].length &&
            newMap[enemyRow][enemyColumn].person?.name === "enemy"
        ) {
            attackingEnemies.push({ row: enemyRow, column: enemyColumn });
        }
    }

    for (const enemy of attackingEnemies) {

        let person = newMap[currentRow][currentColumn].person;
        if (person) {

            person.hp -= newMap[enemy.row][enemy.column].person.damage;

            if (person?.hp <= 0) {

                var hero = $("#tile_" + currentRow + "_" + currentColumn);
                hero.removeClass(person.name);
                person = null;
            }
        }
    }
    updateMap(newMap);
}

function moveEnemy() {
    const enemies = $(".tile.enemy");

    for (const obj of enemies) {
        if (getRandomVal() === 1) {
            const indexs = getIndexs(obj.id);
            const randomDirection = getRandomDirection();

            let newEnemyRow = Math.max(0, Math.min(newMap.length - 1, indexs.firstNumber + randomDirection.row));
            let newEnemyColumn = Math.max(0, Math.min(newMap[0].length - 1, indexs.secondNumber + randomDirection.col));

            const destinationTile = newMap[newEnemyRow][newEnemyColumn];

            if (destinationTile.type !== "wall" && destinationTile.person?.name !== "person" && destinationTile.person?.name !== "enemy") {

                const sourceTile = newMap[indexs.firstNumber][indexs.secondNumber];

                if (destinationTile.buff === "weapon") {

                    sourceTile.person.damage += 5;
                    destinationTile.buff = null;
                } else if (destinationTile.buff === "healthPotion") {
                    if (sourceTile.person.hp < 20) {
                        sourceTile.person.hp += 5;
                    }
                    destinationTile.buff = null;
                }

                destinationTile.person = sourceTile.person;
                sourceTile.person = null;

                updateMap(newMap);
            }
        }
    }
}
