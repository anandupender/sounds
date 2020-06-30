let mic,cnv,sound,myFont;
let endFFT = .6;
let bassMapped = 0;

var localSpeed1 = 0;
var localSpeed2 = 0;

let circleSize = window.innerHeight/2;
let defaultXPos = window.innerWidth/2;
let defaultYPos = window.innerHeight/2;
let rotateSpeed = .05;

let bassThreshold = 150;

function preload(){
    sound = loadSound('../audio/nav.mp3');
  }

 function setup(){
    cnv = createCanvas(window.innerWidth,window.innerHeight);
    rectMode(CENTER);
    document.querySelector("#play").onclick = play;
    fft = new p5.FFT(.92,1024);
    // mic = new p5.AudioIn();
    // mic.start();
    // fft.setInput(mic);
}

// looped drawing function
function draw(){
    background(0);

    let spectrum = fft.analyze();
    let bass = fft.getEnergy("bass");
    let volume = fft.getEnergy("highMid");
    localSpeed1 += .01; 
    localSpeed2 += .02; 
    if(bass > bassThreshold){
        bassMapped = map(Math.pow(bass,2), bassThreshold,Math.pow(255,2),0,circleSize/14);
    }else{   // dampener to gradually return to center
        if(bassMapped > 0){
            bassMapped-=.1;
        }
    }

    push();
    translate(defaultXPos,defaultYPos);
    rotate(localSpeed1 + map(Math.pow(volume,2),0,Math.pow(255,2),0,10));
    blendMode(ADD);
    fill(color(255,0,0));
    circle(-bassMapped,0,circleSize);
    pop();

    push();
    translate(defaultXPos,defaultYPos);
    blendMode(ADD);
    fill(color(0,255,0));
    circle(0,0,circleSize);
    pop();

    push();
    translate(defaultXPos,defaultYPos);
    fill(color(0,0,255));
    blendMode(ADD);
    rotate(localSpeed2  + map(Math.pow(volume,2),0,Math.pow(255,2),0,17));
    circle(bassMapped,0,circleSize);
    pop();
}

function play() {
    sound.loop();
    document.querySelector("#play").style.display = "none";
  }