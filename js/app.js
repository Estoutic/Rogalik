import { enemyStart } from "./controllers/enemyController.js";
import { hit, moveObject } from "./controllers/personController.js";
import { renderMap } from "./map/renderMap.js"


class App {

    init() {
        renderMap();

        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyW':
                case 'KeyS':
                case 'KeyA':
                case 'KeyD':
                    moveObject(event.code.replace('Key', '').toLowerCase());
                    break;
                case "Space":
                    event.preventDefault();
                    hit();
                    break;
            }
        });

        enemyStart();
    }
}

export default App;