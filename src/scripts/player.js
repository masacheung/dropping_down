const CONSTANTS = {
    GRAVITY:  0.05,
    MOVE_SPEED:  8,
    TERMINAL_VEL:  12,
    PLAYER_WIDTH:  75,
    PLAYER_HEIGHT:  80
  };

const hpBar = document.getElementById("hp-bar");

export default class Player {
    constructor(dimensions, running, ctx, mute) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width /2.25;
        this.y = 0;
        this.vel = 0;
        this.img = document.getElementById("img-char");
        this.life = 10;
        this.touch = undefined;
        this.platforms;
        this.running = running;
        this.visited = [];
        this.ctx = ctx;
        this.score;
        this.keys = [];
        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.moving = false;
        this.platformAudio = document.getElementById("normal");
        this.platformHealingAudio = document.getElementById("healing");
        this.platformTrampolineAudio = document.getElementById("trampoline");
        this.platformTrapAudio = document.getElementById("trap");
        this.platformFakeAudio = document.getElementById("fake");
        this.mute = mute;
    }

    keyDown(e) {
        this.keys[e.keyCode] = true;
        this.moving = true;
        this.move();
    }

    keyUp(e) {
        delete this.keys[e.keyCode];
        this.moving = false;
    }

    move() {
        if(this.keys[65]){
            this.x -= 10;
        }else if (this.keys[68]){
            this.x += 10;
        }
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
            if (this.touch[2] === "normal" || this.touch[2] === "trap"){
                let speed;
                if (this.score <= 35){
                    speed = 2;
                } else if (this.score <= 55){
                    speed = 4;
                }else if (this.score <= 75){
                    speed = 6;
                }else if (this.score <= 100){
                    speed = 10;
                }
                this.y -= speed;
                this.vel = 0;
            }else if (this.touch[2] === "trampoline"){
                this.y -= 125;
                this.vel = 0;
            }

            if (this.x > this.touch[0] || this.x < this.touch[0]){
                this.touch = undefined;
            }
        }
        this.touchOn(this.platforms);
    }

    moveLeft(string) {
        if (this.x > 0){
            this.x -= 3 * CONSTANTS.MOVE_SPEED;
        }
    }

    moveRight(string) {
        if (this.x + CONSTANTS.PLAYER_WIDTH < this.dimensions.width){
            this.x += 3 * CONSTANTS.MOVE_SPEED;
        }
    }

    animate(ctx, platforms, running, score) {
        this.platforms = platforms;
        this.running = running;
        this.ctx = ctx;
        this.score = score;
        this.movePlayer();
        this.updateHpBar();
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx) {
        if (this.running){
            ctx.drawImage(this.img, this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
        }
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
        if (aboveTheTop || belowTheBottom) {
            this.trapRed(this.ctx);
            return true;
        }
    }

    touchOn(platforms){
        platforms.forEach((ele) => {
            if (Math.floor(this.y + 65) - Math.floor(ele[1]) > 0 && Math.floor(this.y + 65) - Math.floor(ele[1]) < 25) {
                if (this.x  - ele[0] > -45 && this.x - ele[0] < 115){
                    this.touch = ele;
                    if (ele[2] === "fake") {
                        if(this.mute === false){
                            this.platformFakeAudio.play();
                        }
                    }
                    if (ele[2] === "trampoline") {
                        if(this.mute === false){
                            this.platformTrampolineAudio.play();
                        }
                    }else if (!this.visited.includes(ele[3])){
                        this.visited.push(ele[3]);
                        if (ele[2] === "normal"){
                            if (this.life < 10){
                                this.life += 1;
                                if(this.mute === false){
                                    this.platformHealingAudio.play();
                                }
                                this.healGreen(this.ctx);
                                this.updateHpBar();
                            }else {
                                if(this.mute === false){
                                    this.platformAudio.play();
                                }
                            }
                        }else if (ele[2] === "trap"){
                            if(this.mute === false){
                                this.platformTrapAudio.play();
                            }
                            this.trapRed(this.ctx);
                            this.life -= 4;
                            this.updateHpBar();
                        }
                    }
                }else {
                    this.touch = undefined;
                    this.visited.shift();
                }
            }
        });
    }

    updateHpBar() {
        if (this.life <= 0){
            const boxes = Array.from(hpBar.children);
            boxes.forEach( (ele) => {
                ele.className = "hp-empty";
            });
        }
        const currentHp = this.life;
        const boxes = Array.from(hpBar.children);

        const actives = boxes.slice(0, currentHp);
        const empties = boxes.slice(currentHp);

        actives.forEach( (ele) => {
            ele.className = "hp-active";
        });

        empties.forEach( (ele) => {
            ele.className = "hp-empty";
        });
    }

    trapRed(ctx) {
        ctx.fillStyle = "#ff1a1a";
        ctx.fillRect(0,0, this.dimensions.width, this.dimensions.height);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
    }

    healGreen(ctx) {
        ctx.fillStyle = "#008000";
        ctx.fillRect(0,0, this.dimensions.width, this.dimensions.height);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
    }

    toggleMute(){
        if(this.mute === true){
            this.mute = false;
        }else {
            this.mute = true;
        }
    }

}