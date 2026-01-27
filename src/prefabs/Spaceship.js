class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.flipped = false;

        this.ufo = false;
        if (texture == "ufo") this.ufo = true;

        if (Math.floor(Math.random() * 2) == 0) {
            this.moveSpeed *= -1;
            this.setFlipX(true);
            this.flipped = true;
        }

    }

    update() {
        //update moveSpeed
        this.moveSpeed = game.settings.spaceshipSpeed;
        if (this.flipped) {
            this.moveSpeed *= -1;
        }
        // move spaceship 
        if (this.ufo) {
            this.x -= this.moveSpeed * 1.3;
        } else {
            this.x -= this.moveSpeed;
        }

        // wrap from left to right edge
        if (this.x <= 0 - this.width*2) {
            if (this.ufo) {
                this.resetOtherSide();
                this.flipped = !this.flipped;
                this.y += borderUISize * 2;
                if (this.y >= borderUISize*9 + borderPadding) this.y = borderUISize*5 + borderPadding;
            } else {
                this.reset();
            }
        } else if (this.x >= game.config.width + this.width) {
            if (this.ufo) {
                this.reset();
                this.flipped = !this.flipped;
                this.y += borderUISize * 2;
                if (this.y >= borderUISize*9 + borderPadding) this.y = borderUISize*5 + borderPadding;
            } else {
                this.resetOtherSide();
            }
            
        }

        if (this.y > borderUISize*12) {
            this.destroy();
        }
    }

    reset() {
        this.x = game.config.width;
    }

    resetOtherSide() {
        this.x = 0 - this.width;
    }
}