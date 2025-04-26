let circleX = 220;
let circleY = 150;
let circleRadius = 75;

let graphX = 50;
let graphY = 300;
let graphAmplitude = 50;
let graphPeriod = 300;

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  describe('Demonstrating the relationship between the unit circle and the sine and cosine values.');
}

function draw() {
  background(0);

  //Set angle based on frameCount and display current value
  let angle = (frameCount*0.5) % 360;

  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(`angle: ${int(angle)}`, 25, 25);

  //Draw circles and diameters
  noFill();
  stroke(128);
  strokeWeight(3);
  circle(circleX, circleY, 2 * circleRadius);
  line(circleX, circleY - circleRadius, circleX, circleY + circleRadius);
  line(circleX - circleRadius, circleY, circleX + circleRadius, circleY);
  
  //Draw pi labels on unit circle
  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  let labelOffset = 30;
  text('0', circleX + (circleRadius + labelOffset), circleY);
  text('π/2', circleX, circleY - (circleRadius + labelOffset));
  text('π', circleX - (circleRadius + labelOffset), circleY);
  text('3π/2', circleX, circleY + (circleRadius + labelOffset));
  text('2π', circleX + (circleRadius + labelOffset), circleY);
  
  
  

  //Draw moving points on circle
  let pointX = circleX + circleRadius * cos(angle);
  let pointY = circleY - circleRadius * sin(angle);

  line(circleX, circleY, pointX, pointY);

  noStroke();

  fill('white');
  circle(pointX, pointY, 10);

  fill('#80FF72');
  circle(pointX, circleY, 10);

  fill('#7EE8FA');
  circle(circleX, pointY, 10);

  //Draw parabola graph
  stroke('gray');
  strokeWeight(3);
  line(graphX, graphY, graphX + 300, graphY);
  line(graphX, graphY - graphAmplitude, graphX, graphY + graphAmplitude);
  line(
    graphX + graphPeriod,
    graphY - graphAmplitude,
    graphX + graphPeriod,
    graphY + graphAmplitude
  );

  fill('gray');
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  text('0', graphX, graphY + graphAmplitude + 20);
  text('360', graphX + graphPeriod, graphY + graphAmplitude + 20);
  text('1', graphX / 2, graphY - graphAmplitude);
  text('0', graphX / 2, graphY);
  text('-1', graphX / 2, graphY + graphAmplitude);

  fill('#80FF72');
  text('cos', graphX + graphPeriod + graphX / 2, graphY - graphAmplitude);
  fill('#7EE8FA');
  text('sin', graphX + graphPeriod + graphX / 2, graphY);

  // Draw cosine curve
  noFill();
  stroke('#80FF72');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, graphX, graphX + graphPeriod);
    let y = graphY - graphAmplitude * cos(t);
    vertex(x, y);
  }
  endShape();

  // Draw sine curve
  noFill();
  stroke('#7EE8FA');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, graphX, graphX + graphPeriod);
    let y = graphY - graphAmplitude * sin(t);
    vertex(x, y);
  }
  endShape();

  // Draw moving line
  let lineX = map(angle, 0, 360, graphX, graphX + graphPeriod);
  stroke('grey');
  line(lineX, graphY - graphAmplitude, lineX, graphY + graphAmplitude);

  // Draw moving points on graph
  let orangeY = graphY - graphAmplitude * cos(angle);
  let redY = graphY - graphAmplitude * sin(angle);

  noStroke();

  fill('#80FF72');
  circle(lineX, orangeY, 10);

  fill('#7EE8FA');
  circle(lineX, redY, 10);
}
