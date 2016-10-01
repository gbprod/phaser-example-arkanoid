var Phaser = require('phaser');

var SCALE = 3;
var BALL_SPEED = 300;
var BAR_SPEED = 100;

var ball;
var cursor;
var bar;

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
}

function create() {
  game.stage.backgroundColor = "#4488AA";
  game.add.image(0, 0, 'background-image');

  cursor = game.input.keyboard.createCursorKeys();

  ball = createBall();
  bar = createBar();
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
}
