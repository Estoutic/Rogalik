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


function moveEnemy() {

    var enemies = $(".tile.tileE");

    for (const obj of enemies) {

        if (getRandomVal() === 1) {

            let indexs = getIndexs(obj.id);

            let randomDirection = getRandomDirection();

            let newEnemyRow = indexs.firstNumber + randomDirection.row;
            let newEnemyColumn = indexs.secondNumber + randomDirection.col;

            newEnemyRow = Math.max(0, Math.min(newMap.length - 1, newEnemyRow));
            newEnemyColumn = Math.max(0, Math.min(newMap[0].length - 1, newEnemyColumn));

            if (newMap[newEnemyRow][newEnemyColumn].type != "tileW"
                && newMap[newEnemyRow][newEnemyColumn].person?.name != "tileP" && newMap[newEnemyRow][newEnemyColumn].person?.name != "tileE") {

                if (newMap[newEnemyRow][newEnemyColumn].buff === "tileSW") {

                    newMap[indexs.firstNumber][indexs.secondNumber].person.damage += 5;

                    newMap[newEnemyRow][newEnemyColumn].buff = null;
                }
                else if (newMap[newEnemyRow][newEnemyColumn].buff === "tileHP") {

                    if (newMap[indexs.firstNumber][indexs.secondNumber].person.hp < 20) {
                        newMap[indexs.firstNumber][indexs.secondNumber].person.hp += 5;
                    }
                    newMap[newEnemyRow][newEnemyColumn].buff = null;
                }
                newMap[newEnemyRow][newEnemyColumn].person = newMap[indexs.firstNumber][indexs.secondNumber].person;
                newMap[indexs.firstNumber][indexs.secondNumber].person = null;

                updateMap(newMap);
            }
        }
    }
}