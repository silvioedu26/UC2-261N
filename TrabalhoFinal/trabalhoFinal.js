const ask = require("readline-sync");

function warriorAttack() {
    console.log("\n The Warrior swings a giant sword!");

    let damage = Math.floor(Math.random() * 9) + 12;

    return damage;
}

function berserkerAttack() {
    console.log("\n The Berserker enters rage mode!");

    let damage = Math.floor(Math.random() * 13) + 10;

    return damage;
}

function guardianAttack() {
    console.log("\n The Guardian strikes with a shield bash!");

    let damage = Math.floor(Math.random() * 7) + 8;

    return damage;
}
// CLASSES

let warrior = {
    className: "Warrior",
    health: 120,
    defense: 8,
    potions: 3,
    defending: false,
    attack: warriorAttack
};

let berserker = {
    className: "Berserker",
    health: 100,
    defense: 5,
    potions: 3,
    defending: false,
    attack: berserkerAttack
};

let guardian = {
    className: "Guardian",
    health: 140,
    defense: 12,
    potions: 3,
    defending: false,
    attack: guardianAttack
};

let enemies = [
    {
        name: "Mine Goblin",
        health: 40,
        minDamage: 5,
        maxDamage: 10
    },

    {
        name: "Moria Orc",
        health: 60,
        minDamage: 8,
        maxDamage: 15
    },

    {
        name: "Dark Skeleton",
        health: 55,
        minDamage: 7,
        maxDamage: 13
    },

    {
        name: "Cursed Knight",
        health: 70,
        minDamage: 10,
        maxDamage: 18
    },

    {
        name: "Fire Demon",
        health: 90,
        minDamage: 12,
        maxDamage: 20
    }
];

function createCharacter() {

    console.clear();

    console.log("===");
    console.log(" TERMINAL RPG GAME ");
    console.log("===");

    let name = ask.question("\nEnter your character name: ");

    console.log("\nChoose your class:");
    console.log("1 - Warrior");
    console.log("2 - Berserker");
    console.log("3 - Guardian");

    let option = ask.questionInt("\nSelect a class: ");

    let selectedClass;

    switch (option) {

        case 1:
            selectedClass = { ...warrior };
            break;

        case 2:
            selectedClass = { ...berserker };
            break;

        case 3:
            selectedClass = { ...guardian };
            break;

        default:
            console.log("\nInvalid option. Warrior selected.");
            selectedClass = { ...warrior };
    }

    selectedClass.name = name;

    console.log("\n===");
    console.log(" CHARACTER CREATED!");
    console.log("===");

    console.log("Name:", selectedClass.name);
    console.log("Class:", selectedClass.className);
    console.log("Health:", selectedClass.health);
    console.log("Defense:", selectedClass.defense);
    console.log("Potions:", selectedClass.potions);

    ask.question("\nPress ENTER to continue...");

    return selectedClass;
}

function generateEnemy(enemies) {

    let index = Math.floor(Math.random() * enemies.length);

    let selectedEnemy = { ...enemies[index] };

    return selectedEnemy;
}

function attack(character, enemy) {

    let damage = character.attack();

    enemy.health -= damage;

    if (enemy.health < 0) {
        enemy.health = 0;
    }

    console.log("\n You dealt " + damage + " damage!");
}

function defend(character) {

    character.defending = true;

    console.log("\n Defensive stance activated!");
}

function usePotion(character) {

    if (character.potions <= 0) {

        console.log("\n No potions remaining!");
        return;
    }

    character.health += 30;
    character.potions--;

    console.log("\n Potion used!");
    console.log(" Recovered 30 health!");
}

function combatMenu() {

    console.log("\n===");
    console.log(" COMBAT MENU ⚔️");
    console.log("===");
    console.log("1 - Attack");
    console.log("2 - Defend");
    console.log("3 - Use Potion");

    let option = ask.questionInt("\nChoose an action: ");

    return option;
}

function enemyAttack(character, enemy) {

    let damage = Math.floor(
        Math.random() *
        (enemy.maxDamage - enemy.minDamage + 1)
    ) + enemy.minDamage;

    if (character.defending) {

        damage = Math.floor(damage / 2);

        character.defending = false;

        console.log("\n Defense reduced incoming damage!");
    }

    damage -= character.defense;

    if (damage < 0) {
        damage = 0;
    }

    character.health -= damage;

    if (character.health < 0) {
        character.health = 0;
    }

    console.log("\n " + enemy.name + " dealt " + damage + " damage!");
}

function startCombat(character, enemy) {

    console.clear();

    console.log("===");
    console.log(" A NEW ENEMY APPEARS!");
    console.log("===");

    console.log("\nEnemy:", enemy.name);
    console.log("Enemy Health:", enemy.health);

    while (character.health > 0 && enemy.health > 0) {

        console.log("\n===");
        console.log(" BATTLE STATUS");
        console.log("===");

        console.log(character.name + " Health:", character.health);
        console.log("Potions:", character.potions);

        console.log(enemy.name + " Health:", enemy.health);

        let option = combatMenu();

        switch (option) {

            case 1:
                attack(character, enemy);
                break;

            case 2:
                defend(character);
                break;

            case 3:
                usePotion(character);
                break;

            default:
                console.log("\n Invalid action!");
        }

        if (enemy.health > 0) {
            enemyAttack(character, enemy);
        }
    }

    // Victory
    if (character.health > 0) {

        console.log("\n You defeated " + enemy.name + "!");
        return true;
    }

    console.log("\n You were defeated...");
    return false;
}

// GAME START
let player = createCharacter();
let defeatedEnemies = 0;

while (player.health > 0 && defeatedEnemies < 5) {

    let enemy = generateEnemy(enemies);
    let victory = startCombat(player, enemy);

    if (victory) {

        defeatedEnemies++;

        console.log("\n Enemies defeated:", defeatedEnemies);

        player.health += 15;

        console.log(" You recovered 15 health.");

        ask.question("\nPress ENTER for the next battle...");
    }
}

console.clear();

if (player.health > 0) {

    console.log("===");
    console.log(" YOU WON THE GAME!");
    console.log("===");

    console.log("\n" + player.name + " defeated all enemies!");

} else {

    console.log("===");
    console.log(" GAME OVER");
    console.log("====");

    console.log("\nBetter luck next time...");
}

