class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image("menu", "./assets/titleScreen.png");
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceshipBig.png");
        this.load.image("ufo", "./assets/spaceshipSmall.png");
        this.load.image("bg0", "./assets/BGLayer1.png");
        this.load.image("bg1", "./assets/BGLayer2.png");
        this.load.image("bg2", "./assets/BGLayer3.png");
        // load explosion spritesheet
        this.load.spritesheet("explosion",  "./assets/explosion.png", {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9,
        });

        this.load.spritesheet("explosionUFO",  "./assets/explosionSmal.png", {
            frameWidth: 32,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 9,
        });

        // load audio
        this.load.audio("sfx-select", "./assets/sfx-select.wav");
        this.load.audio("sfx-explosion", "./assets/sfx-explosion.wav");
        this.load.audio("sfx-shot", "./assets/sfx-shot.wav");
    }

    create() {
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
            frameRate: 30,
        });

        this.anims.create({
            key: "explodeUFO",
            frames: this.anims.generateFrameNumbers("explosionUFO", {start: 0, end: 9, first: 0}),
            frameRate: 30,
        });

        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };

        // // display menu text
        // this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "ROCKET PATROL", menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2, "Use <--> arrows to move & (F) to fire", menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = "#FF0000";
        // menuConfig.color = "#FFFFFF";
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, "Press <- for Novice or -> for Expert", menuConfig).setOrigin(0.5);
        this.bg0 = this.add.tileSprite(0, 0, 640, 480, "bg0").setOrigin(0, 0);
        this.bg1 = this.add.tileSprite(0, 0, 640, 480, "bg1").setOrigin(0, 0);
        this.bg2 = this.add.tileSprite(0, 0, 640, 480, "bg2").setOrigin(0, 0);
        this.add.sprite(0, 0, "menu").setOrigin(0, 0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 2,
                gameTimer: 60000    
            };   
            this.sound.play('sfx-select');
            this.scene.start('playScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 45000    
            };
            this.sound.play('sfx-select');
            this.scene.start('playScene'); 
        }
        
    }
}