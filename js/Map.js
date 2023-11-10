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

var rooms = getRandomVal(5, 10);

for (let index = 0; index < rooms; index++) {
    var width = getRandomVal(3, 8);
    var height = getRandomVal(3, 8);
    var randomX = getRandomVal(0, columns - width);
    var randomY = getRandomVal(0, rows - height); 

    var overlaps = false;
    for (var i = randomY; i < randomY + height; i++) {
        for (var j = randomX; j < randomX + width; j++) {
            if (map[i][j].type !== null) {
                overlaps = true;
                break;
            }
        }
        if (overlaps) {
            break;
        }
    }

    for (var i = randomY; i < randomY + height; i++) {
        for (var j = randomX; j < randomX + width; j++) {
            map[i][j].type = null;
        }
    }
}



function getRandomVal(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}
export { map };