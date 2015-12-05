// start slingin' some d3 here.

// initialize board svg
var width = 1200;
var height = 600;
var board = d3.select('.board')
var enemies = [];
var playBoard = board.append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background-color', 'black');

// make player

var setPlayer = function() {
  var player = playBoard.append('g')
    .data([{x: 150, y: 150}]);

  player.append('circle')
    .attr('r', 100)
    .attr('fill', 'blue')
    .attr('cx', function(d) {return d.x;})
    .attr('cy', function(d) {return d.y;})
    .call(mouseDrag(dragMove));
};

var makeEnemy = function() {
  var newEnemy = new Enemy(enemies.length);
  enemies.push(newEnemy);

  playBoard.append('svg')
    .data([newEnemy])
    .append('circle')
    .attr('class', 'enemy')
    .attr('r', 10)
    .attr('fill', 'red')
    .attr('cx', newEnemy.x)
    .attr('cy', newEnemy.y);
}

var Enemy = function(id) {
  this.id = id;
  this.x = coords(x);
  this.y = coords(y);
  this.distance = 0;
}

var moveEnemy = function() {
  var coords = [];
  for(var i = 0; i < enemies.length; i++) {
    coords.push({'x': Math.random() * width,'y': Math.random() * height})
  }

  d3.selectAll('.enemy')
    .data(coords)
    .transition()
    .delay(1000)
    .attr('cx', function(d){return d.x;})
    .attr('cy', function(d){return d.y;});
}



for(var i = 0; i < 20; i++) {
  makeEnemy();
  moveEnemy();
}

setPlayer();

// collisions
  // score counter update
var CollisionDetection = function() {

}

function enemyMove(d) {

}

// mouse drag functions
function mouseDrag(dragHandler) {
  var drag = d3.behavior.drag();
  drag.on('drag', dragHandler)
  return drag;
}

function dragMove(d) {
  d3.select(this)
    .attr('cx', d.x = d3.event.x)
    .attr('cy', d.y = d3.event.y);
}

setInterval(function() {moveEnemy()}, 2000);