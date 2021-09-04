const scale = 2;

export default class Platform {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.platform = [];
    }

    animate(ctx) {
        this.drawBackground(ctx);
    }

    drawBackground(ctx) {
        // ctx.fillStyle = "#800000";
        // ctx.fillRect(0,0, this.dimensions.width, this.dimensions.height);
        ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0,0,this.dimensions.width,this.dimensions.height);
    }

    createPlatform() {

    }

    createOnePlatform() {
        var platform;
        var x = Math.random() * (this.dimensions.width - 96 * scale - 40 * scale) + 20 * scale;
        var y = this.dimensions.height;
        var rand = Math.random() * 100;

        let platformType = "normal";
        if (rand < 50) {
            this.platform.push([x,y,"normal"])
        }else if (rand < 60) {
            this.platform.push([x,y,"nails"]);
            platformType = "nails";
        }else if (ramd <80) {
            this.platform.push([x,y,"jump"]);
            platformType = "jump";
        }else {
            this.platform.push([x,y,"fake"]);
            platformType = "fake";
        }
    }

    movePlatform() {

    }

    drawPlatform(ctx) {

    }
}