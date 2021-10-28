Man Tat Masa Cheung

<a href="https://masacheung.github.io/dropping_down/">Live Demo</a>

![DEMO](https://github.com/masacheung/dropping_down/blob/main/assests/icon/dropping.gif)


### Overview
<ul>
    <li>Dopping Down is a one player game and the goal of this game is go down as many staris as possible.</li>
    <li>Create different kind of stairs, "fake stairs", "death stairs", etc.</li>
    <li>Player will have 10 health point.</li>
    <li>When player lose all health point "GAME OVER"</li>
    <li>When player drop down to the ground "GAME OVER"</li>
</ul>

<h2>Functionality & MVPs</h2>
<ul>
    <li>Clike the canvas to Start the Game or Pasue the game</li>
    <li>'M' to Mute or Unmute the music</li>
    <li>Navigate the character by using "A", "D" keys OR arrow keys.</li>
</ul>

<h2>Implementation</h2>

Game Stairs

Stairs is the main feature in this game. There are four different type of stairs.

```Javascript

createOnePlatform() {
    let platform;
    let x = Math.random() * 800;
    let y = 125;
    let rand = Math.random() * 100;
    let idx = Math.random() * 26;

    let platformType = "normal";

    if (rand < 50) {
        platformType = "normal";
    }else if (rand < 60) {
        platformType = "trap";
    }else if (rand < 80) {
        platformType = "trampoline";
    }else if (rand < 90){
        platformType = "fake";
    }

    platform = [x, y, platformType, TAG[Math.floor(idx)]];
    return platform;
}

```

Character touch on Stairs

```Javascript

touchOn(platforms){
    platforms.forEach((ele) => {
        if (Math.floor(this.y + 65) - Math.floor(ele[1]) > 0 && Math.floor(this.y + 65) - Math.floor(ele[1]) < 25) {
            if (this.x  - ele[0] > -45 && this.x - ele[0] < 115){
                this.touch = ele;
                if (ele[2] === "fake") {
                    if(this.mute === false){
                        this.platformFakeAudio.play();
                    }
                }
                if (ele[2] === "trampoline") {
                    if(this.mute === false){
                        this.platformTrampolineAudio.play();
                    }
                }else if (!this.visited.includes(ele[3])){
                    this.visited.push(ele[3]);
                    if (ele[2] === "normal"){
                        if (this.life < 10){
                            this.life += 1;
                            if(this.mute === false){
                                this.platformHealingAudio.play();
                            }
                            this.healGreen(this.ctx);
                            this.updateHpBar();
                        }else {
                            if(this.mute === false){
                                this.platformAudio.play();
                            }
                        }
                    }else if (ele[2] === "trap"){
                        if(this.mute === false){
                            this.platformTrapAudio.play();
                        }
                        this.trapRed(this.ctx);
                        this.life -= 4;
                        this.updateHpBar();
                    }
                }
            }else {
                this.touch = undefined;
                this.visited.shift();
            }
        }
    });
}

```

### Wireframes

![Image of Wireframes](https://github.com/masacheung/dropping_down/blob/main/assests/wireframs.png)

https://wireframe.cc/ypTdwI

<h2>Technologies, Libraries, APIs**</h2>
<ul>
    <li>Javascript</li>
    <li>HTML</li>
    <li>CSS</li>
    <li>Webkit</li>
    <li>Webpack</li>
    <li>NPM</li>
</ul>


<h2>Implementation Timeline</h2>
<ul>
    <li>Friday: Finish the HTML setup. Title, Health Point, Scoure, Game Canvas, Instroction. Create the game and character can drop down to touch "GAME OVER"</li>
    <li>Monday: Can genrate the "stairs" and can controll the character move left or right to drop down.</li>
    <li>Tuesday: Finish up the dropping down game.</li>
    <li>Wednesday: Apply CSS and design to the layout from the wireframe and any bugs still occuring.</li>
    <li>Thursday: Deploy to Github Page.</li>
</ul>


<h2>Bonus Features</h2>
<ul>
    <li>Add audio effect</li>
    <li>Toggle Pause</li>
    <li>Starting Screen</li>
</ul>

<h2>Credits</h2>
<ul>
    <li>Amoung Us -- Pic</li>
</ul>
