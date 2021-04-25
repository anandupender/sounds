let sound,fft,mic;

let max,maxIndex;
let secondMax, secondMaxIndex;

let lowerBound = 0;
let higherBound = 40;

function setup(){
    cnv = createCanvas(window.innerWidth,window.innerHeight);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT(.92,1024);
    fft.setInput(mic);}

function draw(){
    let spectrum = fft.analyze();

    stroke(0);
    strokeWeight(3);
    beginShape();
    noFill();
    max = 0;
    for (let i = lowerBound; i< higherBound; i++){
        var x = map(i, lowerBound,higherBound,0,width);
        var y = map(spectrum[i], 0, 255, height, 0);
        curveVertex(x,y);

        //find max value
        if (spectrum[i] > max) {
            secondMax = max;
            secondMaxIndex = maxIndex;
            maxIndex = i;
            max = spectrum[i];
        }
  
    }
    console.log(maxIndex);
    var mapped = map(maxIndex,lowerBound,higherBound,255,0);
    background(color(mapped,mapped,mapped));

    endShape();

}