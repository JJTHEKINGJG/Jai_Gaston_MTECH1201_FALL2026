
/*
Name: Jai G
Title: Traffic Escape

Instructions:
Move the mouse up and down to steer your car.
Avoid the other cars to earn points.
Click to change your car's color.
Press R to restart the game.
*/

// VARIABLES

let playerY;

// Enemy car arrays (6 cars)
let enemyX = [900, 1200, 1500, 1800, 2100, 2400];
let enemyLane = [0, 1, 2, 0, 1, 2];

let enemyColors = [
  [255, 40, 40],
  [30, 220, 70],
  [255, 210, 0],
  [180, 50, 255],
  [255, 120, 20],
  [0, 220, 220]
];

// Road markings array
let roadLines = [0, 150, 300, 450, 600, 750];

let enemySpeed = 9;
let score = 0;
let gameOver = false;

// Player car color
let r = 30;
let g = 120;
let b = 255;


// SETUP

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetGame();
}


// MAIN DRAW

function draw() {
  background(70, 160, 80);

  // Horizontal road
  let roadTop = height * 0.2;
  let roadBottom = height * 0.8;
  let roadHeight = roadBottom - roadTop;
  let laneHeight = roadHeight / 3;

  fill(55);
  rect(0, roadTop, width, roadHeight);

  // Road edges
  fill(255);
  rect(0, roadTop, width, 5);
  rect(0, roadBottom - 5, width, 5);

  // Road markings
  stroke(255);
  strokeWeight(4);

  for (let G = 0; G < roadLines.length; G++) {

    line(roadLines[G], roadTop + laneHeight,
         roadLines[G] + 60, roadTop + laneHeight);

    line(roadLines[G], roadTop + laneHeight * 2,
         roadLines[G] + 60, roadTop + laneHeight * 2);

    roadLines[G] = roadLines[G] - enemySpeed;

    if (roadLines[G] < -60) {
      roadLines[G] = width;
    }
  }

  noStroke();

  // Score
  fill(255);
  textSize(25);
  text("Score: " + score, 20, 40);

  if (gameOver == false) {

    // Player follows mouse up and down
    playerY = constrain(
      mouseY - 25,
      roadTop + 10,
      roadBottom - 60
    );

    // Player car stays on the left
    let playerX = 100;

    drawCar(playerX, playerY, r, g, b);

    // Enemy cars using arrays
    for (let J = 0; J < enemyX.length; J++) {

      let enemyY = roadTop + laneHeight * enemyLane[J]
                   + laneHeight / 2 - 25;

      // Move enemy cars
      enemyX[J] = enemyX[J] - enemySpeed;

      // Draw enemy cars using color array
      drawCar(
        enemyX[J],
        enemyY,
        enemyColors[J][0],
        enemyColors[J][1],
        enemyColors[J][2]
      );

      // Check for collision
      if (
        playerX < enemyX[J] + 80 &&
        playerX + 80 > enemyX[J] &&
        playerY < enemyY + 50 &&
        playerY + 50 > enemyY
      ) {
        gameOver = true;
      }

      // Reset enemy cars
      if (enemyX[J] < -100) {

        enemyX[J] = width + random(200, 600);
        enemyLane[J] = floor(random(3));

        score = score + 1;

        // Make game faster
        enemySpeed = enemySpeed + 0.3;
      }
    }

    // Instructions
    fill(255);
    textSize(18);
    text("Move mouse UP and DOWN to dodge traffic!", 20, 75);
    text("Click to change car color", 20, 100);
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
  rect(x, y, 80, 50, 8);

  // Windows
  fill(180, 230, 255);
  rect(x + 25, y + 7, 25, 36, 5);
  rect(x + 55, y + 7, 15, 36, 4);

  // Wheels
  fill(0);
  rect(x + 10, y - 5, 18, 7);
  rect(x + 55, y - 5, 18, 7);
  rect(x + 10, y + 48, 18, 7);
  rect(x + 55, y + 48, 18, 7);
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

  enemyX = [900, 1200, 1500, 1800, 2100, 2400];

  enemyLane = [0, 1, 2, 0, 1, 2];

  roadLines = [0, 150, 300, 450, 600, 750];

  enemySpeed = 9;
  score = 0;
  gameOver = false;
}


// RESPONSIVE CANVAS

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
