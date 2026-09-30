// Jai_G SS3 \\
// Title Fisrt House & Car Updated\\


let carX;
let carY;
let speed = 0.05;

let r = 255;
let g = 0;
let b = 0;

let sunR = 255;
let sunG = 204;
let sunB = 0;

let grow = 100;

function setup() {
  createCanvas(800, 900);

  carX = width / 4;
  carY = height / 4;
}

function draw() {

  background(135, 206, 250);

  // GROUND
  fill(100, 180, 80);
  rect(0, 300, 800, 600);

  // HOUSE

    noStroke();

  // house body
  fill(255, 220, 120);
  rect(250, 450, 300, 250);

  // roof
  fill(150, 60, 40);
  triangle(200, 450, 600, 450, 400, 270);

  // chimney
  fill(120, 70, 50);
  rect(490, 330, 50, 100);

  // chimney top
  fill(90, 50, 40);
  rect(485, 325, 60, 15);

  // door
  fill(100, 60, 40);
  rect(365, 570, 70, 130);

  // door knob
  fill(255, 215, 0);
  ellipse(420, 635, 10, 10);

  // left window
  fill(150, 220, 255);
  rect(275, 500, 70, 70);

  // right window
  rect(455, 500, 70, 70);

  // window lines
  stroke(0);
  strokeWeight(4);

  line(310, 500, 310, 570);
  line(275, 535, 345, 535);

  line(490, 500, 490, 570);
  line(455, 535, 525, 535);



  // front walkway
  fill(170);
  noStroke();
  rect(350, 700, 100, 200);

  // SUN
  fill(sunR, sunG, sunB);
  ellipse(grow, 100, 120, 120);

  grow += 0.5;

  if (grow > 740) 
  grow = 60;

 
  // DRIVEWAY
fill(80);

// driveway coming from the bottom
rect(600, 600, 150, 300);

// driveway beside the house
rect(550, 550, 200, 100);
  

  
  // car follows mouse
  carX += (mouseX - carX);
  carY += (mouseY - carY);

  // keep car on the driveway
if (carX < 650) {
  carX = 650;
}

if (carX > 700) {
  carX = 700;
}

if (carY < 600) {
  carY = 600;
}

if (carY > 850) {
  carY = 850;
}

  drawcar(carX, carY);

  }


function drawcar(x, y) {
  push();
  translate(x, y);

  fill(r, g, b);
  rect(-50, -20, 100, 40);

  fill(150);
  rect(-25, -40, 50, 25);

  fill(0);
  ellipse(-30, 25, 30);
  ellipse(30, 25, 30);

  stroke(255);

  // left wheel rims
  line(-30, 25, -30, 10);
  line(-30, 25, -20, 20);
  line(-30, 25, -40, 20);
  line(-30, 25, -20, 30);
  line(-30, 25, -40, 30);

  // right wheel rims
  line(30, 25, 30, 10);
  line(30, 25, 40, 20);
  line(30, 25, 20, 20);
  line(30, 25, 40, 30);
  line(30, 25, 20, 30);

 
}

function mousePressed() {

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);

  sunR = random(200, 255);
  sunG = random(150, 255);
  sunB = random(0, 200);

  speed += 0.02;
}

function keyPressed() {
  grow = 100;
}


