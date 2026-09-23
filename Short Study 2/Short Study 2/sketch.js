/* SS2_Jai G 

Move your mouse for the car.
Mouse Press to change the car and sun colors.
Press anykey to bring the sun back to the original start*/ 


let carX;
let carY;
let speed = 0.05;

let r = 255;
let g = 0;
let b = 0;


let sunR = 255;
let sunG = 204;
let sunB = 0;

let grow = 100




function setup() {
  createCanvas(800, 600);
  carX = width/4;
  carY = height/4 ;
}

function draw() {

  background(135, 206, 235);

  
    //Sun
  fill(sunR, sunG, sunB);
  noStroke();
  ellipse(grow, 0, 200 , 200);


    grow += 0.5

  
 
  // road
  fill(80);
  rect(0, 300, 800, 120);

  // car follows mouse
  carX += (mouseX - carX) ;
  carY += (mouseY - carY) ;

  

  drawcar(carX, carY);
}

function drawcar(x, y) {
  push();
  translate(x, y);

  fill(r, g, b);
  rect(-50, -20, 100, 40);

  fill(max(r), g, b);
  rect(-25, -40, 50, 25);

  fill(0);
  ellipse(-30, 25, 30);
  ellipse(30, 25, 30);

  stroke(255);

  // left wheel rims (5 lines)
  line(-30, 25, -30, 10);
  line(-30, 25, -20, 20);
  line(-30, 25, -40, 20);
  line(-30, 25, -20, 30);
  line(-30, 25, -40, 30);

  // right wheel rims (5 lines)
  line(30, 25, 30, 10);
  line(30, 25, 40, 20);
  line(30, 25, 20, 20);
  line(30, 25, 40, 30);
  line(30, 25, 20, 30);

  
}

function mousePressed() {

  r =random(0,255);
  g =random(0,255);
  b =random(0,255);

  sunR =random(200,255);
  sunG = random(150,255);
  sunB = random(0,200);

  speed += 0.02;
}

function keyPressed() {


grow = 100


}

