var Phaser = require('phaser');

var SCALE = 3;
var BALL_SPEED = 300;
var BAR_SPEED = 100;

var ball;
var cursor;
var bar;
var bricks;

var game = new Phaser.Game(
  // Game width
  800,
  // Game height
  480,
  // Game renderer (WebGL, Canvas, auto)
  Phaser.AUTO,
  // Game id in index.html
  'phaser-example-arkanoid',
  // Phaser states
  {
    preload: preload,
    create: create,
    update: update
  },
  // Transparent canvas background
  false,
  // Antialias
  false
);

function preload() {
  game.load.image('ball-image', 'game/assets/pokeball.png');
  game.load.image('background-image', 'game/assets/pokebackground.png');
  game.load.image('bar-image', 'game/assets/bar.png');
  game.load.image('brick01', 'game/assets/pokemon-00.png');
  game.load.image('brick02', 'game/assets/pokemon-01.png');
  game.load.image('brick03', 'game/assets/pokemon-02.png');
  game.load.image('brick04', 'game/assets/pokemon-03.png');
}

function create() {
  game.stage.backgroundColor = "#4488AA";
  game.add.image(0, 0, 'background-image');

  cursor = game.input.keyboard.createCursorKeys();

  ball = createBall();
  bar = createBar();
  bricks = createBricks();
}

function createBall() {
  var ball = game.add.sprite(0, 50, 'ball-image');
  game.physics.enable(ball, Phaser.Physics.ARCADE);

  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);

  var angle = 90 * 180 / Math.PI;
  ball.body.velocity.setTo(
    Math.cos(angle) * BALL_SPEED,
    Math.sin(angle) * BALL_SPEED
  );

  return ball;
}

function createBar() {
  var bar = game.add.sprite(game.world.centerX - 48, 440, 'bar-image');
  bar.scale.set(SCALE);
  game.physics.enable(bar, Phaser.Physics.ARCADE);
  bar.body.collideWorldBounds = true;
  bar.body.immovable = true;

  return bar;
}

function update() {
  ball.angle += 8; // drunk mode

  bar.body.velocity.x = 0;
  if (cursor.left.isDown) {
    bar.body.velocity.x = - BAR_SPEED * SCALE;
  } else if (cursor.right.isDown) {
    bar.body.velocity.x = BAR_SPEED * SCALE;
  }

  game.physics.arcade.collide(bar, ball, null, reflect, this);
  game.physics.arcade.collide(bricks, ball, null, breakBrick, this);
}

function reflect(bar, ball) {
  if (ball.y > (bar.y + 5)) {
    return true;
  } else {
    var rate = (1 - (ball.x + ball.width * 0.5 - bar.x ) / bar.width);
    if(rate < 0.1) {
      rate = 0.1;
    }

    if(rate > 0.9) {
      rate = 0.9;
    }

    var angle = - Math.PI*rate;
    ball.body.velocity.setTo(
      Math.cos(angle) * BALL_SPEED,
      Math.sin(angle) * BALL_SPEED
    );

    return false;
  }
}

function createBricks() {
  var bricks = game.add.group();
  for (var j = 1; j <= 3; j++) {
    for (var i = 1; i <= 8; i++) {
      var image = 'brick0' + (Math.floor(Math.random() * 4) + 1);

      var widthBrick = game.cache.getImage(image).width;
      var heightBrick = game.cache.getImage(image).height;

      var brick = game.add.sprite(80 * i, 20 + (80*(j-1)), image);

      game.physics.enable(brick, Phaser.Physics.ARCADE);
      brick.body.immovable = true;

      bricks.add(brick);
    }
  }

  return bricks;
}

function breakBrick(ball, brick) {
  brick.kill();

  return true;
}
