class Tile {

    type
    person
    buff
    health

    constructor(type, person, buff) {
        this.type = type;
        this.person = person;
        this.buff = buff;
        this.health = 100;
    }

    getHealthPx() {
        console.log(this.health * 0.2 + "px");
        return (this.health * 0.2).toString() + "px";
    }


}

export default Tile;