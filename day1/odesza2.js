var maxObservedFreq = 200;
var circleSize = 30;

function preload(){
    sound = loadSound('../audio/sunmodels.mp3');
  }
  
  function setup(){
    let cnv = createCanvas(window.innerWidth,window.innerHeight);
    document.querySelector("#play").onclick = play;
    fft = new p5.FFT(.94, 1024);
    // sound.amp(0.2);
    amplitude = new p5.Amplitude(.96);

  }
  
  function draw(){

    let level = amplitude.getLevel();
    let color = map(level, 0, 1, 0, 50);  //color offset
    background(255,184-color,147);
  
    let spectrum = fft.analyze();

    beginShape();
    strokeWeight(4);
    noFill();

    for (let i = 0; i< spectrum.length; i++){


      var x = map(i, 0, spectrum.length-1013, 0, width);
      var y = map(Math.pow(spectrum[i],2), 0, Math.pow(255,2), height, 0);

      ellipse(x,y,circleSize,circleSize);


    }

    endShape();

    }
  
    function play() {
      sound.loop();
      document.querySelector("#play").style.display = "none";
    }