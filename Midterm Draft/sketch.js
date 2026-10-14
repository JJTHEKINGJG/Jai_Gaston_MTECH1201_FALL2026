
/*
Name: Jai G
Title: NYC Road Trip
Theme: Driving through New York City

NYC SCENE:
SPACE = Start or stop the car
ENTER = Go to the house

HOUSE SCENE:
Move mouse = Drive the red car
Click = Change car color
ENTER = Go to traffic game

TRAFFIC GAME:
Move mouse = Steer the car
R = Restart the game
M = Return to NYC
*/

// VARIABLES
 

let city;
let car;

let scene = "nyc";

// NYC car
let carX = -250;
let carSize = 250;
let speed = 3;
let driving = false;
let startTime = 0;

// House car
let houseCarX = 675;
let houseCarY = 700;

let r = 255;
let g = 0;
let b = 0;

// Sun
let sunX = 100;
let sunSpeed = 1;

// Traffic game
let playerX = 375;

let enemyX = [180, 380, 580];
let enemyY = [-100, -400, -700];

let enemySpeed = 5;
let score = 0;
let gameOver = false;

// SETUP


async function setup() {
  createCanvas(800, 900);

  // Load your original NYC pictures
  city = await loadImage("assets/NYC.jpeg");
  car = await loadImage("assets/CAR.png");
}


// MAIN DRAW

function draw() {
  if (scene == "nyc") {
    drawNYC();
  } 
  
  else if (scene == "house") {
    drawHouse();
  } 
  
  else if (scene == "traffic") {
    drawTraffic();
  } 
  
  else if (scene == "gameover") {
    drawGameOver();
  }
}

// SCENE 1: NYC


function drawNYC() {
  background(135, 206, 250);

  // Your NYC background
  image(city, 0, 0, width, height);

  // Road
  fill(55);
  noStroke();
  rect(0, 650, width, 250);

  // Road lines
  stroke(255);
  strokeWeight(5);

  for (let x = 0; x < width; x += 120) {
    line(x, 770, x + 60, 770);
  }

  noStroke();

  // Your original car image
  image(car, carX, 650, carSize, carSize * 0.6);

  // Move the car
  if (driving == true) {
    carX = carX + speed;

    // Make the car smaller as it leaves https://p5js.org/reference/p5/map/ 
    carSize = map(carX, -250, width, 250, 80);

    // Reset the car
    if (carX > width) {
      carX = -250;
      carSize = 250;
    }
  }

  // Instructions panel
  fill(255);
  stroke(0);
  strokeWeight(3);
  rect(20, 20, 510, 330, 15);

  noStroke();
  fill(0);

  textAlign(LEFT);
  textStyle(BOLD);
  textSize(32);
  text("NYC ROAD TRIP", 40, 65);

  textStyle(NORMAL);
  textSize(18);
  text("Welcome, Come with me on a fun journey!", 40, 105);

  textStyle(BOLD);
  text("CONTROLS", 40, 150);

  textStyle(NORMAL);
  text("SPACE - Start or stop the NYC car", 40, 185);
  text("ENTER - Move to the house", 40, 220);
  text("HOUSE - Move the mouse to drive", 40, 255);
  text("CLICK - Change the house car color", 40, 290);
  text("TRAFFIC - Move the mouse to steer", 40, 325);

  fill(255, 230, 0);
  textStyle(BOLD);
  textSize(25);
  text("Press ENTER to continue", 25, 855);

  fill(255);
  textSize(18);
  text("R = Restart traffic game     M = Return to NYC", 25, 885);

  // Timed message
  if (driving == true && millis() - startTime > 5000) {
    fill(255, 255, 0);
    textSize(25);
    text("Enjoy your NYC ride!", 25, 400);
  }

  textStyle(NORMAL);
}


// SCENE 2: YOUR HOUSE


function drawHouse() {
  background(135, 206, 250);

  // Grass
  noStroke();
  fill(80, 170, 80);
  rect(0, 300, 800, 600);

  // Sun
  fill(255, 204, 0);
  ellipse(sunX, 100, 120, 120);

  sunX = sunX + sunSpeed;

  if (sunX > 740 || sunX < 60) {
    sunSpeed = -sunSpeed;
  }

  // YOUR ORIGINAL HOUSE BODY
  fill(255, 220, 120);
  rect(250, 450, 300, 250);

  // YOUR ORIGINAL ROOF
  fill(180, 80, 40);
  triangle(200, 450, 600, 450, 400, 270);

  // Chimney
  fill(150, 65, 45);
  rect(465, 325, 45, 100);

  // Door
  fill(100, 55, 30);
  rect(365, 550, 70, 150);

  // Door knob
  fill(255, 220, 0);
  ellipse(420, 625, 10, 10);

  // Left window
  fill(120, 200, 255);
  stroke(0);
  strokeWeight(4);
  rect(275, 490, 65, 65);

  line(307, 490, 307, 555);
  line(275, 522, 340, 522);

  // Right window
  rect(460, 490, 65, 65);

  line(492, 490, 492, 555);
  line(460, 522, 525, 522);

  noStroke();

  // Front walkway
  fill(150);
  rect(350, 700, 100, 200);

  // Rectangle driveway
  fill(110);
  rect(600, 600, 150, 300);
  rect(550, 550, 200, 100);

  // Drive the original car with the mouse https://p5js.org/reference/p5/constrain/ 
  houseCarX = constrain(mouseX, 650, 700);
  houseCarY = constrain(mouseY, 640, 850);

  drawcar(houseCarX, houseCarY);

  // Instructions
  fill(0);
  textAlign(LEFT);
  textStyle(BOLD);
  textSize(30);
  text("MY HOUSE", 25, 45);

  textStyle(NORMAL);
  textSize(18);
  text("Move your mouse to drive on the driveway.", 25, 80);
  text("Click to change your car color.", 25, 110);

  fill(255, 230, 0);
  textStyle(BOLD);
  textSize(25);
  text("Press ENTER for the traffic game", 25, 855);

  textStyle(NORMAL);
}

