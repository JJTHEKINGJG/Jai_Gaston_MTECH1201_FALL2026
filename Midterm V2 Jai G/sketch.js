
/*
Name: Jai G
Title: NYC Road Trip
Theme: Driving through New York City

NYC:
SPACE = Start or stop traffic
ENTER = Go to the house

HOUSE:
Move mouse = Drive
Click = Change car color
Drive to the bottom = Enter traffic game

TRAFFIC GAME:
Move mouse up and down = Dodge cars
Click = Change player car color
R = Restart
M = Return to NYC
*/

// VARIABLES

let city;
let scene = "nyc";

let nycCars = [];
let driving = true;
let roadLineX = 0;

// House car color
let r = 255;
let g = 0;
let b = 0;

let houseCarX = 675;
let houseCarY = 700;

// Sun and sunset
let sunX = 100;
let sunSpeed = 1;

// Traffic game player
let playerY = 450;
let playerR = 30;
let playerG = 100;
let playerB = 255;

// Traffic cars
let enemyX = [900, 1200, 1500];
let enemyY = [320, 450, 580];

let enemySpeed = 5;
let score = 0;

// Moving traffic-game road lines
let trafficLineX = 0;


// SETUP

async function setup() {
  let canvas = createCanvas(800, 900);

  // Help the canvas receive keyboard input https://p5js.org/reference/p5.Element/attribute/ https://p5js.org/reference/p5.Element/attribute/
  canvas.elt.setAttribute("tabindex", "0");
  canvas.elt.style.outline = "none";

  city = await loadImage("assets/NYC.jpeg");

  // NYC cars
  nycCars = [
    {
      x: -120, y: 690, speed: 2.5,
      red: 240, green: 55, blue: 55, size: 0.85
    },
    {
      x: 180, y: 750, speed: 3.2,
      red: 40, green: 150, blue: 255, size: 0.95
    },
    {
      x: 470, y: 690, speed: 2,
      red: 255, green: 205, blue: 35, size: 0.8
    },
    {
      x: 720, y: 815, speed: 3.5,
      red: 50, green: 210, blue: 100, size: 1
    }
  ];
}


// MAIN DRAW

function draw() {
  if (scene == "nyc") {
    drawNYC();
  } else if (scene == "house") {
    drawHouse();
  } else if (scene == "traffic") {
    drawTraffic();
  } else if (scene == "gameover") {
    drawGameOver();
  }
}


// SCENE 1: NYC

function drawNYC() {
  background(135, 206, 250);

  if (city) {
    image(city, 0, 0, width, height);
  }

  // Road
  noStroke();
  fill(55);
  rect(0, 650, width, 250);

  fill(255);
  rect(0, 650, width, 5);
  rect(0, 895, width, 5);

  // Road markings
  stroke(255);
  strokeWeight(5);

  for (let x = -120 + roadLineX; x < width; x += 120) {
    line(x, 770, x + 60, 770);
  }

  noStroke();

  // Move NYC cars
  for (let A = 0; A < nycCars.length; A++) {
    let c = nycCars[A];

    if (driving) {
      c.x += c.speed;
    }

    if (c.x > width + 120) {
      c.x = -120;
    }

    drawcar(c.x, c.y, c.red, c.green, c.blue, c.size);
  }

  // Move NYC road markings
  if (driving) {
    roadLineX -= 2;

    if (roadLineX <= -120) {
      roadLineX = 0;
    }
  }

  // Instructions
  fill(255);
  stroke(0);
  strokeWeight(3);
  rect(20, 20, 500, 205, 15);

  noStroke();
  fill(0);
  textAlign(LEFT);

  textStyle(BOLD);
  textSize(32);
  text("NYC ROAD TRIP", 40, 65);

  textStyle(NORMAL);
  textSize(18);
  text("Welcome! Let's drive through New York City.", 40, 105);

  textStyle(BOLD);
  text("NYC CONTROLS", 40, 145);

  textStyle(NORMAL);
  text("SPACE - Start or stop traffic", 40, 180);
  text("ENTER - Go to the house", 40, 210);

  fill(255, 230, 0);
  textStyle(BOLD);
  textSize(25);

  if (driving) {
    text("Traffic is moving!", 25, 855);
  } else {
    text("Traffic is stopped!", 25, 855);
  }

  textStyle(NORMAL);
}


