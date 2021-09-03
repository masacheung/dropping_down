import Player from "./player";
import Platform from "./platform";

export default class Dropping {
    constructor (canvas){
        this.ctx = canvas.getContext("2d");
        this.diemsions = {width: canvas.width, height: canvas.height};
        this.registerEvents();
        this.restart();
    }

    registerEvents() {
        this.boundClickHandler = this.click.bind(this);
        this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
      }
    
      click(e) {
        if (!this.running) {
          this.play();
        } 
      }

    play() {
        this.running = true;
        this.animate();
    }

    restart() {
        this.running = false;
        this.score = 0;
        this.player = new Player(this.diemsions);
        this.platform = new Platform(this.diemsions);

        this.animate();
    }

    registerEvents() {
        this.boundClickHandler = this.click.bind(this);
        this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
      }
    
      click(e) {
        if (!this.running) {
          this.play();
        } 
        this.bird.flap();
      }

    animate() {
        this.platform.animate(this.ctx);
        this.player.animate(this.ctx);

        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    gameOver() {
        return (
        this.platform.collidesWith(this.player.bounds()) || this.player.outOfBounds(this.height)
        );
    }
}