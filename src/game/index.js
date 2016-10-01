var Phaser = require('phaser');

var SCALE = 3;
var BALL_SPEED = 400;

var ball;


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
}

function create() {
  game.stage.backgroundColor = "#4488AA";
  game.add.image(0, 0, 'background-image');

  ball = game.add.sprite(0, 50, 'ball-image');
  game.physics.enable(ball, Phaser.Physics.ARCADE);

  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);

  var angle = 120 * 360 / Math.PI;
  ball.body.velocity.setTo(
    Math.cos(angle) * BALL_SPEED,
    Math.sin(angle) * BALL_SPEED
  );
}

function update() {

}
