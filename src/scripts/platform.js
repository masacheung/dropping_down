export default class Platform {
    constructor(dimensions) {
        this.dimensions = dimensions;
    }

    animate(ctx) {
        this.drawBackground(ctx);
    }

    drawBackground(ctx) {
        ctx.fillStyle = "#800000";
        ctx.fillRect(0,0, this.dimensions.width, this.dimensions.height);
    }
}