import { attack } from "./enemyController.js";
import { hit, moveObject } from "./personController.js";
import { renderMap } from "./renderMap.js"


let gameIsOver = false;

renderMap();
console.log(gameIsOver);

document.addEventListener('keydown', function (event) {
    console.log(gameIsOver);
    if (!gameIsOver) {

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
    }
});
attack();

