let mic;
let endFFT = .6;
var localFrameCount1 = 0;
var localFrameCount2 = 0;
var localFrameCount3 = 0;

function preload(){
    sound = loadSound('../audio/coldplay.mp3');
  }


 function setup(){
 let cnv = createCanvas(window.innerWidth,window.innerHeight, WEBGL);
 document.querySelector("#play").onclick = play;

  textAlign(CENTER);
//   mic = new p5.AudioIn();
//   mic.start();
  fft = new p5.FFT(.92,1024);
//   fft.setInput(mic);

}

function draw(){
    background(255);

    // draw fft
    let spectrum = fft.analyze();

    push();
    fill(color(122,150,255));
    localFrameCount1 = localFrameCount1 + (map(fft.getEnergy("bass"),0,255,1,5));
    //cool size changes
    level = fft.getEnergy("highMid");
    size1 = Math.floor(map(level, 0, 255, height/8, height/6));
    rotateY(localFrameCount1  * 0.003);
    rotateX(frameCount * 0.005);
    rotateZ(frameCount * 0.005);
    torus(size1, height/50, 64, 64);
    pop();

    push();
    fill(color(135,223,255));
    localFrameCount2 = localFrameCount2 + (1*map(fft.getEnergy("highMid"),0,255,1,5));
    rotateY(localFrameCount2  * 0.005);
    rotateX(frameCount * 0.002);
    rotateZ(frameCount * 0.009);
    torus(height/5, height/50, 64, 64);
    pop();

    push();
    fill(color(122,255,218));
    localFrameCount3 = localFrameCount3 + (map(fft.getEnergy(20,10000),0,255,1,10));
    size3 = Math.floor(map(level, 0, 255, height/3.5, height/2.4));
    rotateY(localFrameCount3  * 0.005);
    rotateX(localFrameCount3 * 0.004);
    rotateZ(frameCount * 0.019);
    torus(size3, height/50, 64, 64);
    pop();

    // TEST 1
    // beginShape();

    // noFill();
    // stroke(0)
    // strokeWeight(3);
    // for (i = 50; i < 200; i++) {
    //     curveVertex(map(i,50,200,0,width), map(spectrum[i], 0, 255, height, 0));
    // }

    // endShape();

    // TEST 2
    //  //bass - such clear results!
    //  let level = fft.getEnergy("bass");
    //  let size = map(level, 0, 255, 50, 100);
    //  ellipse(width/6, height/2, size, size);
 

    //  level = fft.getEnergy("lowMid");
    //  size = map(level, 0, 255, 50, 100);
    //  ellipse(2*width/6, height/2, size, size);

    // level = fft.getEnergy("mid");
    // size = map(level, 0, 255, 50, 100);
    // ellipse(3*width/6, height/2, size, size);

    // //use for small pokes of size changes
    // level = fft.getEnergy("highMid");
    // size = map(level, 0, 255, 50, 100);
    // ellipse(4*width/6, height/2, size, size);

    // level = fft.getEnergy("treble");
    // size = map(level, 0, 255, 50, 100);
    // ellipse(5*width/6, height/2, size, size);


    //TEST 3
    // level = fft.getEnergy(20,10000);
    // size = map(level,0,255,200,500);
    // ellipse(width/2, height/2, size, size);

}

function play() {
    sound.loop();
    document.querySelector("#play").style.display = "none";
  }