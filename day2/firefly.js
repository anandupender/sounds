var locations = [];
var numFlies = 300;
var largestSize = 100;

function preload(){
    sound = loadSound('../audio/firefly.mp3');
}

function setup(){
    let cnv = createCanvas(window.innerWidth,window.innerHeight);
    document.querySelector("#play").onclick = play;

    amplitude = new p5.Amplitude();
    amplitude.smooth(.75);

    //setup random locations for fireflies
    for(var i = 0; i < numFlies; i++){
      var xPos = Math.floor(Math.random() * window.innerWidth);
      var yPos = Math.floor(Math.random() * window.innerHeight);
      var m = Math.random()+1.3;
      locations[i] = {x:xPos,y:yPos,multiplier:m};
    }

    console.log(locations);
    noStroke();
    fill(color(235,233,145));

}

function draw(){
    background(10);

    let level = amplitude.getLevel();
    let size = map(level, 0, 1, 0, largestSize);

    for(var j = 0; j < locations.length;j++){

      var slope = (mouseY-locations[j].y)/(mouseX-locations[j].x);
      var b = locations[j].y - slope*locations[j].x;
      if(mouseX < locations[j].x){
        var newX = locations[j].x - .24;
        locations[j].x = newX;
      }else{
        var newX = locations[j].x + .24;
        locations[j].x = newX;
      }
      // var newY = slope*newX+b;
      // locations[j].y = newY;
      var newY = locations[j].y;

      if(locations[j].multiplier * size > 7){
        ellipse(newX, newY, locations[j].multiplier * size, locations[j].multiplier * size);
      }
    }
}

  
function play() {
  sound.loop();
  document.querySelector("#play").style.display = "none";
}
