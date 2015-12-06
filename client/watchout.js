// start slingin' some d3 here.
var height = window.innerHeight, width = window.innerWidth;
var collisions = 0;
var highScore = 0;
var previousCollision = false;
var board = d3.select('.board').append("svg")
    .attr("width", width)
    .attr("height", height)
    .style('background-color', 'black');

//seting patterns
var defs = board.append("defs")
  .attr("id", "imgdefs");

var enemyPattern = defs
  .append("pattern")
  .attr("id", "enemyPattern")
  .attr("height", 1)
  .attr("width", 1)
  .attr("x", "0")
  .attr("y", "0");
enemyPattern.append("image")
   .attr("x", 0)
   .attr("y", 0)
   .attr("height", 10)
   .attr("width", 10)
   .attr("xlink:href", 'enemy.png');

var playerPattern = defs
  .append("pattern")
  .attr("id", "playerPattern")
  .attr("height", 1)
  .attr("width", 1)
  .attr("x", "0")
  .attr("y", "0");
playerPattern.append("image")
   .attr("x", 0)
   .attr("y", 0)
   .attr("height", 30)
   .attr("width", 30)
   .attr("xlink:href", 'player.png');

//create player

  var player = board
    .append('circle')
    .attr('r', 15)
    .attr('class', 'player')
    .attr('fill', "url(#playerPattern)")
    .attr('cx', width/2)
    .attr('cy', height/2)
    .call(d3.behavior
     .drag()
     .on('drag', function(d) {
       d3.select(this)
         .attr({
           cx: d3.event.x,
           cy: d3.event.y
         });
     }));




// updateing enemy positions

var enemies = board.selectAll('.enemy')
  .data(d3.range(30))
  .enter()
  .append('circle')
  .attr('class', 'enemy')
  .attr('fill' , "url(#enemyPattern)")
  .attr('r' , 5)
  .attr('cx', function(){return Math.random()*width;})
  .attr('cy', function(){return Math.random()*height;});

var move = function(){
  enemies
    .transition()
    .duration(1000)
    .attr('cx', function(){return Math.random()*width;})
    .attr('cy', function(){return Math.random()*height;})
    .each('end',move);
  };

move();

// collision function
var onCollision = function(){
  board.style('background-color' , 'red');
  setTimeout(function(){board.style('background-color','black');},500);
};

var collisiondetection = function(){
  var collision = false;
  enemies.each(function(){
    var enemy = d3.select(this);
    var x = Math.abs(enemy.attr('cx')-player.attr('cx'));
    var y = Math.abs(enemy.attr('cy')-player.attr('cy'));
    var distance = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    var min = parseInt(enemy.attr('r')) + parseInt(player.attr('r'));
    if(distance <= min){
      collision = true;
    }
  });
  if(collision){
    timer = 0;
    if(previousCollision != collision){
      collisions++;
    }
    onCollision();
  }
  previousCollision = collision;
};

d3.timer(collisiondetection);

var setScore = function(){
  d3.select('.scoreboard .highscore span').text(highScore);
  d3.select('.scoreboard .current span').text(timer);
  d3.select('.scoreboard .collisions span').text(collisions);
};

// game timer
setInterval(function(){
  timer++;
  highScore = Math.max(timer , highScore);
  setScore();
},50);




