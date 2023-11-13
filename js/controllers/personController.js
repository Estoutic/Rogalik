import { directions } from "../utils/const.js";
import { getAllEnemies, rerenderMap } from "../map/renderMap.js";
import { getCurrentMap, getHero } from "../map/Map.js";
import { findElementCoordinates } from "../utils/utils.js";
import { getInventory } from "../inventory/inventory.js";
import InventoryElement from "../inventory/InventoryElement.js";
import { rerenderInventory } from "../inventory/renderInventory.js";

let hero = getHero();
export const coordinates = findElementCoordinates(getCurrentMap(), hero);

let currentRow = coordinates.row;
let currentColumn = coordinates.column;
let gameIsEnd = false;

export function moveHero(direction) {
    let newMap = JSON.parse(JSON.stringify(getCurrentMap()));
    let inventory = JSON.parse(JSON.stringify(getInventory()));
    if (gameIsEnd) {
        return;
    }
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


        if (currentTile.buff === "weapon") {
            hero.person.damage += 5;

            inventory.push(new InventoryElement("inventory-weapon"));
            console.log("add");

            currentTile.buff = null;

        }
        else if (currentTile.buff === "healthPotion") {

            if (hero.person.hp < 20) {
                hero.person.hp += 5;
            }
            console.log("add");
            inventory.push(new InventoryElement("inventory-potion"));

            currentTile.buff = null;
        }

        currentTile.person = hero.person;

        rerenderMap(newMap);
        rerenderInventory(inventory);
    } else {
        currentRow = lastRow;
        currentColumn = lastColumn;
        newMap[currentRow][currentColumn].person = hero.person;
        rerenderMap(newMap);

    }

}

export function hit() {
    if (gameIsEnd) {
        return;
    }
    let map = JSON.parse(JSON.stringify(getCurrentMap()));

    if (getAllEnemies().length === 0) {
        gameIsEnd = true;
        if (confirm("You Win!!!")) {
            window.location.reload();
        }

    }
    for (const dir of directions) {
        const newRow = currentRow + dir.row;
        const newColumn = currentColumn + dir.col;

        if (newRow >= 0 && newRow < map.length && newColumn >= 0 && newColumn < map[0].length) {
            const currentPerson = map[newRow][newColumn].person;
            if (currentPerson?.name === "enemy") {
                currentPerson.hp -= hero.person.damage;

                if (currentPerson.hp <= 0) {
                    map[newRow][newColumn].person = null;

                }
            }
        }
    }
    rerenderMap(map);
}


export { currentRow, currentColumn };