const CONSTANTS = {
    SCALE: 2,
    PLATFORMWIDTH: 150,
    PLATFORMHEIGHT: 24,
    PLATFORMSPEED: 2
}


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
        this.createOnePlatform();
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

    }

    createOnePlatform() {
        let platform;
        let x = Math.random() * 800;
        let y = Math.random() * 800;
        let rand = Math.random() * 100;

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

        this.platforms.push([x,y]);
    }

    movePlatform() {

    }

    drawPlatform(ctx) {
        this.platforms.forEach((ele) => {
            ctx.drawImage(this.platformImg, ele[0], ele[1], CONSTANTS.PLATFORMWIDTH, CONSTANTS.PLATFORMHEIGHT);
        });
    }
}