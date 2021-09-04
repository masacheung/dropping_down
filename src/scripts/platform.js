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
        ctx.fillStyle = "#800000";
        ctx.fillRect(0,0, this.dimensions.width, this.dimensions.height);
    }

    createPlatform() {
        
    }

    createOnePlatform() {
        var platform;
        var x = Math.random() * (this.dimensions.width - 96 * scale - 40 * scale) + 20 * scale;
        var y = this.dimensions.height;
        var rand = Math.random() * 100;

        let platformType = "normal";
    }

    movePlatform() {

    }

    drawPlatform(ctx) {

    }
}