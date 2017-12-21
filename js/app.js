// Sets an initial player score of 0.
var score = 0;
//sets an initial lives to player
var lives = 6;
// variable to update the timer every second
var timer;
//variable to get the ellapsed time
var timerValue;
var timerBegin = "00:00";
//initialize x and y of player
var player_x = 200;
var player_y = 320;
document.getElementById('playerScore').innerHTML = score;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 60;
    this.height = 70;
    this.sprite = 'images/enemy-bug.png';

};

function Timer() {
        let startTime = new Date().getTime();

        // Update the timer every second
        timer = setInterval(function() {

            let currentTime = new Date().getTime();

            // calculate time elapsed 
            let timePlayed = currentTime - startTime;

            // Calculate minutes and seconds
            let mins = Math.floor((timePlayed % (1000 * 60 * 60)) / (1000 * 60));
            let secs = Math.floor((timePlayed % (1000 * 60)) / 1000);
            timerValue = mins + " minutes " + secs + " seconds ";
            // Add starting 0 if seconds < 10
            if (secs < 10) {
                secs = "0" + secs;
            }
            if (mins < 10) {
                mins = "0" + mins;
            }

            let lastCurrentTime = mins + ':' + secs;

            // Update timer on game screen and modal
            $(".timer").text(lastCurrentTime);
        }, 500);
    }
    //reset game after winning or losing
function resetGame() {
    player.x = player_x;
    player.y = player_y;
    score = 0;
    lives = 6;
    clearInterval(timer);
    //var time = document.getElementById("timer");
    //time.innerHTML = timerBegin;
    document.getElementById("playerScore").innerHTML = score;
    var lifeSpanElement = document.getElementById("lives");
    lifeSpanElement.innerHTML = lives;
    Timer();

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * 300 * Math.random());

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
var Player = function() {
    // start the timer when first card is opened
    Timer();
    this.sprite = 'images/char-boy.png';
    var lifeSpanElement = document.getElementById("lives");
    lifeSpanElement.innerHTML = lives;
    this.x = player_x;
    this.y = player_y;
    this.width = 60;
    this.height = 70;
};
// Is called every time the player position is updated
Player.prototype.update = function() {
    // If the player reaches the water
    if (this.y < 20) {
        score++;
        document.getElementById('playerScore').innerHTML = score;
        //check score and show win box
        if (score === 10) {
            swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                title: "<span style='color:#F8BB86'>Congratulations! You Won!</span>",
                text: 'With ' + lives + ' lives remained & ' + timerValue + ' Ellapsed Time',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Play again!'
            }).then(function(isConfirm) {
                if (isConfirm) {
                    resetGame();
                }
            })
            clearInterval(timer);
            var time = document.getElementById("timer");
            time.innerHTML = timerBegin;
        }
        this.reset();
    }

    //Collide with enemies
    console.log("x and y of player" + "[" + this.x + "," + this.y + "]")
    for (var i = 0; i < allEnemies.length; i++) {
        console.log("x and y of enemy" + "[" + allEnemies[i].x + "," + allEnemies[i].y + "]");
        if (this.x < allEnemies[i].x + allEnemies[i].width &&
            this.x + player.width > allEnemies[i].x &&
            this.y < allEnemies[i].y + allEnemies[i].height &&
            this.y + player.height > allEnemies[i].y) {
            this.collision();
        }
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// ----when the player collides with enemy -----
Player.prototype.collision = function() {
    if (lives === 1) {
        lives--;
        document.getElementById('lives').innerHTML = lives;

        //Delay the Game Over alert or it pops up too fast for doc to update lives status to 0
        setTimeout(function() {
            player.lose();
        }, 50);
    }

    //Scenario 2: Player still has lives left
    else if (lives > 1) {
        lives--;
        document.getElementById('lives').innerHTML = lives;
        this.x = 200;
        this.y = 320;
    }
};
Player.prototype.lose = function() {
    //Game Over
    if (lives === 0) {
        swal({
            allowEscapeKey: false,
            allowOutsideClick: false,
            title: "Game Over",
            text: 'With score ' + score + ' & ' + timerValue + ' Ellapsed Time',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Play again!'
        }).then(function(isConfirm) {
            if (isConfirm) {
                resetGame();
            }
        })
        clearInterval(timer);
        var time = document.getElementById("timer");
        time.innerHTML = timerBegin;
    }
};
// Is called when the player is reset to the starting point because of collision
Player.prototype.reset = function() {

    this.x = 200;
    this.y = 320;

};
//handling keyboard arrows
Player.prototype.handleInput = function(direction) {
    if (direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if (direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if (direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if (direction == 'down' && this.y < 400) {
        this.y += 50;
    }
};

// Now instantiate your objects.
var enemy1 = new Enemy(-90, 60);
var enemy2 = new Enemy(-160, 160);
var enemy3 = new Enemy(-260, 230);
var enemy4 = new Enemy(-360, 160);
var enemy5 = new Enemy(-460, 60);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
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