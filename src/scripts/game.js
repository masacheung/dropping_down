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
        this.playButton = document.body.querySelector("play");
        this.pauseButton = document.body.querySelector("stop");
        this.bgmusic = document.getElementById("bgmusic");
        this.bgmusic.volume = 0.4;
        this.mute = false;
        this.att = 0;
        this.bgmusic.loop = true;
        this.diemsions = {width: canvas.width, height: canvas.height};
        this.registerEvents();
        // this.registerKey();
        this.restart();
    }


    registerEvents() {
        this.boundClickHandler = this.click.bind(this);
        this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    }

    registerKey(){
        this.boundKeyHandler = this.key.bind(this);
        this.ctx.canvas.addEventListener("keydown", this.boundKeyHandler);
    }

    key(e){
        if(this.running){
            switch (e.key){
                case 'ArrowLeft':
                    this.player.moveLeft("keydown");
                    break;
                case 'ArrowRight':
                    this.player.moveRight("keydown");
                    break;
                case 'a':
                    this.player.moveLeft("keydown");
                    break;
                case 'd':
                    this.player.moveRight("keydown");
                    break;
                case 'm':
                    this.toggleMute();
                    break;
            }
        }
    } 
    
    click(e) {
        if (!this.running) {
          this.play();     
        }else {
            this.togglePause();
        }
    }

    eventListeners() {
        document.addEventListener("keydown", this.player.keyDown.bind(this));
        document.addEventListener("keyup", this.player.keyUp.bind(this));
    }

    play() {
        this.att += 1;
        this.running = true;
        this.gamestatus = GAMESTATUS.RUNNING;
        let start = new Date();
        this.hour = start.getHours();
        this.min = start.getMinutes();
        this.sec = start.getSeconds();
        if(this.mute === false){
            this.bgmusic.play();
        }
        this.animate();
    }

    restart() {
        this.running = false;
        this.gamestatus = GAMESTATUS.GAMEOVE;
        this.score = 0;
        this.platform = new Platform(this.diemsions, this.running, this.mute);
        this.player = new Player(this.diemsions, this.running, this.ctx, this.mute);

        if(this.att === 0){
            window.addEventListener("keydown", (event) => {
                if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
                    event.preventDefault();
                }
                switch (event.key){
                    case 'ArrowLeft':
                        this.player.moveLeft("keydown");
                        break;
                    case 'ArrowRight':
                        this.player.moveRight("keydown");
                        break;
                    case 'a':
                        this.player.moveLeft("keydown");
                        break;
                    case 'd':
                        this.player.moveRight("keydown");
                        break;
                    case 'm':
                        this.toggleMute();
                        break;
                }
            }) 
        }
        this.animate();
    }
    
    animate() {
        this.platform.animate(this.ctx, this.running);
        this.player.animate(this.ctx, this.platform.platforms, this.running, this.score);
        if(this.att === 1){
            this.att += 1;
            this.restart();
            this.play();
        }

        if(this.gamestatus === GAMESTATUS.PAUSED) return;
        
        if (this.gameOver()) {
            this.att += 1;
            this.bgmusic.pause();
            this.bgmusic.currentTime = 0;
            if(this.mute === false){
                this.gameoverAUDIO.play();
            }
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
            this.running = true;
            this.bgmusic.play();
        } else {
            this.gamestatus = GAMESTATUS.PAUSED;
            this.running = false;
            this.bgmusic.pause();
        }
    }

    toggleMute(){
        if(this.mute === true){
            this.bgmusic.play();
            this.player.toggleMute();
            this.platform.toggleMute();
            this.mute = false;
        }else {
            this.mute = true;
            this.bgmusic.pause();
            this.player.toggleMute();
            this.platform.toggleMute();
        }
    }

    countScore() {
        let time = new Date();
        let timeHour = time.getHours();
        let tempMin = time.getMinutes();
        let tempSecound = time.getSeconds();
        let score;

        if (timeHour < this.hour){
            timeMin = timeMin + 60;
        }

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

}