var app = new Vue({
    el: '#content',
    data: {
        sketches: [
            {file:"/sketches/odesza.js",video:"/vids/odesza.mov",poster:"/posters/odesza.png", artist:"Odesza",song:"Sun Models"},
            {file:"",video:"/vids/coldplay.mov",poster:"/posters/coldplay.png", artist:"Coldplay",song:"Fix You"},
            {file:"",video:"/vids/nav.mov",poster:"/posters/nav.png", artist:"Naveen Upender",song:"untitled"},
            {file:"/sketches/toni.js",video:"/vids/toniFinal.mov",poster:"/posters/toni.png", artist:"Toni Adeyemi",song:"Theme"},
            {file:"/sketches/randj.js",video:"/vids/romeo.mov",poster:"/posters/romeo.png", artist:"Sergei Prokofiev",song:"Dance of the Knights"},
            {file:"/sketches/kendrick.js",video:"/vids/pride.mov",poster:"/posters/pride.png", artist:"Kendrick Lamar",song:"PRIDE"},
            {file:"/sketches/faces.js",video:"/vids/faces.mov",poster:"/posters/faces.png", artist:"Odesza",song:"Sun Models"},
            {file:"",video:"/vids/cometoastop.mov",poster:"/posters/cometoastop.png", artist:"Clueless Kit ft. køra",song:"Come to a Stop"},

        ]
    },
    methods:{
        loadSketch : function(filePath){
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = filePath; 
            document.getElementsByTagName("body")[0].appendChild(script);
        }
    }
})

function play(vid){
    vid.play();
}

function pause(vid){
    vid.pause();
}

function transformScroll(event) {
    if (!event.deltaY) {
      return;
    }
    event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
  }
  
  //for desktop, transform scroll into other direction
  if(window.innerWidth >= 500){
      console.log(window.innerWidth);
    var element = document.scrollingElement || document.documentElement;
    element.addEventListener('wheel', transformScroll);

  }
