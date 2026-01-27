/*
Name: Gabriel Rybolt
Title: Rocket Patrol Remastered (Name in Progress)
Hours taken: 8
Mods: 13 Points Total
    - Paralax Background (3) ✓
    - Display Time Remaining (3) ✓
    - New Title Screen (3)
    - Speed boost after 30 seconds (1) ✓
    - Randomize spaceship direction (1) ✓
    - New Spaceship Type (5) ✓
    - Mouse control for Player Movement (5)
Citations:
Play.js (94) https://www.html5gamedevs.com/topic/36580-best-way-to-apply-a-method-to-all-elements-in-a-group/
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