// YOUR ORIGINAL RED CAR


function drawcar(x, y) {
  push();

  translate(x, y);

  // Red car body
  fill(r, g, b);
  noStroke();
  rect(-50, -20, 100, 40, 8);

  // Gray roof
  fill(160);
  rect(-25, -35, 50, 20, 5);

  // Black wheels
  fill(0);
  ellipse(-30, 20, 25, 25);
  ellipse(30, 20, 25, 25);

  // Wheel details
  stroke(255);
  strokeWeight(2);
  noFill();
  ellipse(-30, 20, 12, 12);
  ellipse(30, 20, 12, 12);

 // https://p5js.org/reference/p5/pop/ 
  pop();

}

// SCENE 3: TRAFFIC GAME


function drawTraffic() {
  background(70, 160, 80);

  // Road
  fill(55);
  noStroke();
  rect(100, 0, 600, height);

  // Road edges
  fill(255);
  rect(110, 0, 5, height);
  rect(685, 0, 5, height);

  // Road markings
  stroke(255);
  strokeWeight(5);

  for (let y = 0; y < height; y += 100) {
    line(395, y, 395, y + 50);
  }

  noStroke();

  // Score
  fill(255);
  textAlign(LEFT);
  textStyle(BOLD);
  textSize(25);
  text("Score: " + score, 20, 40);

  // PLAYER FOLLOWS THE MOUSE https://p5js.org/reference/p5/constrain/ 
  playerX = constrain(mouseX - 25, 120, 630);

  // Draw player car
  drawGameCar(playerX, 740, 30, 100, 255);

  // Enemy cars
  for (let A = 0; A < enemyX.length; A++) {

    // Move enemy cars down
    enemyY[A] = enemyY[A] + enemySpeed;

    // Draw different enemy colors
    if (A == 0) {
      drawGameCar(enemyX[A], enemyY[A], 255, 40, 40);
    } 
    
    else if (A == 1) {
      drawGameCar(enemyX[A], enemyY[A], 30, 220, 70);
    } 
    
    else {
      drawGameCar(enemyX[A], enemyY[A], 255, 210, 0);
    }

    // Check for collision
    if (
      playerX < enemyX[A] + 50 &&
      playerX + 50 > enemyX[A] &&
      740 < enemyY[A] + 80 &&
      820 > enemyY[A]
    ) {
      gameOver = true;
      scene = "gameover";
      return;
    }

    // Reset enemy when it leaves the screen
    if (enemyY[A] > height) {
      enemyY[A] = -random(200, 600);
      enemyX[A] = random(140, 610);
      score = score + 1;
    }
  }

  fill(255);
  textStyle(NORMAL);
  textSize(18);
  text("Move your mouse left and right to dodge traffic!", 150, 80);
}


// TRAFFIC GAME CAR


function drawGameCar(x, y, red, green, blue) {
  fill(red, green, blue);
  noStroke();
  rect(x, y, 50, 80, 8);

  // Windows
  fill(180, 230, 255);
  rect(x + 8, y + 10, 34, 20);
  rect(x + 8, y + 45, 34, 20);

  // Wheels
  fill(0);
  rect(x - 5, y + 10, 7, 18);
  rect(x + 48, y + 10, 7, 18);
  rect(x - 5, y + 50, 7, 18);
  rect(x + 48, y + 50, 7, 18);
}

// GAME OVER

function drawGameOver() {
  background(30);

  textAlign(CENTER);

  fill(255, 50, 50);
  textStyle(BOLD);
  textSize(50);
  text("GAME OVER", width / 2, 350);

  fill(255);
  textSize(28);
  text("Your Score: " + score, width / 2, 420);

  textSize(22);
  textStyle(NORMAL);
  text("Press R to try again", width / 2, 480);
  text("Press M to return to NYC", width / 2, 520);

  textAlign(LEFT);
}


// KEYBOARD CONTROLS


function keyPressed() {

  // Read the pressed key
  let pressed = key.toLowerCase();

  // SPACE starts and stops the NYC car
  if (scene == "nyc" && keyCode == 32) {
    driving = !driving;
    startTime = millis();
  }

  // ENTER advances between scenes
  if (keyCode == 13 || keyCode == ENTER) {

    if (scene == "nyc") {
      scene = "house";
    } 
    
    else if (scene == "house") {
      scene = "traffic";
      resetTraffic();
    }
  }

  // R restarts the traffic game
  if (pressed == "r" || keyCode == 82) {
    if (scene == "traffic" || scene == "gameover") {
      resetTraffic();
      scene = "traffic";
    }
  }

  // M returns to NYC from any scene
  if (pressed == "m" || keyCode == 77) {
    scene = "nyc";

    carX = -250;
    carSize = 250;
    driving = false;

    resetTraffic();
  }

  return false;
}


// MOUSE CLICK

function mousePressed() {

  // Change the house car color
  if (scene == "house") {
    r = random(255);
    g = random(255);
    b = random(255);
  }
}


// RESET TRAFFIC GAME


function resetTraffic() {
  playerX = 375;

  enemyX = [180, 380, 580];
  enemyY = [-100, -400, -700];

  enemySpeed = 5;
  score = 0;
  gameOver = false;
}
