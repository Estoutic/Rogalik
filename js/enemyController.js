let enemyDamage = 10;

export function attackHero(hero, map) {

    const enemyDirections = [
        { row: -1, col: 0 },
        { row: -1, col: 1 },
        { row: -1, col: -1 },
        { row: 1, col: 1 },
        { row: 1, col: -1 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 }
    ];

    const attackingEnemies = [];

    for (const dir of enemyDirections) {
        const enemyRow = hero.currentRow + dir.row;
        const enemyColumn = hero.currentColumn + dir.col;

        if (
            enemyRow >= 0 &&
            enemyRow < map.length &&
            enemyColumn >= 0 &&
            enemyColumn < map[0].length &&
            map[enemyRow][enemyColumn].person === "tileE"
        ) {
            attackingEnemies.push({ row: enemyRow, column: enemyColumn });
        }
    }

    for (const enemy of attackingEnemies) {
        console.log(attackingEnemies);
        map[hero.currentRow][hero.currentColumn].health -= enemyDamage;
        console.log(map[hero.currentRow][hero.currentColumn].health);
        if (map[hero.currentRow][hero.currentColumn].health <= 0) {
            map[hero.currentRow][hero.currentColumn].person = null;
            hero = null;
        }
    }


}
