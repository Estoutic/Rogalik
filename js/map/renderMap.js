import { map } from "./Map.js"

export function updateMap(newMap) {

    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap[i].length; j++) {
            const currentTile = newMap[i][j];
            const element = $("#tile_" + i + "_" + j);
            element.empty();

            const tileClasses = ["tile", currentTile.type, currentTile.buff];
            if (currentTile.person) {

                if (currentTile.person.hp > 0) {
                    tileClasses.push(currentTile.person.name);

                    const health = $("<div></div>").addClass("health");
                    health.css("width", currentTile.person.hp + "px");
                    element.append(health);
                }
            }
            element.removeClass().addClass(tileClasses.join(" "));
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
                health.css("width", map[i][j].getHealthPx());
                tile.append(health);
            }
            tile.attr("id", "tile_" + i + "_" + j);


            container.append(tile);
        }
    }
}