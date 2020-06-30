var audioClient;
var scene, camera, renderer, clock;
var clicked  = false;

function beginAudioProcessing() {
    console.log("Test");
    audioClient = new AudioHelper();
    audioClient.setupAudioProcessing();
    audioClient.loadFile("./audio/overthinker.mp3")
        // .then(init)
        .then(() => {
            audioClient.onAudioProcess(function () {
                // renderer.render(scene, camera);

                // var elapsedTime = clock.getElapsedTime();
                // var plane = scene.getObjectByName("plane-1");
                // var planeGeo = plane.geometry;

                var frequencyData = audioClient.getFrequencyData();
                var amplitude = audioClient.getAmplitude();

                var freqAvg = audioClient.getAverage(frequencyData);
                console.log(amplitude);

                // planeGeo.vertices.forEach(function (vertex, index) {
                //     vertex.z += Math.sin(elapsedTime + index * 0.1) * (freqAvg * 0.0005);
                // });
                // planeGeo.verticesNeedUpdate = true;
            });
        });
}

document.querySelector("#main").addEventListener("click", function(){
    if(!clicked){
        beginAudioProcessing();
    }
    clicked = true;
});

