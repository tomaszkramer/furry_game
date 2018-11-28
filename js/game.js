var Coin = require("./coin.js");
var Furry = require("./furry.js");

function Game() {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x,y) {
        return x + (y*10);
    };
    var self = this;
    this.showFurry = function () {
        self.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
        // self.hideVisibleFurry();
    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    };
    this.startGame = function(){
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        },250);
    };
    this.moveFurry = function () {
        if(this.furry.direction === "right"){
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left"){
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "down"){
            this.furry.y = this.furry.y + 1;
        } else if (this.furry.direction === "up"){
            this.furry.y = this.furry.y -1;
        }
        this.showFurry();
        this.gameOver();
        this.checkCoinCollision();
    };
    this.hideVisibleFurry = function () {
        var prevFurry = document.querySelector(".furry");
        console.log(prevFurry);
        if(prevFurry !== null){
            prevFurry.classList.remove("furry");
        }
    };
    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    };
    this.checkCoinCollision = function () {
        var currentCoin = document.querySelector(".coin");
        if(this.coin.x === this.furry.x && this.coin.y === this.furry.y){
            currentCoin.classList.remove("coin");
            this.score++;
            var newScore = document.querySelector("#score div strong");
            newScore.innerHTML = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };
    this.gameOver = function () {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){
            self.startGame = clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            var newScore = document.querySelector("#score div strong");
            newScore.innerHTML = "Game Over your score is: " + this.score;

        }
    }
}

module.exports = Game;