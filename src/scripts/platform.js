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
        this.platforms = [];
        this.running = running;
        this.score = 0;
    }

    animate(ctx, running) {
        this.running = running;
        this.drawBackground(ctx);
        // this.movePlatform();
        // this.createOnePlatform();

        this.createPlatform();
        this.movePlatform();
        this.drawPlatform(ctx);
    }

    drawBackground(ctx) {
        // ctx.fillStyle = "#800000";
        // ctx.fillRect(0,0, this.dimensions.width, this.dimensions.height);
        // ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        // ctx.fillStyle = "rgba(0,0,0,0.3)";
        // ctx.fillRect(0,0,this.dimensions.width,this.dimensions.height);
        if (this.running){
            ctx.drawImage(this.img, 0 , 0, this.dimensions.width,this.dimensions.height);
            ctx.drawImage(this.fireImg, 0, 370, this.dimensions.width, 700);
            ctx.drawImage(this.wireImg, -50, -45, 900, 100);
        } else {
            // console.log(this.score);
            // ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
            ctx.rect(0, 0, this.dimensions.width, this.dimensions.height);
            ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
            ctx.fill();

            ctx.font = "25px bold Gill Sans";
            ctx.fillStyle = "#FC46AA";
            ctx.textAlign = "center";
            ctx.drawImage(this.startImg, 300, 200, this.dimensions.width/4 ,this.dimensions.height/4);
            ctx.fillText("Click to Start. Click To Pause.", this.dimensions.width/2, this.dimensions.height - 350);
            // ctx.fillText("'Everytime Pause the Game, the charater will move faster!!!'", this.dimensions.width/2, this.dimensions.height - 315);
            ctx.fillText("Moving Left Using [W] OR [←].", this.dimensions.width/2, this.dimensions.height - 270);
            ctx.fillText("Moving Right Using [D] OR [→].", this.dimensions.width/2, this.dimensions.height - 240);
            // ctx.fillText("Moving Left Using [W] || [←]. Moving Right Using [D] || [→].")
        }
    }

    createPlatform() {
        if (!this.platforms.length) {
            let temp = this.createOnePlatform();
            temp[1] += 210;
            this.platforms.push(temp);
        }
        while (this.platforms.length < 8){
            let temp = this.createOnePlatform();
            let last = this.platforms[this.platforms.length - 1];
            temp[1] = last[1] + 150;
            if (temp[0] - CONSTANTS.PLATFORMWIDTH > 0 && temp[0] + CONSTANTS.PLATFORMWIDTH < 800 && ((last[0] - temp[0]) > 150 || (temp[0] - last[0]) > 150)){
                this.platforms.push(temp);
            }
        }
        if (this.running){

        } 
        else {
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

        for(let i = 0; i < this.platforms.length; i++){
            this.platforms[i][1] -= speed;
            if (this.platforms[i][1] <= -32){
                this.platforms.splice(i, 1);
            }
        }
    }

    drawPlatform(ctx) {
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

    // drawGameOver(ctx, score){
    //     console.log(this.score);
    //     // ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    //     ctx.rect(0, 0, this.dimensions.width, this.dimensions.height);
    //     ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    //     ctx.fill();

    //     ctx.font = "25px bold Gill Sans";
    //     ctx.fillStyle = "#FC46AA";
    //     ctx.textAlign = "center";
    //     ctx.fillText("Game Over.", this.dimensions.width/2, this.dimensions.height - 350);
    //     ctx.fillText("Your Score " + score, this.dimensions.width/2, this.dimensions.height - 275);
    // }

    updateScore(score){
        this.score = score;
        // console.log(this.score);
    }

}