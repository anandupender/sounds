//version 1 is just a simple circle
//version 2 starts playing with modulating the shape of the circle 

var maxObservedFreq = 200;
var circleSize = 25;
var dotThreshold = 240;
var fftSize = 1024;

//isolate the low trombone beats in this song
var startFFT = 1;
var endFFT = 7;

var magicHeightMultiplier = 12;
var magicPower = 10;


function preload(){
    sound = loadSound('../audio/randj.mp3');
  }
  
  function setup(){
    let cnv = createCanvas(window.innerWidth,window.innerHeight);
    document.querySelector("#play").onclick = play;
    fft = new p5.FFT(.93, fftSize);
    frameRate(100);

  }
  
  function draw(){
    background(255,255,255);


    let spectrum = fft.analyze();

    // beginShape();
    // stroke(0);
    // noFill();
    var avgFreqLevel = 0;
    for (let i = startFFT; i< endFFT; i++){
        avgFreqLevel+=spectrum[i];
        // use to look at waveform and debug
        curveVertex(map(i,startFFT,endFFT,0,width), map(spectrum[i], 0, 255, height, 0));
    }
    // endShape();

    avgFreqLevel = avgFreqLevel/(endFFT-startFFT);
    // var size = map(avgFreqLevel,0,255,);
    avgFreqLevel = Math.pow(avgFreqLevel,magicPower);
    var size = map(avgFreqLevel,0,Math.pow(255,magicPower),0,height*magicHeightMultiplier);

    noStroke();
    fill(color(255,80,75));
    ellipse(width/2,height/2,size);

  }
  
  
  function play() {
    sound.loop();
    document.querySelector("#play").style.display = "none";
  }
