var maxObservedFreq = 200;

function preload(){
    sound = loadSound('../audio/sunmodels.mp3');
  }
  
  function setup(){
    let cnv = createCanvas(window.innerWidth,window.innerHeight);
    document.querySelector("#play").onclick = play;
    fft = new p5.FFT(.94, 1024);
    // sound.amp(0.2);
    amplitude = new p5.Amplitude(.96);
    play();
  }
  
  function draw(){

    let level = amplitude.getLevel();
    let color = map(level, 0, 1, 0, 100);  //color offset
    background(255,219,105+color);
  
    let spectrum = fft.analyze();

    beginShape();
    strokeWeight(4);
    noFill();

    var max = 0;
    var maxIndex = 0;
    var maxRange = 22;
    for (let i = 0; i< spectrum.length; i++){
      if (spectrum[i] > max && i <= maxRange) {
        maxIndex = i;
        max = spectrum[i];
    }

      var x = map(i, 0, spectrum.length-1013, 0, width);
      var y = map(Math.pow(spectrum[i],2), 0, Math.pow(255,2), height, 0);

      if(y<height){
        curveVertex(x,y);
      }


    }
    console.log(maxIndex);

    if(maxIndex >= 18 && maxIndex <= 22){
      stroke(255, 246, 105);
    }else if(maxIndex <= 10){
      stroke(54, 232, 156);
    }else if(maxIndex < 18 && maxIndex > 10){
      stroke(10, 34, 255);
    }else{
      // stroke(0, 0, 0);
    }
    stroke(0, 0, 0);

    endShape();

  
    // text('tap to play', 20, 20);
  }
  function play() {
    sound.loop();
    document.querySelector("#play").style.display = "none";
  }