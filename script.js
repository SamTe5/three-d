var scene;
var camera;
var renderer;

function createScene() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector(".webgl").appendChild(renderer.domElement)

    createBox("box1",1,1,1,0x00ff00)

   
    camera.position.x = 1
    camera.position.z = 4
    camera.position.y = 1
    camera.lookAt(new THREE.Vector3(0, 0, 0))


    
}

function createBox(name,w,h,d,color){
    var geometry = new THREE.BoxGeometry(w, h, d)
    var material = new THREE.MeshBasicMaterial({ color: color })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name=name
    scene.add(mesh)
}

function render(){
    renderer.render(scene, camera)
    scene.getObjectByName("box1").rotation.x+=0.01
    requestAnimationFrame(render)
}





createScene()
render()


