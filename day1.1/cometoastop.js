var maxObservedFreq = 200;
var circleSize = 25;
var dotThreshold = 240;
var fftCutoff = .019;

//another way to do random colors
var colorScheme = [{r:255,g:219,b:110},{r:255,g:113,b:113},{r:131,g:77,b:255},{r:109,g:251,b:255},{r:100,g:232,b:211}];

var spectrumHistory = [];

function preload(){
    sound = loadSound('../audio/cometoastop.mp3');
  }
  
  function setup(){
    let cnv = createCanvas(window.innerWidth,window.innerHeight);
    document.querySelector("#play").onclick = play;
    fft = new p5.FFT(.8, 1024);
    // sound.amp(0.2);

  }
  
  function draw(){
    background(255,255,255);
  
    noStroke();

    let spectrum = fft.analyze();

    for (let i = 0; i< spectrum.length*fftCutoff; i++){

      var x = map(i, 0, spectrum.length*fftCutoff, 0, width);

     if(spectrum[i]>=dotThreshold){
        ellipse(x,window.innerHeight/2,circleSize,circleSize);
        if(spectrumHistory[i] != 1){
            //smart random
            var randomColor = Math.floor(Math.random()*colorScheme.length);
            fill(colorScheme[randomColor].r,colorScheme[randomColor].g,colorScheme[randomColor].b);

            //simple random
            // fill(Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256));
        }
        spectrumHistory[i] = 1;
     }
     else{
        spectrumHistory[i] = 0;
     }
    }

  }
  
  function play() {
    sound.loop();
    document.querySelector("#play").style.display = "none";
  }