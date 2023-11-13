import { directions } from "../utils/const.js";
import { updateMap } from "../map/renderMap.js";
import { hero, map } from "../map/Map.js";
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

    const currentTile = newMap[currentRow][currentColumn];

    if (currentTile.type != "wall" && currentTile.person?.name != "enemy") {

        const container = $('.inventory');

        if (currentTile.buff === "weapon") {
            hero.person.damage += 5;

            container.append($("<div></div>").addClass("elementSW"));

            currentTile.buff = null;

        }
        else if (currentTile.buff === "healthPotion") {

            if (hero.person.hp < 20) {
                hero.person.hp += 5;
            }

            container.append($("<div></div>").addClass("elementHP"));

            currentTile.buff = null;
        }

        currentTile.person = hero.person;
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
            const currentPerson = newMap[newRow][newColumn].person;
            if (currentPerson?.name === "enemy") {
                currentPerson.hp -= hero.person.damage;

                if (currentPerson.hp <= 0) {
                    newMap[newRow][newColumn].person = null;
                }
            }
        }
    }
    updateMap(newMap);
}

export { newMap, currentRow, currentColumn };