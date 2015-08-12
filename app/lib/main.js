console.log("Started");

var game = new Phaser.Game('100%', '100%', Phaser.CANVAS, 'parent', { preload: preload, create: create, update: update });
var score = 0;
var scoreText;
var maxTimer = 3000;
var currentTimer;
var enemyXPos = game.world.width/2;
var enemyYPos = game.world.height/2;
var enemy;
var crosshair;
var enemyVelocity = 200;

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.load.image('background', 'assets/landscape.jpg');
  game.load.image('crosshair', 'assets/swatter.png');
  game.load.audio('shot', 'assets/shot.mp3');
  game.load.audio('gameOver', 'assets/gameOver.mp3');
  game.load.audio('deathSound', 'assets/die.mp3');
  game.load.audio('backgroundMusic', "assets/countryside.mp3");
  game.load.spritesheet('bat', 'assets/batSpriteSheet.png', 198, 117);
  game.load.spritesheet('batDeath', "assets/batDeath.png");
}

var platforms;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, 'background');

  scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#FFF'});
  currentTimer = game.add.text(16, 64, maxTimer, {fontSize: '16px', fill: '#FFF'});

  backgroundMusic = game.add.audio('backgroundMusic');
  backgroundMusic.play();

  createEnemy();

  window.onmousedown = handleMouseDown;
}

function createEnemy() {
  enemyXPos = getRandomInt(100, game.world.width-100);
  enemyYPos = getRandomInt(100, game.world.height-100);
  enemy = game.add.sprite(enemyXPos, enemyYPos, 'bat');
  game.physics.enable(enemy, Phaser.Physics.ARCADE);
  enemy.animations.add('flap', [0, 1, 2, 3, 4], 10, true);
  enemy.animations.play('flap');
  enemy.body.velocity.x = 200;
  enemy.body.velocity.y = 200;
  enemy.body.collideWorldBounds = true;
  enemy.body.bounce.set(1);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update() {

}

function handleMouseDown(event)
{
  crosshair = game.add.sprite(game.input.mousePointer.x-210, game.input.mousePointer.y-80, 'crosshair');
  game.add.tween(crosshair).to( { alpha: 0 }, 500, "Linear", true);

  shotSound = game.add.audio('shot');
  shotSound.play();

  //newVelocity = enemy.body.velocity.x * 1.05;
  //enemy.velocity.setTo(newVelocity, newVelocity);

  shotDistX = Math.abs((game.input.mousePointer.x-45) - enemy.x);
  shotDistY = Math.abs((game.input.mousePointer.y-45) - enemy.y);

  if(shotDistX < 30 && shotDistY < 59) {
    killEnemy();
  }

}

function killEnemy() {
  score += 100;
  deathSound = game.add.audio('deathSound');
  deathSound.play();
}

    // 	stage.removeChild(animation);
    // 	batDeath();
    // 	score += 100;
    // 	scoreText.text = "Score: " + score.toString();
    // 	createjs.Sound.play("deathSound");
    //
    //     //Make it harder next time
    // 	enemyYSpeed *= 1.25;
    // 	enemyXSpeed *= 1.3;
    //
    //   if (maxGameTime > 500) {
    //     maxGameTime -= timerReduction;
    //   }
    //
    //   if (enemyScale > enemyMinScale) {
    //     enemyScale = enemyScale - enemyScaleReduction;
    //   }
    //
    //   gameTime = maxGameTime;
    //
    // 	//Create new enemy
    // 	//var timeToCreate = Math.floor((Math.random()*3500)+1);
	  //   //setTimeout(createEnemy,timeToCreate);
    //   createEnemy();
    //
    // } else
    // {
    // 	//Miss
    // 	score -= 10;
    // 	scoreText.text = "Score: " + score.toString();
    //
    // }
