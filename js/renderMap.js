import Person from "./Person.js";

export function updateMap(newMap, map) {
    const container = $('.field');
    container.empty();
    console.log(map);

    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap[i].length; j++) {
            if (newMap[i][j].person instanceof Person) {
                console.log("update");

                var tile = $("<div></div>").addClass(["tile", newMap[i][j].type, newMap[i][j].person.name, newMap[i][j].buff].join(" "));

                var health = $("<div></div>").addClass("health");
                health.css("width", newMap[i][j].person.getHealthPx());
                tile.append(health);
            } else {
                var tile = $("<div></div>").addClass(["tile", newMap[i][j].type, newMap[i][j].buff].join(" "));
            }
            container.append(tile);
        }
    }
}

export function renderMap(map) {
    const container = $('.field');

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            console.log(map[i][j]);
            var tile = $("<div></div>").addClass(["tile", map[i][j].type, map[i][j].person?.name, map[i][j].buff].join(" "));
            if (map[i][j].person) {
                var health = $("<div></div>").addClass("health");
                health.css("width", map[i][j].person.getHealthPx());
                tile.append(health);
            }
            tile.attr("id", "tile_" + i + "_" + j);


            container.append(tile);
        }
    }
}