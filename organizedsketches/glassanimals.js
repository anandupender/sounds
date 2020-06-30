import {OBJLoader} from "../js/OBJLoader.js"

const pink = new THREE.Color( 0xFC3C79 );
const blue = new THREE.Color( 0x12AED3 );
const green = new THREE.Color( 0x08B921 );
const yellow = new THREE.Color( 0xFFD90C);
var modelLoaded = false;
var audioLoaded = false;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
var model;
var modelContainer;

// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );
var sound = new THREE.Audio( listener );
var analyser = new THREE.AudioAnalyser( sound, 1024 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xFFFFFF, 1);
document.body.appendChild( renderer.domElement );

// setup lights
const intensity = 1;
const light1 = new THREE.DirectionalLight(pink, intensity);
light1.position.set(20, 0, 0);
light1.target.position.set(0, 0, 0);
scene.add(light1);
scene.add(light1.target);

const light2 = new THREE.DirectionalLight(blue, intensity);
var light2x = -20;
light2.position.set(light2x, 0, 0);
light2.target.position.set(0, 0, 0);
scene.add(light2);
scene.add(light2.target);

const intensity3 = .2;
const light3 = new THREE.DirectionalLight(yellow, intensity3);
light3.position.set(0, -40, 0);
light3.target.position.set(0, 0, 0);
scene.add(light3);
scene.add(light3.target);

const pColor = 0xFFFFFF;
const pIntensity = 0;
const pLight = new THREE.PointLight(pColor, pIntensity);
pLight.position.set(0, 150, 0);
// pLight.target.position.set(-5, 0, 0);
scene.add(pLight);

camera.position.set(0, 0, 400);

const radius =  120;  
const tubeRadius =  6.0;  
const radialSegments = 21;  
const tubularSegments =  49;  
var haloGeometry = new THREE.TorusBufferGeometry(
    radius, tubeRadius,
    radialSegments, tubularSegments);
haloGeometry.scale(0.01,.01,.01);
var halo = addSolidGeometry(-50, 150, 90, haloGeometry);

var loader = new OBJLoader();
loader.load('../assets/tongue.obj',
	function ( object ) {

        // if you want to add your custom material
        var materialObj = new THREE.MeshBasicMaterial({
            vertexColors: THREE.FaceColors,
            color: 0x00ff00
        });
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialObj;
            }
        });
        model = object;

        modelContainer = new THREE.Object3D();
        model.position.set(0, -140,0);
        model.rotation.z = THREE.Math.degToRad( 10 );
        model.rotation.y = THREE.Math.degToRad( -45 );

        modelContainer.add(model);
        modelContainer.add(halo);

        scene.add( modelContainer );
        modelLoaded = true;

	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened' );
	}
);


function addSolidGeometry(x, y, rotateX,geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    mesh.rotateX(THREE.Math.degToRad(rotateX));
    mesh.position.x = x;
    mesh.position.y = y;
    return mesh;
}

function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      emissive: 0x000000,
      reflectivity:.8,
      shininess:60
    });
    // const material = new THREE.MeshNormalMaterial({
    //     side: THREE.DoubleSide
    //   });
       return material;
}


// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load( '../audio/tokyoDrifting.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
    sound.setVolume( 1 );
    audioLoaded = true;
});

function getAverage(data,start, end){
    var total = 0;
    for(var i = start; i < end; i++) {
        total += data[i];
    }
    return total / end;
}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

window.addEventListener("click",function(){

    if(audioLoaded && modelLoaded){
        if(sound.isPlaying){
            sound.pause();
        }else{
            sound.play();
        }
    }
});

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

let prevVolume = 0;
let soundLoudFirstTime = true;
function render() {
    var data = analyser.getFrequencyData();
    var average = analyser.getAverageFrequency();
    var bassLevel = getAverage(data,0,2);
    var volume = getAverage(data,0,data.length);

    if(model && sound.isPlaying){
        // model.rotation.y = -.8;
        if(bassLevel > 220){
            model.rotation.x = map(bassLevel,220,255,-.4,.2);
        }else{
            model.rotation.x = -.4;
        }
        var changeInVolume = volume - prevVolume;

        //after beat drop
        if(!soundLoudFirstTime){
            haloGeometry.scale(map(changeInVolume,-100,100,.7,1.3),map(changeInVolume,-100,100,.7,1.3),1);
            modelContainer.rotation.y += 0.005;
        }
    }

    if(volume > 50){
        pLight.intensity = 1;
        if(soundLoudFirstTime){
            haloGeometry.scale(100,100,100);
        }
        soundLoudFirstTime = false;
    }

    // light2.position.set(light2x, 0, 0);
    // light2x +=.01;
    light1.intensity = map(volume, 0, 100, 0, 1);
    light2.intensity = map(volume, 0, 100, 0, 1);
    light3.intensity = map(volume, 0, 100, 0, .2);

    prevVolume = volume;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();