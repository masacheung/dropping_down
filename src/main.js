const scale = 2;

var game = new Phaser.Game(800, 800, Phaser.AUTO);

var player;
var keyboard;

var platforms = [];

var leftWalls;
var rightWalls;
var ceilings;

var text1;
var text2;
var text3;

var distance = 0;
var status = "running";

const hpBar = document.getElementById("hp-bar");
const score = document.getElementById("score");

function create() {
    keyboard = game.input.keyboard.addKeys({
        enter: Phaser.Keyboard.ENTER,
        up: Phaser.Keyboard.UP,
        down: Phaser.Keyboard.DOWN,
        left: Phaser.Keyboard.LEFT,
        right: Phaser.Keyboard.RIGHT,
        w: Phaser.Keyboard.W,
        a: Phaser.Keyboard.A,
        s: Phaser.Keyboard.S,
        d: Phaser.keyboard.D
    })
}
