
/*
Name: Jai G
Title: Traffic Escape

Instructions:
Move the mouse left and right to steer your car.
Avoid the other cars to earn points.
Click to change your car's color.
Press R to restart the game.
*/

// VARIABLES

let playerX;
let enemyY = [-100, -350, -600];
let enemyLane = [0, 1, 2];

let enemySpeed = 5;
let score = 0;
let gameOver = false;

// Player car color
let r = 30;
let g = 120;
let b = 255;


// SETUP https://p5js.org/reference/p5/windowHeight/ https://p5js.org/reference/p5/windowWidth/ 

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetGame();
}


// MAIN DRAW

function draw() {
  background(70, 160, 80);

  // Road
  let roadLeft = width * 0.2;
  let roadRight = width * 0.8;
  let roadWidth = roadRight - roadLeft;
  let laneWidth = roadWidth / 3;

  fill(55);
  rect(roadLeft, 0, roadWidth, height);

  // Road edges
  fill(255);
  rect(roadLeft, 0, 5, height);
  rect(roadRight - 5, 0, 5, height);

  // LOOP 1: Create road markings
  stroke(255);
  strokeWeight(5);

  for (let y = 0; y < height; y += 100) {
    line(roadLeft + laneWidth, y, roadLeft + laneWidth, y + 50);
    line(roadLeft + laneWidth * 2, y, roadLeft + laneWidth * 2, y + 50);
  }

  noStroke();

  // Score
  fill(255);
  textSize(25);
  text("Score: " + score, 20, 40);

  if (gameOver == false) {

    // Player follows the mouse
    playerX = constrain(mouseX - 25, roadLeft + 10, roadRight - 60);

    // Player car
    drawCar(playerX, height - 120, r, g, b);

    // LOOP 2: Create and move enemy cars
    for (let i = 0; i < enemyY.length; i++) {

      let enemyX = roadLeft + laneWidth * enemyLane[i] + laneWidth / 2 - 25;

      enemyY[i] = enemyY[i] + enemySpeed;

      // Enemy cars
      if (i == 0) {
        drawCar(enemyX, enemyY[i], 255, 40, 40);
      } 
      else if (i == 1) {
        drawCar(enemyX, enemyY[i], 30, 220, 70);
      } 
      else {
        drawCar(enemyX, enemyY[i], 255, 210, 0);
      }

      // Check for collision
      if (
        playerX < enemyX + 50 &&
        playerX + 50 > enemyX &&
        height - 120 < enemyY[i] + 80 &&
        height - 40 > enemyY[i]
      ) {
        gameOver = true;
      }

      // Reset enemy cars
      if (enemyY[i] > height) {
        enemyY[i] = -random(200, 600);
        enemyLane[i] = floor(random(3));
        score = score + 1;

        // Make the game faster
        enemySpeed = enemySpeed + 0.2;
      }
    }

    // Instructions
    fill(255);
    textSize(18);
    text("Move your mouse to dodge traffic!", 20, 75);
    text("Click to change your car color", 20, 100);
    text("Press R to restart", 20, 125);

  } else {

    // GAME OVER SCREEN
    fill(255, 50, 50);
    textAlign(CENTER);
    textSize(50);
    text("GAME OVER", width / 2, height / 2);

    fill(255);
    textSize(28);
    text("Your Score: " + score, width / 2, height / 2 + 50);

    textSize(22);
    text("Press R to try again", width / 2, height / 2 + 100);

    textAlign(LEFT);
  }
}


// DRAW CAR

function drawCar(x, y, red, green, blue) {

  // Car body
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


// CHANGE CAR COLOR

function mousePressed() {
  r = random(255);
  g = random(255);
  b = random(255);
}


// RESTART GAME

function keyPressed() {
  if (key == 'r' || key == 'R') {
    resetGame();
  }
}


// RESET VARIABLES

function resetGame() {
  enemyY = [-100, -350, -600];
  enemyLane = [0, 1, 2];

  enemySpeed = 5;
  score = 0;
  gameOver = false;
}


// RESPONSIVE CANVAS

function windowResized() { https://p5js.org/reference/p5/windowResized/ 
  resizeCanvas(windowWidth, windowHeight);
}
