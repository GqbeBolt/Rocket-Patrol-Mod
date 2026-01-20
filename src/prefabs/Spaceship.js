class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.flipped = false;

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
        this.x -= this.moveSpeed;

        // wrap from left to right edge
        if (this.x <= 0 - this.width*2) {
            this.reset();
        } else if (this.x >= game.config.width + this.width) {
            this.resetOtherSide();
        }
    }

    reset() {
        this.x = game.config.width;
    }

    resetOtherSide() {
        this.x = 0 - this.width;
    }
}