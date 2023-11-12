import Tile from "./Tile.js";
import Person from './Person.js'
let map = []

const columns = 40;
const rows = 24;

for (let i = 0; i < rows; i++) {
    map[i] = []
    for (let j = 0; j < columns; j++) {
        map[i][j] = new Tile("tileW", null, null);
    }
}

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
function addRandomLines(lengthType, length, endRange) {

    let lineLength = getRandomVal(3, length);
    let startCoord = getRandomVal(0, endRange);

    for (let index = 0; index < lengthType; index++) {
        if (lengthType === columns) {
            map[startCoord][index].type = "tile";
        } else {
            map[index][startCoord].type = "tile";
        }
    }

}

let horizontalLines = getRandomVal(3, 5);
var verticalLines = getRandomVal(3, 5);

while (horizontalLines > 0 || verticalLines > 0) {
    if (horizontalLines > 0) {
        addRandomLines(columns, columns, rows - 1);
        horizontalLines--;
    }

    if (verticalLines > 0) {
        addRandomLines(rows, columns, columns - 1);
        verticalLines--;
    }
}

const tiles = map.flatMap((row) => row.filter((tile) => {
    return tile.type === "tile";
}));


applyBuffToRandomTiles(10, "tileHP");

applyBuffToRandomTiles(2, "tileSW");


addEnimies(10);

let hero = tiles[getRandomVal(0, tiles.length)];
hero.person = new Person("tileP");

function getRandomVal(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function addEnimies(count) {
    while (count > 0) {
        tiles[getRandomVal(0, tiles.length - 1)].person = new Person("tileE");
        count--;

    }
}

function applyBuffToRandomTiles(count, buffType) {
    if (buffType === "tileE") {
        while (count > 0) {
            tiles[getRandomVal(0, tiles.length - 1)].person = buffType;
            count--;

        }
    }
    else {


        while (count > 0) {
            tiles[getRandomVal(0, tiles.length - 1)].buff = buffType;
            count--;

        }
    }
}

// console.log(map);
export { map, tiles, hero };