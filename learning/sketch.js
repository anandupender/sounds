let mic;
let endFFT = .6;

 function setup(){
 let cnv = createCanvas(window.innerWidth,window.innerHeight);

  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(.92,1024);
  fft.setInput(mic);

}

function draw(){
    background(255);

    // draw fft
    let spectrum = fft.analyze();
    beginShape();

    noFill();
    stroke(0)
    strokeWeight(3);
    for (i = 0; i < spectrum.length*endFFT; i++) {
        curveVertex(map(i,0,spectrum.length*endFFT,0,width), map(spectrum[i], 0, 255, height, 0));

    }

    endShape();
}