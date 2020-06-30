let sound, amplitude;

let maxSize = 150;
let minSize = 20;

var numChars = 4;
var kern = 15;
var charWidth = 120;
var charHeight = charWidth;
var divider = 1/3;
var strokeSize = charWidth*divider;
var wordWidth = (charWidth*numChars) + kern*(numChars-1)
var xOffset = (window.innerWidth-wordWidth)/2;
var yOffset = (window.innerHeight-charHeight)/2;

function preload(){
  soundFormats('mp3');
  sound = loadSound('../audio/toni.mp3');
}

function setup() {
    let cnv = createCanvas(window.innerWidth,window.innerHeight);
    document.querySelector("#play").onclick = play;
    fft = new p5.FFT(.9);
    amplitude = new p5.Amplitude();
    amplitude.smooth(.95);
    console.log(window.innerWidth);
    if(window.innerWidth < 600){
        charWidth = 80;
        charHeight = charWidth;
        strokeSize = charWidth*divider;
        wordWidth = (charWidth*numChars) + kern*(numChars-1)
        xOffset = (window.innerWidth-wordWidth)/2;
        yOffset = (window.innerHeight-charHeight)/2;
    }
}

function draw() {
    background(color(143,106,135));
    stroke(0);
    strokeWeight(5);
    let spectrum = fft.analyze();

    // testCode(spectrum);

    //start creating "toni" in shapes

    //T
    push();
    fill(color(80,168,200));
    let currLevel = amplitude.getLevel();
    let mover1 = map(currLevel, 0, 1, 0, 30);
    let mover2 = map(currLevel, 0, 1, 0, 11);
    rect(xOffset,yOffset-mover1,charWidth,strokeSize);
    rect(xOffset+charWidth*divider,yOffset+strokeSize+mover2,strokeSize,charHeight*divider*2);

    //O
    let bassLevel = fft.getEnergy("bass");
    let size1 = map(Math.pow(bassLevel,4), 0, Math.pow(255,4), strokeSize, strokeSize*2);
    let size2 = map(Math.pow(bassLevel,4), 0, Math.pow(255,4), charHeight, charHeight*1.075);
    circle(xOffset+charWidth+kern+charWidth/2,yOffset+charHeight/2,size2);
    // fill(color(143,106,135));
    fill(color(245,194,84));

    circle(xOffset+charWidth+kern+charWidth/2,yOffset+charHeight/2,size1);

    //N
    fill(color(80,168,200));
    var powerVar = 4;
    var mover3 = map(Math.pow(spectrum[17],powerVar),0,Math.pow(255,powerVar),0,60);
    rect(xOffset+(charWidth+kern)*2,yOffset-mover3,strokeSize,charHeight);
    var mover4 = map(Math.pow(spectrum[19],powerVar),0,Math.pow(255,powerVar),0,60);
    rect(xOffset+(charWidth+kern)*2+(strokeSize*2),yOffset-mover4,strokeSize,charHeight);

    push();
    var mover5 = map(Math.pow(spectrum[18],powerVar),0,Math.pow(255,powerVar),0,20);
    // line(xOffset+(charWidth+kern)*2+strokeSize,yOffset-mover5,xOffset+(charWidth+kern)*2+strokeSize*2,yOffset+charHeight-mover5);
    rect(xOffset+(charWidth+kern)*2+strokeSize,yOffset-mover5,strokeSize/3,charHeight/3);
    rect(xOffset+(charWidth+kern)*2+strokeSize+(strokeSize/3),yOffset+charHeight/3-mover5,strokeSize/3,charHeight/3);
    rect(xOffset+(charWidth+kern)*2+strokeSize+(strokeSize/3*2),yOffset+charHeight/3*2-mover5,strokeSize/3,charHeight/3);

    pop();

    //I
    let squeezer = map(Math.pow(bassLevel,8), 0, Math.pow(255,8), 1, 1.5);
    rect(xOffset+(charWidth+kern)*3+(strokeSize)/6*squeezer,yOffset,strokeSize*squeezer,charHeight);
    pop();

}

function play() {
  sound.loop();
  document.querySelector("#play").style.display = "none";
}

function testCode(spectrum){
    //bass - such clear results!
    let level = fft.getEnergy("bass");
    let size = map(level, 0, 255, minSize, maxSize);
    ellipse(width/6, height/2, size, size);

    //low mid - good for "one sec"
    level = fft.getEnergy("lowMid");
    size = map(level, 0, 255, minSize, maxSize);
    ellipse(2*width/6, height/2, size, size);

    // piano track
    beginShape();
    let startNum = 15;
    let endNum = 22;
    for (i = startNum; i < endNum; i++) {
        curveVertex(map(i,startNum,endNum,0,width),map(Math.pow(spectrum[i],2),0,Math.pow(255,2),height,0));
    }
    endShape();
}