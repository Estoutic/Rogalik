import { attack } from "./enemyController.js";
import { hit, moveObject } from "./personController.js";
import { renderMap } from "./renderMap.js"



renderMap();

document.addEventListener('keydown', function (event) {

    switch (event.key) {
        case 'w':
        case 's':
        case 'a':
        case 'd':
            moveObject(event.key);
            break;
        case " ":
            event.preventDefault();
            hit();
            break;
    }
});
attack();

