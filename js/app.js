var Game = require("./game.js");

console.log("Hello");
document.addEventListener("keydown",function (event) {
    game.turnFurry(event);
});

var game = new Game();
game.showFurry();
game.showCoin();
game.startGame();
