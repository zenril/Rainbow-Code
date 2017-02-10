// Daniel Shiffman
// http://codingtra.in
// Attraction / Repulsion
// Video: https://youtu.be/OAcXnzRNiCY

var attractors = [];
var particles = [];

function setup() {

  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  createCanvas(x, y);
  background(51);
  // for (var i = 0; i < 10; i++) {
  //   attractors.push(createVector(random(width), random(height)));
  // }
}

function mousePressed() {
  attractors.push(createVector(mouseX, mouseY));
}

var drawBG = 0;

function draw() {
  
  if(!(++drawBG%600)){
    background(51);
  }

  //background(51);

  stroke(255);
  strokeWeight(4);
  if (particles.length < 200) {
    if(attractors.length){
      var spawn = attractors[ Math.floor(Math.random()*attractors.length) ]; 
      
      particles.push(new Particle(spawn.x + random(-20,20), spawn.y + random(-20,20)));
    }

  
    //particles.splice(0, 1);
  }

  for (var i = 0; i < attractors.length; i++) {
    stroke(0, 255, 0);
    point(attractors[i].x, attractors[i].y);
  }
  
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    for (var j = 0; j < attractors.length; j++) {
      particle.attracted(attractors[j]);
    }

    for (var m = 0; m < particles.length; m++) {
      particle.attracted(particles[m].pos);
    }


    particle.update();
    particle.show();
  }

}
