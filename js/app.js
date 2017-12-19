// Sets an initial player score of 0.
var score = 0;
//sets an initial lives to player
var lives = 6;
document.getElementById('playerScore').innerHTML = score;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
};
//reset function for when player dies or gets key
function reset() {
    player.x = 200;
    player.y = 320;
    lives = lives - 1;
    score = 0;
	document.getElementById('playerScore').innerHTML = score;
    var lifeSpanElement = document.getElementById("lives");
    lifeSpanElement.innerHTML = lives;
    if (lives === 0) {
        document.write("<h1>Game Over</h1><h3>Refresh to play again</h3>");
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	 this.x = this.x + (dt * 300 * Math.random());
   // If the enemy and the player collide.
    if (this.x - player.x < 50 && this.x - player.x > 0 && this.y === player.y) {
        reset()
    };
    //resets enemys at start after reaching end of board
    if (this.x > 505) {
        this.x = -90;
    }
	
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
};
// Is called every time the player position is updated
Player.prototype.update = function() {
 	
	// If the player reaches the water
	if (player.y < 20) {
	score++;
	document.getElementById('playerScore').innerHTML = score;
	this.reset();
}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if(direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if(direction == 'down' && this.y < 400) {
        this.y += 50;
    }
};

// Now instantiate your objects.
var enemy1 = new Enemy(-90, 60);
var enemy2 = new Enemy(-180, 120);
var enemy3 = new Enemy(-270, 180);
var enemy4 = new Enemy(-360, 120);
var enemy5 = new Enemy(-450, 60);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
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
