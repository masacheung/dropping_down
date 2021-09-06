const CONSTANTS = {
    GRAVITY:  0.05,
    MOVE_SPEED:  8,
    TERMINAL_VEL:  12,
    PLAYER_WIDTH:  75,
    PLAYER_HEIGHT:  80
  };

const hpBar = document.getElementById("hp-bar");

export default class Player {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width /2.25;
        this.y = 0;
        this.vel = 0;
        this.img = document.getElementById("img-char");
        this.life = 10;
        this.touch = undefined;
        this.platforms;
        this.platformAudio = document.getElementById("normal");
        this.platformTrampolineAudio = document.getElementById("trampoline");
        this.platformTrapAudio = document.getElementById("trap");
    }

    movePlayer() {
        if (this.touch === undefined){
            this.y += this.vel;
            this.vel += CONSTANTS.GRAVITY;

            if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL){
                if (this.vel > 0){
                    this.vel = CONSTANTS.TERMINAL_VEL;
                }else {
                    this.vel = CONSTANTS.TERMINAL_VEL * -1;
                }
            }
        } else {
            if (this.touch[2] === "normal"){
                this.y -= 2;
                this.vel = 0;
                if (this.life < 10){
                    this.life += 1;
                }
            }else if (this.touch[2] === "trampoline"){
                this.y -= 125;
                this.vel = 0;
            }else if (this.touch[2] === "trap"){
                this.life -= 2;
                this.y -=2;
                this.vel = 0;
            }
            if (this.x > this.touch[0] || this.x < this.touch[0]){
                this.touch = undefined;
            }
        }
        this.touchOn(this.platforms);
    }

    moveLeft() {
        if (this.x > 0){
            this.x -= 3 * CONSTANTS.MOVE_SPEED;
        }
    }

    moveRight() {
        if (this.x + CONSTANTS.PLAYER_WIDTH < this.dimensions.width){
            this.x += 3 * CONSTANTS.MOVE_SPEED;
        }
    }

    animate(ctx, platforms) {
        this.platforms = platforms;
        this.movePlayer();
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx) {
        // ctx.fillStyle = "#D3D3D3";
        // ctx.fillRect(this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
        ctx.drawImage(this.img, this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
    }

    bounds() {
        return {
            left: this.x,
            right: this.x + 75,
            top: this.y,
            bottom: this.y + 80
        };
    }

    outOfBounds() {
        const aboveTheTop = this.y + (CONSTANTS.PLAYER_HEIGHT / 5) < 0;
        const belowTheBottom = this.y + (CONSTANTS.PLAYER_HEIGHT/5) > this.dimensions.height;
        return aboveTheTop || belowTheBottom;
    }

    touchOn(platforms){
        platforms.forEach((ele) => {
            if (Math.floor(this.y + 65) - Math.floor(ele[1]) > 0 && Math.floor(this.y + 65) - Math.floor(ele[1]) < 25) {
                if (this.x  - ele[0] > -45 && this.x - ele[0] < 115){
                    this.touch = ele;
                    if (ele[2] === "normal"){
                        this.platformAudio.play();
                    }else if (ele[2] === "trampoline"){
                        this.platformTrampolineAudio.play();
                    }else if (ele[2] === "trap"){
                        this.platformTrapAudio.play();
                    }
                }else {
                    this.touch = undefined;
                }
            }
        });
    }
}