import { directions } from "../utils/const.js";
import { updateMap } from "../map/renderMap.js";
import { hero,map } from "../map/Map.js";
import { findElementCoordinates } from "../utils/utils.js";


export const coordinates = findElementCoordinates(map, hero);

let currentRow = coordinates.row;
let currentColumn = coordinates.column;

let newMap = JSON.parse(JSON.stringify(map));


export function moveObject(direction) {

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

    if (newMap[currentRow][currentColumn].type != "tileW" && newMap[currentRow][currentColumn].person?.name != "tileE") {

        const container = $('.inventory');

        if (newMap[currentRow][currentColumn].buff === "tileSW") {
            hero.person.damage += 5;

            container.append($("<div></div>").addClass("elementSW"));

            newMap[currentRow][currentColumn].buff = null;

        }
        else if (newMap[currentRow][currentColumn].buff === "tileHP") {

            if (hero.person.hp < 20) {
                hero.person.hp += 5;
            }

            container.append($("<div></div>").addClass("elementHP"));

            newMap[currentRow][currentColumn].buff = null;
        }

        newMap[currentRow][currentColumn].person = hero.person;
        updateMap(newMap);


    } else {
        currentRow = lastRow;
        currentColumn = lastColumn;
        newMap[currentRow][currentColumn].person = hero.person;
    }

}

export function hit() {

    for (const dir of directions) {
        const newRow = currentRow + dir.row;
        const newColumn = currentColumn + dir.col;

        if (newRow >= 0 && newRow < newMap.length && newColumn >= 0 && newColumn < newMap[0].length) {
            if (newMap[newRow][newColumn].person?.name === "tileE") {
                newMap[newRow][newColumn].person.hp -= hero.person.damage;

                if (newMap[newRow][newColumn].person.hp <= 0) {
                    newMap[newRow][newColumn].person = null;
                }
            }
        }
    }
    updateMap(newMap);
}

export { newMap, currentRow, currentColumn };