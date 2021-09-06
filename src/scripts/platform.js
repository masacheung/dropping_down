const CONSTANTS = {
    SCALE: 2,
    PLATFORMWIDTH: 150,
    PLATFORMHEIGHT: 24,
    PLATFORMSPEED: 2
}

const TAG = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

export default class Platform {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.img = document.getElementById("img-bg");
        this.fireImg = document.getElementById("img-fire");
        this.wireImg = document.getElementById("img-wire");
        this.platformImg = document.getElementById("img-normal");
        this.platforms = [];
    }

    animate(ctx) {
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
        ctx.drawImage(this.img, 0 , 0, this.dimensions.width,this.dimensions.height);
        ctx.drawImage(this.fireImg, 0, 370, this.dimensions.width, 700);
        ctx.drawImage(this.wireImg, -50, -45, 900, 100);
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
    }

    createOnePlatform() {
        let platform;
        let x = Math.random() * 800;
        let y = 125;
        let rand = Math.random() * 100;
        let idx = Math.random(26);

        let platformType = "normal";
        // if (rand < 50) {
        //     platform = [x,y,"normal"];
        // }else if (rand < 60) {
        //     platform = [x,y,"nails"];
        //     platformType = "nails";
        // }else if (ramd <80) {
        //     platform = [x,y,"jump"];
        //     platformType = "jump";
        // }else {
        //     platform = [x,y,"fake"];
        //     platformType = "fake";
        // }

        platform = [x, y, TAG[idx]];
        return platform;

    }

    movePlatform() {
        for(let i = 0; i < this.platforms.length; i++){
            let platform = this.platforms[i];
            this.platforms[i][1] -= 2;
            if (this.platforms[i][1] <= -32){
                this.platforms.splice(i, 1);
            }
        }
    }

    drawPlatform(ctx) {
        this.platforms.forEach((ele) => {
            ctx.drawImage(this.platformImg, ele[0], ele[1], CONSTANTS.PLATFORMWIDTH, CONSTANTS.PLATFORMHEIGHT);
        });
    }

}