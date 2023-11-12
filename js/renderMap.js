import Person from "./Person.js";
import { map } from "./Map.js"
export function updateMap(newMap) {
    console.log(newMap);

    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap[i].length; j++) {
            if (newMap[i][j] != map[i][j]) {

                var element = $("#tile_" + i + "_" + j);

                element.removeClass();
                element.empty();

                if (newMap[i][j].person) {

                    element.addClass(["tile", newMap[i][j].type, newMap[i][j].person?.name, newMap[i][j].buff].join(" "));

                    // element.addClass("health");
                    var health = $("<div></div>").addClass("health");
                    health.css("width", map[i][j].getHealthPx());

                    element.append(health);
                } else {
                    element.addClass(["tile", newMap[i][j].type, newMap[i][j].buff].join(" "));
                }
            }

        }
    }
}

export function renderMap() {
    const container = $('.field');

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            var tile = $("<div></div>").addClass(["tile", map[i][j].type, map[i][j].person?.name, map[i][j].buff].join(" "));
            if (map[i][j].person) {
                var health = $("<div></div>").addClass("health");
                console.log( map[i][j].getHealthPx());
                health.css("width", map[i][j].getHealthPx());
                tile.append(health);
            }
            tile.attr("id", "tile_" + i + "_" + j);


            container.append(tile);
        }
    }
}