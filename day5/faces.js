var canvasWidth = screen.width;
var canvasHeight = screen.height;
var miniCanvasSize = 120;
var padding = 100;

let sound, amplitude;

var allFaces = [];

function preload(){
    soundFormats('mp3');
  
    sound = loadSound('../audio/sunmodels.mp3');
  }

function setup() {
  frameRate(60);
  createCanvas(canvasWidth, canvasHeight);
  document.querySelector("#play").onclick = play;
  amplitude = new p5.Amplitude();
  amplitude.smooth(.75);
}

function generateFaces(){
    for (var yPos = 0; yPos < canvasHeight / (miniCanvasSize + padding); yPos++) {
        for (var xPos = 0;xPos < canvasWidth / (miniCanvasSize + padding);xPos++) {
          var startX = xPos * (miniCanvasSize + padding);
          var startY = yPos * (miniCanvasSize + padding);
          var face = {};
          face.eyebrows = generateEyebrows(startX, startY);
          face.eyes = generateEyes(startX, startY);
          face.mouth = generateMouth(startX, startY);
          allFaces.push(face);
        }
      }
}


//EYEBROWS
function generateEyebrows(x0, y0) {
  //left eyebrow
  var x1 = x0 + Math.floor((Math.random() * miniCanvasSize) / 4);
  var x2 =
    x0 + Math.floor((Math.random() * miniCanvasSize) / 4) + miniCanvasSize / 4;
  var y1 = y0 + Math.floor((Math.random() * miniCanvasSize) / 6);
  var y2 =
    y0 + Math.floor((Math.random() * miniCanvasSize) / 6 + miniCanvasSize / 6);

  //right eyebrow
  var x3 =
    x0 + Math.floor((Math.random() * miniCanvasSize) / 4) + miniCanvasSize / 2;
  var x4 =
    x0 +
    Math.floor((Math.random() * miniCanvasSize) / 4) +
    (3 * miniCanvasSize) / 4;
  var y3 = y0 + Math.floor((Math.random() * miniCanvasSize) / 6);
  var y4 =
    y0 + Math.floor((Math.random() * miniCanvasSize) / 6 + miniCanvasSize / 6);

  strokeWeight(Math.floor(miniCanvasSize / 15));

  //randomize up or down slope
  var toReturn = [];
  if (Math.random() > 0.5) {
    toReturn[0] = {eb1:x1, eb2:y1, eb3:x2, eb4:y2};
  } else {
    toReturn[0] = {eb1:x1, eb2:y2, eb3:x2, eb4:y1};
  }
  if (Math.random() > 0.5) {
    toReturn[1] = {eb1:x3, eb2:y3, eb3:x4, eb4:y4};
  } else {
    toReturn[1] = {eb1:x3, eb2:y4, eb3:x4, eb4:y3};
  }
  return toReturn;
}

//EYES
function generateEyes(x0, y0) {
  var y =
    y0 + Math.floor((Math.random() * miniCanvasSize) / 3) + miniCanvasSize / 3;
  //left eye
  var x1 =
    x0 + Math.floor((Math.random() * miniCanvasSize) / 4) + miniCanvasSize / 8;
  var r1 =
    Math.floor((Math.random() * miniCanvasSize) / 4) + miniCanvasSize / 8;
  //right eye
  var x2 =
    x0 +
    Math.floor((Math.random() * miniCanvasSize) / 4) +
    (5 * miniCanvasSize) / 8;
  var r2 =
    Math.floor((Math.random() * miniCanvasSize) / 4) + miniCanvasSize / 8;

  strokeWeight(Math.floor(miniCanvasSize / 15));
  var toReturn = [{x:x1, y:y, r:r1},{x:x2, y:y, r:r2}];
  return toReturn;
}

// ROUND MOUTH
function generateMouth(x0, y0) {
  var x =
    x0 + Math.floor((Math.random() * miniCanvasSize) / 8) + miniCanvasSize / 4;
  var y =
    y0 +
    Math.floor((Math.random() * miniCanvasSize) / 3) +
    (5 * miniCanvasSize) / 6;
  var r =
    Math.floor((Math.random() * miniCanvasSize) / 6) + miniCanvasSize / 12;

  var p1 = Math.floor(Math.random() * Math.PI * 2);
  var p2 = Math.floor(Math.random() * Math.PI * (3 / 4));

  //randomize smile or frown mouths
  if (Math.random() > 0.5) {
    return {x:x,y:y,r:r,p1:p1,p2:p2};
  } else {
    return {x:x,y:y,r:r,p1:p2,p2:p1};
  }
}

//LINE MOUTH
// function createLineMouth(x0, y0) {
//   var x1 = x0 + Math.floor((Math.random() * miniCanvasSize) / 4);
//   var x2 =
//     x0 + Math.floor((Math.random() * miniCanvasSize) / 4) + miniCanvasSize / 4;
//   var y1 =
//     y0 +
//     Math.floor((Math.random() * miniCanvasSize) / 3) +
//     (2 * miniCanvasSize) / 3;
//   var y2 =
//     y0 +
//     Math.floor((Math.random() * miniCanvasSize) / 3) +
//     (2 * miniCanvasSize) / 3;

//   strokeWeight(Math.floor(miniCanvasSize / 15));
//   line(x1, y1, x2, y2);
// }

function draw() {
    background(255);
    for (var i = 0; i<allFaces.length; i++) {
        var face = allFaces[i];
        let level = amplitude.getLevel();

        // eyebrows
        let multiplier1 = map(level, 0, 1, 3, 15);
        let multiplier2 = map(level, 0, 1, 0, 5);
        line(face.eyebrows[0].eb1, face.eyebrows[0].eb2-multiplier1, face.eyebrows[0].eb3, face.eyebrows[0].eb4-multiplier1);
        line(face.eyebrows[1].eb1, face.eyebrows[1].eb2-multiplier2, face.eyebrows[1].eb3, face.eyebrows[1].eb4-multiplier2);

        // eyes
        let m1 = map(level, 0, 1, 0, 3);
        let m2 = map(level, 0, 1, 0, 6);
        circle(face.eyes[0].x-m1, face.eyes[0].y, face.eyes[0].r);
        circle(face.eyes[1].x+m2, face.eyes[1].y, face.eyes[1].r);

        // mouth
        let multiplier = map(level, 0, 1, 1, 3);
        arc(face.mouth.x, face.mouth.y, face.mouth.r*multiplier, face.mouth.r*multiplier, face.mouth.p1, face.mouth.p2);

    }
}

function play() {
    sound.loop();
    generateFaces();
    document.querySelector("#play").style.display = "none";
  }
