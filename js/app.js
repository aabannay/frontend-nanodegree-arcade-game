//variables for the game
var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;
var MIN_SPEED = 50;
var MAX_SPEED = 200;
var PLAYER_X = 202; //initial position of the player on X axis
var PLAYER_Y = 400;  //initial position of the player on Y axix
var X_MOVE = 101; //movement on the X axis
var Y_MOVE = 90; //movement on the Y axis
var START_EDGE = 0;
var END_EDGE = 400;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //location of the enemy on x,y coordinates.
    this.x = x;
    this.y = y;
    //the speed of the enemy movement.
    //this is assigned randomly when enemy is created.
    this.speed = Math.floor(Math.random() * MAX_SPEED) + MIN_SPEED;
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
    else //off the screen bring back. Start on -30 after recycle.
        this.x = -30;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //sprite method for the charecter
    this.sprite = 'images/char-boy.png';
    //starting position of the player
    this.x = PLAYER_X;
    this.y = PLAYER_Y;
    this.speed = MIN_SPEED * 1.5;
};

Player.prototype.update = function(dt) {
    //update the location of the player based on the key pressed

    if (this.key === 'left' && this.x > START_EDGE)
        this.x = this.x - X_MOVE;
    else if (this.key === 'right' && this.x < END_EDGE)
        this.x = this.x + X_MOVE;
    else if (this.key === 'up' && this.y > START_EDGE)
        this.y = this.y - Y_MOVE;
    else if (this.key === 'down' && this.y < END_EDGE)
        this.y = this.y + Y_MOVE;
    else ;
    //this is to reset the key since
    //if removed, one click will move to the edge.
    this.key = undefined;

    //check for hit with any enemy.
    for (var i = 0; i < allEnemies.length; i++) {
        if (hit(allEnemies[i], this)){
            //collesion occurred. Reset Game
            resetGame();
        }
    }

    //if reached water then reset game
    if (this.y < 0) {
        //alert the player upon winning the game.
        alert('YOU WON');
        resetGame();
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    //the key pressed and received from event listener below.
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
        return true;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//function to add the enemies to the array of enemies and set the positions
//these positions are chosen based on testing done during development.
function addEnimies(theEnemies){
    theEnemies.push(new Enemy(0, 60));
    theEnemies.push(new Enemy(-40, 140));
    theEnemies.push(new Enemy(25, 230));
}

//call adding enemies function
addEnimies(allEnemies);

//make a player variable that is an instant of the player class.
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
    player.x = PLAYER_X;
    player.y = PLAYER_Y;
    allEnemies = [];
    addEnimies(allEnemies);
}
