import { map } from "./Map.js"


if (window.jQuery) {
    // console.log(map);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            console.log(map[i][j]);
            var tile = $("<div></div>").addClass(["tile", map[i][j].type, map[i][j].person, map[i][j].buff].join(" "));
            $(".field").append(tile);
        }
    }
}