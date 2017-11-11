// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.speed = Math.floor((Math.random()*200)+100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x <= 505) {  //this allow vehicle to move off screen as canvas.width = 505
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -100;
        this.speed = Math.floor((Math.random()*330)+50);
      //The Enermy's speed changes each time it start from the left to make games more random and fun
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The Player class has an update(), render() and
// a handleInput() method.
//It also have level, team members = lives,
//and current member - which rotate the characters in character array in engine.js

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.score = 0;
    this.team = 5;
    this.level = 1;
    this.currentMember=0;
};

Player.prototype.update = function(dt) {

    var self = this;

    //character goes left if the left key is pressed:
    if(this.pressedKey === 'left' && this.x > 0) { //player isn't on left edge
        this.x = this.x - 100;
    }

    //character goes right if right key is pressed:
    if(this.pressedKey === 'right' && this.x < 400) { //player isn't on right edge
        this.x = this.x + 100;
    }

    //character goes up if up key is pressed:
    if(this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 90;
    }

    //character goes down if down key is pressed:
    if(this.pressedKey === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }

    this.pressedKey = null;

    //if player reaches water, position reset:
    //100 points are added to the score
    //Player goes to a new level when reach every 500 points
    //a new Enemy is added whenever player reach a new level

    if(self.y < 0) {
        self.reset(self.currentMember);
        self.score += 100;
        document.getElementById('scoring').innerHTML = self.score;

        if((Math.floor(self.score/500)+1)>self.level){
          var newVehicleStartY = Math.floor(Math.random()*90)+50;
          allEnemies.push(new Enemy(0, newVehicleStartY));
          }

        self.level = Math.floor(self.score/500)+1;
        document.getElementById('currentLevel').innerHTML = self.level;
        }

    //This section checks for collision checking, and replaces the checkCollisions function
    allEnemies.forEach(function(enemy) {
          if(self.x >= enemy.x - 50 && self.x <= enemy.x + 100) {
              if(self.y >= enemy.y - 50 && self.y <= enemy.y + 50) {

   //when collision happens, team member reduce by 1 and a new character is used
   //each player has 5 characters

                  self.team -= 1;
                  self.currentMember+=1;
                  document.getElementById('teamRemain').innerHTML = self.team;
                  self.reset(self.currentMember);

   //when all five character are used up, the game ends and Gameon is turned false
                  if(self.team < 1){
                    gameOn = false;
                  }
                }
            }
          });

    };


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput() method for player:
Player.prototype.handleInput = function(e) {
    this.pressedKey = e;
};

//Reset player to beginning position
Player.prototype.reset = function(currentMember) {
   this.y = 400;
   this.x = currentMember*100;
   this.sprite = teamMembers[currentMember];
 };

//Instantiating all objects
// All enemy objects in an array called allEnemies
// The player object in a variable called player


// Instantiation of enemies and player objects:
var allEnemies = []; //creates an array of Enemies

//this function will DISPLAY Enemies:
(function displayEnemies() {

    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));

}());


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
