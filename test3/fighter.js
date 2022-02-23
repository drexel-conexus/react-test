class Fighter {
    constructor(name, strength, agility, vitality) {
      this.name = name;
      this.strength = strength;
      this.agility = agility;
      this.vitality = vitality;
    }
    getName() { 
        return this.name; 
    }

    getHp () { 
        let hp = 50
        hp =  ((this.vitality * 10) + hp)
        hp =  ((this.strength * 5) + hp)
        hp =  ((this.vitality * 3) + hp)
        return hp;
    }
    takeDamage(damage) {
        let defence = 10
        defence = defence + (this.agility * 5) + (this.strength *3) + (this.vitality * 3)
        const damageTaken = damage - defence
        return damageTaken > 0 ? damageTaken : 0
    }

    dealDamage(rival) {
        let damage = 10 
        damage = damage + (this.strength * 5) + (this.agility * 3)
        return rival.takeDamage(damage)
    }
}
const fighter1 = new Fighter('fighter1', 2, 1, 3)
const fighter2 = new Fighter('fighter2', 3, 2, 1)

const fight = (fightr1, fightr2) => {
    let fighter1Hp = fightr1.getHp()
    console.log(fighter1Hp)
    let fighter2Hp = fightr2.getHp()
    console.log(fighter2Hp)

    while (fighter1Hp > 0 && fighter2Hp > 0){
        const damageToFighter2 = fightr1.dealDamage(fightr2)
        fighter2Hp = fighter2Hp - damageToFighter2
        console.log(fighter2Hp)
        const damageToFighter1 = fightr2.dealDamage(fightr1)
        fighter1Hp = fighter1Hp - damageToFighter1
        console.log(fighter1Hp)

    }
    if (fighter1Hp > 0 ){
        return fightr1.getName()
    }
    return fightr2.getName()
}
