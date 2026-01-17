/*
Name: Gabriel Rybolt
Title: Rocket Patrol Remastered (Name in Progress)
Hours taken: 1.5
Mods: 3 Points Total
    - Paralax Background (3)
    - Display Time Remaining (3) ✓
    - New Title Screen (3)
    - Create a New Scrolling Background (1)
Citations:

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;