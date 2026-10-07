/*
Name: Jai G
Title: NYC Car Ride
Theme: Driving through New York City

Instructions:
Press SPACE to start and stop the car.
The car drives across the city.
*/

let city;
let car;

let carX = -200;
let speed = 3;
let driving = false;

let startTime;

async function setup() {
  createCanvas(800, 500);

  city = await loadImage("assets/NYC.jpeg");
  car = await loadImage("assets/CAR.png");

  startTime = millis();
}

function draw() {
  image(city, 0, 0, width, height);

  // Make car smaller as it leaves the screen
  let carSize = map(carX, 0, width, 250, 80);

  image(car, carX, 330, carSize, carSize * 0.6);

  // Move the car
  if (driving == true) {
    carX = carX + speed;
  }

  // Send car back to the left
  if (carX > width) {
    carX = -250;
  }

  // Text
  fill(255);
  textSize(28);
  text("NYC Drive", 30, 45);

  textSize(16);
  text("Press SPACE to start or stop", 30, 70);

  // Timed event
  if (millis() - startTime > 5000) {
    textSize(20);
    text("Enjoy the ride through New York!", 30, 105);
  }
}

function keyPressed() {
  if (key == " ") {
    driving = !driving;
  }
}