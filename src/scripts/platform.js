const CONSTANTS = {
    SCALE: 2,
    PLATFORMWIDTH: 150,
    PLATFORMHEIGHT: 24,
    PLATFORMSPEED: 2
}

const TAG = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

export default class Platform {
    constructor(dimensions, running) {
        this.dimensions = dimensions;
        this.img = document.getElementById("img-bg");
        this.fireImg = document.getElementById("img-fire");
        this.wireImg = document.getElementById("img-wire");
        this.startImg = document.getElementById("img-start");
        this.platformImg = document.getElementById("img-normal");
        this.platformImgTrampoline = document.getElementById("img-trampoline");
        this.platformImgTrap = document.getElementById("img-trap");
        this.platformImgFake = document.getElementById("img-fake");
        this.levelUpAudio = document.getElementById("levelup");
        this.platforms = [];
        this.running = running;
        this.score = 0;
    }
    animate(ctx, running) {
        this.running = running;
        this.drawBackground(ctx);
        this.createPlatform();
        this.drawPlatform(ctx);
        this.movePlatform();

    }

    drawBackground(ctx) {
        if (this.running){
            ctx.drawImage(this.img, 0 , 0, this.dimensions.width,this.dimensions.height);
            ctx.drawImage(this.fireImg, 0, 370, this.dimensions.width, 700);
            ctx.drawImage(this.wireImg, -50, -45, 900, 100);
        } else {
            ctx.rect(0, 0, this.dimensions.width, this.dimensions.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
            ctx.fill();

            ctx.font = "25px bold Gill Sans";
            ctx.fillStyle = "#FC46AA";
            ctx.textAlign = "center";
            ctx.drawImage(this.startImg, 300, 200, this.dimensions.width/4 ,this.dimensions.height/4);

            ctx.fillText("Fill your Score!!! →", 690, this.dimensions.height - 480);

            ctx.fillText("Leaderboard!!! →", 700, this.dimensions.height - 400);

            ctx.fillText("Click to Start. Click To Pause.", this.dimensions.width/2, this.dimensions.height - 350);
            ctx.fillText("Moving Left Using [A] OR [←].", this.dimensions.width/2, this.dimensions.height - 270);
            ctx.fillText("Moving Right Using [D] OR [→].", this.dimensions.width/2, this.dimensions.height - 240);
        }
    }

    createPlatform() {
        if (this.platforms.length === 0) {
            let temp = this.createOnePlatform();
            temp[1] += 210;
            this.platforms.push(temp);
        }
            
        while (this.platforms.length < 8){
            let temp2 = this.createOnePlatform();
            let last;
            if(this.platforms.length === 1){
                last = this.platforms[0];
                temp2[1] = last[1] + 150;
            }else if(this.platforms.length > 1){
                last = this.platforms[this.platforms.length - 1];
                temp2[1] = last[1] + 150;
            }
            if (temp2[0] - CONSTANTS.PLATFORMWIDTH > 0 && temp2[0] + CONSTANTS.PLATFORMWIDTH < 800 && ((last[0] - temp2[0]) > 150 || (temp2[0] - last[0]) > 150)){
                this.platforms.push(temp2);
            }
        }
        if (!this.running){
            ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        } 
    }

    createOnePlatform() {
        let platform;
        let x = Math.random() * 800;
        let y = 125;
        let rand = Math.random() * 100;
        let idx = Math.random() * 26;

        let platformType = "normal";

        if (rand < 50) {
            platformType = "normal";
        }else if (rand < 60) {
            platformType = "trap";
        }else if (rand < 80) {
            platformType = "trampoline";
        }else if (rand < 90){
            platformType = "fake";
        }

        platform = [x, y, platformType, TAG[Math.floor(idx)]];
        return platform;
    }

    movePlatform() {
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

        if(this.score === 36 || this.score === 56 || this.score === 76 || this.score === 101){
            this.levelUpAudio.play();
        }
        for(let i = 0; i < this.platforms.length; i++){
            this.platforms[i][1] -= speed;
            if (this.platforms[i][1] <= -32){
                this.platforms.splice(i, 1);
            }
        }
    }

    drawPlatform(ctx) {
        if(this.running){
            this.platforms.forEach((ele) => {
                if (ele[2] === "normal"){
                    ctx.drawImage(this.platformImg, ele[0], ele[1], CONSTANTS.PLATFORMWIDTH, CONSTANTS.PLATFORMHEIGHT);
                }else if (ele[2] === "trap") {
                    ctx.drawImage(this.platformImgTrap, ele[0], ele[1], CONSTANTS.PLATFORMWIDTH, CONSTANTS.PLATFORMHEIGHT);
                }else if (ele[2] === "trampoline"){
                    ctx.drawImage(this.platformImgTrampoline, ele[0], ele[1], CONSTANTS.PLATFORMWIDTH, CONSTANTS.PLATFORMHEIGHT);
                }else if (ele[2] === "fake") {
                    ctx.drawImage(this.platformImgFake, ele[0], ele[1], CONSTANTS.PLATFORMWIDTH, CONSTANTS.PLATFORMHEIGHT);
                }
            });
        }
    }

    updateScore(score){
        this.score = score;
    }

}