// cover background
export default () => {


    // set inner height and width based on screen size
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    // global vars
    let scene, camera, renderer, controls, circle, clock;

    init();

    function init(){
    // scene and camera positioning
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    camera = new THREE.PerspectiveCamera(75, winWidth/winHeight, 0.01, 1000);
    camera.position.set( 0,0,.5 );
    
    // render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(winWidth, winHeight);

    clock = new THREE.Clock();

    //geometry
    const geometry = new THREE.SphereGeometry(25,25,25)

    //material
    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        wireframe: true
    })

    //mesh
    circle = new THREE.Mesh(geometry, material)
    circle.rotation.y = 0;
    circle.rotation.x = 30;
    scene.add(circle)

    //set clock
    clock = new THREE.Clock();
    

    // orbit controls 
    controls = new THREE.OrbitControls(camera,renderer.domElement);


    // append canvas to dom element
    document.getElementById('cover-bg').appendChild(renderer.domElement);


    // call resize function on resize
    window.addEventListener('resize', resize, false);

    update();
    }

    // update loop
    function update(){
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    }


    // resize function
    function resize(){
    camera.aspect = winWidth / winHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    }

}