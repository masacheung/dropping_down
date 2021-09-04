import Player from "./player";
import Platform from "./platform";

const hpBar = document.getElementById("hp-bar");
const score = document.getElementById("score");

export default class Dropping {
    debugger
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
        
        window.addEventListener("keydown", (event) => {
            switch (event.key){
                case 'ArrowLeft':
                    this.player.moveLeft();
                    break;
                case 'ArrowRight':
                    this.player.moveRight();
                    break;
                case 'a':
                    this.player.moveLeft();
                    break;
                case 'd':
                    this.player.moveRight();
                    break;
            }
        })

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
    
    animate() {
        this.platform.animate(this.ctx);
        this.player.animate(this.ctx);

        // if (this.gameOver()) {
        //     alert(this.score);
        //     this.restart();
        // }

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