export function renderMap(newMap, map) {
    const container = $('.field');
    container.empty();
    console.log(map);

    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap[i].length; j++) {
            var tile = $("<div></div>").addClass(["tile", newMap[i][j].type, newMap[i][j].person, newMap[i][j].buff].join(" "));

            if (newMap[i][j].person) {
                var health = $("<div></div>").addClass("health");
                health.css("width", newMap[i][j].getHealthPx());
                tile.append(health);
            }

            container.append(tile);
        }
    }
}