// SCENE 2: HOUSE

function drawHouse() {
  // Sunset sky colors
  if (sunX < 200) {
    background(135, 206, 250);
  } else if (sunX < 350) {
    background(255, 200, 120);
  } else if (sunX < 500) {
    background(255, 125, 55);
  } else if (sunX < 600) {
    background(190, 65, 75);
  } else if (sunX < 700) {
    background(75, 40, 100);
  } else {
    background(5, 5, 25);
  }

  // Grass
  if (sunX < 350) {
    fill(80, 170, 80);
  } else if (sunX < 550) {
    fill(75, 115, 60);
  } else {
    fill(25, 40, 35);
  }

  noStroke();
  rect(0, 300, 800, 600);

  // Sun
  if (sunX < 450) {
    fill(255, 204, 0);
  } else {
    fill(255, 100, 40);
  }

  ellipse(sunX, 100, 120, 120);

  sunX += sunSpeed;

  if (sunX >= 740) {
    sunX = 740;
    sunSpeed = -1;
  }

  if (sunX <= 60) {
    sunX = 60;
    sunSpeed = 1;
  }

  // House body
  fill(255, 220, 120);
  rect(250, 450, 300, 250);

  // Roof
  fill(180, 80, 40);
  triangle(200, 450, 600, 450, 400, 270);

  // Chimney
  fill(150, 65, 45);
  rect(465, 325, 45, 100);

  // Door
  fill(100, 55, 30);
  rect(365, 550, 70, 150);

  fill(255, 220, 0);
  ellipse(420, 625, 10, 10);

  // Windows
  fill(120, 200, 255);
  stroke(0);
  strokeWeight(4);

  rect(275, 490, 65, 65);
  line(307, 490, 307, 555);
  line(275, 522, 340, 522);

  rect(460, 490, 65, 65);
  line(492, 490, 492, 555);
  line(460, 522, 525, 522);

  noStroke();

  // Walkway
  fill(150);
  rect(350, 700, 100, 200);

  // Driveway
  fill(110);
  rect(600, 600, 150, 300);
  rect(550, 550, 200, 100);

  // House car follows mouse https://p5js.org/reference/p5/constrain/ 
  houseCarX = constrain(mouseX, 650, 700);
  houseCarY = constrain(mouseY, 640, 880);

  drawcar(houseCarX, houseCarY, r, g, b, 1);

  // Instructions
  fill(255);
  textAlign(LEFT);

  textStyle(BOLD);
  textSize(30);
  text("MY HOUSE", 25, 45);

  textStyle(NORMAL);
  textSize(18);
  text("Move your mouse to drive.", 25, 80);
  text("Click to change your car color.", 25, 110);
  text("Drive to the bottom to enter traffic!", 25, 140);

  // Enter traffic game at the bottom
  if (houseCarY >= 870) {
    scene = "traffic";
    resetTraffic();
  }
}


// SHARED CAR DESIGN

function drawcar(x, y, red, green, blue, carSize) {
  push();

  translate(x, y);
  scale(carSize);

  // Body
  fill(red, green, blue);
  noStroke();
  rect(-50, -20, 100, 40, 8);

  // Gray roof
  fill(160);
  rect(-25, -35, 50, 20, 5);

  // Black wheels
  fill(0);
  ellipse(-30, 20, 25, 25);
  ellipse(30, 20, 25, 25);

  // White wheel details
  stroke(255);
  strokeWeight(2);
  noFill();

  ellipse(-30, 20, 12, 12);
  ellipse(30, 20, 12, 12);

  pop();
}


// SCENE 3: HORIZONTAL TRAFFIC GAME

