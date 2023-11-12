class Person{
    name;
    hp;
    damage;

    constructor(name,hp = 20,damage = 5){
        this.name = name;
        this.hp = hp;
        this.damage = damage;
    }
    getHealthPx() {
        return (this.hp * 0.2).toString() + "px";
    }
    
}

export default Person;
