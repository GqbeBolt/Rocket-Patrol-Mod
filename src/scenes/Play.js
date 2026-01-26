class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // place the tile sprite
        this.bg0 = this.add.tileSprite(0, 0, 640, 480, "bg0").setOrigin(0, 0);
        this.bg1 = this.add.tileSprite(0, 0, 640, 480, "bg1").setOrigin(0, 0);
        this.bg2 = this.add.tileSprite(0, 0, 640, 480, "bg2").setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, "rocket").setOrigin(0.5, 0);
        // add 3 spaceships

        this.ships = this.add.group();

        this.ship01Timer = this.time.delayedCall(1000, () => {
            this.ships.add(new Spaceship(this, game.config.width, borderUISize*4, "spaceship", 0, 30).setOrigin(0, 0));
        }, null, this);
        this.ship02Timer = this.time.delayedCall(500, () => {
            this.ships.add(new Spaceship(this, game.config.width, borderUISize*5 + borderPadding*3, "spaceship", 0, 20).setOrigin(0,0));
        }, null, this);
        this.ships.add(new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*6, "spaceship", 0, 10).setOrigin(0,0));
        // the ufo
        let ufo = new Spaceship(this, game.config.width, borderUISize*5 + borderPadding, "ufo", 0, 100).setOrigin(0,0);
        this.ships.add(ufo);
        this.ufoTimer = this.time.delayedCall(Math.floor(Math.random() * 5000), () => {
            console.log("add ufo");
        }, null, this);
        // white borders
        let border1 = this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        let border2 = this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        let border3 = this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        let border4 = this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        border1.depth = 10000;
        border2.depth = 10000;
        border3.depth = 10000;
        border4.depth = 10000;
        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        };

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, "Press (R) to restart or <- for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        scoreConfig.align = "left";
        scoreConfig.fixedWidth = 100;
        this.timeDisplay = this.add.text(game.config.width - borderUISize * 4 - borderPadding * 2, borderUISize + borderPadding*2, (game.settings.gameTimer - this.clock.elapsed) / 1000, scoreConfig);
        scoreConfig.fixedWidth = 0;
        
        this.speedBoost = false;
    }

    update() {

        this.timeDisplay.text = Math.ceil((game.settings.gameTimer - this.clock.elapsed) / 1000);
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            game.settings.spaceshipSpeed /= 1.5;
            this.scene.restart();
        }
        // or menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.bg1.tilePositionX -= 1;
        this.bg2.tilePositionX -= 3;

        if (!this.gameOver) {
            this.p1Rocket.update();
            // Iterating over each item in a group
            // https://www.html5gamedevs.com/topic/36580-best-way-to-apply-a-method-to-all-elements-in-a-group/
            this.ships.children.each( function(ship) {
                ship.update();
            });

            
        }

        this.ships.children.each( function(ship) {
            if (this.checkCollision(this.p1Rocket, ship)) {
                this.p1Rocket.reset();
                this.shipExplode(ship);
            }
        }, this);

        // increase speed after 30 sec
        if (this.clock.elapsed > 30000 && !this.speedBoost) {
            this.speedBoost = true;
            game.settings.spaceshipSpeed *= 1.5;
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {

            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        //temp hide ship
        ship.alpha = 0;
        // create explosion at ships pos
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and text update
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play("sfx-explosion");
    }
}