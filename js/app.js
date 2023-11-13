import { enemyStart } from "./controllers/enemyController.js";
import { hit, moveObject } from "./controllers/personController.js";
import { renderMap } from "./map/renderMap.js"


class App {

    init() {
        renderMap();

        document.addEventListener('keydown', (event) => {
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

        enemyStart();
    }
}

export default App;