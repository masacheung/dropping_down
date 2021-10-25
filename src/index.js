import Dropping from './scripts/game';

window.onload = function(){
    const canvas = document.getElementById('dropping-game');
    let game = new Dropping(canvas);
}