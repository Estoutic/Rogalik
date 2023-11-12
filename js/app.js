import { map } from "./Map.js"



if (window.jQuery) {
    // console.log(map);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            // console.log(map[i][j]);
            var tile = $("<div></div>").addClass(["tile", map[i][j].type, map[i][j].person, map[i][j].buff].join(" "));
            if (map[i][j].person) {
                var health = $("<div></div>").addClass("health");
                health.css(map[i][j].getHealthPx());
                tile.append(health);
            }
            $(".field").append(tile);
        }
    }
}


// добавить метод который принимает 2 матрицы исходные и обновленну и с помощью jquery.
// добавить метод который обновляет состояние с помощью setTimeoiut()