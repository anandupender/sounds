let mic,cnv,sound,myFont;
let endFFT = .6;
let bassMapped = 0;

var localSpeed1 = 0;
var localSpeed2 = 0;

let circleSize = window.innerHeight/1.5;
let defaultXPos = window.innerWidth/2;
let defaultYPos = window.innerHeight/2;
let rotateSpeed = .05;

let bassThreshold = 100;

function preload(){
    sound = loadSound('../audio/partition.mp3');
  }


 function setup(){
    cnv = createCanvas(window.innerWidth,window.innerHeight);
    rectMode(CENTER);
    document.querySelector("#play").onclick = play;
    fft = new p5.FFT(.92,1024);
    // mic = new p5.AudioIn();
    // mic.start();
    // fft.setInput(mic);
    noLoop();
}

function draw(){
    background(0);

    let spectrum = fft.analyze();
    let bass = fft.getEnergy("bass");
    let volume = fft.getEnergy("highMid");
    localSpeed1 += .01; 
    localSpeed2 += .027; 
    if(bass > bassThreshold){
        bassMapped = map(Math.pow(bass,2), bassThreshold,Math.pow(255,2),0,circleSize/8);
    }else{   // dampener to gradually return to center
        if(bassMapped > 0){
            bassMapped-=.075;
        }
    }

    var blobWidth = 200;
    let size = 20;
    let firstX = 0;
    let firstY = 0;
    // noFill();
    // stroke(255);
    beginShape();
    for (let i = 0; i<=size; i++){
      push();
      let x = cos(map(i, 0, size, 0, TWO_PI)) * blobWidth + width/2;
      let y = sin(map(i, 0, size, 0, TWO_PI)) * blobWidth + height/2;
      let angle = atan2(y - height/2, x - width/2);
  
      let displacement = Math.floor(Math.random() * 50);

      x += cos(angle)*size*.03+cos(angle)*displacement;
      y += sin(angle)*size*.03+sin(angle)*displacement;

      if(i==0){
        firstX = x;
        firstY = y;
        curveVertex(x,y); //start direction
        curveVertex(x,y);
      }else if(i == size){
        curveVertex(firstX,firstY);
        curveVertex(x,y); //ending direction

      }
      else{
        curveVertex(x,y); //every other time
      }
      pop();
    }
    endShape();

    // push();
    // translate(defaultXPos,defaultYPos);
    // rotate(localSpeed1 + map(Math.pow(volume,2),0,Math.pow(255,2),0,10));
    // blendMode(ADD);
    // fill(color(255,0,0));
    // circle(-bassMapped,0,circleSize);
    // pop();

    // push();
    // translate(defaultXPos,defaultYPos);
    // blendMode(ADD);
    // fill(color(0,255,0));
    // circle(0,0,circleSize);
    // pop();

    // push();
    // translate(defaultXPos,defaultYPos);
    // fill(color(0,0,255));
    // blendMode(ADD);
    // rotate(localSpeed2  + map(Math.pow(volume,2),0,Math.pow(255,2),0,17));
    // circle(bassMapped,0,circleSize);
    // pop();
}

function play() {
    sound.loop();
    document.querySelector("#play").style.display = "none";
  }

  function advanceSong(){
    sound.jump(sound.currentTime()+5);
    console.log("here");
  }