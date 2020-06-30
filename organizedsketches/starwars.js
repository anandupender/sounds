var maxObservedFreq = 200;
var cnv;

var timeBuffer = [];
var maxHistoryLength = 40;

var fastForwardTime = 5;

var cymbalCheck = 80;
var cymbalThreshold = 255*.375;

//sizing things
var xScaleFactor = 10;
var fftWidth = window.innerWidth*2/3;
var xOffset = window.innerWidth/6;
var xCutoff = .8; //cuttoff final 20% of FFT

var maxHeight = window.innerHeight/2;
var yOffset = maxHeight;
var yScaleFactor = 10;


function preload(){
    sound = loadSound('../audio/starwars.mp3');
  }
  
  function setup(){
    cnv = createCanvas(window.innerWidth,window.innerHeight);
    document.querySelector("#play").onclick = play;
    fft = new p5.FFT(.85, 128);

    // amplitude = new p5.Amplitude(.96);

  }
  
  function draw(){
    cnv.mouseClicked(advanceSong);

    let spectrum = fft.analyze();
    if(spectrum[cymbalCheck] < cymbalThreshold){
      background(0);
    }else{
      background(255);
    }
    timeBuffer.unshift(spectrum); //add new array to beginning
    

    if(timeBuffer.length >= maxHistoryLength){
      timeBuffer.pop(); //remove last array
    }

    for(let currArrayIter = 0; currArrayIter < timeBuffer.length;currArrayIter++){
      beginShape();
      strokeWeight(1);
      noFill();
      if(spectrum[cymbalCheck] < cymbalThreshold){
        stroke(238, 219, 0,255-(255*currArrayIter/maxHistoryLength));
      }else{
        stroke(0, 0, 0,255-(255*currArrayIter/maxHistoryLength));
      }


      var currArray = timeBuffer[currArrayIter];

      for (let i = 0; i< currArray.length*xCutoff; i++){
        var x = map(i, 0, currArray.length*xCutoff, 0+(currArrayIter*xScaleFactor), fftWidth-(currArrayIter*xScaleFactor)) +xOffset;
        var y = map(currArray[i], 0, 255, maxHeight - (currArrayIter*yScaleFactor), 0) + yOffset;
        
        if(y<height){
          curveVertex(x,y);
        }
  
  
      }
        endShape();

    }
    

  
    // text('tap to play', 20, 20);
  }

  function advanceSong(){
    sound.jump(sound.currentTime()+fastForwardTime);
  }
  
  function play() {
    sound.loop();
    document.querySelector("#play").style.display = "none";
  }