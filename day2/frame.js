let mic;
let magic = .075;
var yThreshold = 200;

let max = 0;
var maxIndex = 0;
var prevMaxIndex = 0;
var prevMax = 0;

//create frame for waves
var xOffset = .3*window.innerWidth;
var frameWidth = .4*window.innerWidth;
var yOffset = .25*window.innerWidth/2;
var frameHeight = .5*window.innerHeight;

//color stuff
var color1 = {r:58,g:0,b:255};
var colorCounter = 0;
var colorMax = 255;
var colorDirection = "inc";

function preload(){
    sound = loadSound('../audio/navOrgan.mp3');
}

 function setup(){
 let cnv = createCanvas(window.innerWidth,window.innerHeight);
//  document.querySelector("#play").style.display = "none";
document.querySelector("#play").onclick = play;


  textAlign(CENTER);
//   mic = new p5.AudioIn();
//   mic.start();
  fft = new p5.FFT(.9,512);
//   fft.setInput(mic);
  frameRate(100);

}

function draw(){
    background(255);

    // draw fft
    let spectrum = fft.analyze();

    //draw sun moving based on volume
    noStroke();
    fill(color(255,181,140));
    // let mappedLevel = map(Math.pow(mic.getLevel(),.1), 0,1,yOffset+frameHeight,yOffset);
    let mappedLevel = map(fft.getEnergy("bass"), 0,255+50,yOffset+frameHeight,yOffset);

    circle(xOffset+frameWidth/2,mappedLevel,50);
    
    beginShape();

    //first point bottom left so fill works
    vertex(xOffset+2,yOffset+frameHeight);
    curveVertex(xOffset+2,yOffset+frameHeight+30);


    max = 0;
    fill(255);
    // noFill();
    for (i = 10; i < spectrum.length*magic; i++) {
        stroke(color(color1.r, colorCounter, color1.b));
        strokeWeight(3);

        if(colorDirection == "up"){
            colorCounter+=.05;
        }
        else{
            colorCounter-=.05;
        }

        if(colorCounter > colorMax){
            colorDirection = "down";
        }else if(colorCounter <= 0){
            colorDirection = "up";
        }

        curveVertex(map(i,10,spectrum.length*magic,0,frameWidth)+xOffset+2, map(spectrum[i], 0, 255+12, frameHeight, 0)+yOffset);

        if (spectrum[i] > max) {
            prevMaxIndex = maxIndex;
            maxIndex = i;
            max = spectrum[i];
        }

    }
    //last point bottom right so fill works
    curveVertex(xOffset+frameWidth,yOffset+frameHeight+30);
    vertex(xOffset+frameWidth,yOffset+frameHeight);

    endShape();

    // draw frame
    strokeWeight(3);
    stroke(color(0,0,0));
    noFill();
    rect(xOffset,yOffset-10,frameWidth,frameHeight*1.1);

    //draw a circle at a random location when the max frequency changes
        // if( Math.abs(maxIndex - prevMaxIndex) > 1){
    //     background(255);
    //     var x = Math.floor(Math.random() * width);
    //     var y = Math.floor(Math.random() * height);
    //     var circleSize = Math.floor(Math.random()*height/3)+10;
    //     strokeWeight(5);
    //     stroke(color(0, 0, 0));
    //     noFill();
    //     circle(x,y,circleSize);
    // }
}

function play() {
    sound.loop();
    document.querySelector("#play").style.display = "none";
  }
  