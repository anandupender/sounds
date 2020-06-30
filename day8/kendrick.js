let mic,cnv,sound,myFont;
let endFFT = .6;

let wordWidth = 16;
let wordHeight = 24;

let bassTrigger = false;
var localCounter = 0;

function preload(){
    sound = loadSound('../audio/pride.mp3');
    myFont = loadFont('../assets/times.ttf');
  }


 function setup(){
    cnv = createCanvas(window.innerWidth,window.innerHeight);
    document.querySelector("#play").onclick = play;
    fft = new p5.FFT(.92,1024);
    textFont(myFont);
    textAlign(CENTER);    

}

function draw(){
    background(255);
    cnv.mouseClicked(advanceSong);

    let spectrum = fft.analyze();

    let opacity = fft.getEnergy("bass");
    if(opacity > 210){
        bassTrigger = true;
        textSize(20);
        for(let x = 0; x < wordWidth;x++){
            for(let y = 0; y < wordHeight;y++){
                fill(color(255,x*2.5,y*2,map(opacity,210,255,20,255)));       
                text("DAMN.",x*90+(y*12)-70,y*35);
            }
        }
    }
    
    if(!bassTrigger){
        fill(color(255,0,0));   
        textSize(map(fft.getEnergy(20,5000),0,255,0,400));
        text("PRIDE.",width/2,height/2);
    }
    else{
        localCounter++;
        fill(color(255,0,0));  
        let size =  map(fft.getEnergy(20,5000),0,255,0,400);
        textSize(size);
        text("P",width/2-size-14-localCounter*.3,height/2+localCounter*.1);
        text("R",width/2-size/2-7-localCounter*.1,height/2-localCounter*.2);
        text("I",width/2,height/2+localCounter*.12);
        text("D",width/2+size/2+7+localCounter*.15,height/2+localCounter*.4);
        text("E",width/2+size+14+localCounter*.5,height/2-localCounter*.2);

        //do something more
    }

   

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

  function advanceSong(){
    sound.jump(sound.currentTime()+5);
    console.log("here");
  }