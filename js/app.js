// Enemies our player must avoid
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //recycle enimies when they pass off the screen
    if (this.x < CANVAS_WIDTH)
        this.x += this.speed * dt;
    else //off the screen bring back
        this.x = this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 400;
    this.speed = 90;
};

Player.prototype.update = function(dt) {
    //update the location of the player based on the key pressed
    if (this.key === 'left' && this.x > 0)
        this.x = this.x - 101;
    else if (this.key === 'right' && this.x < 400)
        this.x = this.x + 101;
    else if (this.key === 'up' && this.y > 0)
        this.y = this.y - 90;
    else if (this.key === 'down' && this.y < 400)
        this.y = this.y + 90;
    else ;
    //this is to reset the key since
    //if removed, one click will move to the edge.
    this.key = undefined;

    var self = this;

    for (var i = 0; i < allEnemies.length; i++) {
        if (hit(allEnemies[i], this)){
            //collesion occurred. Reset Game
            resetGame();
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.key = key;
}

function hit(anEnemy, aPlayer){
    //this will determin if the enemy front reached the player body
    //i.e. a hit made.
    //each box is 100px wide and 90px hight, devide by two gives the
    //below numbers used in the addition. Testing confirmed effecient
    if (aPlayer.x >= anEnemy.x - 50 &&
        aPlayer.x < anEnemy.x + 50 &&
        aPlayer.y >= anEnemy.y - 45 &&
        aPlayer.y < anEnemy.y + 45 ){
        resetGame();
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

function addEnimies(theEnemies){
    theEnemies.push(new Enemy(0, 60));
    theEnemies.push(new Enemy(-40, 140));
    theEnemies.push(new Enemy(0, 230));
}

addEnimies(allEnemies);
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//to reset the game and return player to initial place
function resetGame() {
    player.x = 202;
    player.y = 400;
    allEnemies = [];
    addEnimies(allEnemies);
}
