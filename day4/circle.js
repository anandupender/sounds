let mic,fft;
let history = [];
let maxHistLength = 55;

//higher omega is faster drawing
let omegaFactor = .7;
let omega1 = .07;
let omega2 = omega1 * omegaFactor;

function setup(){
    cnv = createCanvas(window.innerWidth,window.innerHeight);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    console.log(sampleRate());
}

function draw(){
    background(255);

    let spectrum = fft.analyze();

    //iterate through to set x and y values

    var currX = 0;
    var currY = 0;

    //higher values dampen more
    var a = .05;
    var maxMappedAmp = 350;

    var startingLowFreq = 8;

    //1 yields ovals, higher than 1 yields crown shape, lower than 1 yields up and down spirals
    var mysteryB = .9;

    beginShape();
    for (let i = startingLowFreq; i< spectrum.length; i++){

        var mappedAmplitude = map(Math.pow(spectrum[i],2),0,Math.pow(255,2),0,maxMappedAmp);
        var mappedOmegaMultiplier =  map(spectrum[i],0,255,0,3);

        //Math.exp(-i) is a dampener
        currX+= (mappedAmplitude*Math.cos(millis() * omega1)) * Math.exp(-i*a);
        currY+= (mappedAmplitude*Math.sin(millis() * (omega1*mappedOmegaMultiplier))) * Math.exp(-i*a); //(sin(i)*.05+mysteryB)

        var x1 = map(i, 0, spectrum.length, startingLowFreq, width);
        var y1 = map(Math.pow(spectrum[i],2)* Math.exp(-i*a), 0, Math.pow(255,2), height, 0);

        curveVertex(x1,y1);
    }
    endShape();

    //append to history
    history.unshift({x:currX,y:currY});

    //pop from history
    if(history.length >= maxHistLength){
        history.pop();
    }

    beginShape();
    stroke(0);

    for(var j = 0; j < history.length;j++){
        curveVertex(history[j].x+width/2,history[j].y+height/2);
        var color = map(j,0,history.length,0,255);
    }
    endShape();

}
