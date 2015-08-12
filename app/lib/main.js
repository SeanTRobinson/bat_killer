console.log("Started");

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var score = 0;
var scoreText;
var maxTimer = 3000;
var currentTimer;
var enemyXPos = game.world.width/2;
var enemyYPos = game.world.height/2;
var enemy;
var crosshair;

function preload() {
  game.load.image('background', 'assets/background.png');
  game.load.image('crosshair', 'assets/crosshair.png');
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

  scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});
  currentTimer = game.add.text(16, 64, maxTimer, {fontSize: '16px', fille: '#000'});

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
  enemy.body.velocity.setTo(200,200);
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
  crosshair = game.add.sprite(event.clientX-45, event.clientY-45);
  game.add.tween(crosshair).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

  shotSound = game.add.audio('shot');
  shotSound.play();


    // //Increase speed of enemy slightly
    // enemyXSpeed *= 1.05;
    // enemyYSpeed *= 1.06;
    //
    // //Obtain Shot position
    // var shotX = Math.round(event.clientX);
    // var shotY = Math.round(event.clientY);
    // var spriteX = Math.round(animation.x);
    // var spriteY = Math.round(animation.y);
    //
    // // Compute the X and Y distance using absolte value
    // var distX = Math.abs(shotX - spriteX);
    // var distY = Math.abs(shotY - spriteY);
    //
    // // Anywhere in the body or head is a hit - but not the wings
    // if(distX < 30 && distY < 59 )
    // {
    // 	//Hit
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
}
