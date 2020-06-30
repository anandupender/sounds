//version 1 is just a simple circle
//version 2 starts playing with modulating the shape of the circle 
// thanks https://genekogan.com/code/p5js-transformations/ and https://editor.p5js.org/aferriss/sketches/HkoeLWBS7

var maxObservedFreq = 200;
var circleSize = 25;
var dotThreshold = 240;
var fftSize = 1024;
var startFFTBlob = 110;
var endFFTBlob = 180;

//isolate the low trombone beats in this song
var startFFT = 1;
var endFFT = 7;

var magicHeightMultiplier = 11;
var magicPower = 10;
var maxFreqDisp = 2;

var blobWidth = 1;


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
    background(240,240,240);


    let spectrum = fft.analyze();

    var avgFreqLevel = 0;
    for (let i = startFFT; i< endFFT; i++){
        avgFreqLevel+=spectrum[i];
    }

    avgFreqLevel = avgFreqLevel/(endFFT-startFFT);

    avgFreqLevel = Math.pow(avgFreqLevel,magicPower);
    var size = map(avgFreqLevel,0,Math.pow(255,magicPower),0,height*magicHeightMultiplier);

    fill(color(255,80,75));
    ellipse(width/2,height/2,size);

    noStroke();
    // fill(color(122,64,255));
    fill(color(30,30,30));


    //blob
    beginShape();
    for (let i = startFFTBlob; i<endFFTBlob; i++){
      push();
      let x = cos(map(i, 0, (endFFTBlob-startFFTBlob), 0, TWO_PI)) * blobWidth + width/2;
      let y = sin(map(i, 0, (endFFTBlob-startFFTBlob), 0, TWO_PI)) * blobWidth + height/2;
      let angle = atan2(y - height/2, x - width/2);
  
      let displacement = map(Math.pow(spectrum[i],2),0,255,0,maxFreqDisp);

      x += cos(angle)*size*.03+cos(angle)*displacement;
      y += sin(angle)*size*.03+sin(angle)*displacement;
      
      curveVertex(x,y);
      pop();
    }
    endShape();

  }
  
  function play() {
    sound.loop();
    document.querySelector("#play").style.display = "none";
  }
