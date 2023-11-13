class Tile {

    type
    person
    buff

    constructor(type, person, buff) {
        this.type = type;
        this.person = person;
        this.buff = buff;
    }

    getHealthPx() {
        if (this.person) {

            return (this.person.hp ).toString() + "px";
        }

    }


}

export default Tile;