var Phaser = require('phaser');

var SCALE = 3;

var ball;

var game = new Phaser.Game(
  // Game width
  120 * SCALE,
  // Game height
  60 * SCALE,
  // Game renderer (WebGL, Canvas, auto)
  Phaser.AUTO,
  // Game id in index.html
  'phaser-example-arkanoid',
  // Phaser states
  {
    preload: _preload,
    create: _create,
    update: _update
  },
  // Transparent canvas background
  false,
  // Antialias
  false
);

function _preload() {
  console.log('Preload game');
  game.load.image('ball-image', 'game/assets/pokeball.png');

}

function _create() {
  console.log('Create game');
  game.stage.backgroundColor = "#4488AA";
  ball = game.add.sprite(0, 50, 'ball-image');
}

function _update() {
  ball.x += 1;
  if (ball.x >= 120 * SCALE) {
    ball.x = 1;
  }
}
