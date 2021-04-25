let sound, amplitude;

function preload(){
  soundFormats('mp3');

  sound = loadSound('../audio/sunmodels.mp3');
}

function setup() {
  let cnv = createCanvas(600,600);
  document.querySelector("#play").onclick = play;
  amplitude = new p5.Amplitude();
  amplitude.smooth(.95);
}

function draw() {
  background(220);
  text('tap to play', 20, 20);

  let level = amplitude.getLevel();
  let size = map(level, 0, 1, 300, 600);
  ellipse(width/2, height/2, size, size);
}

function play() {
  sound.loop();
  document.querySelector("#play").style.display = "none";
}