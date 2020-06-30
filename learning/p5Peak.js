var cnv, soundFile, fft, peakDetect;
var ellipseWidth = 100;

function preload() {
    soundFormats('mp3');

  soundFile = loadSound('../audio/sunmodels.mp3');
}

function setup() {
    let cnv = createCanvas(600,600);
    document.querySelector("#play").onclick = play;

  background(0);
  noStroke();
  fill(255);
  textAlign(CENTER);

  // p5.PeakDetect requires a p5.FFT
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect(550,800);
}

function draw() {
  background(0);

  // peakDetect accepts an fft post-analysis
  fft.analyze();
  peakDetect.update(fft);

  if ( peakDetect.isDetected ) {
    ellipseWidth = 50;
  } else {
    ellipseWidth *= 0.95;
  }

  ellipse(width/2, height/2, ellipseWidth, ellipseWidth);
}

function play() {
  sound.loop();
  document.querySelector("#play").style.display = "none";
}