import Player from "./player";
import Platform from "./platform";

const SCORE = document.getElementById("score");
const start = document.getElementById("start");

// const GAMESTATUS = {
//     PAUSED: 0,
//     RUNNING: 1,
//     MENU: 2,
//     GAMEOVE: 3
// }

export default class Dropping {
    constructor (canvas){
        this.ctx = canvas.getContext("2d");
        this.gameoverAUDIO = document.getElementById("fall");
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
        
        // if (this.gamestatus === GAMESTATUS.PAUSED) return;

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
                // case 'Spacebar':
                //     this.togglePause();
                //     break;
            }
        })

    }

    play() {
        this.running = true;
        // this.gamestatus = GAMESTATUS.RUNNING;
        let start = new Date();
        this.min = start.getMinutes();
        this.sec = start.getSeconds();
        this.animate();
    }

    restart() {
        this.running = false;
        // this.gamestatus = GAMESTATUS.GAMEOVE;
        this.score = 0;
        this.player = new Player(this.diemsions);
        this.platform = new Platform(this.diemsions);

        this.animate();
    }
    
    animate() {
        this.platform.animate(this.ctx);
        this.player.animate(this.ctx, this.platform.platforms);
        // this.player.touchOn(this.platform.platforms);

        if (this.gameOver()) {
            this.gameoverAUDIO.play();
            this.restart();
            alert(this.score);
        }

        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }

        this.countScore();
    }

    gameOver() {
        return this.player.outOfBounds();
    }

    // togglePause() {
    //     if(this.gamestatus === GAMESTATUS.PAUSED){
    //         this.gamestatus = GAMESTATUS.RUNNING;
    //     } else {
    //         this.gamestatus = GAMESTATUS.PAUSED;
    //     }
    // }

    countScore() {
        let time = new Date();
        let tempMin = time.getMinutes();
        let tempSecound = time.getSeconds();
        let score;

        if (tempMin > this.min){
            let ex = tempMin - this.min;
            tempSecound = tempSecound + (ex * 60);
            score = tempSecound - this.sec;
        }else {
            score = tempSecound - this.sec;
        }

        this.score = Math.floor(score / 2);
        SCORE.innerHTML =this.score;
    }

}