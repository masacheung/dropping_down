import Player from "./player";
import Platform from "./platform";

const SCORE = document.getElementById("score");

const GAMESTATUS = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVE: 3
}

export default class Dropping {
    constructor (canvas){
        this.ctx = canvas.getContext("2d");
        this.gameoverAUDIO = document.getElementById("fall");
        this.playButton = document.getElementById("play");
        this.pauseButton = document.getElementById("stop");
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
                // case " ":
                //     this.togglePause();
                //     break;
            }
        })

    }

    play() {
        this.running = true;
        this.gamestatus = GAMESTATUS.RUNNING;
        let start = new Date();
        this.min = start.getMinutes();
        this.sec = start.getSeconds();
        this.animate();
    }

    restart() {
        this.running = false;
        this.gamestatus = GAMESTATUS.GAMEOVE;
        this.score = 0;
        this.player = new Player(this.diemsions, this.running);
        this.platform = new Platform(this.diemsions, this.running);

        this.animate();
    }
    
    animate() {
        this.platform.animate(this.ctx, this.running);
        this.player.animate(this.ctx, this.platform.platforms, this.running, this.score);
        // this.player.touchOn(this.platform.platforms);
        
        if (this.gameOver()) {
            // this.button.style.display = "block";
            // this.ctx.rect(0, 0, this.dimensions.width, this.dimensions.height);
            // this.ctx.fillStyle = "rgba(0,0,0,0.5)";
            // this.ctx.fill();

            // this.ctx.font = "30px Arial";
            // this.ctx.fillStyle = "white";
            // this.ctx.textAlign = "center";
            // this.ctx.fillText("GAME OVER!", this.dimensions.width/2, this.dimensions.height/2);
            // $(function() {
            //     $("#dialog").dialog();
            // });
              
            this.gameoverAUDIO.play();
            // this.drawGameOver(this.ctx);
            alert("Your score is " + this.score + " not BAD!!!");
            this.restart();
        }

        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }

        this.countScore();
    }

    gameOver() {
        return this.player.outOfBounds() || this.player.life <= 0;
    }

    togglePause() {
        if(this.gamestatus === GAMESTATUS.PAUSED){
            this.gamestatus = GAMESTATUS.RUNNING;
        } else {
            this.gamestatus = GAMESTATUS.PAUSED;
        }
    }

    countScore() {
        let time = new Date();
        let tempMin = time.getMinutes();
        let tempSecound = time.getSeconds();
        let score;

        if (tempMin > this.min){
            let ex = tempMin - this.min;
            tempSecound = tempSecound + (ex * 60);
            score = tempSecound - this.sec;
        }else if (tempMin === this.min && tempSecound < this.sec){
            score = this.sec - tempSecound;
        } else {
            score = tempSecound - this.sec;
        }

        this.score = Math.floor(score / 2);
        SCORE.innerHTML =this.score;
        this.platform.updateScore(this.score);
    }

    // drawGameOver(ctx) {
    //     ctx.rect(0, 0, this.dimensions.width, this.dimensions.height);
    //     ctx.fillStyle = "rgba(0,0,0,0.5)";
    //     ctx.fill();

    //     ctx.font = "30px Arial";
    //     ctx.fillStyle = "white";
    //     ctx.textAlign = "center";
    //     ctx.fillText("Game Over", this.dimensions.width/2, this.dimensions.height/2);
    //     this.ctx.fillText(this.score, this.diemsions.width/2, this.diemsions.height + 50);
    // }

}