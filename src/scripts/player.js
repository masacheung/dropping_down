const CONSTANTS = {
    GRAVITY:  0.05,
    MOVE_SPEED:  8,
    TERMINAL_VEL:  12,
    PLAYER_WIDTH:  50,
    PLAYER_HEIGHT:  80
  };
  

export default class Player {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width /2.25;
        this.y = this.dimensions.height / 8;
        this.vel = 0;
    }

    movePlayer() {
        this.y += this.vel;
        this.vel += CONSTANTS.GRAVITY;

        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL){
            if (this.vel > 0){
                this.vel = CONSTANTS.TERMINAL_VEL;
            }else {
                this.vel = CONSTANTS.TERMINAL_VEL * -1;
            }
        }
    }

    moveLeft() {
        if (this.x > 0){
            this.x -= 5 * CONSTANTS.MOVE_SPEED;
        }
    }

    moveRight() {
        if (this.x + CONSTANTS.PLAYER_WIDTH < this.dimensions.width){
            this.x += 5 * CONSTANTS.MOVE_SPEED;
        }
    }

    animate(ctx) {
        this.movePlayer();
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx) {
        ctx.fillStyle = "#D3D3D3";
        ctx.fillRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
    }

    bounds() {
        return {
            left: this.x,
            right: this.x + 50,
            top: this.y,
            bottom: this.y + 80
        };
    }

    outOfBounds() {
        const aboveTheTop = this.y < 0;
        const belowTheBottom = this.y + CONSTANTS.PLAYER_HEIGHT > this.dimensions.height;
        return aboveTheTop || belowTheBottom;
    }

}