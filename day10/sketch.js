let mic;
let endFFT = .6;

//draw a spinning octahedron
let hands;

function preload() {
    hands = loadModel('../assets/rtj.obj',true);
}

function setup(){
    let cnv = createCanvas(window.innerWidth,window.innerHeight, WEBGL);
}

function draw(){
    background(255);

    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    model(octahedron);

    // // draw fft
    // let spectrum = fft.analyze();
    // beginShape();

    // noFill();
    // stroke(0)
    // strokeWeight(3);
    // for (i = 0; i < spectrum.length*endFFT; i++) {
    //     curveVertex(map(i,0,spectrum.length*endFFT,0,width), map(spectrum[i], 0, 255, height, 0));

    // }

    // endShape();
}