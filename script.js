const scene= new THREE.Scene()
const camera= new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1000)
const renderer=new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.querySelector(".webgl").appendChild(renderer.domElement)


var geometry=new THREE.BoxGeometry(1,1,1)
var material=new THREE.MeshBasicMaterial({color:0xff0000})
const mesh=new THREE.Mesh(geometry,material)
scene.add(mesh)
camera.position.x=1
camera.position.z=4
camera.position.y=1
camera.lookAt(new THREE.Vector3(0,0,0))


renderer.render(scene,camera)

