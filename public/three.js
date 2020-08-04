const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

let scene, camera, renderer, item, composer, glslPass, geometry, noise;
var gui = null;

init();
update();

function init(){

  // scene and camera positioning
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  camera = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.01, 1000);
  camera.position.set( 0,0,50 );
  
  // directional light
  const light = new THREE.DirectionalLight(0xffffff, .9);
  scene.add(light);
  
  // render
  renderer = new THREE.WebGLRenderer();
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

  console.log(noise)
  const material = new THREE.MeshStandardMaterial({
    color:0x000000,
    wireframe: true
  })
  item = new THREE.Mesh(geometry, material)
  item.position.set(0,0,0)

  item.rotation.x = Math.PI / 2;
  scene.add(item);

  // GUI
  const params = new function() {
    this.rotationX = 0
    this.rotationY = 0
    this.noise = noise
  }

  gui = new dat.GUI({
    height : 5 * 32 - 1
  });
  gui.add(params, 'rotationX', 0, 10).onChange( function() {
    item.rotation.x = (params.rotationX);
  });
  gui.add(params, 'rotationY', 0, 10).onChange( function() {
    item.rotation.y = (params.rotationY);
  });
  gui.add(params, 'noise', -25, 25).onChange( function() {
    for(var i = 0, l = geometry.vertices.length; i < l; i++) {
      var v = geometry.vertices[i];
      v.z = simplex.noise2D(v.x / params.noise, v.y / params.noise) * 20;
    }
  });
  
  //post processing
  // composer = new THREE.EffectComposer(renderer); 
  // const renderPass = new THREE.RenderPass(scene, camera);

  // // renderPass.renderToScreen = true;
  // composer.addPass( renderPass ); 

  // glslPass = new THREE.FilmPass(1);
  // glslPass.renderToScreen = true;
  // composer.addPass(glslPass);


  document.getElementById('canvas').appendChild(renderer.domElement);

  window.addEventListener('resize', resize, false);
  
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
