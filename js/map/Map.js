import Tile from "../entities/Tile.js";
import Person from '../entities/Person.js'
import { getRandomVal } from "../utils/utils.js";

let map = [];
let hero = null;

const columns = 40;
const rows = 24;


function fillMap() {
    for (let i = 0; i < rows; i++) {
        map[i] = [];
        for (let j = 0; j < columns; j++) {
            map[i][j] = new Tile("wall", null, null);
        }
    }
}

function generateRooms() {
    var rooms = getRandomVal(5, 10);

    for (let index = 0; index < rooms; index++) {
        let width = getRandomVal(3, 8);
        let height = getRandomVal(3, 8);
        let randomX = getRandomVal(0, columns - width);
        let randomY = getRandomVal(0, rows - height);

        let overlaps = false;

        for (const row of map.slice(randomY, randomY + height)) {
            if (row.slice(randomX, randomX + width).some(tile => tile.type !== null)) {
                overlaps = true;
                break;
            }
        }

        for (let i = randomY; i < randomY + height; i++) {
            for (let j = randomX; j < randomX + width; j++) {
                map[i][j].type = "tile";
            }
        }
    }
}

function addRandomLines(lengthType, endRange) {

    let startCoord = getRandomVal(0, endRange);

    for (let index = 0; index < lengthType; index++) {
        if (lengthType === columns) {
            map[startCoord][index].type = "tile";
        } else {
            map[index][startCoord].type = "tile";
        }
    }

}
function addRoads() {

    let horizontalLines = getRandomVal(3, 5);
    var verticalLines = getRandomVal(3, 5);

    while (horizontalLines > 0 || verticalLines > 0) {
        if (horizontalLines > 0) {
            addRandomLines(columns, rows - 1);
            horizontalLines--;
        }

        if (verticalLines > 0) {
            addRandomLines(rows, columns - 1);
            verticalLines--;
        }
    }
}

function addBuffs(count, buffType) {
    while (count > 0) {
        tiles[getRandomVal(0, tiles.length - 1)].buff = buffType;
        count--;
    }
}

function addEnemies(count) {
    while (count > 0) {
        let tile = tiles[getRandomVal(0, tiles.length - 1)]
        if (tile.buff != null) {
            while (tile.buff != null) {
                tile = tiles[getRandomVal(0, tiles.length - 1)]
            }
        }
        tile.person = new Person("enemy", 20, 5);

        count--;

    }
}

function addHero() {
    hero = tiles[getRandomVal(0, tiles.length)];
    if (hero.person != null || hero.buff != null) {
        while (hero.person != null & hero.buff != null) {
            hero = tiles[getRandomVal(0, tiles.length)];
        }
    }
    hero.person = new Person("person", 20, 5);
}

export function updateMap(newMap) {
    map = newMap
}

export function getCurrentMap() {
    return map;
}


fillMap();
generateRooms();

addRoads();

const tiles = map.flatMap((row) => row.filter((tile) => tile.type === "tile"));
console.log(tiles);
addBuffs(10, "healthPotion");
addBuffs(2, "weapon");

addEnemies(10);
addHero();

export { hero };