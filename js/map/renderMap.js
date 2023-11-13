import { getCurrentMap, updateMap } from "./Map.js"


export function rerenderMap(newMap) {
    const map = getCurrentMap();

    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap[i].length; j++) {

            if (JSON.stringify(map[i][j]) === JSON.stringify(newMap[i][j])) {
                continue
            }

            const currentTile = newMap[i][j];
            const element = $("#tile_" + i + "_" + j);
            element.empty();

            const tileClasses = ["tile", currentTile.type, currentTile.buff];
            if (currentTile.person) {

                if (currentTile.person.hp > 0) {
                    tileClasses.push(currentTile.person.name);
                    const health = $("<div/>").addClass("health");
                    health.css("width", currentTile.person.hp + "px");
                    element.append(health);
                }
            }
            element.removeClass().addClass(tileClasses.filter(c => !!c));
        }
        updateMap(newMap);
    }
}


export function renderMap() {
    const map = getCurrentMap()
    const container = $('.field');

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            var tile = $("<div/>").addClass(["tile", map[i][j].type, map[i][j].person?.name, map[i][j].buff].join(" "));
            if (map[i][j].person) {
                var health = $("<div/>").addClass("health");
                health.css("width", map[i][j].person.hp + "px");

                tile.append(health);
            }
            tile.attr("id", "tile_" + i + "_" + j);


            container.append(tile);
        }
    }
}

export function getAllEnemies(){
   return $(".tile.enemy");

}