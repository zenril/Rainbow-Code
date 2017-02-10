// Daniel Shiffman
// http://codingtra.in
// Attraction / Repulsion
// Video: https://youtu.be/OAcXnzRNiCY

function Particle(x, y) {
  this.pos = createVector(x, y);
  this.prev = createVector(x, y);
  this.vel = createVector(); //p5.Vector.random2D();
  this.trail = [];
  //this.vel = p5.Vector.random2D();
  //this.vel.setMag(random(2, 5));
  this.acc = createVector();

  var setTrail = 0;
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    
    //if(!(++setTrail%2)){
      this.trail.push(createVector(this.pos.x, this.pos.y));
    //}
    
    if(this.trail.length > 20){
      this.trail.splice(0, 1);
    }

    this.acc.mult(0);
  }

  this.show = function() {
    noFill();
    stroke(255, 5);    
    strokeWeight(1);

    beginShape();
      for (var k = 0; k < this.trail.length; k++) {
        var trailPoint = this.trail[k];
        curveVertex(trailPoint.x,  trailPoint.y);
      }
    endShape();

   // line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;

  }

  this.attracted = function(target) {
    // var dir = target - this.pos
    var force = p5.Vector.sub(target, this.pos);
    var d = force.mag();
    d = constrain(d, 1, 25);
    var G = 5;
    var strength = G / (d * d);
    force.setMag(strength);
    if (d < 5) {
      force.mult(-5);
    }
    this.acc.add(force);
  }

}