function drawTraffic() {
  background(70, 160, 80);

  // Horizontal road
  noStroke();
  fill(55);
  rect(0, 250, width, 400);

  // Road edges
  fill(255);
  rect(0, 250, width, 5);
  rect(0, 645, width, 5);

  // MOVE ROAD LINES
  stroke(255);
  strokeWeight(5);

  trafficLineX -= 5;

  if (trafficLineX <= -100) {
    trafficLineX = 0;
  }

  for (let x = trafficLineX; x < width; x += 100) {
    line(x, 380, x + 50, 380);
    line(x, 515, x + 50, 515);
  }

  noStroke();

  // Player follows mouse up and down Chttps://p5js.org/reference/p5/constrain/
  playerY = constrain(mouseY, 290, 610);

  drawcar(130, playerY, playerR, playerG, playerB, 1);

  // MOVE ENEMY CARS
  for (let A = 0; A < enemyX.length; A++) {
    enemyX[A] -= enemySpeed;

    // Enemy car colors
    if (A == 0) {
      drawcar(enemyX[A], enemyY[A], 255, 40, 40, 1);
    } else if (A == 1) {
      drawcar(enemyX[A], enemyY[A], 30, 220, 70, 1);
    } else {
      drawcar(enemyX[A], enemyY[A], 255, 210, 0, 1);
    }

    // Check for a crash
    if (
      abs(130 - enemyX[A]) < 85 &&
      abs(playerY - enemyY[A]) < 35
    ) {
      scene = "gameover";
      return;
    }

    // Send cars back to the right
    if (enemyX[A] < -100) {
      enemyX[A] = width + random(150, 450);
      enemyY[A] = random([320, 450, 580]);
      score++;
    }
  }

  // Score and instructions
  noStroke();
  fill(255);
  textAlign(LEFT);
  textStyle(BOLD);
  textSize(25);
  text("Score: " + score, 20, 40);

  textStyle(NORMAL);
  textSize(18);
  text("Move your mouse UP and DOWN to dodge traffic!", 20, 90);
  text("R = Restart   M = Return to NYC", 20, 125);
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

  textStyle(NORMAL);
  textSize(22);
  text("Press R to try again", width / 2, 480);
  text("Press M to return to NYC", width / 2, 520);

  textAlign(LEFT);
}


// KEYBOARD CONTROLS

function keyPressed() {
  let pressed = key.toLowerCase();

  // SPACE starts or stops NYC traffic
  if (scene == "nyc" && keyCode == 32) {
    driving = !driving;
  }

  // ENTER changes scenes
  if (keyCode == ENTER || keyCode == 13) {
    if (scene == "nyc") {
      scene = "house";
    } else if (scene == "house") {
      scene = "traffic";
      resetTraffic();
    }
  }

  // R restarts the game
  if (pressed == "r") {
    if (scene == "traffic" || scene == "gameover") {
      resetTraffic();
      scene = "traffic";
    }
  }

  // M returns to NYC
  if (pressed == "m") {
    scene = "nyc";
    driving = true;

    roadLineX = 0;

    nycCars[0].x = -120;
    nycCars[1].x = 180;
    nycCars[2].x = 470;
    nycCars[3].x = 720;

    sunX = 100;
    sunSpeed = 1;

    houseCarX = 675;
    houseCarY = 700;

    resetTraffic();
  }

  return false;
}


// MOUSE CLICK

function mousePressed() {
  // Change house car color
  if (scene == "house") {
    r = random(255);
    g = random(255);
    b = random(255);
  }

  // Change player car color
  if (scene == "traffic") {
    playerR = random(255);
    playerG = random(255);
    playerB = random(255);
  }
}


// RESET TRAFFIC GAME

function resetTraffic() {
  playerY = 450;

  enemyX = [900, 1200, 1500];
  enemyY = [320, 450, 580];

  enemySpeed = 5;
  score = 0;

  // Reset moving road lines
  trafficLineX = 0;
}

