// start slingin' some d3 here.

// initialize board svg
var width = window.innerWidth;
var height = window.innerHeight;
var board = d3.select('.board')
var playBoard = board.append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background-color', 'black');



// initialize player
var setPlayer = (function() {
  var player = playBoard.append('g')
    .data([{x: 150, y: 150}]);

  player.append('circle')
    .attr('r', 100)
    .attr('fill', 'blue')
    .attr('cx', function(d) {return d.x;})
    .attr('cy', function(d) {return d.y;})
    .call(mouseDrag(dragMove));
})();

// make enemies
var setEnemies = (function() {
  var enemies = Array(10);
  enemies.fill(50);

  var enemy = playBoard.selectAll('svg')
    .data([100, 200, 300, 400, 500])
    .enter()
    .append('circle')
    .attr('cx', 100)
    .attr('cy', function(d){return d})
    .attr('r', 10)
    .style('fill', 'red');
})();

// collisions
  // score counter update
var CollisionDetection = function() {

}

// mouse drag functions
function mouseDrag(dragHandler) {
  var drag = d3.behavior.drag();

  drag.on("drag", dragHandler)

  return drag;
}

function dragMove(d) {
  d3.select(this)
  .attr("cx", d.x = d3.event.x)
  .attr("cy", d.y = d3.event.y);
}