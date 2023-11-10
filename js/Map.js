import Tile from "./Tile.js";

var map = []

const columns = 40;
const rows = 24;

for (let i = 0; i < rows; i++) {
    map[i] = []
    for (let j = 0; j < columns; j++) {
        map[i][j] = new Tile("tileW", null, null);
    }
}

function fill(map) {

    var rooms = getRandomVal(5, 10);

    while (rooms >= 0) {
        var width = getRandomVal(3, 8);
        var height = getRandomVal(3, 8);
        var randomX = getRandomVal(0, columns);
        var randomY = getRandomVal(0, rows);

        // for (let i =)

 
    }
}


function getRandomVal(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { map };