const winWidth = window.innerWidth;
const winHeight = window.innerHeight;


let scene, camera, renderer, item, composer, glslPass, geometry, noise, controls;
let gui = null;
let mesh;
let strDownloadMime = "image/octet-stream";

init();
update();

function init(){
  var saveLink = document.createElement('div');
        saveLink.setAttribute('id', 'export-image')
        saveLink.setAttribute('class', 'col-sm-6 col-md-6 col-lg-6')
        saveLink.style.top = '20px';
        saveLink.style.postion = 'absolute';
        saveLink.style.zIndex = '99';
        saveLink.style.color = 'white !important';
        saveLink.style.textAlign = 'left';
        saveLink.innerHTML =
            '<button class="btn-outline-light btn" id="saveLink">Export Art</button>';
        document.body.prepend(saveLink);
        document.getElementById("saveLink").addEventListener('click', saveAsImage);

  // scene and camera positioning
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  camera = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.01, 1000);
  camera.position.set( 0,0,30 );
  
  // directional light
  const light = new THREE.DirectionalLight(0xffffff, .9);
  scene.add(light);
  
  // render
  renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true
  });
  
  renderer.setSize(winWidth, winHeight);

  //geometry
  geometry = new THREE.PlaneGeometry(24,24,50,50)
  // initiate simplexNoise library
  // iterate through each vertex and expand the x and y vertices
  var simplex = new SimplexNoise(Math.random * 100);
  for (var i = 0, l = geometry.vertices.length; i < l; i++) {
    var v = geometry.vertices[i];
    v.z = simplex.noise2D(v.x / 25.0, v.y / 25.0) * 20;
    noise = v.z;
  }

  const material = new THREE.MeshStandardMaterial({
    color:0x000000,
    wireframe: true
  })
  item = new THREE.Mesh(geometry, material)
  item.position.set(0,0,0)

  item.rotation.x = Math.PI / 2;
  scene.add(item);
  

  controls = new THREE.OrbitControls(camera,renderer.domElement);

  document.getElementById('container').appendChild(renderer.domElement);

  window.addEventListener('resize', resize, false);

  // GUI
  const params = new function() {
    this.noise = noise
  }

  gui = new dat.GUI({
    height : 5 * 32 - 1
  });
  gui.add(params, 'noise', -100, 100).onChange( function() {
    for(var i = 0, l = geometry.vertices.length; i < l; i++) {
      var v = geometry.vertices[i];
      v.z = simplex.noise2D(v.x / params.noise, v.y / params.noise) * 20;
    }
  });
  
}

function saveAsImage() {
  var imgData, imgNode;

  try {
      var strMime = "image/jpeg";
      imgData = renderer.domElement.toDataURL(strMime);

      saveFile(imgData.replace(strMime, strDownloadMime), "Artwork.jpg");

  } catch (e) {
      console.log(e);
      return;
  }
}

var saveFile = function (strData, filename) {
var link = document.createElement('a');
if (typeof link.download === 'string') {
    document.body.appendChild(link); //Firefox requires the link to be in the body
    link.download = filename;
    link.href = strData;
    link.click();
    document.body.removeChild(link); //remove the link when done
} else {
    location.replace(uri);
}
}

function update(){
  requestAnimationFrame(update);
  renderer.render(scene, camera);
  item.geometry.verticesNeedUpdate = true;
}

function resize(){
  camera.aspect = winWidth / winHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
